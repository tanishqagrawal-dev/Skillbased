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

    document.querySelectorAll('.card, .feature-item, .price-card').forEach(el => {
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
    localStorage.setItem('skillhire_theme', newTheme);
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
const savedTheme = localStorage.getItem('skillhire_theme') || 'dark';
document.body.dataset.theme = savedTheme;
updateThemeIcon();

window.toggleTheme = toggleTheme;
