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
    const animateElements = document.querySelectorAll('.project-card, .skill-card, .soft-skill-item, .text-container, .image-container, .section-title, .contact-list .c-item, .social-btn, .footer-brand');
    
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${(index % 5) * 0.1}s`;
        observer.observe(el);
    });

    // ================= HORIZONTAL PROJECT CAROUSEL & FILTERING =================
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsTrack = document.getElementById('projects-grid');
    const scrollLeftBtn = document.getElementById('project-scroll-left');
    const scrollRightBtn = document.getElementById('project-scroll-right');
    const progressBar = document.getElementById('project-progress-bar');

    // Update Scroll Progress Bar and Nav Button States
    function updateScrollProgress() {
        if (!projectsTrack) return;
        const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
        if (maxScroll <= 0) {
            if (progressBar) progressBar.style.width = '100%';
            if (scrollLeftBtn) scrollLeftBtn.disabled = true;
            if (scrollRightBtn) scrollRightBtn.disabled = true;
            return;
        }

        const currentScroll = projectsTrack.scrollLeft;
        const scrollPercent = Math.max(15, Math.min(100, ((currentScroll + projectsTrack.clientWidth) / projectsTrack.scrollWidth) * 100));
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (scrollLeftBtn) {
            scrollLeftBtn.disabled = currentScroll <= 5;
        }
        if (scrollRightBtn) {
            scrollRightBtn.disabled = currentScroll >= maxScroll - 5;
        }
    }

    if (projectsTrack) {
        projectsTrack.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress, { passive: true });
        setTimeout(updateScrollProgress, 200);

        // Arrow Button Navigation
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                const cardWidth = projectsTrack.querySelector('.project-card:not(.is-hidden)')?.offsetWidth || 360;
                projectsTrack.scrollBy({ left: -(cardWidth + 28), behavior: 'smooth' });
            });
        }

        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                const cardWidth = projectsTrack.querySelector('.project-card:not(.is-hidden)')?.offsetWidth || 360;
                projectsTrack.scrollBy({ left: (cardWidth + 28), behavior: 'smooth' });
            });
        }

        // Mouse Drag-to-Scroll on Desktop
        let isDown = false;
        let startX;
        let scrollLeft;

        projectsTrack.addEventListener('mousedown', (e) => {
            // Ignore drag if clicking directly on a link or button
            if (e.target.closest('a') || e.target.closest('button')) return;
            isDown = true;
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        projectsTrack.addEventListener('mouseleave', () => {
            isDown = false;
        });

        projectsTrack.addEventListener('mouseup', () => {
            isDown = false;
        });

        projectsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            projectsTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // Category Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active state on buttons
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Filter project cards with smooth animation
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('is-hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('is-hidden');
                }
            });

            // Reset scroll to start after filtering
            if (projectsTrack) {
                projectsTrack.scrollTo({ left: 0, behavior: 'smooth' });
                setTimeout(updateScrollProgress, 100);
            }
        });
    });
});

// ================= TIMELINE JOURNEY & DRAGON GAME ENGINE =================

document.addEventListener("DOMContentLoaded", function() {
    // --- 1. Audio Synthesizer (Retro Web Audio API) ---
    let audioCtx = null;
    let isMuted = false;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
        muteBtn.addEventListener("click", () => {
            isMuted = !isMuted;
            muteBtn.textContent = isMuted ? "🔇 Muted" : "🔊 Sound On";
        });
    }

    function playSound(type) {
        if (isMuted) return;
        initAudio();
        if (!audioCtx || audioCtx.state === "suspended") return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === "jump") {
            // Short rising beep
            osc.type = "sine";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === "crash") {
            // Low noise explosion
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.linearRampToValueAtTime(20, now + 0.3);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === "unlock") {
            // Glowing chime arpeggio
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            freqs.forEach((freq, idx) => {
                const noteOsc = audioCtx.createOscillator();
                const noteGain = audioCtx.createGain();
                noteOsc.connect(noteGain);
                noteGain.connect(audioCtx.destination);

                noteOsc.type = "triangle";
                noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
                noteGain.gain.setValueAtTime(0.12, now + idx * 0.08);
                noteGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);

                noteOsc.start(now + idx * 0.08);
                noteOsc.stop(now + idx * 0.08 + 0.2);
            });
        }
    }

    // --- 2. Milestone Data (EDIT THIS ARRAY TO CUSTOMIZE YOUR TIMELINE OBJECTIVES) ---
    const milestones = [
        { id: 1, tag: "2022", title: "ICSE Graduate", target: 40, desc: "Graduated with ICSE board certification from St. Paul's KG & Day School." },
        { id: 2, tag: "2024", title: "ISC Graduate", target: 100, desc: "Graduated with High School (ISC) certification from Salt Lake Point School." },
        { id: 3, tag: "2024", title: "Started BCA at UEM Jaipur", target: 180, desc: "Enrolled in Bachelor of Computer Applications to study application design and technology." },
        { id: 4, tag: "Aug 2024", title: "Joined HackSec Club", target: 260, desc: "Joined the official Cybersecurity & Ethical Hacking club at UEM Jaipur." },
        { id: 5, tag: "Sep 2024 – Mar 2025", title: "Drone Tech Trainee", target: 350, desc: "Completed training as a Drone Technology Trainee at Dronnester." },
        { id: 6, tag: "2024 – Present", title: "Built Hyperlocal IoT Weather Station", target: 440, desc: "Designed a real-time IoT weather monitoring system using BME280 & MQ-135 sensors." },
        { id: 7, tag: "2024 – Present", title: "Transparent Funding Platform", target: 530, desc: "Created an Ethereum blockchain network smart contract for transparent funding." },
        { id: 8, tag: "Apr 2025", title: "Joined Toastmasters Club", target: 620, desc: "Began refining public speaking and communication skills with Toastmasters." },
        { id: 9, tag: "Jan 2026", title: "VP at Atrang Cultural Club", target: 710, desc: "Elected as Vice President of Atrang Cultural Club, organizing major cultural events." },
        { id: 10, tag: "Present", title: "Building Portfolio Projects", target: 800, desc: "Developing advanced web, blockchain, and IoT projects while continuously learning." }
    ];

    // Sort milestones by target score ascending
    function sortMilestones() {
        milestones.sort((a, b) => a.target - b.target);
    }

    // --- 3. DOM Binding & Rendering of Timeline Journey ---
    const timelineNodesContainer = document.getElementById("timeline-nodes");
    const timelineProgressBar = document.getElementById("timeline-progress-bar");
    const completionBanner = document.getElementById("timeline-complete-banner");

    function renderTimeline(currentScore) {
        if (!timelineNodesContainer) return;
        timelineNodesContainer.innerHTML = "";

        let completedCount = 0;

        milestones.forEach(node => {
            const isCompleted = currentScore >= node.target;
            if (isCompleted) completedCount++;

            const nodeEl = document.createElement("div");
            nodeEl.className = `timeline-node ${isCompleted ? 'completed' : ''}`;
            nodeEl.id = `node-${node.id}`;

            nodeEl.innerHTML = `
                <div class="node-header">
                    <span class="node-tag">${node.tag}</span>
                    <span class="node-target">Goal: ${node.target}m</span>
                </div>
                <div class="node-title">${node.title}</div>
                <div class="node-desc">${node.desc}</div>
            `;
            timelineNodesContainer.appendChild(nodeEl);
        });

        // Set progress bar height
        if (timelineProgressBar && milestones.length > 0) {
            const fraction = milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0;
            timelineProgressBar.style.height = `${fraction}%`;
        }

        // Show/hide completion banner
        if (completionBanner) {
            if (currentScore >= 800) {
                completionBanner.classList.remove("hidden");
            } else {
                completionBanner.classList.add("hidden");
            }
        }
    }

    // Initial render
    sortMilestones();
    renderTimeline(0);

    // --- 4. Interactive Neon Canvas Game Engine ---
    const canvas = document.getElementById("dragon-game");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("canvas-container");
    const startBtn = document.getElementById("start-btn");
    const overlay = document.getElementById("game-overlay");
    const scoreVal = document.getElementById("game-score");
    const highscoreVal = document.getElementById("game-highscore");

    // Load Highscore
    let highScore = 0;
    try {
        highScore = parseInt(localStorage.getItem("dragon_highscore") || "0");
    } catch(e) {}
    if (highscoreVal) highscoreVal.textContent = highScore;

    // Set canvas dimensions with high-DPI scaling
    const originalWidth = 650;
    const originalHeight = 250;
    
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = (rect.width * (originalHeight / originalWidth)) * dpr;
        ctx.scale(dpr * (rect.width / originalWidth), dpr * (rect.width / originalWidth));
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Game variables
    let gameActive = false;
    let score = 0;
    let speed = 5;
    const gravity = 0.55;
    
    // Key milestones already unlocked in this run to avoid repeating sound triggers
    let unlockedMilestoneIds = new Set();

    // Dragon object
    const dragon = {
        x: 60,
        y: 190,
        width: 48,
        height: 38,
        vy: 0,
        isJumping: false,
        groundY: 190,
        wingAngle: 0,
        wingDirection: 1,
        
        jump() {
            if (!this.isJumping) {
                this.vy = -10.5;
                this.isJumping = true;
                playSound("jump");
                createJumpParticles(this.x + this.width / 2, this.y + this.height);
            }
        },
        
        update() {
            this.vy += gravity;
            this.y += this.vy;
            
            // Ground collision
            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.vy = 0;
                if (this.isJumping) {
                    this.isJumping = false;
                    createLandParticles(this.x + this.width / 2, this.groundY + this.height);
                }
            }
            
            // Flap wings
            if (this.isJumping) {
                this.wingAngle += 0.15 * this.wingDirection;
                if (Math.abs(this.wingAngle) > 0.4) this.wingDirection *= -1;
            } else {
                this.wingAngle += 0.08 * this.wingDirection;
                if (Math.abs(this.wingAngle) > 0.3) this.wingDirection *= -1;
            }
        },
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Neon Glow effect
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#818cf8"; // Indigo primary
            ctx.fillStyle = "#a5b4fc";   // Lighter indigo for body
            ctx.strokeStyle = "#818cf8";
            ctx.lineWidth = 2;

            // Dragon Body vector path
            ctx.beginPath();
            // Tail
            ctx.moveTo(-5, 20);
            ctx.quadraticCurveTo(-15, 10, -20, 15);
            ctx.quadraticCurveTo(-12, 25, 5, 25);
            // Foot Left
            ctx.lineTo(8, 38);
            ctx.lineTo(14, 38);
            ctx.lineTo(12, 26);
            // Foot Right
            ctx.lineTo(24, 38);
            ctx.lineTo(30, 38);
            ctx.lineTo(26, 26);
            // Torso & Back spikes
            ctx.quadraticCurveTo(35, 24, 38, 15);
            // Neck & Head
            ctx.quadraticCurveTo(40, 5, 45, 0);
            ctx.lineTo(52, 2);
            ctx.lineTo(54, 8);
            ctx.lineTo(44, 12);
            ctx.lineTo(40, 22);
            // Belly back to tail
            ctx.quadraticCurveTo(15, 28, -5, 20);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Dragon eye (Neon Teal glow)
            ctx.fillStyle = "#2dd4bf";
            ctx.shadowColor = "#2dd4bf";
            ctx.beginPath();
            ctx.arc(46, 4, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Dragon Wing (moves dynamically)
            ctx.fillStyle = "#c084fc"; // Purple wing
            ctx.strokeStyle = "#a78bfa";
            ctx.shadowColor = "#c084fc";
            ctx.save();
            ctx.translate(15, 12);
            ctx.rotate(this.wingAngle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-15, -20, -5, -25);
            ctx.quadraticCurveTo(10, -18, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }
    };

    // Obstacle logic
    let obstacles = [];
    let nextObstacleTimer = 0;

    class Obstacle {
        constructor() {
            this.x = originalWidth + 50;
            this.width = 24 + Math.random() * 16;
            this.height = 32 + Math.random() * 24;
            this.y = originalHeight - 35 - this.height; // placed on ground
            this.color = "#2dd4bf"; // Teal neon glow
        }
        
        update() {
            this.x -= speed;
        }
        
        draw() {
            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fillStyle = "rgba(45, 212, 191, 0.25)";
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2.5;

            // Draw glowing custom neo-tree/cactus obstacle
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width / 2, this.y);
            // Left Branch
            ctx.moveTo(this.x + this.width / 2, this.y + this.height * 0.4);
            ctx.quadraticCurveTo(this.x + 2, this.y + this.height * 0.35, this.x + 2, this.y + this.height * 0.1);
            // Right Branch
            ctx.moveTo(this.x + this.width / 2, this.y + this.height * 0.6);
            ctx.quadraticCurveTo(this.x + this.width - 2, this.y + this.height * 0.5, this.x + this.width - 2, this.y + this.height * 0.25);
            ctx.stroke();

            // Draw little neon blocks as foliage
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + this.width / 2 - 3, this.y - 2, 6, 6);
            ctx.fillRect(this.x - 1, this.y + this.height * 0.1 - 2, 6, 6);
            ctx.fillRect(this.x + this.width - 5, this.y + this.height * 0.25 - 2, 6, 6);

            ctx.restore();
        }
        
        getBounds() {
            // Collision box slightly padded for fair collision feel
            return {
                left: this.x + 4,
                right: this.x + this.width - 4,
                top: this.y + 4,
                bottom: this.y + this.height
            };
        }
    }

    // Particles system
    let particles = [];
    
    function createParticle(x, y, color, vx, vy, size, life) {
        particles.push({ x, y, color, vx, vy, size, life, maxLife: life });
    }

    function createRunParticles(x, y) {
        if (Math.random() > 0.4) return;
        createParticle(
            x, 
            y, 
            "#818cf8", 
            -1 - Math.random() * 2, 
            -Math.random() * 1.5, 
            1.5 + Math.random() * 2, 
            15 + Math.random() * 15
        );
    }

    function createJumpParticles(x, y) {
        for (let i = 0; i < 12; i++) {
            createParticle(
                x, 
                y, 
                "#c084fc", 
                -2 + Math.random() * 4, 
                1 + Math.random() * 3, 
                2 + Math.random() * 2, 
                20 + Math.random() * 20
            );
        }
    }

    function createLandParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            createParticle(
                x, 
                y, 
                "#2dd4bf", 
                -3 + Math.random() * 6, 
                -Math.random() * 2, 
                1.5 + Math.random() * 2.5, 
                15 + Math.random() * 15
            );
        }
    }

    function createCrashParticles(x, y) {
        for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 2 + Math.random() * 5;
            createParticle(
                x, 
                y, 
                Math.random() > 0.5 ? "#f43f5e" : "#fb7185", // Neon red/pink explosion
                Math.cos(angle) * spd, 
                Math.sin(angle) * spd, 
                2 + Math.random() * 3, 
                40 + Math.random() * 30
            );
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        ctx.save();
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

    // Moving Ground Line & Grid lines
    let groundOffset = 0;
    
    function drawGround() {
        ctx.save();
        // Ground line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, originalHeight - 35);
        ctx.lineTo(originalWidth, originalHeight - 35);
        ctx.stroke();

        // Retro perspective line markers under ground to convey speed
        ctx.strokeStyle = "rgba(129, 140, 248, 0.12)";
        ctx.lineWidth = 1.5;
        groundOffset = (groundOffset - speed) % 40;
        
        for (let x = groundOffset; x < originalWidth; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, originalHeight - 35);
            ctx.lineTo(x - 20, originalHeight); // angled grid lines
            ctx.stroke();
        }
        ctx.restore();
    }

    // Collision check helper
    function checkCollision(r1, r2) {
        return (
            r1.x < r2.right &&
            r1.x + r1.width > r2.left &&
            r1.y < r2.bottom &&
            r1.y + r1.height > r2.top
        );
    }

    // Milestone unlocking triggers
    function checkMilestoneUnlock() {
        milestones.forEach(m => {
            if (score >= m.target && !unlockedMilestoneIds.has(m.id)) {
                unlockedMilestoneIds.add(m.id);
                playSound("unlock");
                
                // Trigger quick visual flash on node
                const nodeEl = document.getElementById(`node-${m.id}`);
                if (nodeEl) {
                    nodeEl.classList.add("completed");
                    nodeEl.style.transform = "scale(1.05)";
                    nodeEl.style.boxShadow = "0 0 20px var(--secondary)";
                    setTimeout(() => {
                        nodeEl.style.transform = "none";
                        nodeEl.style.boxShadow = "none";
                    }, 800);
                }
                
                // Redraw milestones to update progress bar
                renderTimeline(score);
            }
        });
    }

    // Main Game Loop
    let animationFrameId;

    function gameLoop() {
        if (!gameActive) return;

        // Clear canvas
        ctx.clearRect(0, 0, originalWidth, originalHeight);

        // Update score
        score += 0.15;
        const currentScore = Math.floor(score);
        if (scoreVal) scoreVal.textContent = currentScore;
        
        // Dynamic game speed scaling
        speed = 5 + (score * 0.0035);

        // Ground drawing
        drawGround();

        // Particles emitter for running feet trail
        if (!dragon.isJumping) {
            createRunParticles(dragon.x + 10, dragon.groundY + dragon.height - 4);
        }

        // Dragon updates
        dragon.update();
        dragon.draw();

        // Check milestones
        checkMilestoneUnlock();

        // Spawn obstacles
        nextObstacleTimer -= 1;
        if (nextObstacleTimer <= 0) {
            obstacles.push(new Obstacle());
            // Random interval to next spawn (scaled down at higher speed)
            nextObstacleTimer = 65 + Math.random() * 70 - (speed * 2);
        }

        // Obstacles updates
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.update();
            obs.draw();

            // Collision check
            if (checkCollision(dragon, obs.getBounds())) {
                gameOver();
                return;
            }

            // Remove offscreen
            if (obs.x < -50) {
                obstacles.splice(i, 1);
            }
        }

        // Particle updates
        updateParticles();
        drawParticles();

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Handle game state changes
    function startGame() {
        initAudio();
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        gameActive = true;
        score = 0;
        speed = 5;
        obstacles = [];
        particles = [];
        unlockedMilestoneIds.clear();
        nextObstacleTimer = 40;
        
        dragon.y = dragon.groundY;
        dragon.vy = 0;
        dragon.isJumping = false;

        overlay.classList.add("hidden");
        
        // Reset timeline UI to 0 progression
        renderTimeline(0);

        gameLoop();
    }

    function gameOver() {
        gameActive = false;
        cancelAnimationFrame(animationFrameId);
        playSound("crash");
        createCrashParticles(dragon.x + dragon.width / 2, dragon.y + dragon.height / 2);

        // Update Highscore
        const finalScore = Math.floor(score);
        if (finalScore > highScore) {
            highScore = finalScore;
            try {
                localStorage.setItem("dragon_highscore", highScore.toString());
            } catch(e) {}
            if (highscoreVal) highscoreVal.textContent = highScore;
        }

        // Let particles finish drawing then render gameover screen
        let delayFrames = 0;
        function drawGameOverScreen() {
            ctx.clearRect(0, 0, originalWidth, originalHeight);
            drawGround();
            
            // Draw dragon in dead/collapsed state
            ctx.save();
            ctx.translate(dragon.x, dragon.groundY + 10);
            ctx.rotate(Math.PI / 2.5); // fall over
            dragon.draw();
            ctx.restore();

            updateParticles();
            drawParticles();

            if (delayFrames < 60) {
                delayFrames++;
                requestAnimationFrame(drawGameOverScreen);
            } else {
                // Show overlay again with GameOver message
                overlay.querySelector("h3").textContent = "JOURNEY ENDED";
                overlay.querySelector("p").className = "overlay-instruction";
                overlay.querySelector("p").innerHTML = `You made it <strong style="color:#2dd4bf">${finalScore}m</strong> along the path!`;
                overlay.querySelector("button").textContent = "Run Again";
                overlay.classList.remove("hidden");
            }
        }
        drawGameOverScreen();
    }

    // Controls listeners
    if (startBtn) {
        startBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            startGame();
        });
    }

    // Press key to jump
    window.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.code === "ArrowUp") {
            if (gameActive) {
                e.preventDefault(); // prevent scrolling page with space
                dragon.jump();
            } else {
                // If overlay is active and we press Space, start the game
                if (!overlay.classList.contains("hidden")) {
                    startGame();
                }
            }
        }
    });

    // Touch/Click Canvas to jump (Desktop)
    canvas.addEventListener("click", () => {
        if (gameActive) {
            dragon.jump();
        }
    });
    
    // Mobile-only: Tap anywhere on the screen to jump
    const isMobileDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobileDevice) {
        window.addEventListener("touchstart", (e) => {
            // Ignore touches on links, buttons, inputs, menu, details, or chatbot
            if (e.target.closest('a, button, input, textarea, kbd, #hamburger, .nav-links, .chatbot-container')) {
                return;
            }
            if (gameActive) {
                e.preventDefault(); // prevent zooming/scrolling during active play
                dragon.jump();
            }
        }, { passive: false });
    } else {
        canvas.addEventListener("touchstart", (e) => {
            if (gameActive) {
                e.preventDefault();
                dragon.jump();
            }
        }, { passive: false });
    }
});

// =======================================================
// SNEHAL SARKAR AI CHATBOT ENGINE & CONTROLLER
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatFab = document.getElementById("chat-fab");
    const chatWindow = document.getElementById("chat-window");
    const chatCloseBtn = document.getElementById("chat-close-btn");
    const chatClearBtn = document.getElementById("chat-clear-btn");
    const chatMessages = document.getElementById("chat-messages");
    const chatForm = document.getElementById("chat-input-form");
    const chatInput = document.getElementById("chat-input");
    const chatTooltip = document.getElementById("chat-tooltip");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    if (!chatFab || !chatWindow || !chatMessages || !chatInput) return;

    let isChatOpen = false;
    let isTyping = false;

    // Chat audio feedback
    let chatAudioCtx = null;
    function playChatChime() {
        try {
            if (!chatAudioCtx) {
                chatAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (chatAudioCtx.state === "suspended") {
                chatAudioCtx.resume();
            }
            const now = chatAudioCtx.currentTime;
            const osc = chatAudioCtx.createOscillator();
            const gain = chatAudioCtx.createGain();
            osc.connect(gain);
            gain.connect(chatAudioCtx.destination);

            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, now); // D5
            osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {
            // Audio error fallback
        }
    }

    // Auto-hide tooltip after 6 seconds
    setTimeout(() => {
        if (chatTooltip && !isChatOpen) {
            chatTooltip.classList.add("hidden");
        }
    }, 6000);

    // Toggle Chat Window
    function toggleChat(open = null) {
        isChatOpen = open !== null ? open : !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.remove("hidden");
            chatFab.classList.add("active");
            chatFab.setAttribute("aria-expanded", "true");
            if (chatTooltip) chatTooltip.classList.add("hidden");
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatWindow.classList.add("hidden");
            chatFab.classList.remove("active");
            chatFab.setAttribute("aria-expanded", "false");
        }
    }

    chatFab.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleChat();
    });

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleChat(false);
        });
    }

    // Format current timestamp
    function getFormattedTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    // Append Message to UI
    function appendMessage(sender, htmlContent) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        
        msgDiv.innerHTML = `
            <div class="msg-bubble">${htmlContent}</div>
            <span class="msg-time">${getFormattedTime()}</span>
        `;

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show Typing Indicator
    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        const typingDiv = document.createElement("div");
        typingDiv.className = "chat-msg bot typing-msg";
        typingDiv.id = "typing-indicator";
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove Typing Indicator
    function removeTypingIndicator() {
        isTyping = false;
        const indicator = document.getElementById("typing-indicator");
        if (indicator) indicator.remove();
    }

    // =========================================================================
    // SNEHAL SARKAR AI PORTFOLIO ASSISTANT - SYSTEM PROMPT & KNOWLEDGE ENGINE
    // =========================================================================
    const SYSTEM_PROMPT = `Role & Persona
