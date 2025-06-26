// Global variables for window and icon management
let activeWindow = null;
let activeIcon = null;
let initialX, initialY, offsetX, offsetY;
let highestZIndex = 999; // Starting Z-index for windows and icons (icons start lower)

// Stores animation frame IDs for cleanup when programs are closed
const programAnimationFrames = {};

// Helper function to format document content with references
function formatDocumentContent(rawContent) {
    let formattedContent = rawContent;

    // A simple way to identify and link references.
    // This assumes references are numbered at the end, e.g., "1. Foo", "2. Bar"
    // And citations in text are "[1]", "[2]", etc.

    // Step 1: Identify reference list at the end and wrap them with IDs
    // This regex looks for lines starting with a number and a period, optionally followed by space
    formattedContent = formattedContent.replace(/(\d+)\.\s*(.*?)(?=\n\d+\.|$)/gs, (match, num, text) => {
        // Remove trailing <p> or </p> tags that might be introduced by backticks in content
        let cleanedText = text.trim();
        if (cleanedText.startsWith('<p>')) cleanedText = cleanedText.substring(3);
        if (cleanedText.endsWith('</p>')) cleanedText = cleanedText.slice(0, -4);
        return `<p class="reference-item" id="ref-${num}">${num}. ${cleanedText}</p>`;
    });

    // Step 2: Replace in-text citations with links to the reference IDs
    // This regex looks for "[number]" pattern
    formattedContent = formattedContent.replace(/\[(\d+)\]/g, (match, num) => {
        return `[<a href="#ref-${num}" class="reference-link">${num}</a>]`;
    });

    return formattedContent;
}

