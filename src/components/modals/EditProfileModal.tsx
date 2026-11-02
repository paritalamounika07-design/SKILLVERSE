import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Student } from '../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  currentStudent: Student;
  onClose: () => void;
  onSaveProfile: (updatedData: Partial<Student>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  currentStudent,
  onClose,
  onSaveProfile,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(currentStudent.name);
  const [department, setDepartment] = useState(currentStudent.department);
  const [year, setYear] = useState(currentStudent.year);
  const [bio, setBio] = useState(currentStudent.bio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim(),
      department: department.trim(),
      year: year.trim(),
      bio: bio.trim(),
    });
    onClose();
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

          <div className="px-4 pb-2 flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Edit Student Profile
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto no-scrollbar">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Year & Cohort
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Campus Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
