
function analyzeResume() {
  document.getElementById("resumeScore").innerText = "78 / 100";
  document.getElementById("atsScore").innerText = "82%";
  document.getElementById("jobScore").innerText = "74%";

  const skills = ["React Hooks", "System Design Basics", "REST APIs"];
  const courses = [
    "React Advanced – Coursera",
    "System Design for Beginners – YouTube",
    "API Development – Udemy"
  ];

  const skillList = document.getElementById("skills");
  const courseList = document.getElementById("courses");

  skillList.innerHTML = "";
  courseList.innerHTML = "";

  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.appendChild(li);
  });

  courses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = course;
    courseList.appendChild(li);
  });
}

function logout() {
  window.location.href = "index.html";
}
