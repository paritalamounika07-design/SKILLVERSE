import React from 'react';
import {
  User,
  Star,
  GraduationCap,
  BookOpen,
  Edit3,
  LogOut,
  ShieldCheck,
  Coins,
  Award,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { Student } from '../../types';

interface MyProfileScreenProps {
  currentStudent: Student;
  skillCoins: number;
  onOpenEditProfile: () => void;
  onOpenCodeInspector: () => void;
  onLogout: () => void;
}

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  currentStudent,
  skillCoins,
  onOpenEditProfile,
  onOpenCodeInspector,
  onLogout,
}) => {
  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-4 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">My Profile</h2>
          <p className="text-xs text-slate-400">Campus peer profile & settings</p>
        </div>

        <button
          onClick={onOpenEditProfile}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-purple-950/50 shadow-md space-y-3.5">
        <div className="flex items-start gap-3.5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-slate-800 shrink-0 shadow-md">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-white truncate">
                {currentStudent.name}
              </h3>
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
            </div>
            <p className="text-xs text-purple-300 font-medium">
              {currentStudent.department}
            </p>
            <p className="text-[11px] text-slate-400">
              {currentStudent.year} · {currentStudent.university}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-xs font-mono font-bold text-amber-400">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {currentStudent.rating}
              </div>
              <span className="text-[11px] text-slate-400">
                ({currentStudent.reviewCount} peer reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60">
          {currentStudent.bio}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
            <div className="text-base font-bold text-purple-300 font-mono">
              {currentStudent.skillsOffered.length}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Teaching</div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-900/40">
            <div className="text-base font-bold text-indigo-300 font-mono">
              {currentStudent.skillsWanted.length}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Learning</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-900/40">
            <div className="text-base font-bold text-amber-300 font-mono">
              {skillCoins}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">SkillCoins</div>
          </div>
        </div>
      </div>

      {/* Skills & Interests Summary */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
            Skills I Teach
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentStudent.skillsOffered.map((skill) => (
              <span
                key={skill.id}
                className="px-2.5 py-1 rounded-xl bg-purple-950/80 border border-purple-800/50 text-purple-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] text-amber-300 font-mono">
                  {skill.costPerSession}c
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
            Skills I Want to Learn
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentStudent.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Android Jetpack Compose Architecture Banner */}
      <div
        onClick={onOpenCodeInspector}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-slate-900 border border-purple-600/40 flex items-center justify-between gap-3 cursor-pointer hover:border-purple-500 transition-colors shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              Native Android Jetpack Compose
            </h4>
            <p className="text-[10px] text-purple-300">
              View & copy Kotlin source code architecture
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-purple-400" />
      </div>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-2xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Log Out of Demo Account</span>
        </button>
      </div>
    </div>
  );
};
