import { useState } from "react";

const steps = [
  { title:"Resume Input", desc:"Resume is raw input." },
  { title:"ATS Screening", desc:"Most rejections happen here." },
  { title:"Skill Gap", desc:"Mismatch with job skills." },
  { title:"Readiness", desc:"Clear score before applying." }
];

export default function JobFitFlow() {
  const [active,setActive] = useState(0);
  return (
    <section style={{padding:"120px 0"}}>
      <div style={{maxWidth:"1100px",margin:"auto",padding:"0 24px"}}>
        <h2>What Happens to Your Resume</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"48px",marginTop:"40px"}}>
          <div>
            {steps.map((s,i)=>(
              <div key={i} onClick={()=>setActive(i)} style={{
                padding:"16px", marginBottom:"12px", cursor:"pointer",
                background: active===i ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)"
              }}>{s.title}</div>
            ))}
          </div>
          <div style={{background:"rgba(255,255,255,0.08)",padding:"32px"}}>
            {steps[active].desc}
          </div>
        </div>
      </div>
    </section>
  );
}
