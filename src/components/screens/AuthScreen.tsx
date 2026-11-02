import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { APP_LOGO } from '../../data/mockData';

interface AuthScreenProps {
  onLoginSuccess: (name: string, email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.chen@campus.edu');
  const [password, setPassword] = useState('student123');
  const [name, setName] = useState('Alex Chen');
  const [department, setDepartment] = useState('Computer Science');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(isSignUp ? name : 'Alex Chen', email);
  };

  const handleDemoLogin = (demoName: string, demoEmail: string) => {
    setName(demoName);
    setEmail(demoEmail);
    onLoginSuccess(demoName, demoEmail);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/40 relative overflow-y-auto no-scrollbar">
      {/* Background ambient blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 my-auto py-4">
        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 border border-purple-500/30 overflow-hidden shadow-lg p-0.5 bg-gradient-to-br from-purple-900 to-slate-900">
            <img
              src={APP_LOGO}
              alt="SkillVerse"
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? 'Join SkillVerse' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-purple-200/80 mt-1 max-w-[260px] mx-auto">
            {isSignUp
              ? 'Start teaching skills, earning SkillCoins, and learning for free.'
              : 'Sign in to access your campus peer skill network.'}
          </p>
        </div>

        {/* Tab Switcher (Login / Sign Up) */}
        <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center mb-5 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              !isSignUp
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isSignUp
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 max-w-sm mx-auto">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full h-11 px-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Campus Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 active:scale-[0.98] transition-all"
          >
            <span>{isSignUp ? 'Create Campus Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* 1-Tap Demo Quick Login */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 max-w-sm mx-auto">
          <p className="text-[11px] text-slate-400 text-center mb-2.5">
            Quick 1-Tap Demo Access:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('Alex Chen', 'alex.chen@campus.edu')}
              className="p-2.5 rounded-xl bg-slate-900 border border-purple-900/40 hover:border-purple-500/50 text-left transition-colors flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                AC
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">Alex Chen</div>
                <div className="text-[10px] text-slate-400 truncate">CS Student · 3rd Yr</div>
              </div>
            </button>

            <button
              onClick={() => handleDemoLogin('Marcus Rivera', 'marcus.rivera@campus.edu')}
              className="p-2.5 rounded-xl bg-slate-900 border border-purple-900/40 hover:border-purple-500/50 text-left transition-colors flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                MR
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">Marcus R.</div>
                <div className="text-[10px] text-slate-400 truncate">Design · 3rd Yr</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="z-10 text-center text-[11px] text-slate-500 py-2">
        <span>Campus peer demonstration · No real credentials stored</span>
      </div>
    </div>
  );
};