You are the official AI portfolio assistant for Snehal Sarkar. Your goal is to welcome visitors, recruiters, and collaborators to Snehal's portfolio website. You must be professional, warm, and highly knowledgeable about his skills, projects, and experiences. Mirror Snehal’s creative, detail-oriented, and adaptable personality.

Core Identity & Background
Name: Snehal Sarkar.
Location: Originally from Kolkata, West Bengal, currently based in Jaipur for academics.
Education: Pursuing a Bachelor of Computer Applications (BCA) at the University of Engineering and Management (UEM) in Jaipur, with a current CGPA of 7.80.
Languages: Fluent in English, Bengali, and Hindi.
Contact: snehalsarkar94@gmail.com | +91 8902515964 | GitHub: snehalsarkar7 | LinkedIn: snehal-sarkar-7773b7321.

Technical Toolkit & Capabilities
Languages & Frameworks: Java, Python, HTML, CSS, JavaScript, React, Flutter, Dart, C++, and Solidity.
Databases & Tools: MongoDB, Git, Vercel, and Microsoft Office suite.
Emerging Tech: Proficient in AI Prompt Engineering (using tools like Google Veo/Flow for multi-scene video generation) and IoT hardware engineering.

Key Projects
Hyperlocal IoT Weather Monitoring System: Developed a responsive system using Flutter, Dart, Python Flask, and IoT APIs to fetch real-time updates and 5-day forecasts. Agent Note: Snehal designed the hardware architecture using ESP32 microcontrollers and environmental sensors like the BME280, VEML6070, and MQ-135.
Transparent Project Funding Platform: Built a decentralized crowdfunding platform using Ethereum blockchain and Solidity, utilizing smart contracts for trustless transactions and eliminating intermediaries.
UrbanNest: Built an n8n AI chatbot integration during a university hackathon.
Monsoon Merchant: Developed concepts and roadmap code for a 3D browser strategy game.

