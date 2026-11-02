import React from 'react';
import {
  Coins,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  Gift,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { WalletTransaction } from '../../types';

interface WalletScreenProps {
  skillCoins: number;
  transactions: WalletTransaction[];
  onClaimDailyBonus: () => void;
  hasClaimedDailyBonus: boolean;
  onSimulateTeachSession: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  skillCoins,
  transactions,
  onClaimDailyBonus,
  hasClaimedDailyBonus,
  onSimulateTeachSession,
}) => {
  const totalEarned = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-4 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">SkillCoin Wallet</h2>
        <p className="text-xs text-slate-400">
          Your virtual campus economy balance & transaction history
        </p>
      </div>

      {/* Main Balance Hero Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900/80 via-indigo-950 to-slate-900 border border-purple-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              Available Balance
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
              Campus Active
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              {skillCoins}
            </span>
            <span className="text-sm font-bold text-amber-400">SkillCoins</span>
          </div>

          {/* Earned vs Spent Stats */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-purple-800/40">
            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-purple-900/30 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Earned</div>
                <div className="text-xs font-mono font-bold text-emerald-300 tabular-nums">
                  +{totalEarned} Coins
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-purple-900/30 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Spent</div>
                <div className="text-xs font-mono font-bold text-slate-200 tabular-nums">
                  -{totalSpent} Coins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Demo Coin Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onClaimDailyBonus}
          disabled={hasClaimedDailyBonus}
          className={`p-3 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
            hasClaimedDailyBonus
              ? 'bg-slate-900/60 border-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-850 border-amber-500/40 text-amber-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono font-bold text-amber-400">+10 Coins</span>
          </div>
          <div className="text-xs font-bold text-white">Daily Login Bonus</div>
          <div className="text-[10px] text-slate-400">
            {hasClaimedDailyBonus ? 'Claimed for today' : 'Tap to claim bonus'}
          </div>
        </button>

        <button
          onClick={onSimulateTeachSession}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-purple-950/40 border border-purple-500/40 text-left transition-all active:scale-95 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono font-bold text-emerald-400">+25 Coins</span>
          </div>
          <div className="text-xs font-bold text-white">Teach Demo Session</div>
          <div className="text-[10px] text-slate-400">Simulate teaching peer</div>
        </button>
      </div>

      {/* How SkillCoins Work Guide */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
          <Info className="w-3.5 h-3.5 text-purple-400" />
          <span>How SkillCoins Work</span>
        </div>

        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              1
            </span>
            <p>
              <strong className="text-white">Teach a Peer:</strong> Share your knowledge in Python, Figma, Guitar, etc. and earn SkillCoins directly from students.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              2
            </span>
            <p>
              <strong className="text-white">Learn for Free:</strong> Use your earned SkillCoins to book 1-on-1 tutoring sessions with fellow students.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              3
            </span>
            <p>
              <strong className="text-white">100% Non-Monetary:</strong> Virtual SkillCoins cannot be bought with real money. The only currency is campus collaboration!
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Transaction History
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {transactions.length} records
          </span>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => {
            const isEarned = tx.amount > 0;
            return (
              <div
                key={tx.id}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isEarned
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                    }`}
                  >
                    {isEarned ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {tx.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {tx.peerName} · {tx.skillName}
                    </p>
                    <span className="text-[10px] text-slate-500">{tx.date}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`font-mono font-bold text-xs tabular-nums ${
                      isEarned ? 'text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    {isEarned ? `+${tx.amount}` : tx.amount} Coins
                  </div>
                  <span className="text-[9px] uppercase font-semibold text-slate-500">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
