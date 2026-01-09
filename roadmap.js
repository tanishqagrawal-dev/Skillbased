// Roadmap Generator Logic

const roadmaps = {
    frontend: [
        { month: 'Month 1', title: 'HTML, CSS & JS Fundamentals', desc: 'Master semantic HTML, Flexbox/Grid, and ES6+ syntax.', type: 'foundations' },
        { month: 'Month 2', title: 'React Ecosystem', desc: 'Hooks, Context API, Redux Toolkit, and React Router.', type: 'framework' },
        { month: 'Month 3', title: 'Advanced Frontend', desc: 'Performance optimization, SSR (Next.js), and Testing (Jest).', type: 'advanced' },
        { month: 'Month 4', title: 'System Design & Projects', desc: 'Build a complex clone (e.g., Netflix) and learn Frontend System Design.', type: 'project' },
        { month: 'Month 5', title: 'Interview Prep', desc: 'JS Data Structures, Polyfills, and Machine Coding Round practice.', type: 'interview' }
    ],
    backend: [
        { month: 'Month 1', title: 'Server Side Basics', desc: 'Node.js event loop, Express.js, and REST API design.', type: 'foundations' },
        { month: 'Month 2', title: 'Databases', desc: 'SQL (PostgreSQL) vs NoSQL (MongoDB), Indexing, and Normalization.', type: 'database' },
        { month: 'Month 3', title: 'System Design', desc: 'Caching (Redis), Load Balancing, and Microservices Architecture.', type: 'advanced' },
        { month: 'Month 4', title: 'Cloud & DevOps', desc: 'AWS (EC2, S3, Lambda), Docker, and CI/CD pipelines.', type: 'cloud' }
    ],
    fullstack: [
        { month: 'Month 1', title: 'Frontend Core', desc: 'React, TailwindCSS, and State Management.', type: 'foundations' },
        { month: 'Month 2', title: 'Backend Core', desc: 'Node.js, Express, and Database design.', type: 'foundations' },
        { month: 'Month 3', title: 'Integration', desc: 'Connecting FE/BE, Auth (JWT/OAuth), and API Security.', type: 'integration' },
        { month: 'Month 4', title: 'Deployment', desc: 'Deploying MERN apps to Vercel/Render/AWS.', type: 'cloud' }
    ],
    ai: [
        { month: 'Month 1', title: 'Python & Math', desc: 'NumPy, Pandas, Linear Algebra, and Calculus.', type: 'foundations' },
        { month: 'Month 2', title: 'ML Algorithms', desc: 'Regression, Classification, Clustering, and Scikit-learn.', type: 'ml' },
        { month: 'Month 3', title: 'Deep Learning', desc: 'Neural Networks, TensorFlow/PyTorch, and CNNs.', type: 'dl' },
        { month: 'Month 4', title: 'NLP & LLMs', desc: 'Transformers, HuggingFace, and Prompt Engineering.', type: 'ai' }
    ]
};

function generateRoadmap() {
    const role = document.getElementById('road-role').value;
    const duration = parseInt(document.getElementById('road-time').value);

    // Simple mock logic: Slice array based on duration (just a demo)
    // In a real app, we'd adjust content density.
    let path = roadmaps[role] || roadmaps['frontend'];

    renderTimeline(path);

    document.getElementById('roadmap-input').classList.add('hidden');
    document.getElementById('roadmap-view').classList.remove('hidden');
}

function renderTimeline(items) {
    const container = document.getElementById('timeline-render');
    container.innerHTML = items.map((item, index) => `
        <div class="timeline-item slide-in" style="animation-delay: ${index * 0.1}s">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="time-badge">${item.month}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="item-tag ${item.type}">${item.type.toUpperCase()}</div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function resetRoadmap() {
    document.getElementById('roadmap-view').classList.add('hidden');
    document.getElementById('roadmap-input').classList.remove('hidden');
}