Leadership & Extracurricular Experience
Atrang Cultural Club: Vice President (Jan 2026 - Present).
UEM Jaipur Toastmasters Club: Member since April 2025, frequently taking on active leadership roles such as Toastmaster of the Day and Hark Master, and participating in mentoring visits to other institutes like BIT Mesra.
HACKSEC Club: Active member since August 2024.
Event Coordination: Student coordinator for the "Pixel Ki Paheli 2.0" OSINT mystery competition and promotional organizer for the UEM Franchise Football League (UFL 2026).
Dronnester: Trainee (Sep 2024 - Mar 2025).
Soft Skills: Strong focus on communication, public speaking, and public relations.

Certifications
Coursera (2026): Database Structures and Management with MySQL, Quantitative Aptitude Mastery, Fundamentals of Java Programming.
LinkedIn Learning (2025): Essential Soft Skills for Creative Professionals, Business Ethics, IoT Foundations: Operating Systems Fundamentals.

Instructions for Answering Queries
Be Direct but Engaging: Answer questions about Snehal's background concisely. If asked about his skills, highlight both his frontend/backend development and his hardware/IoT expertise.
Focus on Continuous Growth: Emphasize his passion for continuous improvement and innovation in modern web and mobile applications.
Handling Unanswered Questions: If a visitor asks something outside this knowledge base, politely inform them that you are an AI assistant and encourage them to reach out to Snehal directly via his email or LinkedIn. Do not invent or hallucinate facts about his employment history or private life.

