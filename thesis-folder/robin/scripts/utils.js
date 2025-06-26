// Utility functions for the Mac OS-style interface

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

// Global Modal Functions
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

// Generic Message Modal
function showMessage(title, text) {
    document.getElementById('messageModalTitle').textContent = title;
    document.getElementById('messageModalText').textContent = text;
    openModal('messageModal');
}

// Menu and Dropdown Utilities
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

// Expose utilities to the global window object under `window.utils`
window.utils = {
    formatDocumentContent,
    openModal,
    closeModal,
    showMessage,
    toggleMenu,
    hideAllDropdowns
};

