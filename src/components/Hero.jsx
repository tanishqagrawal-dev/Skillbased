import { motion } from "framer-motion";
import AIBrain from "./AIBrain";

export default function Hero() {
  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative" }}>
      <AIBrain />

      <div style={{
        maxWidth:"1100px", margin:"0 auto", padding:"0 24px",
        display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:"60px", zIndex:1
      }}>
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
          <h1 style={{fontSize:"48px"}}>
            Stop Applying Blindly.<br/>
            <span style={{color:"var(--primary)"}}>Build Job-Fit Confidence.</span>
          </h1>
          <p style={{marginTop:"24px", color:"var(--muted)", maxWidth:"520px"}}>
            SkillHire analyzes resumes, simulates ATS screening, finds skill gaps,
            and guides students before they apply.
          </p>
          <button style={{
            marginTop:"32px", padding:"14px 28px", borderRadius:"14px",
            background:"var(--primary)", color:"white", border:"none"
          }}>
            Analyze My Resume
          </button>
        </motion.div>

        <div style={{
          background:"rgba(255,255,255,0.08)", borderRadius:"24px",
          padding:"32px", backdropFilter:"blur(16px)"
        }}>
          <h4>Career Readiness</h4>
          <div style={{height:"8px", background:"rgba(255,255,255,0.2)", marginTop:"16px"}}>
            <div style={{width:"78%", height:"100%", background:"var(--accent)"}}/>
          </div>
          <p style={{marginTop:"12px", color:"var(--muted)"}}>78% Match</p>
        </div>
      </div>
    </section>
  );
}
