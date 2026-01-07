import { useState } from "react";

const atsKeywords = [
  "JavaScript",
  "Data Structures",
  "System Design",
  "REST API",
  "Git",
  "Backend"
];

export default function ATSOptimizer() {
  const [text, setText] = useState("");

  const missing = atsKeywords.filter(
    k => !text.toLowerCase().includes(k.toLowerCase())
  );

  return (
    <section>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <h2>ATS Resume Optimizer</h2>
        <p style={{ color: "var(--muted)" }}>
          Paste your resume content to detect ATS keyword gaps.
        </p>

        <textarea
          rows="6"
          placeholder="Paste resume text here..."
          onChange={e => setText(e.target.value)}
          style={{ marginTop: "20px" }}
        />

        <div style={{ marginTop: "24px" }}>
          <strong>Missing Keywords:</strong>
          <ul style={{ marginTop: "10px" }}>
            {missing.length === 0 ? (
              <li style={{ color: "var(--accent)" }}>✔ Resume is ATS-optimized</li>
            ) : (
              missing.map((k, i) => <li key={i}>{k}</li>)
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
