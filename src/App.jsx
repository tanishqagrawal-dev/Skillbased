import { useState } from "react";

import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

import Hero from "./components/Hero";
import IntelligenceFlow from "./components/IntelligenceFlow";
import CompanyMatrix from "./components/CompanyMatrix";
import ATSOptimizer from "./components/ATSOptimizer";
import EligibilityChecker from "./components/EligibilityChecker";
import CourseRecommender from "./components/CourseRecommender";
import CareerSimulator from "./components/CareerSimulator";
import ResumeUpload from "./components/ResumeUpload";
import FinalCTA from "./components/FinalCTA";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  if (page === "signin") return <SignIn setUser={setUser} setPage={setPage} />;
  if (page === "profile") return <Profile user={user} setPage={setPage} />;

  return (
    <>
      <Hero setPage={setPage} />
      <IntelligenceFlow />
      <CompanyMatrix />
      <ATSOptimizer />
      <EligibilityChecker />
      <CourseRecommender />
      <CareerSimulator />
      <ResumeUpload />
      <FinalCTA setPage={setPage} />
    </>
  );
}
