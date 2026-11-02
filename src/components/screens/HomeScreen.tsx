import React from 'react';
import { motion } from 'motion/react';
import {
  Coins,
  Compass,
  BookOpen,
  ArrowLeftRight,
  Sparkles,
  Star,
  ChevronRight,
  TrendingUp,
  Gift,
  Award,
} from 'lucide-react';
import { Student, MainNavTab, SkillCategory } from '../../types';
import { POPULAR_SKILLS } from '../../data/mockData';

interface HomeScreenProps {
  currentStudent: Student;
  skillCoins: number;
  recommendedStudents: Student[];
  pendingRequestsCount: number;
  onNavigate: (tab: MainNavTab) => void;
  onSelectStudent: (student: Student) => void;
  onSelectCategory: (category: SkillCategory) => void;
  onRequestExchange: (student: Student) => void;
  onClaimDailyBonus: () => void;
  hasClaimedDailyBonus: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentStudent,
  skillCoins,
  recommendedStudents,
  pendingRequestsCount,
  onNavigate,
  onSelectStudent,
  onSelectCategory,
  onRequestExchange,
  onClaimDailyBonus,
  hasClaimedDailyBonus,
}) => {
  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-5 overflow-y-auto no-scrollbar">
      {/* 1. Header & Greeting */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Campus Peer Network
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Hello, {currentStudent.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-xs text-slate-400">
            {currentStudent.department} · {currentStudent.year.split(' ')[0]}
          </p>
        </div>

        {/* Quick Avatar pill */}
        <button
          onClick={() => onNavigate('profile')}
          className="relative w-10 h-10 rounded-2xl overflow-hidden border border-purple-500/40 shadow-sm active:scale-95 transition-transform shrink-0"
        >
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      {/* 2. SkillCoin Balance Card (Material 3 Surface) */}
      <div className="relative rounded-3xl p-4.5 bg-gradient-to-br from-purple-900/60 via-indigo-950/70 to-slate-900 border border-purple-500/30 shadow-[0_8px_30px_rgba(124,58,237,0.25)] overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              Virtual SkillCoin Balance
            </span>

            <button
              onClick={() => onNavigate('requests')}
              className="text-[11px] font-semibold text-purple-300 hover:text-white flex items-center gap-0.5"
            >
              Requests
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {skillCoins}
            </span>
            <span className="text-xs font-semibold text-amber-300">SkillCoins</span>
            <span className="text-[10px] text-slate-400 ml-auto">
              100% Peer-to-Peer Zero Money
            </span>
          </div>

          {/* Quick Action row inside balance card */}
          <div className="pt-3 border-t border-purple-800/40 flex items-center gap-2">
            <button
              onClick={onClaimDailyBonus}
              disabled={hasClaimedDailyBonus}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                hasClaimedDailyBonus
                  ? 'bg-slate-800/80 text-slate-400 cursor-not-allowed border border-slate-700/50'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md font-bold active:scale-95'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{hasClaimedDailyBonus ? 'Bonus Claimed' : 'Daily +10 Coins'}</span>
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="py-2 px-3.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/50 border border-purple-700/50 text-purple-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
            >
              <span>Spend Coins</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick Access Hub (4 rounded cards) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Quick Actions
          </h3>
          <span className="text-[11px] text-purple-400 font-medium">Campus Hub</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => onNavigate('explore')}
            className="p-3 rounded-2xl bg-slate-900/80 border border-purple-950/60 hover:border-purple-600/50 text-left transition-all active:scale-95 group shadow-sm flex flex-col justify-between h-24"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Explore</div>
              <div className="text-[10px] text-slate-400">Find Skills</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('my_skills')}
            className="p-3 rounded-2xl bg-slate-900/80 border border-purple-950/60 hover:border-purple-600/50 text-left transition-all active:scale-95 group shadow-sm flex flex-col justify-between h-24"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">My Skills</div>
              <div className="text-[10px] text-slate-400">Teach & Learn</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('requests')}
            className="p-3 rounded-2xl bg-slate-900/80 border border-purple-950/60 hover:border-purple-600/50 text-left transition-all active:scale-95 group shadow-sm flex flex-col justify-between h-24 relative"
          >
            {pendingRequestsCount > 0 && (
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold">
                {pendingRequestsCount}
              </span>
            )}
            <div className="w-8 h-8 rounded-xl bg-amber-600/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Requests</div>
              <div className="text-[10px] text-slate-400">Incoming & Out</div>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Recommended Students */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Recommended Peers
            </h3>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-[11px] font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-0.5"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {recommendedStudents.slice(0, 3).map((student) => {
            const primarySkill = student.skillsOffered[0];
            return (
              <div
                key={student.id}
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-purple-600/40 transition-all flex items-center justify-between gap-3 shadow-sm"
              >
                {/* Avatar and Info */}
                <button
                  onClick={() => onSelectStudent(student)}
                  className="flex items-center gap-3 min-w-0 text-left flex-1"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-purple-500/30 shrink-0 bg-slate-800">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {student.online && (
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">
                        {student.name}
                      </span>
                      <div className="flex items-center text-[11px] font-semibold text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                        {student.rating}
                      </div>
                    </div>

                    <p className="text-[11px] text-purple-300 font-medium truncate">
                      Teaches: {primarySkill ? primarySkill.name : 'Multiple Skills'}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{student.department.split('&')[0]}</span>
                      <span>·</span>
                      <span className="text-amber-300 font-mono font-medium">
                        {primarySkill ? `${primarySkill.costPerSession} Coins` : '25 Coins'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Request Exchange Button */}
                <button
                  onClick={() => onRequestExchange(student)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 text-xs font-semibold active:scale-95 transition-all shrink-0"
                >
                  Request
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Popular Skills on Campus */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Popular on Campus
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Top Trending</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.map((skill) => (
            <button
              key={skill.name}
              onClick={() => {
                onSelectCategory(skill.category as SkillCategory);
                onNavigate('explore');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/30 text-slate-300 hover:text-white text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>{skill.name}</span>
              <span className="text-[10px] text-purple-400 font-mono">
                {skill.learners} peers
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
