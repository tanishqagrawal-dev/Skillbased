// --- LANDING PAGE LOGIC & AUTH REDIRECTION ---

document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase is available
    if (typeof firebase !== 'undefined') {
        const auth = firebase.auth();

        // Monitor Auth State
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User detected, redirecting to dashboard...");
                // Redirect logged-in users to the dashboard
                window.location.href = 'pages/dashboard.html';
            } else {
                console.log("No user logged in. Landing page ready.");
            }
        });
    }

    // Redirect to Auth Page
    window.startLogin = () => {
        window.location.href = 'pages/auth.html';
    };

    // Simple Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .feature-item, .price-card, .founder-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Add fade-in utility to document
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// --- THEME LOGIC ---
function toggleTheme() {
    const isLight = document.body.dataset.theme === 'light';
    const newTheme = isLight ? 'dark' : 'light';

    document.body.dataset.theme = newTheme;
    localStorage.setItem('skilmatrix_theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isLight = document.body.dataset.theme === 'light';
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        const icon = isLight ? 'moon' : 'sun';
        // Basic lucide re-render approach (or innerHTML swap)
        btn.innerHTML = `<i data-lucide="${icon}"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// Initialize Theme on Load (Outside DOMContentLoaded to avoid FOUC if possible, but JS file usually loads late)
const savedTheme = localStorage.getItem('skilmatrix_theme') || 'dark';
document.body.dataset.theme = savedTheme;
updateThemeIcon();

// --- FOUNDER MODAL LOGIC ---
const founderData = {
    tanishq: {
        name: "Tanishq Agrawal",
        role: "Frontend, UI/UX, Marketing & Features",
        img: "assets/tanishq.jpg",
        bio: "The driving force behind the platform's visual identity, user experience, and strategic growth. Tanishq leads Frontend Engineering and UI/UX Design, bridging the gap between complex code and beautiful interfaces. He also spearheads Digital Marketing strategies and oversees Feature Innovation to ensure the product constantly evolves.",
        social: {
            github: "https://github.com/tanishqagrawal-dev",
            linkedin: "https://www.linkedin.com/in/tanishq-agrawal-91a505335",
            instagram: "https://www.instagram.com/tanishq_agrawal_11?igsh=YmtibTEwcDFsd3No"
        },
        skills: ["Frontend Developer", "UI/UX Design", "React & Modern JS", "Digital Marketing", "Product Strategy"]
    },
    yash: {
        name: "Yash Jain",
        role: "Cloud, Backend & Security",
        img: "assets/yash.jpg",
        bio: "The architect of our digital infrastructure. Yash specializes in Cloud Engineering and Backend Development, ensuring our systems are robust and scalable. He maintains a rigorous focus on Cloud & System Security and DevOps practices to guarantee 24/7 uptime and military-grade data protection.",
        social: {
            github: "https://github.com/Yash-Jain2006",
            linkedin: "https://www.linkedin.com/in/yash-jain-jan2006",
            instagram: "https://www.instagram.com/yashjain0601"
        },
        skills: ["Cloud Engineer", "Cloud Architecture", "Backend Developer", "Cloud & System Security", "Dev Ops"]
    },
    anoop: {
        name: "Anoop Verma",
        role: "Lead AI & Backend Developer",
        img: "assets/anoop.jpg",
        bio: "The mind behind the machine. Anoop architects the complex AI models and backend logic that power the 'brain' of Skill Matrix. From natural language processing to predictive analytics, he transforms raw data into actionable career intelligence for our users.",
        social: {
            github: "https://github.com/MakoShar",
            linkedin: "https://www.linkedin.com/in/anoop-verma-12078b322",
            instagram: "https://www.instagram.com/aiden_4178?igsh=MXd2N3dtaXVkdzF2YQ=="
        },
        skills: ["Artificial Intelligence", "Python & Backend", "Machine Learning", "Data Structures", "Algorithm Design"]
    }
};

window.openFounder = function (id) {
    const data = founderData[id];
    if (!data) return;

    const modal = document.getElementById('founder-modal');
    const content = document.getElementById('founder-modal-content');

    // Populate Data
    document.getElementById('modal-img').src = data.img;
    document.getElementById('modal-name').textContent = data.name;
    document.getElementById('modal-role').textContent = data.role;
    document.getElementById('modal-bio').textContent = data.bio;

    // Populate Skills
    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');

    // Populate Socials
    document.getElementById('link-github').href = data.social.github;
    document.getElementById('link-linkedin').href = data.social.linkedin;
    document.getElementById('link-instagram').href = data.social.instagram;

    // Show Modal
    modal.classList.add('active');
    // slight delay for content animation
    setTimeout(() => {
        content.classList.add('active');
    }, 10);

    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

window.closeFounder = function () {
    const modal = document.getElementById('founder-modal');
    const content = document.getElementById('founder-modal-content');

    content.classList.remove('active');
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }, 300);
}

// Close on outside click
document.getElementById('founder-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'founder-modal') {
        window.closeFounder();
    }
});
