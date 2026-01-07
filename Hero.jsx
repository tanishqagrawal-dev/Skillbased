import NeuralBackground from "./NeuralBackground";

export default function Hero({ setPage }) {
  return (
    <section style={{ minHeight: "100vh", position: "relative" }}>
      <NeuralBackground />

      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "1.2fr .8fr",
        gap: "60px",
        position: "relative"
      }}>
        <div>
          <h1>
            Stop Applying Blindly.<br />
            <span style={{ color: "var(--primary)" }}>
              Apply With Intelligence.
            </span>
          </h1>

          <p style={{ marginTop: "24px", color: "var(--muted)" }}>
            SkillHire shows why resumes fail and what to fix before applying.
          </p>

          <button style={{ marginTop: "32px" }} onClick={() => setPage("signin")}>
            Sign In to Analyze
          </button>
        </div>

        <div className="panel">
          <h4>Live Readiness</h4>
          <div style={{ marginTop: "16px", height: "8px", background: "rgba(255,255,255,.2)" }}>
            <div style={{ width: "78%", height: "100%", background: "var(--accent)" }} />
          </div>
          <p style={{ marginTop: "12px", color: "var(--muted)" }}>
            78% Role Compatibility
          </p>
        </div>
      </div>
    </section>
  );
}
