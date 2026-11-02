import React from 'react';
import { Coins, Code2, Sparkles, ChevronLeft } from 'lucide-react';
import { APP_LOGO } from '../data/mockData';

interface M3TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  skillCoins: number;
  onOpenWallet: () => void;
  onOpenCodeInspector: () => void;
}

export const M3TopBar: React.FC<M3TopBarProps> = ({
  title,
  showBack,
  onBack,
  skillCoins,
  onOpenWallet,
  onOpenCodeInspector,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-purple-950/30 px-4 py-2.5 flex items-center justify-between gap-3">
      {/* Left: Back button OR Logo & Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-purple-500/30 bg-purple-950/50 flex items-center justify-center shadow-inner shrink-0">
              <img
                src={APP_LOGO}
                alt="SkillVerse"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
              SkillVerse
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
                Compose M3
              </span>
            </span>
          </div>
        )}

        {showBack && title && (
          <h1 className="text-base font-semibold text-white truncate">{title}</h1>
        )}
      </div>

      {/* Right Actions: Kotlin Code Inspector + SkillCoin Pill */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCodeInspector}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-950/60 text-purple-200 border border-purple-700/40 hover:bg-purple-900/60 transition-colors active:scale-95 shadow-sm"
          title="Inspect Jetpack Compose Kotlin Code"
        >
          <Code2 className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Kotlin Code</span>
        </button>

        <button
          onClick={onOpenWallet}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/40 hover:border-amber-400/70 text-amber-300 hover:text-amber-200 transition-all active:scale-95 shadow-sm"
          title="Open SkillCoin Wallet"
        >
          <Coins className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
          <span className="font-mono font-bold text-xs tabular-nums text-white">
            {skillCoins}
          </span>
          <span className="text-[10px] text-amber-300/80 font-medium">Coins</span>
        </button>
      </div>
    </header>
  );
};