// Define desktop items (chapters and programs)
const desktopItems = [
    {
        type: "document",
        title: "Poetic Potential",
        content: formatDocumentContent(`
            <h1>Poetic Potential</h1>
            <p>Poetry is often described as the language of emotion, characterized by its ability to condense meaning, and for creating rhythm in structured form. Poets adhere to constraints when writing haikus, and sonnets, the Oulipo literary group a gathering of mostly french-speaking writers and mathematicians who experimented with other self-imposed constraints.</p>
            <p>If poetry is fundamentally about form, rhythm, feeling, and interpretation, could programming evoke poetic ideas and feelings?</p>
            <h2>Robin Opheij</h2>
            <p>Like natural language, programming has rules. The need in programming for human-readable text over machine code draws inspiration from Indo-European language development in structure and syntax. Programming has been a Western culture rooted development, and thus the way we program will come from these cultures; this is being challenged within the field of Esoteric Programming Languages (esolangs).</p>
            <p>Code can exhibit forms of conciseness like minimalist poems and written with self-imposed or computer-forced constraints. Programs can generate infinite results or endless streams of predefined structured text, even used in procedural poetry. Monostich-like single lines of code creating landscapes of new forms behind it. Code like poetry is culturally significant and has an impact on the community that formed around it.</p>
            <p>Austrian philosopher and logician Ludwig Wittgenstein argues that language derives from its use, and not its inherent value of words itself. In code and programming, we can have the argument that code has either beautiful textual qualities or that it needs to be executed to complete itself and make it truly something poetic. English mathematician Ada Lovelace [1], often considered the first computer programmer, viewed her work as a "poetic science," a practice where logic, creativity, and imagination merge together. I hope to argue that this is the case for programming as well, with code invoking logic, creativity, and imagination in the programmer when they are working on their craft, and thus making code and programming at least a poetic science.</p>
            <p>Modern theorists like Canadian media professor Wendy Hui Kyong Chun, and American poet and digital media professor Nick Montfort suggest that code should be read as a cultural text, same as we do with any other literature. When we read code as a literary text, maybe we can find an elegance otherwise overlooked, not one that is focused on a technical quality, but one that is based in human expression, looking at code from an aesthetic dimension and to look for a feeling or soul in just the textuality of code.</p>

            <p class="section-title">References</p>
            1. Betty A. Toole, Ada, the Enchantress of Numbers. Strawberry Press, 1992. https://openlibrary.org/books/OL22619654M/Ada_the_enchantress_of_numbers, pp.134
            2. Another Example Reference. Some Publisher, 2020.
        `)
    },
    {
        type: "document",
        title: "Minimalism and Conciseness",
        content: formatDocumentContent(`
            <h1>Minimalism and Conciseness</h1>
            <p>Minimalism in programming is often found in conciseness and efficiency; a simple elegance in its ingenuity. The UNIX philosophy emphasizes doing one thing well, and this thing being simple, compact, clear, and extensible code. This idea also extends to programming languages like LISP where every element is meaningful and needed. The pursuit of efficiency and clarity often leads to code that not only serves some utilitarian function but carries something beautiful, much like a well-crafted poem; the programmer's challenge is to convey or computationally express complex problems or ideas within a limited space. Rather than blocking a creative act, these restraints help the programmer be more decisive in their writing.</p>
            <p>The single line of BASIC code <code>10 PRINT CHR$(205.5+RND(1)); GOTO 10;</code> shows how minimal code can be whilst generating a vast landscape of an infinite maze.</p>
            <p>This piece of code when ran on the game computer Commodore 64 would use two very simple characters, the forward-slash and backward-slash, to create unique structures on the screen. Every new execution would lead to a new, completely unique maze to be created. The monostich one-liner with unpredictable variations had Montfort et. al. do a close reading on this line due to its ability to be simple enough to easily explain each aspect, and perfect for explaining their views on how we should interact with code from the perspective of Platform Studies and Software Studies. In "10 PRINT CHR$(205.5+RND(1)); GOTO 10;" Montfort and his colleagues do such a close reading, talking about how when code is treated as a text we can discover other qualities about it, what it has done to culture, or how it existed and was created by culture. The book talks about whilst the one-liner is a historically located object to study, it's not unique or even rare for that matter. It was simply included with each device sold, making it a commonplace text. Yet it resonates with people in the demoscene community, scholars, the hobbyist of the time, and thus even a book.</p>
            <p class="section-title">References</p>
            1. Nick Montfort, et al. 10 PRINT CHR$(205.5+RND(1)); GOTO 10. MIT Press, 2012.
        `)
    },
    {
        type: "document",
        title: "Context and Interpretation",
        content: formatDocumentContent(`
            <h1>Context and Interpretation</h1>
            <p>Lovelace's concept of poetical science suggests that programming is not purely utilitarian, but a creative interpretive act where mathematics are used not only to solve complex problems, but to explain concepts hard to be found by language. Lovelace saw science as an expressive medium, not rigid in its ways, a perspective reiterated in the academic subfield of software studies today. Montfort's work on platform poetics in "Platform Studies" explores how code's meaning will shift depending on the hardware it's exposed to or even other software it will interact with or is built upon, or even its own execution. He argues that code is not something self-contained; it is embedded in a certain technological and cultural environment. Code is more than a set of instructions; it's a performative text that performs what it is asked to do but does so by interacting with everything in its environment and does show because of the instructions set by the culture of the creator. Montfort's idea of "platform" is thus not only about technical infrastructure, but the ideas, morals, fundamentals, and cultural context in which it's created. Much like poetry, which is very different based on the culture of the poet, school of thought, and personal quips. Chun deepens this thought process in "Programmed Visions" where she also writes about how not only how we affect code and how software not only shapes how we interact with technology but how we interact with the entire world around us. Adding also how we can learn to understand such a technologically advanced and imbued world. Chun also engages with the ideas of how/and when algorithms are used to construct an identity in our digital age in "Algorithmic Authenticity". Opening the discussion of how code has a potential poetic experience. Her argument in the book dives into how computational processes operate more as a performance of meaning than as a transparent execution of it. Like poetry where meaning is never a fixed idea, in programming. Code when viewed through this lens is not something that purely executes but like in poetry and computer-based or programmatically created art the form comes out of not something immediately visible or literal, but invites us to look into a deeper contextual interpretation. Chun's critique is showing us code is not an antithetical of poetics but an extension of it.</p>
            <p>Esoteric programming languages (esolangs) like Brainfuck or Malbolge push this idea of context and interpretation to its extreme, by even questioning the readability of code to even the usability of it. Making the writing in an esolang an already poetic act where code is both an object and event. Languages like these have limited syntax, that are juxtaposed to "readable" programming languages, making programming in these languages almost as hard as writing straight machine code, doable or small examples but hard to near impossible for larger structures. Just as how large scale poetic works are almost unheard of outside of the ancient Epic's, tragedies, and comedies.</p>
            <p class="section-title">References</p>
            1. Wendy Hui Kyong Chun. "Programmed Visions: Software and Memory." Choice Reviews Online, vol. 49, no. 05, 2012.
        `)
    },
    {
        type: "document",
        title: "The Poetics of Code",
        content: formatDocumentContent(`
            <h1>The Poetics of Code</h1>
            <p>This exploration that tried to explain the ways that code is a poetic medium over its more utilitarian execution-based use-case has shown that there is a playfulness in the textual aesthetics, processes, and cultural context of code. Exemplifying code as an expressive medium right for poetic expressions.</p>
            <p>Programming is a poetic science with its own rules and constraints, opening up the possibilities for creativity and imagination. The programmer is forced to think more elegantly by these constraints as we could find in the examples of FISR and 10 PRINT, small, concise, elegant, and rooted in creativity. 10 PRINT even being rewritten with many different variations exploring this simple algorithm in further depth.</p>
            <p>Code should not only be executed, but read, in close reading form as is done with literature to reveal inherent biases, beauties, and cultural impregnations of the time and place of the author. Like poetry is a sign of its time, the culture and ideas of their author, emotions, and feelings, so is code an exploration in what is valued and what is perceived at the time of creation.</p>
            <p>To write code is to interact with it with the methodology of a poetic science; it's not just a science or just designing a rule set but a play with creativity and imagination in the forefront. To write code is to interact with it in time and society, execution, and errors, further influencing the former and the former influencing the latter.</p>
            <p>Programming I believe to be essentially a poetic act; code itself doesn’t have to be poetic in and of itself, even if it could be, take for instance the examples of "Code Poetry" but does realize a poetic experience between computer, writer, and audience. An expressive medium that reflects the creativity and cultural context of the author, evoking emotion in many ways. Be that from the raw textual qualities, the relation between, or its output. Looking at code with this mindset opens us up to interact and engage more with the digital world we have created in a meaningful and determined fashion. So I like to conclude that yes, code is poetic.</p>
            <p class="section-title">References</p>
            1. Mark C. Marino. Critical Code Studies. MIT Press, 2020.
            2. Daniel Holden and Chris Kerr. Code Poetry.
        `)
    },
    {
        type: "program",
        title: "10 PRINT",
        run: function(canvasElement, windowId) {
            const ctx = canvasElement.getContext('2d');
            const characterSize = 10; // Size of each character
            let x = 0;
            let y = 0;
            let animationFrameId; // To store the animation frame ID for stopping

            // Set canvas resolution based on its current display size
            const setCanvasSize = () => {
                canvasElement.width = canvasElement.clientWidth;
                canvasElement.height = canvasElement.clientHeight;
                x = 0; // Reset drawing position on resize
                y = 0;
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear canvas
                ctx.fillStyle = "#0000AA"; // Blue background
                ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
            };

            setCanvasSize(); // Initial size setup
            window.addEventListener('resize', setCanvasSize); // Adjust on resize

            ctx.font = `${characterSize}px 'Monaco', monospace`; // Use monospace font for text
            ctx.fillStyle = "white"; // White text color
            ctx.textBaseline = "top"; // Align text to the top of the character box

            const drawCharacter = () => {
                // If the window containing the canvas is closed, stop the animation
                if (!document.body.contains(canvasElement)) {
                    cancelAnimationFrame(animationFrameId);
                    return;
                }

                // Randomly choose between '/' (slash) and '\' (backslash)
                const char = Math.random() < 0.5 ? '/' : '\\';

                // Draw the character
                ctx.fillText(char, x, y);

                // Move to the next position
                x += characterSize;
                if (x >= canvasElement.width) {
                    x = 0;
                    y += characterSize;
                }

                // If we reach the bottom, reset to top
                if (y >= canvasElement.height) {
                    x = 0;
                    y = 0;
                    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear for new maze
                    ctx.fillStyle = "#0000AA"; // Redraw blue background
                    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                }

                animationFrameId = requestAnimationFrame(drawCharacter);
                programAnimationFrames[windowId] = animationFrameId; // Store for cleanup
            };

            drawCharacter(); // Start the drawing loop

            // Return a cleanup function
            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', setCanvasSize);
            };
        }
    },
    {
        type: "program", // Using "program" type but logic will differ for a visualizer
        title: "Cubic Limit",
        run: function(canvasElement, windowId) {
            const ctx = canvasElement.getContext('2d');
            let animationFrameId;
            let time = 0;

            const cubeVertices = [
                [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
            ];

            const cubeEdges = [
                [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
                [4, 5], [5, 6], [6, 7], [7, 4], // Top face
                [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
            ];

            // Basic 3D to 2D projection
            function project(x, y, z, scale, centerX, centerY) {
                const perspective = 0.8; // Simple perspective factor
                const projectedX = centerX + (x * scale / (1 + z * perspective));
                const projectedY = centerY + (y * scale / (1 + z * perspective));
                return { x: projectedX, y: projectedY };
            }

            const drawCubicLimit = () => {
                if (!document.body.contains(canvasElement)) {
                    cancelAnimationFrame(animationFrameId);
                    return;
                }

                canvasElement.width = canvasElement.clientWidth;
                canvasElement.height = canvasElement.clientHeight;
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.fillStyle = "black"; // Background for the visualization
                ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

                const scale = Math.min(canvasElement.width, canvasElement.height) / 4;
                const centerX = canvasElement.width / 2;
                const centerY = canvasElement.height / 2;

                // Apply rotation
                const angleX = time * 0.0005;
                const angleY = time * 0.0008;

                // Apply a simple deformation based on time for the "limit" effect
                const deformationFactor = Math.sin(time * 0.001) * 0.2;

                const rotatedVertices = cubeVertices.map(v => {
                    let [x, y, z] = v;

                    // Rotate around X-axis
                    let tempY = y * Math.cos(angleX) - z * Math.sin(angleX);
                    let tempZ = y * Math.sin(angleX) + z * Math.cos(angleX);
                    y = tempY;
                    z = tempZ;

                    // Rotate around Y-axis
                    let tempX = x * Math.cos(angleY) + z * Math.sin(angleY);
                    tempZ = -x * Math.sin(angleY) + z * Math.cos(angleY);
                    x = tempX;
                    z = tempZ;

                    // Apply deformation
                    x += deformationFactor * v[0];
                    y += deformationFactor * v[1];
                    z += deformationFactor * v[2];

                    return [x, y, z];
                });

                const projected = rotatedVertices.map(v => project(v[0], v[1], v[2], scale, centerX, centerY));

                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;

                cubeEdges.forEach(edge => {
                    const p1 = projected[edge[0]];
                    const p2 = projected[edge[1]];
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                });

                time++;
                animationFrameId = requestAnimationFrame(drawCubicLimit);
                programAnimationFrames[windowId] = animationFrameId; // Store for cleanup
            };

            drawCubicLimit();

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    },
    {
        type: "launcher",
        title: "Library of Babel",
        url: "https://libraryofbabel.info/",
        iconText: "📚" // Book emoji for library
    }
];

// --- Dragging Functionality (for both windows and icons) ---
document.addEventListener('mousedown', (e) => {
    const titleBar = e.target.closest('.window-title-bar');
    const iconElement = e.target.closest('.desktop-icon');

    // Reset selected state for all icons
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.classList.remove('selected');
    });

    if (titleBar) {
        // Handle window dragging
        activeWindow = titleBar.closest('.window');
        activeIcon = null; // No icon active when dragging window
        highestZIndex++;
        activeWindow.style.zIndex = highestZIndex;

        initialX = e.clientX;
        initialY = e.clientY;
        offsetX = initialX - activeWindow.getBoundingClientRect().left;
        offsetY = initialY - activeWindow.getBoundingClientRect().top;

        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', stopDrag);
    } else if (iconElement) {
        // Handle icon dragging
        activeIcon = iconElement;
        activeIcon.classList.add('selected'); // Select the icon
        activeWindow = null; // No window active when dragging icon

        // Z-index for icons can be lower than windows but higher than other desktop elements
        activeIcon.style.zIndex = 50; // Temporarily higher for dragging

        initialX = e.clientX;
        initialY = e.clientY;
        offsetX = initialX - activeIcon.getBoundingClientRect().left;
        offsetY = initialY - activeIcon.getBoundingClientRect().top;

        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', stopDrag);
    } else {
        // Clicked outside a window or title bar or icon, hide all dropdowns
        hideAllDropdowns();
    }
});

function dragElement(e) {
    if (activeWindow) {
        // Dragging a window
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - activeWindow.offsetWidth;
        const maxY = window.innerHeight - activeWindow.offsetHeight;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY)); // 20px for menu bar

        activeWindow.style.left = `${newX}px`;
        activeWindow.style.top = `${newY}px`;
    } else if (activeIcon) {
        // Dragging an icon
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Constrain icon to desktop area (below menu bar)
        newX = Math.max(0, Math.min(newX, window.innerWidth - activeIcon.offsetWidth));
        newY = Math.max(20, Math.min(newY, window.innerHeight - activeIcon.offsetHeight));

        activeIcon.style.left = `${newX}px`;
        activeIcon.style.top = `${newY}px`;
    }
}

