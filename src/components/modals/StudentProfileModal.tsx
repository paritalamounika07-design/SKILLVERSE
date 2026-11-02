import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  Coins,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { Student } from '../../types';

interface StudentProfileModalProps {
  student: Student | null;
  onClose: () => void;
  onRequestExchange: (student: Student) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onRequestExchange,
}) => {
  if (!student) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
        {/* Backdrop tap to close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Bottom Sheet Card */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-md max-h-[85vh] bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-purple-900/50 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Drag Handle */}
          <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto my-2.5 shrink-0"></div>

          {/* Header Bar */}
          <div className="px-4 pb-2 flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Student Peer Profile
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* Student Hero Lockup */}
            <div className="flex items-start gap-3.5">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-slate-800 shrink-0 shadow-md">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {student.online && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white truncate">
                    {student.name}
                  </h3>
                  <span title="Verified Campus Student">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-medium">
                  {student.department}
                </p>
                <p className="text-[11px] text-slate-400">
                  {student.year} · {student.university}
                </p>

                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{student.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({student.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                About
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {student.bio}
              </p>
            </div>

            {/* Skills Offered */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  Skills Offered to Teach
                </span>
                <span className="text-[11px] text-amber-300 font-mono">
                  Virtual SkillCoins
                </span>
              </div>

              <div className="space-y-2">
                {student.skillsOffered.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-purple-950/50 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {skill.name}
                        </span>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>{skill.costPerSession} Coins</span>
                      </div>
                    </div>
                    {skill.description && (
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Skills Wanted to Learn
              </span>
              <div className="flex flex-wrap gap-1.5">
                {student.skillsWanted.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  Peer Endorsements ({student.reviews.length})
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Verified Sessions
                </span>
              </div>

              <div className="space-y-2">
                {student.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">
                          {review.authorName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({review.authorDepartment})
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400 font-mono text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 italic">
                      "{review.comment}"
                    </p>
                    <span className="text-[10px] text-slate-500 block">
                      {review.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom CTA */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/95 flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onRequestExchange(student);
              }}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 active:scale-[0.98] transition-all"
            >
              <span>Request Skill Exchange</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
