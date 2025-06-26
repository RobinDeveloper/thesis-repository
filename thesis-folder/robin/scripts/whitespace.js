// Global variables for window and icon management
let activeWindow = null;
let activeIcon = null;
let initialX, initialY, offsetX, offsetY;
let highestZIndex = 999; // Starting Z-index for windows and icons (icons start lower)

// Store cleanup functions for programs when their windows are closed
const programCleanupFunctions = {};

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
        window.app.hideAllDropdowns();
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
    window.app.hideAllDropdowns(); // Hide menu after action
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
        // All program windows will have a message area and either a canvas or content div.
        // For Whitespace, the .program-canvas will not be used.
        windowContentHTML = `
            <div class="window-content" style="background-color: #0000AA; padding: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="program-message-area" style="color: white; font-size: 14px; padding: 5px; height: 20px; text-align: center; width: 100%; box-sizing: border-box;"></div>
                ${item.title !== 'Whitespace' ? '<canvas class="program-canvas" style="flex-grow: 1;"></canvas>' : ''}
            </div>
        `;
    }

    windowDiv.innerHTML = `
        <div class="window-title-bar">
            <span class="window-title">${item.title}.${item.type === 'document' ? 'rtf' : 'app'}</span>
            <div class="window-buttons">
                <div class="window-close-button" onclick="window.app.closeWindow('${windowId}')"></div>
            </div>
        </div>
        ${windowContentHTML}
    `;

    document.body.appendChild(windowDiv);

    // If it's a program, run it and pass the appropriate elements
    if (item.type === 'program' && typeof item.run === 'function') {
        const programMessageArea = windowDiv.querySelector('.program-message-area');
        const windowContentDiv = windowDiv.querySelector('.window-content'); // This is the main parent for all program content

        if (item.title === 'Whitespace') {
            // For Whitespace, pass the windowContentDiv itself as the primary container
            programCleanupFunctions[windowId] = item.run(windowContentDiv, windowId, programMessageArea);
        } else {
            // For canvas-based programs (like Battle Chess, 10 PRINT, Cubic Limit)
            const programCanvas = windowDiv.querySelector('.program-canvas');
            if (programCanvas) {
                programCleanupFunctions[windowId] = item.run(programCanvas, windowId, programMessageArea);
            } else {
                console.error(`Program '${item.title}' is a program type but no canvas element found.`);
            }
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
    // Expose functions to global scope
    window.app = {
        closeWindow,
        closeAllWindows,
        createWindow,
        createDesktopIcon,
        arrangeIcons,
        openModal: window.utils.openModal,
        closeModal: window.utils.closeModal,
        showMessage: window.utils.showMessage,
        hideAllDropdowns: window.utils.hideAllDropdowns,
        toggleMenu: window.utils.toggleMenu,
        handleEditAction,
        openThesisPdf,
        handleSystemAction
    };

    // Create desktop icons for all items
    // Defensive check for window.desktopItems
    if (window.desktopItems && Array.isArray(window.desktopItems)) {
        window.desktopItems.forEach(item => {
            window.app.createDesktopIcon(item);
        });
        window.app.arrangeIcons('icons'); // Arrange icons on load
    } else {
        console.error("window.desktopItems is not defined or not an array. Icons cannot be created.");
    }


    // --- Menu Bar and Dropdown Functionality ---
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const dropdown = item.querySelector('.dropdown-content');
            if (dropdown) {
                event.stopPropagation(); // Prevent document click from hiding immediately
                window.app.toggleMenu(dropdown);
            } else {
                window.app.hideAllDropdowns();
            }
        });
    });

    // Edit Menu
    document.getElementById('edit-menu').addEventListener('click', (event) => {
        event.stopPropagation();
        window.app.toggleMenu(document.getElementById('edit-dropdown'));
    });
    const editDropdown = document.createElement('div');
    editDropdown.id = 'edit-dropdown';
    editDropdown.className = 'dropdown-content';
    editDropdown.innerHTML = `
        <div class="menu-sub-item" onclick="window.app.handleEditAction('Undo')">Undo</div>
        <div class="menu-sub-item" onclick="window.app.handleEditAction('Cut')">Cut</div>
        <div class="menu-sub-item" onclick="window.app.handleEditAction('Copy')">Copy</div>
        <div class="menu-sub-item" onclick="window.app.handleEditAction('Paste')">Paste</div>
    `;
    document.getElementById('edit-menu').appendChild(editDropdown);

    function handleEditAction(action) {
        window.app.showMessage('Edit Action', `${action} not implemented in this demo.`);
        window.app.hideAllDropdowns();
    }

    // View Menu
    document.getElementById('view-menu').addEventListener('click', (event) => {
        event.stopPropagation();
        window.app.toggleMenu(document.getElementById('view-dropdown'));
    });
    const viewDropdown = document.createElement('div');
    viewDropdown.id = 'view-dropdown';
    viewDropdown.className = 'dropdown-content';
    viewDropdown.innerHTML = `
        <div class="menu-sub-item" onclick="window.app.arrangeIcons('icons')">as Icons</div>
        <div class="menu-sub-item" onclick="window.app.arrangeIcons('list')">as List</div>
        <div class="separator"></div>
        <div class="menu-sub-item" onclick="window.app.arrangeIcons('icons')">Clean Up Window</div>
    `;
    document.getElementById('view-menu').appendChild(viewDropdown);


    // Special Menu
    document.getElementById('special-menu').addEventListener('click', (event) => {
        event.stopPropagation();
        window.app.toggleMenu(document.getElementById('special-dropdown'));
    });
    const specialDropdown = document.createElement('div');
    specialDropdown.id = 'special-dropdown';
    specialDropdown.className = 'dropdown-content';
    specialDropdown.innerHTML = `
        <div class="menu-sub-item" onclick="window.app.openThesisPdf()">View Thesis PDF</div>
        <div class="separator"></div>
        <div class="menu-sub-item" onclick="window.app.handleSystemAction('Restart')">Restart</div>
        <div class="menu-sub-item" onclick="window.app.handleSystemAction('Shut Down')">Shut Down</div>
    `;
    document.getElementById('special-menu').appendChild(specialDropdown);

    function openThesisPdf() {
        // Path to the PDF file as specified by the user
        window.open('../../thesis=pdfs/#!binbash.pdf', '_blank');
        window.app.hideAllDropdowns(); // Hide the menu after opening the PDF
    }

    function handleSystemAction(action) {
        window.app.showMessage(action, `Are you sure you want to ${action.toLowerCase()}?`);
        window.app.hideAllDropdowns();
    }

    // --- Global Event Listeners ---
    // Hide dropdowns when clicking anywhere else on the document
    document.addEventListener('click', window.utils.hideAllDropdowns);

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
        window.app.arrangeIcons('icons'); // Re-arrange to grid on resize
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
};

