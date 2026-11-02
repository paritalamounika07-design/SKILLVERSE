import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Coins,
  ChevronRight,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { Student, SkillCategory } from '../../types';
import { SKILL_CATEGORIES } from '../../data/mockData';

interface ExploreScreenProps {
  students: Student[];
  selectedCategory: SkillCategory;
  onSelectCategory: (cat: SkillCategory) => void;
  onSelectStudent: (student: Student) => void;
  onRequestExchange: (student: Student) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  students,
  selectedCategory,
  onSelectCategory,
  onSelectStudent,
  onRequestExchange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter students by category and search query
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' ||
        student.skillsOffered.some((s) => s.category === selectedCategory);

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesName = student.name.toLowerCase().includes(query);
      const matchesDept = student.department.toLowerCase().includes(query);
      const matchesSkills = student.skillsOffered.some(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      );
      const matchesWanted = student.skillsWanted.some((w) =>
        w.toLowerCase().includes(query)
      );

      return matchesCategory && (matchesName || matchesDept || matchesSkills || matchesWanted);
    });
  }, [students, selectedCategory, searchQuery]);

  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-4 overflow-y-auto no-scrollbar">
      {/* Search Input (Material 3 Search Bar) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search skills, peers, departments..."
          className="w-full h-11 pl-10 pr-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-full bg-slate-800"
          >
            Clear
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroller */}
      <div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {SKILL_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800/80 hover:border-purple-600/30'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Subtitle */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white font-mono">{filteredStudents.length}</strong> peers
          {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
        </span>
        <span className="text-[11px] text-purple-300">Tap card to view profile</span>
      </div>

      {/* Students Feed */}
      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-900/40 border border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">No matching skills found</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mb-3">
              Try searching for "Python", "Figma", "Guitar", or switch back to All categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const primarySkill = student.skillsOffered[0];
            return (
              <div
                key={student.id}
                className="rounded-2xl p-4 bg-slate-900/90 border border-slate-800 hover:border-purple-600/40 transition-all shadow-sm space-y-3"
              >
                {/* Header: Student Info */}
                <div
                  onClick={() => onSelectStudent(student)}
                  className="flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-800 shrink-0">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      {student.online && (
                        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {student.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {student.department} · {student.year.split(' ')[0]}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="flex items-center text-amber-400 font-mono font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {student.rating}
                        </span>
                        <span>·</span>
                        <span>{student.reviewCount} peer reviews</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center">
                    Profile
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Skills Offered Section */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Skills Offered:
                  </div>
                  <div className="space-y-1.5">
                    {student.skillsOffered.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-2 rounded-xl bg-slate-950/60 border border-purple-950/40 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-purple-200 truncate">
                              {skill.name}
                            </span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                              {skill.level}
                            </span>
                          </div>
                          {skill.description && (
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                              {skill.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                          <Coins className="w-3 h-3 text-amber-400" />
                          <span>{skill.costPerSession}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted preview */}
                <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">
                    Wants to learn:
                  </span>
                  <span className="text-slate-300 truncate">
                    {student.skillsWanted.join(', ')}
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-colors active:scale-95"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onRequestExchange(student)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/30 active:scale-[0.98] transition-all"
                  >
                    <span>Request Exchange</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
