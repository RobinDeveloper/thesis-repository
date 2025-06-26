// Logic for a simple 2D Chess Game on a Canvas

// Namespace for programs to avoid global conflicts
window.programs = window.programs || {};

window.programs.battleChessRun = function(canvasElement, windowId, messageAreaElement) {
    console.log(`[Battle Chess] Initializing for window: ${windowId}`);

    const ctx = canvasElement.getContext('2d');
    const boardSize = 8; // 8x8 chess board
    let squareSize = 0; // Will be calculated dynamically

    // Chessboard colors
    const lightSquareColor = '#F0D9B5'; // Cream
    const darkSquareColor = '#B58863';  // Brown

    // Unicode chess pieces
    const pieces = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟', // Black pieces
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'  // White pieces
    };

    // Initial chess board state (standard starting position)
    let board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    let selectedPiece = null; // Stores { piece: 'P', row: 6, col: 0 } of selected piece
    let currentPlayer = 'white'; // 'white' or 'black'

    // --- Message Display Function ---
    const updateMessage = (message) => {
        if (messageAreaElement) {
            messageAreaElement.textContent = message;
        }
    };

    // --- Drawing Functions ---
    const drawBoard = () => {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const color = (row + col) % 2 === 0 ? lightSquareColor : darkSquareColor;
                ctx.fillStyle = color;
                ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
            }
        }
    };

    const drawPieces = () => {
        ctx.font = `${squareSize * 0.7}px 'Georgia', 'Arial Unicode MS', 'Segoe UI Emoji', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const piece = board[row][col];
                if (piece) {
                    ctx.fillStyle = (piece === piece.toUpperCase()) ? 'white' : 'black';
                    ctx.fillText(pieces[piece], col * squareSize + squareSize / 2, row * squareSize + squareSize / 2);
                }
            }
        }

        // Draw highlight for the selected piece
        if (selectedPiece) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 4;
            ctx.strokeRect(selectedPiece.col * squareSize + ctx.lineWidth / 2,
                           selectedPiece.row * squareSize + ctx.lineWidth / 2,
                           squareSize - ctx.lineWidth,
                           squareSize - ctx.lineWidth);
        }
    };

    // --- Event Handling ---
    const handleCanvasClick = (event) => {
        const rect = canvasElement.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const clickedCol = Math.floor(mouseX / squareSize);
        const clickedRow = Math.floor(mouseY / squareSize);

        if (clickedRow < 0 || clickedRow >= boardSize || clickedCol < 0 || clickedCol >= boardSize) {
            return;
        }

        const clickedPiece = board[clickedRow][clickedCol];
        const clickedPieceColor = clickedPiece === clickedPiece.toUpperCase() ? 'white' : 'black';

        if (selectedPiece) {
            // A piece is already selected, now attempt to move it
            if (clickedRow === selectedPiece.row && clickedCol === selectedPiece.col) {
                // Clicked the same piece, deselect it
                selectedPiece = null;
                updateMessage(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn.`);
            } else {
                const selectedPieceColor = selectedPiece.piece === selectedPiece.piece.toUpperCase() ? 'white' : 'black';

                if (selectedPieceColor !== currentPlayer) {
                    updateMessage(`It's ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn!`);
                    selectedPiece = null; // Deselect if trying to move opponent's piece
                } else if (clickedPiece && selectedPieceColor === clickedPieceColor) {
                    // Clicked own piece, switch selection to this piece
                    selectedPiece = {
                        piece: clickedPiece,
                        row: clickedRow,
                        col: clickedCol
                    };
                    updateMessage(`Selected ${clickedPiece}.`);
                } else {
                    // Valid move (empty square or opponent's piece)
                    board[clickedRow][clickedCol] = selectedPiece.piece; // Move the piece
                    board[selectedPiece.row][selectedPiece.col] = '';    // Clear old position

                    selectedPiece = null; // Deselect after move
                    // Switch turn
                    currentPlayer = (currentPlayer === 'white') ? 'black' : 'white';
                    updateMessage(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn.`);
                }
            }
        } else {
            // No piece selected, try to select one
            if (clickedPiece) {
                const pieceColor = clickedPiece === clickedPiece.toUpperCase() ? 'white' : 'black';
                if (pieceColor === currentPlayer) {
                    selectedPiece = {
                        piece: clickedPiece,
                        row: clickedRow,
                        col: clickedCol
                    };
                    updateMessage(`Selected ${clickedPiece}.`);
                } else {
                    updateMessage(`It's ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn!`);
                }
            } else {
                updateMessage(`No piece to select.`);
            }
        }
        draw(); // Redraw the board after every click
    };

    // --- Canvas Setup and Drawing Loop ---
    const setCanvasSize = () => {
        const parent = canvasElement.parentElement;
        if (!parent) {
            console.error("[Battle Chess] Canvas parent element not found.");
            return;
        }

        // Calculate size based on parent's available space, accounting for message area
        const parentComputedStyle = getComputedStyle(parent);
        const parentWidth = parent.clientWidth - parseFloat(parentComputedStyle.paddingLeft) - parseFloat(parentComputedStyle.paddingRight);
        const parentHeight = parent.clientHeight - parseFloat(parentComputedStyle.paddingTop) - parseFloat(parentComputedStyle.paddingBottom);

        const messageAreaHeight = messageAreaElement ? messageAreaElement.offsetHeight : 0;
        const availableHeightForCanvas = parentHeight - messageAreaHeight;

        const size = Math.min(parentWidth, availableHeightForCanvas);
        canvasElement.width = size;
        canvasElement.height = size;
        squareSize = size / boardSize;

        // Apply flex-grow 1 to canvas in CSS, so it takes available space
        // For consistent sizing, we want to set both width and height explicitly here
        // The flexbox on the parent will handle centering.
        canvasElement.style.width = `${size}px`;
        canvasElement.style.height = `${size}px`;

        draw(); // Redraw on resize
    };

    let animationFrameId; // To store the animation frame ID for stopping

    const draw = () => {
        if (!document.body.contains(canvasElement)) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear canvas
        drawBoard();
        drawPieces();

        animationFrameId = requestAnimationFrame(draw);
        // The cleanup function is returned at the end of `battleChessRun`,
        // and main.js handles storing it. No need to store it here.
    };

    // Initial setup on program launch
    updateMessage(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn.`);
    setCanvasSize(); // Set initial size and draw board
    canvasElement.addEventListener('click', handleCanvasClick);

    // Use a MutationObserver to react to changes in the parent's size or message area height
    const resizeObserver = new ResizeObserver(() => {
        setCanvasSize();
    });
    if (canvasElement.parentElement) {
        resizeObserver.observe(canvasElement.parentElement);
    }
    if (messageAreaElement) {
        resizeObserver.observe(messageAreaElement);
    }

    draw(); // Start the drawing loop

    // Return a cleanup function for main.js to call if the window is closed
    return () => {
        cancelAnimationFrame(animationFrameId);
        canvasElement.removeEventListener('click', handleCanvasClick);
        resizeObserver.disconnect(); // Disconnect observer on cleanup
    };
};

