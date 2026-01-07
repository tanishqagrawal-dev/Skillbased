export default function IntelligenceFlow() {
  const steps = [
    {
      title: "Resume Parsing",
      desc: "Extracts skills, experience, keywords, and structure from the resume using intelligent parsing."
    },
    {
      title: "ATS Simulation",
      desc: "Simulates how Applicant Tracking Systems filter resumes before recruiters see them."
    },
    {
      title: "Skill Gap Mapping",
      desc: "Compares your profile against real job requirements to detect missing skills."
    },
    {
      title: "Job Fit Scoring",
      desc: "Generates a company-aware readiness score before you apply."
    }
  ];

  return (
    <section>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <h2>How SkillHire Thinks</h2>
        <p style={{ color: "var(--muted)", marginTop: "12px" }}>
          We replicate real hiring logic so students understand the system before applying.
        </p>

        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px"
          }}
        >
          {steps.map((s, i) => (
            <div key={i} className="panel">
              <strong>{s.title}</strong>
              <p style={{ marginTop: "10px", color: "var(--muted)", lineHeight: "1.6" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
