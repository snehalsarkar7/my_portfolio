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
        color: 0x3f3f46,           // Subtle dark gray/indigo lines
        backgroundColor: 0x09090b, // Deep rich background
        points: 12.00,             // Number of dots
        maxDistance: 22.00,        // Line connection distance
        spacing: 18.00             // Spacing between dots
    });
});

console.log("Portfolio and Vanta Background Loaded Successfully!");

// 3. Hamburger menu toggle with body scroll lock
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) closeMenu();
        else openMenu();
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });
}

// 4. Scroll Animations using IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            setTimeout(() => {
                entry.target.style.transitionDelay = '0s';
            }, 800);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function() {
    const animateElements = document.querySelectorAll('.project-card, .skill-card, .soft-skill-item, .text-container, .image-container, .section-title, .contact-list .c-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${(index % 5) * 0.1}s`;
        observer.observe(el);
    });
});