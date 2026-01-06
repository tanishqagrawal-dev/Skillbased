
AOS.init({ duration: 1000 });

VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2
});

/* DONUT */
new Chart(document.getElementById("readinessChart"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [74, 26],
      backgroundColor: ["#22c55e", "#334155"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "80%",
    plugins: { legend: { display: false } }
  }
});

/* RADAR */
new Chart(document.getElementById("skillRadar"), {
  type: "radar",
  data: {
    labels: ["DSA", "React", "Backend", "System Design", "Git"],
    datasets: [{
      data: [65, 80, 40, 35, 70],
      backgroundColor: "rgba(37,99,235,0.4)",
      borderColor: "#2563eb"
    }]
  },
  options: {
    scales: { r: { ticks: { display: false } } }
  }
});

/* MOCK ANALYSIS */
function analyzeResume() {
  const skills = ["System Design", "Backend APIs", "Cloud Basics"];
  const courses = [
    "System Design Basics – YouTube",
    "Backend Development – Coursera",
    "Cloud Fundamentals – Google"
  ];

  document.getElementById("skills").innerHTML =
    skills.map(s => `<li>${s}</li>`).join("");

  document.getElementById("courses").innerHTML =
    courses.map(c => `<li>${c}</li>`).join("");
}

function logout() {
  window.location.href = "index.html";
}
