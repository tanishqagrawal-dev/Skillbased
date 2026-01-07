const recommendations = {
  "System Design": "Grokking the System Design Interview",
  "Backend": "Node.js & REST API Bootcamp",
  "DSA": "Striver DSA Sheet",
  "Projects": "Build & Deploy Real-world Applications"
};

export default function CourseRecommender() {
  return (
    <section>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h2>Smart Course Recommendations</h2>
        <p style={{ color: "var(--muted)" }}>
          Learn only what increases your job readiness.
        </p>

        <ul style={{ marginTop: "24px", lineHeight: "1.9" }}>
          {Object.entries(recommendations).map(([skill, course], i) => (
            <li key={i}>
              <strong>{skill}:</strong> {course}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
