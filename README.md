# 🚀 SKiL MATRiX | Career Intelligence Platform

## Overview
**SKiL MATRiX** is an advanced, AI-powered career intelligence platform designed to bridge the gap between job seekers and their dream roles. By combining real-time market data, AI-driven resume analysis, and personalized learning paths, it offers a comprehensive ecosystem for career growth.

This platform simulates a premium, enterprise-grade environment where users can track their progress, optimize their profiles for ATS (Applicant Tracking Systems), and prepare for interviews with proprietary course content.

## ✨ Key Features

### 📊 Advanced Dashboard
- **Real-Time Analytics:** Visual performance trajectory and skill gap radar charts.
- **Market Intelligence:** Live salary trends, hot skills, and hiring data headers.
- **Actionable Insights:** "Daily Priorities" widget with high/med/low logic.
- **Dynamic Personalization:** Greetings and data adapt to user profile changes.

### 🧠 AI Coach & Analyzer
- **Resume Analysis:** Powered by Gemini AI (simulated integration) to score resumes and identify keyword gaps.
- **Chat Assistant:** "SKiL MATRiX AI Coach" widget for instant career advice and query resolution.
- **Skill Bridging:** Automated recommendations to close identified skill gaps.

### 🎓 SKiL MATRiX Academy
- **Proprietary Course Player:** Integrated video/notes player avoiding external branding.
- **Notes & Insights:** "Lecture Notes Viewer" replacing standard generic videos for a premium reading experience.
- **Enrollment System:** Progress tracking, quizzes, and specific module locking/unlocking.

### 🛠️ Career Tools
- **Resume Builder:** Drag-and-drop or form-based builder with real-time preview.
- **Mock Interviews:** System design and coding interview simulations.
- **DSA Practice:** Integrated LeetCode-style problem sets (e.g., "Merge Intervals").
- **Roadmap:** Visual career progression paths.

## 🛠️ Tech Stack & Architecture

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3 (Vanilla + Variables), JavaScript (ES6+) |
| **Design System** | Glassmorphism UI, Lucide Icons, Google Fonts (Outfit) |
| **Visualization** | Chart.js for analytics and radar charts |
| **Backend / Auth** | Firebase (Auth, Firestore) - *Configured for Local/Demo* |
| **AI Integration** | Google Gemini API (Service Layer) |
| **Assets** | DiceBear Avatars, Unsplash Images |

## 📂 Project Structure

```
skillhire-premium-1/
├── assets/             # Images and logos
├── css/                # Modular CSS files
│   ├── dashboard.css   # Core dashboard styles
│   ├── courses.css     # Course player & grid styles
│   ├── ai_coach.css    # AI widget styling
│   └── ...
├── js/                 # Application Logic
│   ├── dashboard.js    # Main dashboard interactivity & data
│   ├── ai_coach.js     # AI chat widget logic
│   ├── services/       # API integration services
│   └── ...
├── pages/              # HTML Pages
│   ├── dashboard.html  # Main application view
│   └── ...
├── index.html          # Landing page
└── README.md           # Documentation
```

## 🚀 Getting Started

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/skillhire-premium.git
    ```
2.  **Open in Editor**
    Navigate to the project folder in VS Code or your preferred editor.
3.  **Run Locally**
    *   You can serve the files using a simple HTTP server (e.g., Live Server extension in VS Code).
    *   Or run `npm run serve` if configured.
4.  **Firebase Config**
    *   Ensure `js/config.js` is populated with your Firebase project credentials to enable Auth and Database features.

## 👥 User Roles
*   **Guest Mode:** Instant access with "User" persona to explore features.
*   **Authenticated User:** personalized progress, profile management, and saved data.

## 📄 License
This project is for educational and portfolio purposes.

---
**Designed & Developed by Tanishq Agrawal (Antigravity)**
*Part of the Deepmind Advanced Agentic Coding Initiative*
