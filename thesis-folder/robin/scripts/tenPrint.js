// Logic for the "10 PRINT" program

// Namespace for programs to avoid global conflicts
window.programs = window.programs || {};

window.programs.tenPrintRun = function(canvasElement, windowId) {
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
        // Store animation frame ID in a global map managed by main.js for cleanup
        window.programCleanupFunctions[windowId] = () => cancelAnimationFrame(animationFrameId);
    };

    drawCharacter(); // Start the drawing loop

    // Return a cleanup function for main.js to call if the window is closed
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', setCanvasSize);
    };
};

