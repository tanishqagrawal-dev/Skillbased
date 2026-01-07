
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  LayoutDashboard, User, FileText, Activity, Shield, LogOut, 
  Briefcase, Zap, Globe, Cpu, ChevronRight, Lock, Bell 
} from 'lucide-react';

// --- MOCK DATABASE (Company & User Intelligence) ---

const COMPANY_DATA = [
  { name: "Google", role: "SDE I", cutoff: 88, applied: 12045, hired: 140, trend: "High" },
  { name: "Amazon", role: "Frontend Eng", cutoff: 82, applied: 9032, hired: 320, trend: "Medium" },
  { name: "Netflix", role: "UI Engineer", cutoff: 92, applied: 5002, hired: 45, trend: "Low" },
  { name: "Microsoft", role: "Azure Dev", cutoff: 85, applied: 15000, hired: 500, trend: "Very High" },
];

const SKILL_DATA = [
  { subject: 'React', A: 120, fullMark: 150 },
  { subject: 'Node.js', A: 98, fullMark: 150 },
  { subject: 'Python', A: 86, fullMark: 150 },
  { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'DevOps', A: 65, fullMark: 150 },
  { subject: 'DSA', A: 110, fullMark: 150 },
];

const GROWTH_DATA = [
  { name: 'Jan', score: 40 },
  { name: 'Feb', score: 45 },
  { name: 'Mar', score: 55 },
  { name: 'Apr', score: 70 },
  { name: 'May', score: 72 },
  { name: 'Jun', score: 85 },
];

// --- COMPONENTS ---

