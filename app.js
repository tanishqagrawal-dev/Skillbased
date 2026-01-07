let radarChart, barChart;

async function startAnalysis() {
    const file = document.getElementById('resumeUpload').files[0];
    const jd = document.getElementById('jdText').value;
    if(!file) return alert("Upload Resume!");

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jd', jd);

    const response = await fetch('http://localhost:5000/analyze', { method: 'POST', body: formData });
    const data = await response.json();

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('finalScore').innerText = data.score + "%";

    // Radar Chart - Skill Analysis
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    if(radarChart) radarChart.destroy();
    radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Technical', 'Soft Skills', 'Experience', 'Education'],
            datasets: [{
                label: 'Your Profile',
                data: [data.skill_metrics.technical, data.skill_metrics.soft, data.skill_metrics.experience, data.skill_metrics.education],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6'
            }]
        },
        options: { scales: { r: { grid: { color: '#334155' }, ticks: { display: false } } } }
    });

    // Bar Chart - Company Ratios
    const ctxBar = document.getElementById('barChart').getContext('2d');
    if(barChart) barChart.destroy();
    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: Object.keys(data.company_ratio),
            datasets: [{
                label: 'Fit Ratio (%)',
                data: Object.values(data.company_ratio),
                backgroundColor: '#3b82f6'
            }]
        }
    });
}

// Simple Visit Counter Simulation
setInterval(() => {
    const el = document.getElementById('visit-count');
    el.innerText = (parseInt(el.innerText.replace(',','')) + Math.floor(Math.random()*3)).toLocaleString();
}, 5000);