function stopDrag() {
    if (activeWindow) {
        activeWindow = null;
    }
    if (activeIcon) {
        activeIcon.style.zIndex = 10; // Reset icon Z-index
        activeIcon = null;
    }
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
}

// --- Window Close Functionality ---
// Store cleanup functions for programs when their windows are closed
const programCleanupFunctions = {};

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        // If it's a program window, call its cleanup function
        if (programCleanupFunctions[windowId]) {
            programCleanupFunctions[windowId](); // Execute cleanup
            delete programCleanupFunctions[windowId];
        }
        windowElement.remove(); // Remove the element from the DOM
    }
}

function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        const windowId = win.id;
        if (programCleanupFunctions[windowId]) {
            programCleanupFunctions[windowId]();
            delete programCleanupFunctions[windowId];
        }
        win.remove();
    });
    hideAllDropdowns(); // Hide menu after action
}

// --- Menu Bar and Dropdown Functionality ---
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const dropdown = item.querySelector('.dropdown-content');
        if (dropdown) {
            event.stopPropagation(); // Prevent document click from hiding immediately
            toggleMenu(dropdown);
        } else {
            // If it's a simple menu item (like About), just execute its action
            hideAllDropdowns();
        }
    });
});

function toggleMenu(targetDropdown) {
    // Hide all other open dropdowns first
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown !== targetDropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    });

    // Toggle the target dropdown
    if (targetDropdown) {
        targetDropdown.style.display = (targetDropdown.style.display === 'block') ? 'none' : 'block';
    }
}

function hideAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

// Hide dropdowns when clicking anywhere else on the document
document.addEventListener('click', hideAllDropdowns);


// --- Generic Message Modal ---
// Create the modal element once
const messageModal = document.createElement('div');
messageModal.id = 'messageModal';
messageModal.className = 'modal';
messageModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-close-button" onclick="closeModal('messageModal')"></div>
        <div class="modal-title" id="messageModalTitle"></div>
        <p id="messageModalText"></p>
        <button onclick="closeModal('messageModal')">OK</button>
    </div>
`;
document.body.appendChild(messageModal);

function showMessage(title, text) {
    document.getElementById('messageModalTitle').textContent = title;
    document.getElementById('messageModalText').textContent = text;
    openModal('messageModal');
}

// --- Modal Functionality ---
document.getElementById('about-menu').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent document click from hiding menu after opening modal
    hideAllDropdowns(); // Ensure menus are closed
    openModal('aboutModal');
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; // Use flex to center
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// --- Dynamic Window Creation for Desktop Items (Documents and Programs/Launchers) ---
let windowCounter = 0; // To ensure unique window IDs

function createWindow(item) {
    if (item.type === 'launcher') {
        window.open(item.url, '_blank');
        return; // Don't create a window for launchers
    }

    // Check if a window with this title is already open. If so, bring it to front.
    const existingWindow = document.querySelector(`.window[data-item-title="${item.title}"]`);
    if (existingWindow) {
        highestZIndex++;
        existingWindow.style.zIndex = highestZIndex;
        return; // Exit if already open
    }

    windowCounter++;
    const windowId = `item-window-${windowCounter}`;

    const windowDiv = document.createElement('div');
    windowDiv.id = windowId;
    windowDiv.className = 'window';
    windowDiv.setAttribute('data-item-title', item.title); // Store title for identification

    // Randomize initial position slightly around the center
    const initialLeft = (window.innerWidth / 2) - 300 + (Math.random() * 100 - 50);
    const initialTop = (window.innerHeight / 2) - 200 + (Math.random() * 100 - 50);
    windowDiv.style.left = `${initialLeft}px`;
    windowDiv.style.top = `${initialTop}px`;
    windowDiv.style.width = '600px'; // Default size
    windowDiv.style.height = '400px';

    highestZIndex++;
    windowDiv.style.zIndex = highestZIndex; // Bring new window to front

    let windowContentHTML = '';
    if (item.type === 'document') {
        windowContentHTML = `<div class="window-content">${item.content}</div>`;
    } else if (item.type === 'program') {
        windowContentHTML = `
            <div class="window-content" style="background-color: #0000AA; padding: 0;">
                <canvas class="program-canvas"></canvas>
            </div>
        `;
    }

    windowDiv.innerHTML = `
        <div class="window-title-bar">
            <span class="window-title">${item.title}.${item.type === 'document' ? 'rtf' : 'app'}</span>
            <div class="window-buttons">
                <div class="window-close-button" onclick="closeWindow('${windowId}')"></div>
            </div>
        </div>
        ${windowContentHTML}
    `;

    document.body.appendChild(windowDiv);

    // If it's a program, run it
    if (item.type === 'program' && typeof item.run === 'function') {
        const canvas = windowDiv.querySelector('.program-canvas');
        if (canvas) {
            // Pass windowId to the run function for cleanup management
            programCleanupFunctions[windowId] = item.run(canvas, windowId);
        }
    }

    // Add event listener to bring window to front on click
    windowDiv.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.window-title-bar')) { // Only bring to front if not clicking title bar (handled by global listener)
            highestZIndex++;
            windowDiv.style.zIndex = highestZIndex;
        }
    });
}

// --- Dynamic Icon Creation for Desktop Items ---
function createDesktopIcon(item) {
    const iconContainer = document.getElementById('desktop-icons-container');
    const iconDiv = document.createElement('div');
    iconDiv.className = 'desktop-icon';
    iconDiv.setAttribute('data-item-title', item.title); // Link to item

    let iconImageClass = '';
    let iconText = '';

    if (item.type === 'program') {
        iconImageClass = 'program-icon';
        iconText = '▶️'; // Play button emoji
    } else if (item.type === 'launcher') {
        iconImageClass = 'launcher-icon'; // A new class for launchers
        iconText = item.iconText || '🔗'; // Use specific icon or chain link emoji
    } else { // document
        iconText = '📄'; // Document emoji
    }

    iconDiv.innerHTML = `
        <div class="desktop-icon-image ${iconImageClass}">${iconText}</div>
        <div class="icon-label">${item.title}</div>
    `;

    // Position icons initially in a column on the left by default
    // Their final position will be set by arrangeIcons function
    iconDiv.style.left = `0px`; // Temp initial position
    iconDiv.style.top = `0px`;  // Temp initial position

    // Double click to open window/launch
    let clickTimeout = null;
    iconDiv.addEventListener('click', () => {
        if (clickTimeout === null) {
            // First click: select icon
            document.querySelectorAll('.desktop-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
            iconDiv.classList.add('selected');
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
            }, 300); // 300ms for double click
        } else {
            // Second click within timeout: open window/launch
            clearTimeout(clickTimeout);
            clickTimeout = null;
            createWindow(item); // This will handle program run or launcher open
            iconDiv.classList.remove('selected'); // Deselect after opening
        }
    });

    iconContainer.appendChild(iconDiv);
}

// --- Icon Arrangement Functions ---
function arrangeIcons(mode) {
    const icons = Array.from(document.querySelectorAll('.desktop-icon'));
    const iconWidth = 64 + (5 * 2); // Icon width + padding
    const iconHeight = 64 + 5 + 11 + (1 * 2) + 5; // Icon height + padding + label height + label padding + margin-bottom

    let currentX = 10; // Start X position, considering menu bar offset
    let currentY = 30; // Start Y position, considering menu bar height

    icons.forEach((icon, index) => {
        if (mode === 'list') {
            // Arrange as a list (single column)
            icon.style.left = `${currentX}px`;
            icon.style.top = `${currentY}px`;
            icon.style.width = '150px'; // Wider for list view label
            icon.querySelector('.icon-label').style.textAlign = 'left';
            currentY += 20; // Smaller spacing for list items
        } else { // 'icons' mode (default grid) or 'cleanup'
            // Arrange in a grid
            icon.style.width = '64px'; // Reset width
            icon.querySelector('.icon-label').style.textAlign = 'center';

            icon.style.left = `${currentX}px`;
            icon.style.top = `${currentY}px`;

            currentY += iconHeight;
            if (currentY + iconHeight > window.innerHeight) {
                currentY = 30; // Reset Y to top, move to next column
                currentX += iconWidth + 10; // Move to next column with some spacing
            }
        }
    });
}


// --- Initial Setup on Load ---
window.onload = function() {
    // Create desktop icons for all items
    desktopItems.forEach(item => {
        createDesktopIcon(item);
    });
    arrangeIcons('icons'); // Arrange icons on load
};

// Resize behavior for dynamically created windows (handles content height)
document.addEventListener('mouseup', () => {
    document.querySelectorAll('.window').forEach(win => {
        const contentDiv = win.querySelector('.window-content');
        if (contentDiv) {
            contentDiv.style.height = `calc(100% - 36px)`; // Recalculate content height after resize
        }
    });
});

// Re-arrange icons on window resize
window.addEventListener('resize', () => {
    arrangeIcons('icons'); // Re-arrange to grid on resize
});

// Hide icons when a window is dragged over them (visual hierarchy)
document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window')) {
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.style.pointerEvents = 'none'; // Disable clicking on icons when dragging window
        });
    }
});

document.addEventListener('mouseup', () => {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.style.pointerEvents = 'auto'; // Re-enable clicking on icons
    });
});

// --- Menu Bar Specific Functionality ---

// Edit Menu
document.getElementById('edit-menu').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu(document.getElementById('edit-dropdown'));
});
// Create the Edit dropdown content dynamically
const editDropdown = document.createElement('div');
editDropdown.id = 'edit-dropdown';
editDropdown.className = 'dropdown-content';
editDropdown.innerHTML = `
    <div class="menu-sub-item" onclick="handleEditAction('Undo')">Undo</div>
    <div class="menu-sub-item" onclick="handleEditAction('Cut')">Cut</div>
    <div class="menu-sub-item" onclick="handleEditAction('Copy')">Copy</div>
    <div class="menu-sub-item" onclick="handleEditAction('Paste')">Paste</div>
