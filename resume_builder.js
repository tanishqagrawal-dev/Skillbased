// Resume Builder Logic

let resumeData = {
    experiences: [],
    education: []
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addExperience();
    addEducation();
});

function toggleAccordion(header) {
    const item = header.parentElement;
    // Close others
    document.querySelectorAll('.accordion-item').forEach(el => {
        if (el !== item) el.classList.remove('active');
    });
    item.classList.toggle('active');
}

function updateResume() {
    // Basic Fields
    document.getElementById('prev-name').innerText = document.getElementById('res-name').value || 'Your Name';
    document.getElementById('prev-role').innerText = document.getElementById('res-role').value || 'Target Role';
    document.getElementById('prev-email').innerText = document.getElementById('res-email').value || 'email@example.com';
    document.getElementById('prev-phone').innerText = document.getElementById('res-phone').value || '+1 234 567 890';
    document.getElementById('prev-summary').innerText = document.getElementById('res-summary').value || 'Your professional summary will appear here...';
    document.getElementById('prev-skills').innerText = document.getElementById('res-skills').value || 'List your top skills...';

    // Lists
    renderExperience();
    renderEducation();

    // ATS Check
    calculateATS();
}

function addExperience() {
    const id = Date.now();
    resumeData.experiences.push({ id, role: '', company: '', date: '', desc: '' });

    const container = document.getElementById('experience-list');
    const div = document.createElement('div');
    div.className = 'exp-item form-grid';
    div.dataset.id = id;
    div.innerHTML = `
        <div class="form-group">
            <input type="text" placeholder="Job Title" oninput="updateExp(${id}, 'role', this.value)">
        </div>
        <div class="form-group">
            <input type="text" placeholder="Company" oninput="updateExp(${id}, 'company', this.value)">
        </div>
        <div class="form-group">
            <input type="text" placeholder="Date (e.g. 2020 - Present)" oninput="updateExp(${id}, 'date', this.value)">
        </div>
        <div class="form-group full">
            <textarea placeholder="Description" rows="2" oninput="updateExp(${id}, 'desc', this.value)"></textarea>
        </div>
        <button class="btn-link-danger" onclick="removeExp(${id})">Remove</button>
        <hr style="grid-column: 1/-1; border-color: rgba(255,255,255,0.1);">
    `;
    container.appendChild(div);
}

function updateExp(id, field, value) {
    const item = resumeData.experiences.find(x => x.id === id);
    if (item) {
        item[field] = value;
        renderExperience();
        calculateATS();
    }
}

function removeExp(id) {
    resumeData.experiences = resumeData.experiences.filter(x => x.id !== id);
    document.querySelector(`.exp-item[data-id="${id}"]`).remove();
    renderExperience();
    calculateATS();
}

function renderExperience() {
    const container = document.getElementById('prev-experience');
    container.innerHTML = resumeData.experiences.map(exp => `
        <div class="prev-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>${exp.role || 'Job Title'}</span>
                <span>${exp.date || 'Date'}</span>
            </div>
            <div style="font-style:italic; color:#555;">${exp.company || 'Company'}</div>
            <p>${exp.desc || 'Description of your responsibilities...'}</p>
        </div>
    `).join('');
}

function addEducation() {
    const id = Date.now();
    resumeData.education.push({ id, school: '', degree: '', date: '' });

    const container = document.getElementById('education-list');
    const div = document.createElement('div');
    div.className = 'edu-item form-grid';
    div.dataset.id = id;
    div.innerHTML = `
         <div class="form-group">
            <input type="text" placeholder="School" oninput="updateEdu(${id}, 'school', this.value)">
        </div>
        <div class="form-group">
            <input type="text" placeholder="Degree" oninput="updateEdu(${id}, 'degree', this.value)">
        </div>
        <div class="form-group full">
            <input type="text" placeholder="Year" oninput="updateEdu(${id}, 'date', this.value)">
        </div>
         <button class="btn-link-danger" onclick="removeEdu(${id})">Remove</button>
         <hr style="grid-column: 1/-1; border-color: rgba(255,255,255,0.1);">
    `;
    container.appendChild(div);
}

