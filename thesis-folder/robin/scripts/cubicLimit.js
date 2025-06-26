// Logic for the "Cubic Limit" program by Manfred Mohr

// Namespace for programs to avoid global conflicts
window.programs = window.programs || {};

window.programs.cubicLimitRun = function(canvasElement, windowId) {
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
        // Store animation frame ID in a global map managed by main.js for cleanup
        window.programCleanupFunctions[windowId] = () => cancelAnimationFrame(animationFrameId);
    };

    drawCubicLimit();

    // Return a cleanup function for main.js to call if the window is closed
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
};

