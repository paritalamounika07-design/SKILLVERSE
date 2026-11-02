import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins, Clock, Send, Sparkles, AlertCircle } from 'lucide-react';
import { Student, SkillItem } from '../../types';

interface RequestExchangeModalProps {
  student: Student | null;
  currentUserCoins: number;
  onClose: () => void;
  onSubmitRequest: (
    student: Student,
    skill: SkillItem,
    durationMinutes: number,
    note: string
  ) => void;
}

export const RequestExchangeModal: React.FC<RequestExchangeModalProps> = ({
  student,
  currentUserCoins,
  onClose,
  onSubmitRequest,
}) => {
  if (!student) return null;

  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(
    student.skillsOffered[0] || {
      id: 'custom',
      name: 'General Mentorship',
      category: 'Academics',
      level: 'Intermediate',
      costPerSession: 20,
    }
  );
  const [duration, setDuration] = useState<number>(45);
  const [note, setNote] = useState('');

  const requiredCoins = selectedSkill.costPerSession;
  const hasEnoughCoins = currentUserCoins >= requiredCoins;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasEnoughCoins) return;
    onSubmitRequest(
      student,
      selectedSkill,
      duration,
      note || `Hi ${student.name}, I'd love to learn ${selectedSkill.name} with you!`
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-md max-h-[85vh] bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-purple-900/50 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto my-2.5 shrink-0"></div>

          {/* Modal Header */}
          <div className="px-4 pb-2 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Request Skill Exchange
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto no-scrollbar">
            {/* Target Peer Summary */}
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-11 h-11 rounded-xl object-cover border border-purple-500/30 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  Peer: {student.name}
                </h4>
                <p className="text-[11px] text-purple-300 truncate">
                  {student.department}
                </p>
                <span className="text-[10px] text-slate-400">
                  {student.skillsOffered.length} skills offered to teach
                </span>
              </div>
            </div>

            {/* Select Skill */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Choose Skill to Learn
              </label>
              <div className="space-y-1.5">
                {student.skillsOffered.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                      selectedSkill.id === skill.id
                        ? 'bg-purple-950/70 border-purple-500 text-white shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-purple-800/50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{skill.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {skill.category} · {skill.level}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-xs text-amber-300">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>{skill.costPerSession}c</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Duration Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Session Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                      duration === mins
                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mins} mins</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Note to Peer */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Personalized Message
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What specific topic or question do you want to tackle together on campus?"
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Cost & Balance Summary */}
            <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Session Cost:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-amber-300">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{requiredCoins} SkillCoins</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-slate-400 text-[11px] block">Your Balance:</span>
                <span
                  className={`font-mono font-bold ${
                    hasEnoughCoins ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {currentUserCoins} Coins
                </span>
              </div>
            </div>

            {!hasEnoughCoins && (
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Not enough SkillCoins. Teach a peer or claim daily bonus!</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!hasEnoughCoins}
              className={`w-full h-12 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                hasEnoughCoins
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white shadow-lg shadow-purple-950/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Exchange Request (-{requiredCoins} Coins Escrow)</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
