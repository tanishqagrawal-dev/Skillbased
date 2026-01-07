export default function Profile({ user, setPage }) {
  return (
    <section>
      <div className="panel" style={{ maxWidth: "900px", margin: "auto" }}>
        <h2>Profile</h2>

        <p style={{ marginTop: "16px" }}>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <div style={{ marginTop: "32px" }}>
          <h3>Your Status</h3>
          <ul style={{ marginTop: "12px", lineHeight: "1.8" }}>
            <li>ATS Readiness: 78%</li>
            <li>Strong for Startup roles</li>
            <li>Improve System Design</li>
          </ul>
        </div>

        <button style={{ marginTop: "32px" }} onClick={() => setPage("home")}>
          Back to Home
        </button>
      </div>
    </section>
  );
}
