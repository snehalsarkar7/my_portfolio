<div align="center">

# ⚡ Snehal Sarkar — Interactive Developer Portfolio

<p align="center">
  <strong>A cutting-edge, cyber-glass personal portfolio featuring 3D particle animations, an embedded 2D canvas runner game with unlocking milestones, and an intelligent interactive AI assistant.</strong>
</p>

[![GitHub stars](https://img.shields.io/github/stars/snehalsarkar7/my_portfolio?style=for-the-badge&color=2dd4bf&logo=github)](https://github.com/snehalsarkar7/my_portfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/snehalsarkar7/my_portfolio?style=for-the-badge&color=38bdf8&logo=github)](https://github.com/snehalsarkar7/my_portfolio/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge)](LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-emerald.svg?style=for-the-badge)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](#contributing)

<br/>

[🌟 Explore Live Demo](#-live-demo) •
[✨ Features](#-key-features) •
[🕹️ Interactive Game](#-neon-dragon-runner-engine) •
[🤖 AI Chatbot](#-smart-ai-assistant) •
[🛠️ Tech Stack](#-tech-stack) •
[🚀 Quick Start](#-quick-start) •
[📬 Connect](#-connect--contact)

---

</div>

## 📖 Overview

This repository houses the source code for **Snehal Sarkar's** official developer portfolio. Built with a high-performance **Vanilla HTML5, CSS3, and JavaScript (ES6+)** foundation, this web application delivers an immersive, dark cyber-glassmorphism user experience loaded with real-time interactive systems:

* **3D Particle Mesh Background:** Powered by **Three.js** and **Vanta.js** with interactive mouse tracking and fluid physics.
* **Gamified Milestone Unlocking Engine:** An embedded **HTML5 Canvas 60 FPS** infinite runner game ("*Neon Dragon Runner*") with Web Audio API sound synthesis and real-time career progression milestones.
* **Intelligent AI Assistant:** A floating, responsive conversational chatbot with fuzzy query matching, instant suggestion chips, sound effects, and comprehensive personal knowledge retrieval.
* **Performance-First Architecture:** Lightweight, responsive, zero heavy framework overhead, fast initial load, and accessible semantic HTML.

---

## ✨ Key Features

### 🌌 1. Cyber Dark Glassmorphism UI
* Ultra-modern dark palette (`#09090b` canvas with `#2dd4bf` teal and `#38bdf8` cyan neon accents).
* High-blur glassmorphism panels, glowing borders, and reactive hover states.
* Interactive particle network background running in real-time with Three.js.
* Optimized `IntersectionObserver` scroll animations for smooth entry transitions.

### 🕹️ 2. "Neon Dragon Runner" Gamified Career Timeline
* **60 FPS HTML5 Canvas Game:** High-DPI scaled retro arcade runner.
* **Procedural Obstacle Generation:** Spawns neon crystals, ground pillars, and airborne energy orbs with progressive speed scaling.
* **Web Audio API Synthesizer:** Real-time synthesized sound effects for jumping, colliding, and milestone unlocking with zero external audio assets required.
* **Interactive Timeline Unlocking:** As players accumulate distance (`0m` to `800m+`), chronological milestones (academics, clubs, internships, and Web3/IoT projects) unlock dynamically on the progress track.
* **Cross-Platform Controls:** Full support for `Spacebar`, `Up Arrow`, mouse clicks, and universal mobile touch controls. High score persisted via `localStorage`.

### 🤖 3. Built-in AI Portfolio Assistant
* Floating, draggable-feel interactive widget with proactive pulse notifications and auto-dismiss tooltips.
* **Smart Natural Language Query Matcher:** Understands inquiries about bio, technical stack, IoT weather research, blockchain dApps, internship at Dronnester, CGPA, leadership roles, and contact channels.
* Quick-action **Suggestion Chips** for 1-click guided navigation.
* Synthesized ambient message chimes, animated typing indicators, and formatted rich bubble responses with actionable quick links.

### 📱 4. Mobile First & Fully Accessible
* Responsive layout with fluid CSS grid and flexbox systems.
* Mobile navigation drawer with hamburger morphing animation and background body scroll-lock.
* Semantic HTML5 markup, ARIA roles, high color contrast ratios, and descriptive labels for screen readers.

---

## 🕹️ Neon Dragon Runner Engine

```
       ▲  [ Jump / Tap / Space ]
     🐲~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~► (Score ++ )
    ═════════════════════════════════════════════════
          [◆ Obstacle]           [● Energy Orb]
               │                      │
               ▼                      ▼
      [Collision Detect]      [Milestone Unlock]
```

### Technical Specs:
* **Frame Rate:** ~60 FPS synchronized with `requestAnimationFrame`.
* **Physics:** Jump velocity, gravity curve, floor clamping, and AABB collision bounding boxes.
* **Audio Engine:** Dynamic Web Audio oscillators (`sine`, `sawtooth`, `triangle`) generating retro frequency sweeps.
* **State Management:** High score tracking via browser `localStorage`.

### Milestone Progress Milestones:
| Goal | Year / Period | Milestone |
| :--- | :--- | :--- |
| **40m** | 2022 | 🎓 ICSE Board Certification — St. Paul's KG & Day School |
| **100m** | 2024 | 🎓 High School (ISC) — Salt Lake Point School |
| **180m** | 2024 | 💻 Enrolled in BCA — UEM Jaipur |
| **260m** | Aug 2024 | 🛡️ Joined HackSec Club (Cybersecurity & Ethical Hacking) |
| **350m** | Sep 2024 – Mar 2025 | 🛸 Drone Technology Trainee at Dronnester |
| **440m** | 2024 – Present | 🛰️ Built Hyperlocal IoT Weather Station (ESP32, BME280, MQ-135) |
| **530m** | 2024 – Present | ⛓️ Built Transparent Funding Platform (Ethereum / Solidity) |
| **620m** | Apr 2025 | 🎙️ Joined Toastmasters International Club |
| **710m** | Jan 2026 | 🏆 Elected Vice President at Atrang Cultural Club |
| **800m+** | Present | 🚀 Ongoing Research, Full-Stack & Web3 Engineering |

---

## 🤖 Smart AI Assistant

The AI chatbot embedded in this portfolio acts as an interactive resume assistant.

```
       ┌────────────────────────────────────────────────────────┐
       │                 Snehal's AI Assistant                  │
       ├────────────────────────────────────────────────────────┤
       │ 💬 User: "Tell me about your IoT experience"           │
       │                                                        │
       │ 🤖 Bot: "Snehal engineered a Hyperlocal IoT Weather    │
       │         Monitoring System featuring ESP32 and          │
       │         sensors (BME280, MQ-135) for live telemetry!"  │
       │         [🛰️ Weather IoT Repo]  [📄 View Resume]        │
       └────────────────────────────────────────────────────────┘
```

### Knowledge Base Highlights:
* **Background & Bio:** BCA student at UEM Jaipur with a strong **7.80 CGPA**.
* **Core Languages:** Java, Python, JavaScript (ES6+), HTML5, CSS3, Solidity.
* **Frameworks & Tools:** React, Flutter, Node.js, MongoDB, Git, Figma, MS Office Suite.
* **Hardware & Systems:** ESP32, BME280, MQ-135, Drone Firmware & Telemetry.

---

## 🛠️ Tech Stack

<div align="center">

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Frontend Core** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Visuals & 3D** | ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white) ![Vanta.js](https://img.shields.io/badge/Vanta.js-2dd4bf?style=flat-square&logoColor=white) |
| **Audio & Graphics** | **Web Audio API**, **HTML5 Canvas 2D Engine** |
| **Typography & Icons** | **Google Fonts (Poppins)**, **Custom Inline SVGs** |
| **Hosting & CI/CD** | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

</div>

---

## 🚀 Featured Projects Showcased

### 1. [HyperLocal Weather Monitoring System](https://github.com/snehalsarkar7/HyperLocal)
* **Stack:** IoT, ESP32, BME280, MQ-135 Air Quality Sensor, HTTP REST APIs.
* **Description:** Real-time environmental telemetry node calculating temperature, barometric pressure, humidity, and gas index values for hyper-local micro-climate observation.

### 2. [NFT Transparent Project Funding](https://github.com/snehalsarkar7/transparentFunding.sol)
* **Stack:** Blockchain, Solidity, Ethereum Network, Smart Contracts.
* **Description:** Decentralized Web3 crowdfunding protocol ensuring milestone-based escrow release, transparent donor records, and tamper-proof ledger validation.

### 3. [Digital Twin Smart Contract](https://github.com/snehalsarkar7/DigitalTwin)
* **Stack:** Web3, Solidity, Smart Contract Architecture.
* **Description:** Blockchain verification framework binding physical asset state updates to immutable digital twin tokens on-chain.

---

## 📂 Project Structure

```bash
my_portfolio/
├── assets/
│   ├── hero-img.jpeg             # Hero section portrait
│   ├── about-img.jpeg            # About section portrait
│   ├── contact-img.png           # Contact section graphic
│   ├── project1.jpeg             # HyperLocal IoT preview
│   ├── project2.png              # Transparent funding preview
│   ├── project3.png              # Digital Twin contract preview
│   ├── SNEHAL_SARKAR_Resume.pdf  # Downloadable PDF Resume
│   ├── python.svg                # Skill vector icons
│   ├── java.svg
│   ├── html.svg
│   ├── css.svg
│   ├── js.svg
│   └── microsoft.svg
├── index.html                    # Semantic HTML5 architecture & UI markup
├── style.css                     # Custom design tokens, glassmorphism, & animations
├── script.js                     # Vanta 3D, Canvas game engine, & AI chatbot logic
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start

To run this portfolio locally without any package managers or dependencies:

### 1. Clone the Repository
```bash
git clone https://github.com/snehalsarkar7/my_portfolio.git
cd my_portfolio
```

### 2. Launch Locally

#### Option A: Direct Browser Launch
Simply double click [index.html](index.html) or right click and choose **Open with > Chrome / Firefox / Edge**.

#### Option B: VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code.
2. Click **Go Live** on the bottom status bar.
3. Your browser will automatically open at `http://127.0.0.1:5500`.

#### Option C: Python Simple HTTP Server
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

#### Option D: Node.js `serve` / `npx`
```bash
npx serve .
```

---

## 🌐 Deployment

This project has zero build step requirements and is ready for instant 1-click deployment on static web hosts:

### GitHub Pages:
1. Go to your repository **Settings** on GitHub.
2. Navigate to **Pages** in the left sidebar.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be published at `https://snehalsarkar7.github.io/my_portfolio/`.

### Vercel / Netlify:
* Import the repository directly in the dashboard and deploy with default static presets.

---

## 📬 Connect & Contact

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Snehal_Sarkar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/snehal-sarkar-7773b7321/)
[![GitHub](https://img.shields.io/badge/GitHub-snehalsarkar7-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/snehalsarkar7)
[![Email](https://img.shields.io/badge/Email-snehalsarkar94@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:snehalsarkar94@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-+91_8902515964-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+918902515964)

<br/>

**Snehal Sarkar**  
*Web, App & IoT Developer • BCA Student at UEM Jaipur*  
📍 Kolkata, West Bengal, India

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it as an inspiration or template for your own developer portfolio.

```
Copyright (c) 2026 Snehal Sarkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">
  <sub>Designed & Developed with 💻, ☕, and pure JavaScript by <a href="https://github.com/snehalsarkar7">Snehal Sarkar</a>.</sub>
</div>
