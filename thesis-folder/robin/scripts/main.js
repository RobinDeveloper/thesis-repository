// Logic for the Whitespace Esoteric Programming Language Interpreter

// Namespace for programs to avoid global conflicts
window.programs = window.programs || {};

window.programs.whitespaceRun = function(windowContentElement, windowId, messageAreaElement) { // Changed first parameter to windowContentElement
    console.log(`[Whitespace] Initializing for window: ${windowId}`);

    // Message Display Function - using function declaration for hoisting behavior
    function updateMessage(message) {
        if (messageAreaElement) {
            messageAreaElement.textContent = message;
        }
    }

    // Create UI elements
    const container = document.createElement('div');
    container.className = 'whitespace-container';
    // Styles moved to CSS, but direct application for layout might be needed if CSS is not loaded immediately
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.padding = '8px';
    container.style.boxSizing = 'border-box';
    container.style.backgroundColor = 'white';

    const inputLabel = document.createElement('div');
    inputLabel.textContent = 'Whitespace Code (Space: S, Tab: T, Newline: N):';
    inputLabel.style.marginBottom = '5px';
    container.appendChild(inputLabel);

    const codeInput = document.createElement('textarea');
    codeInput.className = 'whitespace-input-area';
    codeInput.placeholder = 'Type your Whitespace code here. Use "S" for Space, "T" for Tab, and "N" for Newline for visibility.';
    codeInput.style.flexGrow = '2';
    codeInput.style.marginBottom = '8px';
    container.appendChild(codeInput);

    const runButton = document.createElement('button');
    runButton.className = 'whitespace-button';
    runButton.textContent = 'Run Whitespace Code';
    runButton.style.marginBottom = '8px';
    container.appendChild(runButton);

    const outputLabel = document.createElement('div');
    outputLabel.textContent = 'Output:';
    outputLabel.style.marginBottom = '5px';
    container.appendChild(outputLabel);

    const outputArea = document.createElement('pre'); // Use pre to preserve whitespace and newlines in output
    outputArea.className = 'whitespace-output-area';
    outputArea.style.flexGrow = '1';
    container.appendChild(outputArea);

    // Append the container to the window's content area
    if (windowContentElement) {
        windowContentElement.innerHTML = ''; // Clear existing content (e.g., a canvas from default program)
        windowContentElement.style.padding = '0'; // Reset padding so container can manage it
        windowContentElement.style.backgroundColor = 'transparent'; // Allow container's background to show
        windowContentElement.appendChild(container);
    } else {
        console.error("[Whitespace] windowContentElement is null, cannot append UI.");
        updateMessage("Error: UI container not found.");
        return; // Exit if no place to put UI
    }


    // --- Whitespace Interpreter Logic (Simplified) ---
    const interpretWhitespace = () => {
        outputArea.textContent = ''; // Clear previous output
        let code = codeInput.value;

        // Replace visible indicators with actual Whitespace characters
        code = code.replace(/S/g, ' '); // Space
        code = code.replace(/T/g, '\t'); // Tab
        code = code.replace(/N/g, '\n'); // Newline

        const tokens = [];
        let i = 0;
        while (i < code.length) {
            const char = code[i];
            if (char === ' ' || char === '\t' || char === '\n') {
                tokens.push(char);
            }
            i++;
        }

        // Program State
        let stack = [];
        let heap = {}; // Heap storage (address -> value)
        let pc = 0; // Program counter (index in tokens array)
        let callStack = []; // For subroutine calls
        let labels = {}; // Label name -> token index

        // Pre-parse labels for jumps
        let labelParsePc = 0;
        while(labelParsePc < tokens.length) {
            if (tokens[labelParsePc] === '\n') { // NL
                if (tokens[labelParsePc + 1] === '\n') { // NL NL NL (Flow Control)
                    if (tokens[labelParsePc + 2] === ' ') { // NL NL S: Label definition
                        labelParsePc += 3; // Skip IMP and label command
                        let labelName = '';
                        while (tokens[labelParsePc] !== '\n') {
                            if (tokens[labelParsePc] !== ' ' && tokens[labelParsePc] !== '\t') {
                                throw new Error(`[Error] Invalid character in label name at index ${labelParsePc}.`);
                            }
                            labelName += tokens[labelParsePc];
                            labelParsePc++;
                        }
                        if (labels[labelName]) {
                            throw new Error(`[Error] Duplicate label: '${labelName}'.`);
                        }
                        labels[labelName] = labelParsePc + 1; // Store next instruction's index
                        console.log(`Defined Label: '${labelName}' at instruction index ${labels[labelName]}`);
                    }
                }
            }
            labelParsePc++;
        }


        let output = '';

        const readNumber = () => {
            pc++; // Skip current char (sign or digit)
            let numStr = '';
            let sign = 1;
            if (tokens[pc] === '\t') { // Tab for negative
                sign = -1;
                pc++;
            } else if (tokens[pc] === ' ') { // Space for positive
                sign = 1;
                pc++;
            } else {
                throw new Error(`[Error] Invalid sign for number. Expected Space or Tab at index ${pc}.`);
            }

            while (tokens[pc] !== '\n') {
                if (tokens[pc] === ' ') numStr += '0';
                else if (tokens[pc] === '\t') numStr += '1';
                else throw new Error(`[Error] Invalid character in number: '${tokens[pc]}' at index ${pc}.`);
                pc++;
                if (pc >= tokens.length) throw new Error("[Error] Unexpected end of code during number parsing (missing NL).");
            }
            if (numStr === '') throw new Error(`[Error] Empty number value at index ${pc}.`);

            // Consume the final newline for the number
            // pc++; // This will be handled by the outer loop's pc++ after the current instruction

            return parseInt(numStr, 2) * sign;
        };

        const popAndOperate = (operation) => {
            if (stack.length < 2) {
                throw new Error("Stack underflow for arithmetic operation.");
            }
            const b = stack.pop();
            const a = stack.pop();
            let result;
            switch (operation) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/':
                    if (b === 0) throw new Error("Division by zero.");
                    result = Math.floor(a / b); // Integer division
                    break;
                case '%':
                    if (b === 0) throw new Error("Modulo by zero.");
                    result = a % b;
                    break;
                default: throw new Error("Unknown arithmetic operation.");
            }
            stack.push(result);
        };


        try {
            while (pc < tokens.length) {
                const imp = tokens[pc]; // Instruction Modification Parameter (IMP)
                let instruction = '';
                let tempPc = pc; // For error reporting

                if (imp === ' ') { // Stack Manipulation (Space)
                    pc++;
                    instruction = tokens[pc];
                    if (instruction === ' ') { // SP SPACE: Push number onto stack
                        pc = tempPc + 1; // Adjust PC to start of number parsing
                        const numericValue = readNumber(); // readNumber consumes until NL
                        stack.push(numericValue);
                        console.log(`PUSH: ${numericValue}. Stack: [${stack}]`);
                    } else if (instruction === '\n') { // SP NL: Duplicate top of stack (Dup)
                        pc++;
                        if (stack.length === 0) throw new Error(`Stack underflow for Duplicate at index ${pc}.`);
                        stack.push(stack[stack.length - 1]);
                        console.log(`DUP. Stack: [${stack}]`);
                    } else if (instruction === '\t') { // SP Tab: Various stack ops
                        pc++;
                        const op = tokens[pc];
                        if (op === ' ') { // SP T S: Copy nth item
                            pc = tempPc + 3; // Adjust PC to start of number for copy
                            const n = readNumber();
                            if (stack.length <= n) throw new Error(`Stack underflow for Copy Nth (N=${n}) at index ${pc}.`);
                            stack.push(stack[stack.length - 1 - n]);
                            console.log(`COPY NTH (N=${n}). Stack: [${stack}]`);
                        } else if (op === '\t') { // SP T T: Slide N items off stack
                            pc = tempPc + 3; // Adjust PC to start of number for slide
                            const n = readNumber();
                            if (stack.length <= n) throw new Error(`Stack underflow for Slide N (N=${n}) at index ${pc}.`);
                            const top = stack.pop(); // Keep top item
                            stack.splice(stack.length - n, n); // Remove N items below top
                            stack.push(top); // Put top back
                            console.log(`SLIDE N (N=${n}). Stack: [${stack}]`);
                        } else if (op === '\n') { // SP T NL: Swap top two
                            pc++;
                            if (stack.length < 2) throw new Error(`Stack underflow for Swap at index ${pc}.`);
                            const a = stack.pop();
                            const b = stack.pop();
                            stack.push(a);
                            stack.push(b);
                            console.log(`SWAP. Stack: [${stack}]`);
                        } else {
                            throw new Error(`[Error] Unknown stack operation after SP Tab: '${op}' at index ${pc}`);
                        }
                    } else {
                        throw new Error(`[Error] Unknown stack operation after Space: '${instruction}' at index ${pc}`);
                    }

                } else if (imp === '\t') { // Arithmetic (Tab)
                    pc++;
                    const arithmeticImp = tokens[pc];
                    pc++;
                    const operation = tokens[pc];

                    if (arithmeticImp === ' ') { // Tab Space: Arithmetic
                        switch (operation) {
                            case ' ': popAndOperate('+'); console.log(`ADD. Stack: [${stack}]`); break;
                            case '\t': popAndOperate('-'); console.log(`SUB. Stack: [${stack}]`); break;
                            case '\n': popAndOperate('*'); console.log(`MUL. Stack: [${stack}]`); break;
                            default: throw new Error(`[Error] Unknown arithmetic operation: '${operation}' at index ${pc}`);
                        }
                    } else if (arithmeticImp === '\t') { // Tab Tab: More Arithmetic (Division/Modulo)
                        switch (operation) {
                            case ' ': popAndOperate('/'); console.log(`DIV. Stack: [${stack}]`); break;
                            case '\t': popAndOperate('%'); console.log(`MOD. Stack: [${stack}]`); break;
                            default: throw new Error(`[Error] Unknown advanced arithmetic operation: '${operation}' at index ${pc}`);
                        }
                    } else {
                        throw new Error(`[Error] Unknown Tab instruction: '${arithmeticImp}' at index ${pc}`);
                    }
                } else if (imp === '\n') { // Flow Control or I/O (Newline)
                    pc++;
                    const subImp = tokens[pc]; // Second IMP (Newline or Space or Tab)

                    if (subImp === '\n') { // NL NL: Flow Control
                        pc++;
                        const flowOp = tokens[pc];
                        if (flowOp === ' ') { // NL NL S: Label definition (already parsed)
                            // Skip label, it's for reference, not execution
                            pc++; // Skip label character
                            while(tokens[pc] !== '\n' && pc < tokens.length) pc++; // Skip label name
                            if(tokens[pc] !== '\n') throw new Error(`[Error] Expected NL after label name at index ${pc}.`);
                            console.log("Skipping label definition (already processed)");
                        } else if (flowOp === '\t') { // NL NL T: Call Subroutine
                            pc++; // Skip call command
                            let labelName = '';
                            while(tokens[pc] !== '\n' && pc < tokens.length) {
                                labelName += tokens[pc];
                                pc++;
                            }
                            if(!labels[labelName]) throw new Error(`[Error] Undefined label for call: '${labelName}' at index ${pc}.`);
                            callStack.push(pc + 1); // Push return address (next instruction)
                            pc = labels[labelName]; // Jump to label
                            console.log(`CALL to label '${labelName}'. Call stack: [${callStack}]`);
                            continue; // Don't increment pc again in main loop

                        } else if (flowOp === '\n') { // NL NL NL: End program
                            updateMessage('Execution finished. End of program.');
                            return; // Halt execution
                        } else {
                            throw new Error(`[Error] Unknown Flow Control operation: '${flowOp}' at index ${pc}`);
                        }
                    } else if (subImp === ' ') { // NL S: I/O
                        pc++;
                        const ioType = tokens[pc];

                        if (ioType === ' ') { // NL S S: Output character
                            if (stack.length === 0) throw new Error(`Stack underflow for Output Char at index ${pc}.`);
                            const charCode = stack.pop();
                            output += String.fromCharCode(charCode);
                            console.log(`OUT_CHAR: '${String.fromCharCode(charCode)}'. Output: "${output}"`);
                        } else if (ioType === '\t') { // NL S T: Output number
                            if (stack.length === 0) throw new Error(`Stack underflow for Output Number at index ${pc}.`);
                            const num = stack.pop();
                            output += num.toString();
                            console.log(`OUT_NUM: ${num}. Output: "${output}"`);
                        } else {
                            throw new Error(`[Error] Unknown Output operation: '${ioType}' at index ${pc}`);
                        }
                    } else if (subImp === '\t') { // NL Tab: Heap Access (Store/Retrieve)
                        pc++;
                        const heapOp = tokens[pc];
                        if (heapOp === ' ') { // NL T S: Store
                            if (stack.length < 2) throw new Error(`Stack underflow for Store at index ${pc}.`);
                            const value = stack.pop();
                            const address = stack.pop();
                            heap[address] = value;
                            console.log(`STORE: Address ${address} = ${value}. Heap: ${JSON.stringify(heap)}`);
                        } else if (heapOp === '\t') { // NL T T: Retrieve
                            if (stack.length < 1) throw new Error(`Stack underflow for Retrieve at index ${pc}.`);
                            const address = stack.pop();
                            if (heap[address] === undefined) throw new Error(`Undefined address for Retrieve: ${address} at index ${pc}.`);
                            stack.push(heap[address]);
                            console.log(`RETRIEVE: Address ${address} -> ${heap[address]}. Stack: [${stack}]`);
                        } else {
                            throw new Error(`[Error] Unknown Heap operation: '${heapOp}' at index ${pc}`);
                        }
                    }
                    else {
                        throw new Error(`[Error] Unknown Newline instruction: '${subImp}' at index ${pc}`);
                    }
                } else {
                    // Ignore non-whitespace characters if they somehow got through.
                    // Or, for a strict interpreter, this would be an error.
                    // For this simplified version, we'll consider anything not ' ', '\t', '\n' as an error for clarity.
                    throw new Error(`[Error] Invalid character detected: '${imp}' at index ${pc}. Whitespace only uses spaces, tabs, and newlines.`);
                }
                pc++; // Move to next token, unless already jumped
            }
            outputArea.textContent = output;
            updateMessage('Execution finished.');
        } catch (error) {
            outputArea.textContent = `Error: ${error.message}`;
            updateMessage('Execution failed!');
            console.error(error);
        }
    };

    // --- Event Listeners and Cleanup ---
    const runHandler = () => interpretWhitespace();
    runButton.addEventListener('click', runHandler);

    // Initial message
    updateMessage('Ready to interpret Whitespace.');

    // Return a cleanup function for main.js to call when the window is closed
    return () => {
        runButton.removeEventListener('click', runHandler);
        // Reset window-content element if it was modified
        if (windowContentElement) {
            // Restore padding and background color if necessary for other apps
            windowContentElement.innerHTML = '';
            windowContentElement.style.padding = '8px';
            windowContentElement.style.backgroundColor = 'white';
        }
        console.log(`[Whitespace] Cleanup for window ${windowId} completed.`);
    };
};

