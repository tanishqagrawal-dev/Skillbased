
/* DONUT */
new Chart(document.getElementById("donut"), {
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
new Chart(document.getElementById("radar"), {
  type: "radar",
  data: {
    labels: ["DSA", "React", "Backend", "System Design", "Git"],
    datasets: [{
      data: [65, 80, 40, 35, 70],
      backgroundColor: "rgba(37,99,235,0.4)",
      borderColor: "#2563eb"
    }]
  }
});

function logout() {
  window.location.href = "index.html";
}