`;
document.getElementById('edit-menu').appendChild(editDropdown);

function handleEditAction(action) {
    showMessage('Edit Action', `${action} not implemented in this demo.`);
    hideAllDropdowns();
}

// View Menu
document.getElementById('view-menu').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu(document.getElementById('view-dropdown'));
});
// Create the View dropdown content dynamically
const viewDropdown = document.createElement('div');
viewDropdown.id = 'view-dropdown';
viewDropdown.className = 'dropdown-content';
viewDropdown.innerHTML = `
    <div class="menu-sub-item" onclick="arrangeIcons('icons')">as Icons</div>
    <div class="menu-sub-item" onclick="arrangeIcons('list')">as List</div>
    <div class="separator"></div>
    <div class="menu-sub-item" onclick="arrangeIcons('icons')">Clean Up Window</div>
`;
document.getElementById('view-menu').appendChild(viewDropdown);


// Special Menu
document.getElementById('special-menu').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu(document.getElementById('special-dropdown'));
});
// Create the Special dropdown content dynamically
const specialDropdown = document.createElement('div');
specialDropdown.id = 'special-dropdown';
specialDropdown.className = 'dropdown-content';
specialDropdown.innerHTML = `
    <div class="menu-sub-item" onclick="openThesisPdf()">View Thesis PDF</div>
    <div class="separator"></div>
    <div class="menu-sub-item" onclick="handleSystemAction('Restart')">Restart</div>
    <div class="menu-sub-item" onclick="handleSystemAction('Shut Down')">Shut Down</div>
`;
document.getElementById('special-menu').appendChild(specialDropdown);

function openThesisPdf() {
    // Path to the PDF file as specified by the user
    window.open('../../thesis=pdfs/#!binbash.pdf', '_blank');
    hideAllDropdowns(); // Hide the menu after opening the PDF
}

function handleSystemAction(action) {
    showMessage(action, `Are you sure you want to ${action.toLowerCase()}?`);
    hideAllDropdowns();
}

