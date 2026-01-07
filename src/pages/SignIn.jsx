export default function SignIn({ setUser, setPage }) {
  function handleSignIn() {
    setUser({
      name: "Student User",
      email: "student@skillhire.ai"
    });
    setPage("profile");
  }

  return (
    <section style={{ textAlign: "center" }}>
      <div className="panel" style={{ maxWidth: "420px", margin: "auto" }}>
        <h2>Sign In</h2>
        <p style={{ color: "var(--muted)", marginTop: "12px" }}>
          Access your SkillHire dashboard
        </p>

        <input placeholder="Email" style={{ marginTop: "24px" }} />
        <input placeholder="Password" type="password" style={{ marginTop: "16px" }} />

        <button style={{ marginTop: "24px" }} onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </section>
  );
}
