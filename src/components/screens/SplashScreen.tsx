import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { APP_LOGO } from '../../data/mockData';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center px-6 py-10 bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 text-center relative overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Campus tag at top */}
      <div className="z-10 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/50 text-purple-300">
          Peer-to-Peer Campus Network
        </span>
      </div>

      {/* Main Hero Branding */}
      <div className="flex flex-col items-center z-10 my-auto">
        {/* Animated App Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_40px_rgba(124,58,237,0.35)] p-1 bg-gradient-to-br from-purple-900/60 to-slate-900">
            <img
              src={APP_LOGO}
              alt="SkillVerse Emblem"
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-600 border-2 border-slate-950 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-4 h-4 text-purple-200" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-3xl font-extrabold tracking-tight text-white mb-2"
        >
          Skill<span className="text-purple-400">Verse</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-sm font-medium text-purple-200/90 tracking-wide max-w-[260px]"
        >
          Learn One. Teach One. Grow Together.
        </motion.p>

        {/* Sub-description */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-xs text-slate-400 mt-4 max-w-xs leading-relaxed"
        >
          Exchange college knowledge without money. Earn virtual SkillCoins by teaching and spend them to learn from your peers.
        </motion.p>
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="w-full z-10 pb-4"
      >
        <button
          onClick={onContinue}
          className="w-full h-13 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(124,58,237,0.4)] active:scale-[0.98] transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 text-purple-200" />
        </button>
        <p className="text-[11px] text-slate-500 mt-3">
          Powered by Jetpack Compose Material 3 UI
        </p>
      </motion.div>
    </div>
  );
};
