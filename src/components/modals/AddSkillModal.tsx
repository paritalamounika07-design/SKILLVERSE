import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, GraduationCap, BookOpen, Coins } from 'lucide-react';
import { SkillCategory, SkillItem } from '../../types';
import { SKILL_CATEGORIES } from '../../data/mockData';

interface AddSkillModalProps {
  isOpen: boolean;
  initialType: 'teach' | 'learn';
  onClose: () => void;
  onAddSkillToTeach: (skill: Omit<SkillItem, 'id' | 'sessionsCompleted'>) => void;
  onAddSkillToLearn: (skillName: string) => void;
}

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  initialType,
  onClose,
  onAddSkillToTeach,
  onAddSkillToLearn,
}) => {
  if (!isOpen) return null;

  const [type, setType] = useState<'teach' | 'learn'>(initialType);
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Programming');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [costPerSession, setCostPerSession] = useState<number>(25);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    if (type === 'teach') {
      onAddSkillToTeach({
        name: skillName.trim(),
        category,
        level,
        costPerSession,
        description: description.trim() || `1-on-1 peer teaching for ${skillName.trim()}`,
      });
    } else {
      onAddSkillToLearn(skillName.trim());
    }
    onClose();
  };

  const validCategories = SKILL_CATEGORIES.filter((c) => c !== 'All');

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

          <div className="px-4 pb-2 flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Add New Campus Skill
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto no-scrollbar">
            {/* Type Switcher */}
            <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center">
              <button
                type="button"
                onClick={() => setType('teach')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  type === 'teach'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Skill I Can Teach</span>
              </button>

              <button
                type="button"
                onClick={() => setType('learn')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  type === 'learn'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Skill I Want to Learn</span>
              </button>
            </div>

            {/* Skill Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Skill Title
              </label>
              <input
                type="text"
                required
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g. Flutter Mobile, Video Editing, Calculus III"
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SkillCategory)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {validCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {type === 'teach' && (
              <>
                {/* Level */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Your Proficiency Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevel(lvl)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          level === lvl
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coin Rate */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      SkillCoin Rate (Per 45m Session)
                    </label>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {costPerSession} SkillCoins
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={costPerSession}
                    onChange={(e) => setCostPerSession(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>10 Coins (Intro)</span>
                    <span>25 Coins (Standard)</span>
                    <span>50 Coins (Advanced)</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    What will you teach? (Brief overview)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Key concepts, practice exercises, or project review you will cover."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-950/40 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>
                {type === 'teach' ? 'Publish Teaching Skill' : 'Add to Learning Wishlist'}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
