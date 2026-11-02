import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Coins,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Student, SkillItem } from '../../types';

interface MySkillsScreenProps {
  currentStudent: Student;
  onRemoveSkillToTeach: (skillId: string) => void;
  onRemoveSkillToLearn: (skillName: string) => void;
  onOpenAddSkill: (type: 'teach' | 'learn') => void;
}

export const MySkillsScreen: React.FC<MySkillsScreenProps> = ({
  currentStudent,
  onRemoveSkillToTeach,
  onRemoveSkillToLearn,
  onOpenAddSkill,
}) => {
  const [activeTab, setActiveTab] = useState<'teach' | 'learn'>('teach');

  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-4 overflow-y-auto no-scrollbar relative">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">My Skills</h2>
          <p className="text-xs text-slate-400">
            Manage skills you offer to teach or want to learn
          </p>
        </div>

        {/* Add Skill Button */}
        <button
          onClick={() => onOpenAddSkill(activeTab)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Segmented Switcher (Teach vs Learn) */}
      <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center">
        <button
          onClick={() => setActiveTab('teach')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'teach'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Skills I Teach ({currentStudent.skillsOffered.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'learn'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Skills I Want ({currentStudent.skillsWanted.length})</span>
        </button>
      </div>

      {/* Content for "Skills I Teach" */}
      {activeTab === 'teach' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Earn virtual SkillCoins whenever you mentor peers</span>
            <span className="text-amber-300 font-mono font-medium">Earn +Coins</span>
          </div>

          {currentStudent.skillsOffered.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">
              <GraduationCap className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">No teaching skills added yet</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-3">
                Share what you know (coding, design, music, math) and start earning SkillCoins.
              </p>
              <button
                onClick={() => onOpenAddSkill('teach')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 text-white"
              >
                + Add First Skill to Teach
              </button>
            </div>
          ) : (
            currentStudent.skillsOffered.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-600/30 transition-all space-y-2.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white truncate">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Category: {skill.category}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveSkillToTeach(skill.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                    title="Remove Skill"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {skill.description && (
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50">
                    {skill.description}
                  </p>
                )}

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill.sessionsCompleted || 0} sessions taught</span>
                  </div>

                  <div className="flex items-center gap-1 font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>{skill.costPerSession} Coins / session</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content for "Skills I Want to Learn" */}
      {activeTab === 'learn' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Peers will match with you to teach these skills</span>
            <span className="text-purple-300 font-medium">Wishlist</span>
          </div>

          {currentStudent.skillsWanted.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-3">
                Add skills you are curious about to receive peer recommendations.
              </p>
              <button
                onClick={() => onOpenAddSkill('learn')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 text-white"
              >
                + Add Skill to Learn
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {currentStudent.skillsWanted.map((skillName, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-600/30 transition-all flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-800/40 text-purple-300 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {skillName}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Looking for campus peer mentor
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveSkillToLearn(skillName)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                    title="Remove from wishlist"
                    aria-label={`Remove ${skillName}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