const Sidebar = ({ activeTab, setActiveTab, user, logout }) => (
  <div className="fixed left-0 top-0 h-full w-20 md:w-64 glass-card border-r border-slate-700 z-50 flex flex-col justify-between py-6">
    <div>
      <div className="flex items-center justify-center md:justify-start md:px-8 mb-10">
        <Cpu className="h-8 w-8 text-cyan-400 animate-pulse" />
        <span className="hidden md:block ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          SkillGap AI
        </span>
      </div>
      
      <nav className="space-y-2 px-2 md:px-4">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'analyzer', icon: FileText, label: 'AI Analyzer' },
          { id: 'companies', icon: Briefcase, label: 'Company Intel' },
          { id: 'profile', icon: User, label: 'Profile Hub' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-center md:justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden md:block ml-3 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>

    <div className="px-4">
      <button onClick={logout} className="w-full flex items-center justify-center md:justify-start px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition">
        <LogOut className="h-5 w-5" />
        <span className="hidden md:block ml-3">Logout</span>
      </button>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="p-6 md:p-10 space-y-8 ml-20 md:ml-64">
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Command Center</h1>
        <p className="text-slate-400">Real-time career telemetry & AI insights</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="glass-card p-2 rounded-full relative">
          <Bell className="h-6 w-6 text-slate-300" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
        </div>
      </div>
    </header>

    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "ATS Readiness", value: "85%", icon: Activity, color: "text-green-400", sub: "+12% from last month" },
        { title: "Jobs Eligible", value: "14", icon: Briefcase, color: "text-purple-400", sub: "Based on current skills" },
        { title: "Profile Views", value: "203", icon: Globe, color: "text-cyan-400", sub: "Recruiters from LinkedIn" }
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-4xl font-bold text-white mt-2">{stat.value}</h3>
              <p className="text-xs text-slate-500 mt-2">{stat.sub}</p>
            </div>
            <div className={`p-3 rounded-xl bg-slate-800/50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Skill Growth Trajectory</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="score" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Skill Balance Radar</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#334155" />
              <Radar name="My Skills" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const CompanyIntel = () => (
  <div className="p-6 md:p-10 ml-20 md:ml-64">
    <h2 className="text-3xl font-bold text-white mb-6">Company Intelligence Database</h2>
    <div className="glass-card overflow-hidden rounded-2xl">
      <table className="w-full text-left">
        <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
          <tr>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">ATS Cutoff</th>
            <th className="px-6 py-4">Applicants</th>
            <th className="px-6 py-4">Hiring Trend</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {COMPANY_DATA.map((company, i) => (
            <tr key={i} className="hover:bg-slate-800/30 transition">
              <td className="px-6 py-4 font-medium text-white">{company.name}</td>
              <td className="px-6 py-4 text-slate-300">{company.role}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                  {company.cutoff}% Min
                </span>
              </td>
              <td className="px-6 py-4 text-slate-300">{company.applied.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-bold ${company.trend === 'High' || company.trend === 'Very High' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {company.trend}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">Analyze Fit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProfileHub = ({ user }) => (
  <div className="p-6 md:p-10 ml-20 md:ml-64">
    <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end mt-12 space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={user.photo || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"} 
          className="w-32 h-32 rounded-full border-4 border-slate-900 shadow-2xl bg-slate-800"
          alt="Profile"
        />
        <div className="text-center md:text-left mb-2">
          <h2 className="text-3xl font-bold text-white">{user.name}</h2>
          <p className="text-slate-400 flex items-center justify-center md:justify-start mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Open to Work • Full Stack Developer
          </p>
        </div>
        <div className="flex-grow"></div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 transition">Edit Profile</button>
          <button className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition shadow-[0_0_15px_rgba(6,182,212,0.5)]">Public View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Digital Footprint</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-400 text-sm">Email Linked</span>
              <span className="text-white font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-400 text-sm">GitHub Status</span>
              <span className="text-green-400 font-medium flex items-center"><Shield className="w-3 h-3 mr-1"/> Verified</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-400 text-sm">LinkedIn</span>
              <span className="text-blue-400 font-medium cursor-pointer">Connected</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Recent Web Activity (Job Related)</h3>
          <ul className="space-y-3">
             {[
               { site: "leetcode.com/problemset", time: "2 hours ago" },
               { site: "careers.google.com", time: "5 hours ago" },
               { site: "reactjs.org/docs", time: "Yesterday" }
             ].map((visit, i) => (
               <li key={i} className="flex items-center text-sm">
                 <Globe className="w-4 h-4 text-slate-500 mr-3" />
                 <span className="text-cyan-300 mr-auto hover:underline cursor-pointer">{visit.site}</span>
                 <span className="text-slate-500 text-xs">{visit.time}</span>
               </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Analyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 78,
        match: "Moderate",
        keywords: ["React", "Tailwind", "Node"],
        missing: ["Docker", "AWS", "TypeScript"]
      });
    }, 2500);
  };

  return (
    <div className="p-6 md:p-10 ml-20 md:ml-64 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl">
        {!result ? (
          <div className="glass-card p-8 rounded-2xl text-center">
             <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-6 relative">
                <Zap className={`h-10 w-10 text-cyan-400 ${analyzing ? 'animate-bounce' : ''}`} />
                {analyzing && (
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
                )}
             </div>
             <h2 className="text-3xl font-bold text-white mb-2">{analyzing ? "AI is Scanning Resume..." : "Upload Resume & JD"}</h2>
             <p className="text-slate-400 mb-8">Our Deep Learning model will cross-reference 50+ data points.</p>
             
             {!analyzing && (
               <button 
                 onClick={runAnalysis}
                 className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-[1.02] transition-transform"
               >
                 Start Analysis
               </button>
             )}
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 rounded-2xl"
          >
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-white">Analysis Complete</h2>
                   <p className="text-slate-400">Target Role: Frontend Engineer</p>
                </div>
                <div className="text-right">
                   <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">{result.score}%</div>
                   <div className="text-xs text-slate-500 uppercase tracking-widest">Match Score</div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                   <h4 className="text-red-400 font-bold mb-2 text-sm uppercase">Missing Skills</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.missing.map(m => <span key={m} className="px-2 py-1 bg-red-500/20 rounded text-xs text-red-300">{m}</span>)}
                   </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                   <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">Detected Keywords</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.keywords.map(m => <span key={m} className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">{m}</span>)}
                   </div>
                </div>
             </div>

             <button onClick={() => setResult(null)} className="w-full py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Scan Another</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const LoginScreen = ({ login }) => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Animated Background Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

    <div className="glass-card p-10 rounded-3xl w-full max-w-md relative z-10 border border-slate-700/50">
      <div className="text-center mb-10">
        <div className="inline-flex p-4 rounded-full bg-slate-800/50 mb-4 ring-1 ring-slate-700">
          <Cpu className="h-10 w-10 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">SkillGap AI</h1>
        <p className="text-slate-400">The Future of Career Readiness</p>
      </div>

      <button 
        onClick={login}
        className="w-full flex items-center justify-center space-x-3 bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6 w-6" alt="Google" />
        <span>Continue with Google</span>
      </button>

      <div className="mt-8 text-center text-xs text-slate-500">
        <p>Protected by reCAPTCHA Enterprise</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = () => {
    setUser({
      name: "Alex Johnson",
      email: "alex.j@skillgap.ai",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      id: "USER_88291"
    });
  };

  return (
    <Router>
      {!user ? (
        <LoginScreen login={handleLogin} />
      ) : (
        <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} logout={() => setUser(null)} />
          
          <main className="relative z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'analyzer' && <Analyzer />}
                {activeTab === 'companies' && <CompanyIntel />}
                {activeTab === 'profile' && <ProfileHub user={user} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
