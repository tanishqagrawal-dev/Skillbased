
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Briefcase, Globe } from 'lucide-react';

const CHART_DATA = [
  { name: 'Jan', score: 40 }, { name: 'Feb', score: 45 }, { name: 'Mar', score: 60 },
  { name: 'Apr', score: 75 }, { name: 'May', score: 78 }, { name: 'Jun', score: 88 },
];

const SKILL_DATA = [
  { subject: 'React', A: 120, fullMark: 150 }, { subject: 'Node', A: 98, fullMark: 150 },
  { subject: 'Python', A: 86, fullMark: 150 }, { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'DevOps', A: 85, fullMark: 150 }, { subject: 'DSA', A: 65, fullMark: 150 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "ATS Readiness", val: "88%", icon: Activity, color: "text-cyan-400" },
          { label: "Eligible Jobs", val: "14", icon: Briefcase, color: "text-green-400" },
          { label: "Profile Views", val: "342", icon: Globe, color: "text-purple-400" }
        ].map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="glass-card"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{s.label}</p>
                <h3 className={`text-4xl font-bold mt-2 ${s.color}`}>{s.val}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-lg"><s.icon className={s.color} /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6 text-white">Performance Trajectory</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '12px'}} />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6 text-white">Skill Matrix</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#334155" />
                <Radar name="Skills" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
