
// Function to switch between Dashboard, Analyzer, etc.
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
    });

    // Show target section
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById(sectionId).classList.add('active');

    // Update Page Title
    document.getElementById('page-title').innerText = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}

// Function to Simulate AI Analysis
function runAnalysis() {
    const btn = document.querySelector('.btn-primary');
    const resultArea = document.getElementById('result-area');
    
    // Change button text
    btn.innerText = "Analyzing Resume...";
    btn.style.opacity = "0.7";
    
    // Simulate 2 second delay
    setTimeout(() => {
        btn.innerText = "Analysis Complete";
        btn.style.backgroundColor = "#22c55e"; // Green color
        
        // Show Results
        resultArea.classList.remove('hidden');
    }, 2000);
}