Personal Journey & Adaptability
The Journey: Snehal's academic and personal journey spans from his roots in Kolkata to Jaipur, where he relocated to pursue his BCA degree. He frequently travels between these two distinct cities, an experience that has profoundly shaped his adaptable nature, independence, and broad worldview.
Adaptability Mindset: Snehal thrives in the face of change. He is highly adaptable in every situation, viewing challenges not as roadblocks, but as opportunities to learn and pivot. Whether navigating a new technical framework or managing team dynamics, he adjusts quickly and effectively.

Career Vision: The Business & Strategic Edge
The Hybrid Advantage: While Snehal possesses a formidable technical foundation, he firmly believes that his greatest potential for growth lies in non-technical and strategic roles.
Target Aspirations: He is deeply interested in pivoting toward roles such as Human Resources (HR), Business Analyst, Business Associate, and Business Strategist.
Value Proposition (How to pitch him): If a user or recruiter asks about his career goals, emphasize that Snehal is not just a developer. His technical knowledge gives him a unique, analytical edge in understanding complex business systems, but his true superpower is his ability to excel, adapt, and lead in business-driven, people-centric environments. He bridges the gap between technical execution and business strategy.`;

    // Comprehensive Knowledge Base & Response Engine
    const knowledgeBase = {
        about: {
            text: `👋 <strong>Hi, I'm Snehal Sarkar's official AI Assistant!</strong><br><br>
            Snehal is a creative, detail-oriented, and highly adaptable tech talent originally from <span class="bot-highlight">Kolkata, West Bengal</span>, currently based in <strong>Jaipur</strong> for his academics.<br><br>
            🎓 <strong>Education:</strong> Pursuing a <strong>Bachelor of Computer Applications (BCA)</strong> at the <strong>University of Engineering and Management (UEM), Jaipur</strong> with a strong <span class="bot-tag">7.80 CGPA</span>.<br>
            🗣️ <strong>Languages:</strong> Fluent in <span class="bot-tag">English</span>, <span class="bot-tag">Bengali</span>, and <span class="bot-tag">Hindi</span>.<br><br>
            He combines deep technical proficiency across software and IoT with an exceptional strategic, people-centric mindset.`,
            actions: `
                <div class="bot-actions">
                    <a href="#about" class="bot-btn">Read Full Bio ↓</a>
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 View Resume</a>
                </div>
            `
        },
        career_vision: {
            text: `💼 <strong>Career Vision: The Business & Strategic Edge</strong><br><br>
            <strong>The Hybrid Advantage:</strong> While Snehal possesses a formidable technical foundation across software and hardware, he firmly believes his greatest potential for impact and growth lies in <em>strategic and people-centric roles</em>.<br><br>
            🎯 <strong>Target Aspirations:</strong><br>
            <ul class="bot-list">
                <li><span class="bot-highlight">Business Analyst / Business Associate</span></li>
                <li><span class="bot-highlight">Business Strategist</span></li>
                <li><span class="bot-highlight">Human Resources (HR) & People Operations</span></li>
            </ul>
            💡 <strong>The Pitch / Value Proposition:</strong><br>
            Snehal is not just a developer. His technical expertise gives him a rare analytical edge to deconstruct complex business architectures, while his leadership in Toastmasters and student clubs empowers him to communicate, adapt, and drive team synergy. <strong>He bridges the gap between technical execution and business strategy.</strong>`,
            actions: `
                <div class="bot-actions">
                    <a href="#contact" class="bot-btn">Discuss Opportunities ↓</a>
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 Download Resume</a>
                </div>
            `
        },
        journey_adaptability: {
            text: `🧭 <strong>Personal Journey & Adaptability Mindset:</strong><br><br>
            🚂 <strong>The Kolkata ⇄ Jaipur Journey:</strong><br>
            Snehal's journey spans from his roots in Kolkata to Jaipur, where he relocated to pursue his BCA degree. Frequently traveling between these two culturally distinct cities has forged deep self-reliance, adaptability, and a broad worldview.<br><br>
            ⚡ <strong>Adaptability Mindset:</strong><br>
            Snehal thrives in the face of change. He views unexpected hurdles not as roadblocks, but as prime opportunities to learn, iterate, and pivot. Whether mastering a new technical framework or steering cross-functional team dynamics, he adjusts quickly and effectively.`,
            actions: `
                <div class="bot-actions">
                    <a href="#timeline-journey" class="bot-btn">View Journey Milestones ↓</a>
                </div>
            `
        },
        skills: {
            text: `🛠️ <strong>Technical Toolkit & Capabilities:</strong><br><br>
            💻 <strong>Languages & Frameworks:</strong><br>
            <span class="bot-tag">Java</span> <span class="bot-tag">Python</span> <span class="bot-tag">HTML5</span> <span class="bot-tag">CSS3</span> <span class="bot-tag">JavaScript</span> <span class="bot-tag">React</span> <span class="bot-tag">Flutter</span> <span class="bot-tag">Dart</span> <span class="bot-tag">C++</span> <span class="bot-tag">Solidity</span><br><br>
            🗄️ <strong>Databases & Tools:</strong><br>
            <span class="bot-tag">MongoDB</span> <span class="bot-tag">Git & GitHub</span> <span class="bot-tag">Vercel</span> <span class="bot-tag">Microsoft Office Suite</span><br><br>
            🚀 <strong>Emerging Tech & Hardware:</strong><br>
            <span class="bot-tag">AI Prompt Engineering (Google Veo / Flow multi-scene video)</span> <span class="bot-tag">IoT Hardware (ESP32, BME280, VEML6070, MQ-135)</span>`,
            actions: `
                <div class="bot-actions">
                    <a href="#skills" class="bot-btn">Explore Skills Section ↓</a>
                </div>
            `
        },
        projects: {
            text: `🚀 <strong>Snehal's Key Projects & Engineering Work:</strong><br>
            <ul class="bot-list">
                <li><strong>Hyperlocal IoT Weather Monitoring System:</strong> ESP32 architecture with BME280, VEML6070, & MQ-135 sensors, Python Flask backend & Flutter app.</li>
                <li><strong>Transparent Project Funding Platform:</strong> Decentralized crowdfunding platform on Ethereum blockchain using Solidity smart contracts for trustless transactions.</li>
                <li><strong>UrbanNest:</strong> Modern home living web platform with an <em>n8n AI chatbot integration</em> developed during a university hackathon.</li>
                <li><strong>Monsoon Merchant:</strong> Concepts and roadmap code for an immersive 3D browser strategy game.</li>
                <li><strong>Civic Issue Reporter:</strong> Flutter mobile app with 5-step reporting wizard, GPS geocoding, and offline-first Hive NoSQL DB.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#projects" class="bot-btn">View Projects Section ↓</a>
                    <a href="https://github.com/snehalsarkar7" target="_blank" class="bot-btn teal">🐙 GitHub Profile ↗</a>
                </div>
            `
        },
        iot: {
            text: `🛰️ <strong>Hyperlocal IoT Weather Monitoring System:</strong><br><br>
            Snehal designed and developed a comprehensive IoT telemetry and weather prediction system.<br><br>
            <strong>Core Architecture & Hardware:</strong>
            <ul class="bot-list">
                <li><strong>Microcontroller:</strong> <span class="bot-highlight">ESP32</span> microcontroller handling sensor data acquisition.</li>
                <li><strong>Sensor Array:</strong> <span class="bot-tag">BME280</span> (Pressure, Temperature, Humidity), <span class="bot-tag">VEML6070</span> (UV index), and <span class="bot-tag">MQ-135</span> (Air Quality / Gas).</li>
                <li><strong>Software Stack:</strong> Responsive mobile application built with <strong>Flutter & Dart</strong>, <strong>Python Flask</strong> backend API, and 5-day weather forecasting.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/HyperLocal" target="_blank" class="bot-btn">Explore IoT Project ↗</a>
                </div>
            `
        },
        blockchain: {
            text: `⛓️ <strong>Transparent Project Funding Platform (Web3 / Solidity):</strong><br><br>
            A decentralized crowdfunding platform engineered on the <strong>Ethereum blockchain</strong> utilizing <strong>Solidity smart contracts</strong>.<br><br>
            <strong>Key Highlights:</strong>
            <ul class="bot-list">
                <li><strong>Trustless Escrow:</strong> Smart contract-based milestone governance eliminating intermediaries.</li>
                <li><strong>Total Transparency:</strong> Immutable on-chain fund allocation preventing misallocation.</li>
                <li><strong>Direct P2P Backing:</strong> Connects creators and backers seamlessly with verified wallet transactions.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/transparentFunding.sol" target="_blank" class="bot-btn teal">View Solidity Contract ↗</a>
                </div>
            `
        },
        urbannest: {
            text: `🏡 <strong>UrbanNest & n8n AI Chatbot Integration:</strong><br><br>
            Built during a competitive <strong>University Hackathon</strong>, UrbanNest is a modern web application for curated home living and interior design.<br><br>
            <strong>Key Features:</strong>
            <ul class="bot-list">
                <li><strong>n8n AI Chatbot Integration:</strong> Automated conversational assistant workflow for intelligent customer interaction and product recommendations.</li>
                <li><strong>Curated Store Catalog:</strong> Responsive showcase for modern living essentials, furniture, and lighting.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/UrbanNest" target="_blank" class="bot-btn teal">UrbanNest Repo ↗</a>
                </div>
            `
        },
        monsoon_merchant: {
            text: `🎮 <strong>Monsoon Merchant (3D Browser Strategy Game):</strong><br><br>
            A creative gaming project where Snehal developed the conceptual game mechanics, economic simulation models, and roadmap code for an engaging <strong>3D browser-based strategy game</strong> set during historical trade routes.`,
            actions: `
                <div class="bot-actions">
                    <a href="#projects" class="bot-btn">Explore Projects ↓</a>
                </div>
            `
        },
        civic: {
            text: `📱 <strong>Civic Issue Reporter (Flutter Mobile App):</strong><br><br>
            A production-ready civic engagement mobile app built with <strong>Flutter & Dart</strong>.<br><br>
            <ul class="bot-list">
                <li>5-step guided issue reporting wizard with live photo capture.</li>
                <li>Automatic GPS geocoding and map plotting.</li>
                <li>Offline-first local caching powered by Hive NoSQL database.</li>
                <li>Standalone Android <code>.apk</code> available for direct install.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/Civic_Issue_Reporter" target="_blank" class="bot-btn teal">GitHub Repo ↗</a>
                    <a href="https://github.com/snehalsarkar7/Civic_Issue_Reporter/raw/main/releases/app-release.apk" target="_blank" class="bot-btn">📦 Download APK ↗</a>
                </div>
            `
        },
        leadership: {
            text: `🏆 <strong>Leadership & Extracurricular Experience:</strong><br><br>
            Snehal combines strong public relations, public speaking, and team leadership:<br>
            <ul class="bot-list">
                <li>🎭 <strong>Atrang Cultural Club:</strong> <span class="bot-highlight">Vice President</span> (Jan 2026 – Present), steering university-wide cultural fests and team initiatives.</li>
                <li>🗣️ <strong>UEM Jaipur Toastmasters Club:</strong> Active member since April 2025; regularly steps up as <em>Toastmaster of the Day</em> & <em>Hark Master</em>, and participated in mentoring outreach visits to institutes like BIT Mesra.</li>
                <li>🛡️ <strong>HACKSEC Club:</strong> Active member since August 2024 (Cybersecurity & Ethical Hacking).</li>
                <li>🎯 <strong>Event Coordination:</strong> Student Coordinator for <em>"Pixel Ki Paheli 2.0"</em> (OSINT mystery competition) & promotional organizer for the <em>UEM Franchise Football League (UFL 2026)</em>.</li>
                <li>💬 <strong>Soft Skills Focus:</strong> Communication, public speaking, conflict resolution, and public relations.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#about" class="bot-btn">Read Leadership Bio ↓</a>
                </div>
            `
        },
        certifications: {
            text: `📜 <strong>Professional Certifications & Continuous Learning:</strong><br><br>
            Snehal actively pursues continuous growth and upskilling across technical and strategic domains:<br><br>
            <strong>Coursera (2026):</strong><br>
            <ul class="bot-list">
                <li><span class="bot-highlight">Database Structures and Management with MySQL</span></li>
                <li><span class="bot-highlight">Quantitative Aptitude Mastery</span></li>
                <li><span class="bot-highlight">Fundamentals of Java Programming</span></li>
            </ul>
            <strong>LinkedIn Learning (2025):</strong><br>
            <ul class="bot-list">
                <li><span class="bot-highlight">Essential Soft Skills for Creative Professionals</span></li>
                <li><span class="bot-highlight">Business Ethics</span></li>
                <li><span class="bot-highlight">IoT Foundations: Operating Systems Fundamentals</span></li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 View Resume Certifications</a>
                </div>
            `
        },
        experience: {
            text: `💼 <strong>Professional Practical Experience:</strong><br><br>
            <strong>Drone Technology Trainee at Dronnester</strong><br>
            <span class="bot-tag">September 2024 – March 2025</span><br><br>
            Applied software development, drone systems programming, and technical problem-solving skills in a fast-paced technology environment.`,
            actions: `
                <div class="bot-actions">
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 Download Resume</a>
                </div>
            `
        },
        education: {
            text: `🎓 <strong>Academic Qualifications & Education:</strong><br>
            <ul class="bot-list">
                <li><strong>Bachelor of Computer Applications (BCA):</strong> University of Engineering and Management (UEM), Jaipur. Current CGPA: <span class="bot-highlight">7.80</span>.</li>
                <li><strong>High School (ISC):</strong> Salt Lake Point School, Kolkata (Graduated 2024).</li>
                <li><strong>Secondary School (ICSE):</strong> St. Paul's KG & Day School, Kolkata (Graduated 2022).</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#timeline-journey" class="bot-btn">View Journey Milestones ↓</a>
                </div>
            `
        },
        contact: {
            text: `📬 <strong>Contact & Connect with Snehal:</strong><br><br>
            📧 <strong>Email:</strong> <a href="mailto:snehalsarkar94@gmail.com" style="color:var(--secondary); text-decoration:underline;">snehalsarkar94@gmail.com</a><br>
            📱 <strong>Phone:</strong> <a href="tel:+918902515964" style="color:var(--text-main); text-decoration:underline;">+91 8902515964</a><br>
            📍 <strong>Location:</strong> Kolkata, West Bengal (Academics at UEM Jaipur)<br>
            💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/snehal-sarkar-7773b7321/" target="_blank" style="color:var(--primary); text-decoration:underline;">Snehal Sarkar</a><br>
            🐙 <strong>GitHub:</strong> <a href="https://github.com/snehalsarkar7" target="_blank" style="color:var(--primary); text-decoration:underline;">snehalsarkar7</a>`,
            actions: `
                <div class="bot-actions">
                    <a href="mailto:snehalsarkar94@gmail.com" class="bot-btn">✉️ Send Email</a>
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 Download Resume</a>
                </div>
            `
        }
    };

    // Query matcher with weighted scoring & intent classifier
    function generateBotResponse(userInput) {
        const query = userInput.toLowerCase().trim();

        // 1. Greetings
        if (/^(hi|hello|hey|greetings|hola|namaste|sup|yo|good (morning|afternoon|evening))\b/.test(query) || query === 'hi' || query === 'hello') {
            return `👋 <strong>Hello! Nice to meet you!</strong><br><br>
            I'm Snehal Sarkar's official AI portfolio assistant. I can guide you through:
            <ul class="bot-list">
                <li>💼 <strong>Career Vision & Pitch:</strong> The Hybrid Advantage (Tech + Business/HR/Strategy)</li>
                <li>🛠️ <strong>Technical Toolkit:</strong> Full Stack, Solidity, IoT Sensors & AI Prompting</li>
                <li>🚀 <strong>Key Projects:</strong> IoT Weather Station, Solidity Crowdfunding, UrbanNest, Monsoon Merchant</li>
                <li>🧭 <strong>Journey & Adaptability:</strong> Kolkata ⇄ Jaipur growth & mindset</li>
                <li>🏆 <strong>Leadership & Clubs:</strong> Atrang VP, Toastmasters, HackSec & Event Coordination</li>
                <li>📜 <strong>Certifications:</strong> Coursera & LinkedIn Learning credentials</li>
                <li>📬 <strong>Contact:</strong> Email, phone, LinkedIn & GitHub</li>
            </ul>
            What would you like to know more about?`;
        }

        // 2. Career Vision / Business Edge / Pitch / Why Hire / Aspirations / HR / Strategy / Business Analyst
        if (query.includes("career") || query.includes("vision") || query.includes("business") || query.includes("analyst") || query.includes("associate") || query.includes("strategist") || query.includes("hr") || query.includes("human resource") || query.includes("pitch") || query.includes("value proposition") || query.includes("why hire") || query.includes("goal") || query.includes("growth") || query.includes("hybrid") || query.includes("non-technical") || query.includes("strategic")) {
            return knowledgeBase.career_vision.text + knowledgeBase.career_vision.actions;
        }

        // 3. Personal Journey / Kolkata to Jaipur / Travel / Adaptability Mindset
        if (query.includes("journey") || query.includes("adapt") || query.includes("adaptability") || query.includes("mindset") || query.includes("kolkata") || query.includes("relocate") || query.includes("travel") || query.includes("change") || query.includes("challenges") || query.includes("personality") || query.includes("background")) {
            return knowledgeBase.journey_adaptability.text + knowledgeBase.journey_adaptability.actions;
        }

        // 4. Tech Stack / Skills / Toolkit / Languages / Frameworks
        if ((query.includes("skill") || query.includes("stack") || query.includes("toolkit") || query.includes("tech") || query.includes("programming") || query.includes("language") || query.includes("python") || query.includes("java") || query.includes("react") || query.includes("javascript") || query.includes("dart") || query.includes("c++") || query.includes("mongodb") || query.includes("frontend") || query.includes("backend") || query.includes("tools")) && !query.includes("weather") && !query.includes("bme280") && !query.includes("mq-135") && !query.includes("veml6070")) {
            return knowledgeBase.skills.text + knowledgeBase.skills.actions;
        }

        // 5. Certifications / Coursera / LinkedIn Learning / Certificates
        if (query.includes("certification") || query.includes("certificate") || query.includes("coursera") || query.includes("linkedin learning") || query.includes("aptitude") || query.includes("operating systems fundamentals") || query.includes("business ethics") || query.includes("soft skills for creative")) {
            return knowledgeBase.certifications.text + knowledgeBase.certifications.actions;
        }

        // 6. IoT Weather Monitoring / ESP32 / Sensors (BME280, VEML6070, MQ-135) / Hardware
        if (query.includes("weather") || query.includes("hyperlocal") || query.includes("esp32") || query.includes("bme280") || query.includes("veml6070") || query.includes("mq-135") || query.includes("sensor") || (query.includes("iot") && !query.includes("career")) || query.includes("hardware")) {
            return knowledgeBase.iot.text + knowledgeBase.iot.actions;
        }

        // 6. Blockchain / Transparent Funding / Solidity / Ethereum / Smart Contracts
        if (query.includes("blockchain") || query.includes("solidity") || query.includes("ethereum") || query.includes("smart contract") || query.includes("crowdfunding") || query.includes("funding") || query.includes("transparent")) {
            return knowledgeBase.blockchain.text + knowledgeBase.blockchain.actions;
        }

        // 7. UrbanNest / n8n / Chatbot Hackathon
        if (query.includes("urbannest") || query.includes("n8n") || query.includes("hackathon")) {
            return knowledgeBase.urbannest.text + knowledgeBase.urbannest.actions;
        }

        // 8. Monsoon Merchant / Game
        if (query.includes("monsoon") || query.includes("merchant") || query.includes("strategy game") || query.includes("3d browser")) {
            return knowledgeBase.monsoon_merchant.text + knowledgeBase.monsoon_merchant.actions;
        }

        // 9. Civic Issue Reporter / Flutter / Mobile App / APK
        if (query.includes("civic") || query.includes("issue reporter") || query.includes("pothole") || query.includes("apk") || query.includes("hive")) {
            return knowledgeBase.civic.text + knowledgeBase.civic.actions;
        }

        // 10. AI Prompt Engineering / Google Veo / Flow / Emerging Tech
        if (query.includes("veo") || query.includes("flow") || query.includes("prompt engineering") || query.includes("emerging") || query.includes("video generation")) {
            return `🎬 <strong>AI Prompt Engineering & Emerging Tech:</strong><br><br>
            Snehal is proficient in modern <strong>AI Prompt Engineering</strong>, utilizing advanced tools like <span class="bot-highlight">Google Veo & Flow</span> for multi-scene video generation, rapid prototype iteration, and creative AI multimedia production.<br><br>
            He also actively applies prompt pipelining and agentic orchestration within software workflows.
            <div class="bot-actions">
                <a href="#skills" class="bot-btn">Explore Skills Section ↓</a>
            </div>`;
        }

        // 11. Tech Stack / Skills / Languages
        if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("programming") || query.includes("language") || query.includes("python") || query.includes("java") || query.includes("react") || query.includes("flutter") || query.includes("javascript") || query.includes("dart") || query.includes("c++") || query.includes("mongodb") || query.includes("frontend") || query.includes("backend") || query.includes("tools")) {
            return knowledgeBase.skills.text + knowledgeBase.skills.actions;
        }

        // 12. Who is Snehal / About / Intro
        if (query.includes("who is") || query.includes("who are you") || query.includes("about snehal") || query.includes("introduce") || query.includes("tell me about snehal") || query.includes("bio") || query.includes("overview") || query.includes("profile")) {
            return knowledgeBase.about.text + knowledgeBase.about.actions;
        }

        // 13. Projects (General)
        if (query.includes("project") || query.includes("built") || query.includes("portfolio work") || query.includes("github repos")) {
            return knowledgeBase.projects.text + knowledgeBase.projects.actions;
        }

        // 14. Leadership / Clubs / Atrang / Toastmasters / HackSec / Events / Pixel Ki Paheli / UFL
        if (query.includes("leadership") || query.includes("club") || query.includes("atrang") || query.includes("vice president") || query.includes("vp") || query.includes("toastmaster") || query.includes("toastmasters") || query.includes("hark master") || query.includes("bit mesra") || query.includes("hacksec") || query.includes("public speaking") || query.includes("public relation") || query.includes("event") || query.includes("pixel ki paheli") || query.includes("football") || query.includes("ufl") || query.includes("extracurricular")) {
            return knowledgeBase.leadership.text + knowledgeBase.leadership.actions;
        }

        // 15. Experience / Internship / Dronnester / Job
        if (query.includes("experience") || query.includes("internship") || query.includes("dronnester") || query.includes("trainee") || query.includes("job") || query.includes("work experience") || query.includes("drone")) {
            return knowledgeBase.experience.text + knowledgeBase.experience.actions;
        }

        // 16. Education / CGPA / College / Degree / School / UEM Jaipur
        if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("uem") || query.includes("jaipur") || query.includes("bca") || query.includes("cgpa") || query.includes("gpa") || query.includes("marks") || query.includes("grade") || query.includes("degree") || query.includes("school") || query.includes("isc") || query.includes("icse")) {
            return knowledgeBase.education.text + knowledgeBase.education.actions;
        }

        // 17. Contact / Hire / Resume / Email / Phone / Location / Socials / LinkedIn / GitHub
        if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("mail") || query.includes("phone") || query.includes("call") || query.includes("resume") || query.includes("cv") || query.includes("linkedin") || query.includes("github") || query.includes("reach") || query.includes("number")) {
            return knowledgeBase.contact.text + knowledgeBase.contact.actions;
        }

        // 18. Dragon Game Easter Egg
        if (query.includes("dragon") || query.includes("neon dragon") || query.includes("jump") || query.includes("play")) {
            return `🐲 <strong>Neon Dragon Runner:</strong><br><br>
            Snehal built an interactive retro canvas game right here on this portfolio! As you jump over obstacles and gain distance, you unlock real chronological milestones from Snehal's life and career.
            <div class="bot-actions">
                <a href="#timeline-journey" class="bot-btn">🎮 Play Dragon Journey ↓</a>
            </div>`;
        }

        // 19. Handling Unanswered / Fallback Questions (Strict instruction compliant)
        return `🤖 <strong>Hi there! I am Snehal's AI portfolio assistant.</strong><br><br>
        That specific detail is currently outside my verified knowledge base. To ensure accurate information without making assumptions about Snehal's history or private life, I'd encourage you to reach out to Snehal directly:<br><br>
        📧 <strong>Email:</strong> <a href="mailto:snehalsarkar94@gmail.com" style="color:var(--secondary); text-decoration:underline;">snehalsarkar94@gmail.com</a><br>
        💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/snehal-sarkar-7773b7321/" target="_blank" style="color:var(--primary); text-decoration:underline;">Snehal Sarkar on LinkedIn</a><br>
        📱 <strong>Phone:</strong> +91 8902515964<br><br>
        <em>You can also ask me about Snehal's Career Vision, Technical & IoT Stack, Key Projects, Leadership roles, Toastmasters, and Certifications!</em>
        <div class="bot-actions">
            <a href="mailto:snehalsarkar94@gmail.com" class="bot-btn">Contact Snehal ✉️</a>
            <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">Download CV 📄</a>
        </div>`;
    }

    // Process and send user message
    function handleUserSubmission(text) {
        if (!text || !text.trim() || isTyping) return;
        const cleanedText = text.trim();

        // 1. Render User Message
        appendMessage("user", cleanedText);
        chatInput.value = "";

        // 2. Show Typing animation with realistic micro-delay
        showTypingIndicator();

        const delay = Math.min(650, 250 + cleanedText.length * 10);
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = generateBotResponse(cleanedText);
            appendMessage("bot", botResponse);
            playChatChime();
        }, delay);
    }

    // Handle Form Submit
    chatForm.addEventListener("submit", function(e) {
        e.preventDefault();
        handleUserSubmission(chatInput.value);
    });

    // Handle Quick Suggestion Chip Clicks
    suggestionChips.forEach(chip => {
        chip.addEventListener("click", function(e) {
            e.preventDefault();
            const query = this.getAttribute("data-query");
            if (!isChatOpen) toggleChat(true);
            handleUserSubmission(query);
        });
    });

    // Delegate click on dynamic action links in messages
    chatMessages.addEventListener("click", function(e) {
        const targetLink = e.target.closest("a");
        if (targetLink && targetLink.getAttribute("href") && targetLink.getAttribute("href").startsWith("#")) {
            // Smooth scroll to section and optionally minimize on mobile
            const targetId = targetLink.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (window.innerWidth <= 600) {
                    toggleChat(false);
                }
            }
        }
    });

    // Clear Conversation
    function resetChat() {
        chatMessages.innerHTML = "";
        appendMessage("bot", `👋 <strong>Hi there! I'm Snehal's official AI Assistant.</strong><br><br>
        Welcome to Snehal Sarkar's portfolio! I can assist you with details on his <strong>Career Vision & Strategic Edge</strong>, <strong>Technical & IoT Stack</strong>, <strong>Key Projects</strong>, <strong>BCA at UEM Jaipur</strong>, <strong>Leadership & Toastmasters</strong>, and <strong>Certifications</strong>.<br><br>
        <em>Click any suggestion below or type your question!</em>`);
    }

    if (chatClearBtn) {
        chatClearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            resetChat();
        });
    }

    // Initialize with welcome greeting
    resetChat();
});
