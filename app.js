// Profile and Progress Logic
let userProfile = {
    name: "Guest",
    scansPerformed: 0,
    averageScore: 0,
    skillsVerified: []
};

// Handle Sign In / Sign Up
function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
}

function handleAuth(type) {
    const email = document.getElementById('auth-email').value;
    if(!email) return alert("Enter your email!");
    
    // In a real app, you'd use Firebase Auth here
    userProfile.name = email.split('@')[0];
    document.getElementById('user-display-name').innerText = userProfile.name;
    toggleAuthModal();
    alert(`Successfully ${type}ed! Welcome to SkillGap Pro.`);
}

// Track User Progress
function updateProfileStats(newScore) {
    userProfile.scansPerformed++;
    userProfile.averageScore = ((userProfile.averageScore * (userProfile.scansPerformed - 1)) + newScore) / userProfile.scansPerformed;
    
    // Update Profile UI
    document.getElementById('profile-scans').innerText = userProfile.scansPerformed;
    document.getElementById('profile-avg').innerText = Math.round(userProfile.averageScore) + "%";
}

// "Was this helpful?" Feedback Tool
function submitFeedback(isPositive) {
    const feedbackMsg = isPositive ? "Thanks! We're glad it helped." : "Sorry! We'll improve the analysis.";
    alert(feedbackMsg);
    // You can send this to your Python backend to log data
}