function updateEdu(id, field, value) {
    const item = resumeData.education.find(x => x.id === id);
    if (item) {
        item[field] = value;
        renderEducation();
    }
}

function removeEdu(id) {
    resumeData.education = resumeData.education.filter(x => x.id !== id);
    document.querySelector(`.edu-item[data-id="${id}"]`).remove();
    renderEducation();
}

function renderEducation() {
    const container = document.getElementById('prev-education');
    container.innerHTML = resumeData.education.map(edu => `
        <div class="prev-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>${edu.school || 'University'}</span>
                <span>${edu.date || 'Year'}</span>
            </div>
            <div>${edu.degree || 'Degree'}</div>
        </div>
    `).join('');
}

// --- ATS Logic ---
function calculateATS() {
    let score = 0;
    const tips = [];

    const summary = document.getElementById('res-summary').value.toLowerCase();
    const skills = document.getElementById('res-skills').value.toLowerCase();
    const jd = document.getElementById('target-jd').value.toLowerCase();

    // 1. Content Length Check
    if (summary.length > 50) score += 20;
    else tips.push("Summary is too short.");

    if (skills.length > 20) score += 20;
    else tips.push("Add more skills.");

    if (resumeData.experiences.length > 0) score += 20;
    else tips.push("Add at least one experience.");

    // 2. Keyword Matching (if JD provided)
    if (jd.length > 10) {
        // Extract mock keywords from JD (simple split)
        const commonKeywords = ['react', 'python', 'java', 'sql', 'aws', 'communication', 'leadership', 'design'];
        let matched = 0;
        let total = 0;

        commonKeywords.forEach(word => {
            if (jd.includes(word)) {
                total++;
                if (summary.includes(word) || skills.includes(word)) {
                    matched++;
                } else {
                    tips.push(`Missing keyword: <strong>${word}</strong>`);
                }
            }
        });

        if (total > 0) {
            const matchScore = (matched / total) * 40; // Max 40 points for keywords
            score += matchScore;
        } else {
            score += 10; // Default points if no common keywords found but JD exists
        }
    } else {
        score += 20; // Default points if no JD
        tips.push("Paste a Job Description for keyword analysis.");
    }

    // Cap score
    score = Math.min(Math.round(score), 100);

    // Update UI
    document.getElementById('ats-score').innerText = score;
    document.getElementById('ats-progress').style.width = score + '%';
    document.getElementById('ats-progress').style.background = score > 70 ? 'var(--success)' : (score > 40 ? 'orange' : 'red');

    const feedbackList = document.getElementById('ats-feedback');
    feedbackList.innerHTML = tips.map(t => `<li>${t}</li>`).join('');
}

// --- PDF Export ---
function downloadPDF() {
    const element = document.getElementById('resume-preview');
    const opt = {
        margin: 0.5,
        filename: 'My_Resume_SkillHire.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Check if html2pdf is loaded
    if (window.html2pdf) {
        html2pdf().set(opt).from(element).save();
    } else {
        alert("PDF Generator is loading... Please wait or refresh.");
        // Fallback: simple print
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Resume</title>');
        printWindow.document.write('<style>body{font-family:sans-serif;} .paper{padding:20px;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(element.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}

// Auto-fill for testing
function generateRandomData() {
    document.getElementById('res-name').value = "Alex Johnson";
    document.getElementById('res-role').value = "Senior Frontend Engineer";
    document.getElementById('res-email').value = "alex.j@example.com";
    document.getElementById('res-phone').value = "+1 (555) 123-4567";
    document.getElementById('res-summary').value = "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and cloud architectures. Passionate about performance optimization and user experience.";
    document.getElementById('res-skills').value = "React, TypeScript, Node.js, AWS, TailwindCSS, Docker, GraphQL";

    resumeData.experiences = [
        { id: 1, role: 'Frontend Lead', company: 'TechCorp', date: '2021 - Present', desc: 'Led a team of 5 developers. Improved site performance by 40%.' },
        { id: 2, role: 'Software Engineer', company: 'StartupX', date: '2019 - 2021', desc: 'Built the MVP from scratch using React and Firebase.' }
    ];

    updateResume();
}
