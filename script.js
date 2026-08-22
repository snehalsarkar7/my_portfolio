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

    // Comprehensive Knowledge Base & Response Engine
    const knowledgeBase = {
        about: {
            text: `👋 <strong>Hi, I'm Snehal Sarkar's AI Assistant!</strong><br><br>
            Snehal is a detail-oriented technology student based in <span class="bot-highlight">Kolkata, West Bengal</span>, currently pursuing a <strong>Bachelor of Computer Applications (BCA)</strong> at the <strong>University of Engineering and Management (UEM), Jaipur</strong>.<br><br>
            Maintaining a strong <span class="bot-tag">7.80 CGPA</span>, he is highly adaptable, creative, and actively applies a diverse technical toolkit to drive efficiency and innovation in competitive environments.`,
            actions: `
                <div class="bot-actions">
                    <a href="#about" class="bot-btn">Read Full Bio ↓</a>
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">📄 View Resume</a>
                </div>
            `
        },
        skills: {
            text: `🛠️ <strong>Snehal's Technical & Professional Stack:</strong><br><br>
            <strong>Robust Development:</strong><br>
            <span class="bot-tag">Java</span> <span class="bot-tag">Python</span> <span class="bot-tag">HTML5</span> <span class="bot-tag">CSS3</span> <span class="bot-tag">JavaScript</span> <span class="bot-tag">React</span> <span class="bot-tag">Flutter</span> <span class="bot-tag">MongoDB</span><br><br>
            <strong>Specialized & Hardware Skills:</strong><br>
            <span class="bot-tag">Ethereum & Solidity</span> <span class="bot-tag">IoT & ESP32</span> <span class="bot-tag">Environmental Sensors (BME280, MQ-135)</span><br><br>
            <strong>Creative & Digital Skills:</strong><br>
            <span class="bot-tag">Multimedia Editing</span> <span class="bot-tag">Microsoft Office Suite</span> <span class="bot-tag">AI Text-to-Video Tools</span>`,
            actions: `
                <div class="bot-actions">
                    <a href="#skills" class="bot-btn">View Skills Section ↓</a>
                </div>
            `
        },
        projects: {
            text: `🚀 <strong>Featured Projects & Engineering Work:</strong><br>
            <ul class="bot-list">
                <li><strong>Hyperlocal IoT Weather System:</strong> Real-time environmental monitoring utilizing ESP32 microcontrollers, BME280 & MQ-135 sensors, and API integration for advanced conference research.</li>
                <li><strong>Transparent Project Funding:</strong> Web3 crowdfunding platform on Ethereum using Solidity smart contracts for trustless, transparent community funding.</li>
                <li><strong>Digital Twin Smart Contract:</strong> Blockchain-backed decentralized tracking and digital twin asset validation.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/HyperLocal" target="_blank" class="bot-btn">🛰️ Weather IoT Repo</a>
                    <a href="https://github.com/snehalsarkar7/transparentFunding.sol" target="_blank" class="bot-btn teal">⛓️ Blockchain Repo</a>
                    <a href="#projects" class="bot-btn">View All Projects ↓</a>
                </div>
            `
        },
        blockchain: {
            text: `⛓️ <strong>Web3 & Blockchain Innovations:</strong><br><br>
            Snehal developed a <strong>Transparent Project Funding Platform</strong> using <span class="bot-tag">Ethereum</span> and <span class="bot-tag">Solidity</span>.<br><br>
            This system enables secure, decentralized, and trustless crowdfunding through smart contracts, ensuring absolute transparency in fund disbursement and project milestone accountability.`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/transparentFunding.sol" target="_blank" class="bot-btn teal">View Solidity Code ↗</a>
                </div>
            `
        },
        iot: {
            text: `🛰️ <strong>IoT & Hardware Engineering:</strong><br><br>
            Snehal engineered a <strong>Hyperlocal IoT Weather Monitoring System</strong> featuring real-time telemetry updates and API integration.<br><br>
            <strong>Hardware integration highlights:</strong><br>
            <ul class="bot-list">
                <li>Configuring <span class="bot-highlight">ESP32 microcontrollers</span>.</li>
                <li>Deploying environmental sensors (<span class="bot-tag">BME280</span> for pressure/humidity/temp and <span class="bot-tag">MQ-135</span> for air quality).</li>
                <li>Conducted hands-on experimental research for international conferences.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="https://github.com/snehalsarkar7/HyperLocal" target="_blank" class="bot-btn">Check IoT GitHub ↗</a>
                </div>
            `
        },
        experience: {
            text: `💼 <strong>Professional Practical Experience:</strong><br><br>
            <strong>Drone Technology Trainee at Dronnester</strong><br>
            <span class="bot-tag">September 2024 – March 2025</span><br><br>
            Applied software development, drone systems programming, and technical problem-solving skills in a fast-paced professional environment.`,
            actions: `
                <div class="bot-actions">
                    <a href="assets/SNEHAL_SARKAR_Resume.pdf" target="_blank" class="bot-btn teal">Download CV / Experience PDF</a>
                </div>
            `
        },
        education: {
            text: `🎓 <strong>Academic Qualifications & Education:</strong><br>
            <ul class="bot-list">
                <li><strong>Bachelor of Computer Applications (BCA):</strong> University of Engineering and Management (UEM), Jaipur. Currently maintaining a strong <span class="bot-highlight">7.80 CGPA</span>.</li>
                <li><strong>High School (ISC):</strong> Salt Lake Point School (Graduated 2024).</li>
                <li><strong>Secondary School (ICSE):</strong> St. Paul's KG & Day School (Graduated 2022).</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#timeline-journey" class="bot-btn">View Journey Milestones ↓</a>
                </div>
            `
        },
        leadership: {
            text: `🏆 <strong>Executive Leadership & Community Engagement:</strong><br>
            <ul class="bot-list">
                <li><strong>Vice President, Atrang Cultural Club:</strong> Guiding major campus cultural initiatives and festivals since January 2026.</li>
                <li><strong>UEM Jaipur Toastmasters Club:</strong> Active speaker refining communication, public speaking, and PR skills.</li>
                <li><strong>Event Organizer & Coordinator:</strong> Spearheaded the <em>"Pixel Ki Paheli 2.0"</em> TechFest competition and managed the campus-wide <em>UEM Franchise Football League</em>.</li>
                <li><strong>HACKSEC Club Member:</strong> Active member of the official Cybersecurity & Ethical Hacking club.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#skills" class="bot-btn teal">See Soft Skills & Leadership</a>
                </div>
            `
        },
        personal: {
            text: `🌟 <strong>Personal Mindset & Background:</strong><br><br>
            Beyond coding and leadership, Snehal is defined by a continuous learning mindset and strong personal values:<br>
            <ul class="bot-list">
                <li><strong>Languages:</strong> Fluent in <span class="bot-tag">English</span>, <span class="bot-tag">Bengali</span>, and <span class="bot-tag">Hindi</span>.</li>
                <li><strong>Interests:</strong> Mentoring his younger brother with school assignments, exploring emerging AI text-to-video tools, and troubleshooting hardware setups.</li>
                <li><strong>Philosophy:</strong> Blending rigorous technical pursuit with community leadership and creative curiosity.</li>
            </ul>`,
            actions: `
                <div class="bot-actions">
                    <a href="#contact" class="bot-btn">Get in Touch ↓</a>
                </div>
            `
        },
        contact: {
            text: `📬 <strong>Contact & Connect with Snehal:</strong><br><br>
            📧 <strong>Email:</strong> <a href="mailto:snehalsarkar94@gmail.com" style="color:var(--secondary); text-decoration:underline;">snehalsarkar94@gmail.com</a><br>
            📱 <strong>Phone:</strong> +91 8902515964<br>
            📍 <strong>Location:</strong> Kolkata, West Bengal (UEM Jaipur)<br>
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
            I am Snehal Sarkar's interactive AI portfolio assistant. I can give you detailed information regarding Snehal's:
            <ul class="bot-list">
                <li>🎓 Education & CGPA at UEM Jaipur</li>
                <li>🛠️ Technical Skills & Full Stack Web/App stack</li>
                <li>🚀 IoT, Web3 & Blockchain Projects</li>
                <li>💼 Trainee Experience at Dronnester</li>
                <li>🏆 Leadership Roles (Atrang VP, Toastmasters, HackSec)</li>
                <li>📬 Contact & Hiring Information</li>
            </ul>
            What would you like to explore?`;
        }

        // 2. Who is Snehal / About / Intro
        if (query.includes("who is") || query.includes("who are you") || query.includes("about snehal") || query.includes("introduce") || query.includes("tell me about") || query.includes("bio") || query.includes("overview") || query.includes("profile")) {
            return knowledgeBase.about.text + knowledgeBase.about.actions;
        }

        // 3. Tech Stack / Skills / Languages
        if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("programming") || query.includes("language") || query.includes("python") || query.includes("java") || query.includes("react") || query.includes("flutter") || query.includes("javascript") || query.includes("mongodb") || query.includes("frontend") || query.includes("backend") || query.includes("tools")) {
            return knowledgeBase.skills.text + knowledgeBase.skills.actions;
        }

        // 4. Projects (General)
        if ((query.includes("project") || query.includes("built") || query.includes("portfolio") || query.includes("work")) && !query.includes("blockchain") && !query.includes("iot") && !query.includes("weather")) {
            return knowledgeBase.projects.text + knowledgeBase.projects.actions;
        }

        // 5. Blockchain / Web3 / Solidity / Ethereum
        if (query.includes("blockchain") || query.includes("web3") || query.includes("solidity") || query.includes("ethereum") || query.includes("smart contract") || query.includes("crypto") || query.includes("crowdfunding") || query.includes("transparent funding") || query.includes("digital twin")) {
            return knowledgeBase.blockchain.text + knowledgeBase.blockchain.actions;
        }

        // 6. IoT / Weather / ESP32 / Hardware
        if (query.includes("iot") || query.includes("weather") || query.includes("esp32") || query.includes("hardware") || query.includes("sensor") || query.includes("bme280") || query.includes("mq-135") || query.includes("microcontroller") || query.includes("hyperlocal") || query.includes("arduino")) {
            return knowledgeBase.iot.text + knowledgeBase.iot.actions;
        }

        // 7. Experience / Internship / Dronnester / Job
        if (query.includes("experience") || query.includes("internship") || query.includes("dronnester") || query.includes("trainee") || query.includes("job") || query.includes("career") || query.includes("work experience") || query.includes("drone")) {
            return knowledgeBase.experience.text + knowledgeBase.experience.actions;
        }

        // 8. Education / CGPA / College / Degree / School
        if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("uem") || query.includes("jaipur") || query.includes("bca") || query.includes("cgpa") || query.includes("gpa") || query.includes("marks") || query.includes("grade") || query.includes("degree") || query.includes("school") || query.includes("isc") || query.includes("icse")) {
            return knowledgeBase.education.text + knowledgeBase.education.actions;
        }

        // 9. Leadership / Clubs / Atrang / Toastmasters / HackSec / Events
        if (query.includes("leadership") || query.includes("club") || query.includes("atrang") || query.includes("vice president") || query.includes("vp") || query.includes("toastmaster") || query.includes("hacksec") || query.includes("public speaking") || query.includes("event") || query.includes("pixel ki paheli") || query.includes("football") || query.includes("extracurricular") || query.includes("hackathon")) {
            return knowledgeBase.leadership.text + knowledgeBase.leadership.actions;
        }

        // 10. Contact / Hire / Resume / Email / Phone / Location / Socials
        if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("mail") || query.includes("phone") || query.includes("call") || query.includes("resume") || query.includes("cv") || query.includes("linkedin") || query.includes("github") || query.includes("reach") || query.includes("kolkata") || query.includes("address") || query.includes("location")) {
            return knowledgeBase.contact.text + knowledgeBase.contact.actions;
        }

        // 11. Languages spoken / Personal / Hobbies
        if (query.includes("fluent") || query.includes("languages") || query.includes("speak") || query.includes("hobby") || query.includes("hobbies") || query.includes("personal") || query.includes("brother") || query.includes("family") || query.includes("ai video") || query.includes("interest")) {
            return knowledgeBase.personal.text + knowledgeBase.personal.actions;
        }

        // 12. Dragon Game Easter Egg
        if (query.includes("game") || query.includes("dragon") || query.includes("neon dragon") || query.includes("jump") || query.includes("play")) {
            return `🐲 <strong>Neon Dragon Runner:</strong><br><br>
            Snehal built an interactive retro canvas game right here on this portfolio! As you jump over obstacles and gain distance, you unlock real chronological milestones from Snehal's life and career.
            <div class="bot-actions">
                <a href="#timeline-journey" class="bot-btn">🎮 Play Dragon Journey ↓</a>
            </div>`;
        }

        // 13. Smart Fallback with context guidance
        return `🤖 <strong>I'd love to help you with that!</strong><br><br>
        Here are the most popular topics you can ask me about Snehal:
        <ul class="bot-list">
            <li><strong>"What is Snehal's tech stack?"</strong> — Web, Mobile, IoT, Blockchain</li>
            <li><strong>"Tell me about Snehal's projects"</strong> — IoT Weather Station & Solidity Crowdfunding</li>
            <li><strong>"What is Snehal's education & CGPA?"</strong> — BCA at UEM Jaipur (7.80 CGPA)</li>
            <li><strong>"Tell me about Dronnester"</strong> — Professional Trainee experience</li>
            <li><strong>"What leadership roles does he hold?"</strong> — Atrang VP, Toastmasters, HackSec</li>
            <li><strong>"How can I contact or hire Snehal?"</strong> — Email, phone, resume & socials</li>
        </ul>
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
        appendMessage("bot", `👋 <strong>Hi there! I'm Snehal's AI Assistant.</strong><br><br>
        I'm here to answer any questions about Snehal's technical skills, full-stack projects, BCA at UEM Jaipur, Dronnester internship, leadership roles, and contact info.<br><br>
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
