// 1. Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Vanta.js Animated Background Initialization
// This waits for the HTML to load, then starts the animation
document.addEventListener("DOMContentLoaded", function () {
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x2ecc71,           // Your vibrant green accent color
        backgroundColor: 0x1a1b20, // Your dark background color
        points: 12.00,             // Number of dots
        maxDistance: 22.00,        // Line connection distance
        spacing: 18.00             // Spacing between dots
    });
});

console.log("Portfolio and Vanta Background Loaded Successfully!");