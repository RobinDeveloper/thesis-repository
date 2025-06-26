// Logic for the "Library of Babel" launcher

// Namespace for programs to avoid global conflicts
window.programs = window.programs || {};

// This is a launcher type, so it doesn't have a 'run' function like programs
// Instead, its URL is directly used by createWindow in main.js
window.programs.libraryOfBabel = {
    type: "launcher",
    title: "Library of Babel",
    url: "https://libraryofbabel.info/",
    iconText: "📚" // Book emoji for library
};

