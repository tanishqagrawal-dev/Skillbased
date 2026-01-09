// Mock Interview Logic

let intState = {
    active: false,
    timer: null,
    timeLeft: 900,
    currentQIndex: 0,
    stream: null
};

const questions = [
    "Tell me about yourself and your experience with software engineering.",
    "Describe a challenging technical problem you solved properly.",
    "How do you handle disagreements with team members?",
    "Explain the difference between a process and a thread.",
    "Design a URL shortening service like Bit.ly."
];

function startInterview() {
    const screenSetup = document.getElementById('int-setup');
    const screenActive = document.getElementById('int-active');

    // Hide Setup, Show Active
    screenSetup.classList.add('hidden');
    screenActive.classList.remove('hidden');

    // Start Webcam
    startWebcam();

    // Reset State
    intState.active = true;
    intState.currentQIndex = 0;
    intState.timeLeft = parseInt(document.getElementById('int-duration').value) * 60;

    // Start Timer
    startTimer();

    // Load First Question
    loadQuestion(0);
}

async function startWebcam() {
    const videoElement = document.getElementById('user-webcam');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoElement.srcObject = stream;
        intState.stream = stream;
    } catch (err) {
        console.error("Webcam Error:", err);
        alert("Could not access webcam. Please check permissions.");
    }
}

function startTimer() {
    clearInterval(intState.timer);
    const timerDisplay = document.getElementById('int-timer');

    intState.timer = setInterval(() => {
        if (intState.timeLeft <= 0) {
            endInterview();
            return;
        }
        intState.timeLeft--;

        const m = Math.floor(intState.timeLeft / 60);
        const s = intState.timeLeft % 60;
        timerDisplay.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
    }, 1000);
}

function loadQuestion(index) {
    if (index >= questions.length) {
        endInterview();
        return;
    }

    const qText = document.getElementById('current-question');
    qText.innerText = questions[index];

    // Auto-speak after slight delay
    setTimeout(() => speakQuestion(), 1000);
}

function speakQuestion() {
    const text = document.getElementById('current-question').innerText;
    const utterance = new SpeechSynthesisUtterance(text);

    // Voice preferences
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang.includes('en')) || voices[0];
    utterance.rate = 1.0;

    // Visual Indicator
    const indicator = document.getElementById('ai-speaking-indicator');
    utterance.onstart = () => indicator.classList.remove('hidden');
    utterance.onend = () => indicator.classList.add('hidden');

    window.speechSynthesis.speak(utterance);
}

function nextQuestion() {
    window.speechSynthesis.cancel(); // Stop current speech
    intState.currentQIndex++;
    loadQuestion(intState.currentQIndex);
}

function endInterview(manual = false) {
    clearInterval(intState.timer);
    window.speechSynthesis.cancel();

    // Stop Webcam
    if (intState.stream) {
        intState.stream.getTracks().forEach(track => track.stop());
    }

    // UI Upgrade
    document.getElementById('int-active').classList.add('hidden');
    document.getElementById('int-feedback').classList.remove('hidden');
}

function resetInterview() {
    document.getElementById('int-feedback').classList.add('hidden');
    document.getElementById('int-setup').classList.remove('hidden');
}
