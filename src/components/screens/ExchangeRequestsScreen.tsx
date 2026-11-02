import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Coins,
  Send,
  Inbox,
  User,
} from 'lucide-react';
import { ExchangeRequest, Student } from '../../types';

interface ExchangeRequestsScreenProps {
  requests: ExchangeRequest[];
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onSelectStudentByName: (name: string) => void;
}

export const ExchangeRequestsScreen: React.FC<ExchangeRequestsScreenProps> = ({
  requests,
  onAcceptRequest,
  onRejectRequest,
  onSelectStudentByName,
}) => {
  const [tab, setTab] = useState<'incoming' | 'outgoing'>('incoming');

  const incomingRequests = requests.filter((r) => r.isIncoming);
  const outgoingRequests = requests.filter((r) => !r.isIncoming);

  const displayList = tab === 'incoming' ? incomingRequests : outgoingRequests;
  const pendingIncomingCount = incomingRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="flex-1 pb-6 px-4 pt-3 space-y-4 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">Exchange Requests</h2>
        <p className="text-xs text-slate-400">
          Review incoming peer learning requests and track your sent requests
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center">
        <button
          onClick={() => setTab('incoming')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all relative ${
            tab === 'incoming'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Incoming ({incomingRequests.length})</span>
          {pendingIncomingCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setTab('outgoing')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            tab === 'outgoing'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Outgoing ({outgoingRequests.length})</span>
        </button>
      </div>

      {/* Request List */}
      <div className="space-y-3">
        {displayList.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-900/40 border border-slate-800">
            <ArrowLeftRight className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white mb-1">
              No {tab === 'incoming' ? 'incoming' : 'outgoing'} requests
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {tab === 'incoming'
                ? 'When peers request a learning session with you, they will appear here.'
                : 'Browse the Explore screen to request a skill session from fellow students.'}
            </p>
          </div>
        ) : (
          displayList.map((req) => {
            const isPending = req.status === 'Pending';
            const isAccepted = req.status === 'Accepted';
            const isRejected = req.status === 'Rejected';
            const isCompleted = req.status === 'Completed';

            return (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-600/30 transition-all space-y-3 shadow-sm"
              >
                {/* Peer Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-purple-500/30 bg-slate-800 shrink-0">
                      <img
                        src={req.senderAvatar}
                        alt={req.senderName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">
                          {tab === 'incoming' ? req.senderName : `To: ${req.receiverName}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {req.senderDepartment}
                      </p>
                      <span className="text-[10px] text-slate-500">
                        {req.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      isPending
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                        : isAccepted
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                        : isRejected
                        ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                        : 'bg-purple-950/70 text-purple-300 border border-purple-800/60'
                    }`}
                  >
                    {isPending && <Clock className="w-3 h-3 text-amber-400" />}
                    {isAccepted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    {isRejected && <XCircle className="w-3 h-3 text-rose-400" />}
                    {isCompleted && <CheckCircle2 className="w-3 h-3 text-purple-400" />}
                    <span>{req.status}</span>
                  </div>
                </div>

                {/* Skill Details */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-950/30 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-200">
                      Skill: {req.skillName}
                    </span>
                    <div className="flex items-center gap-1 font-mono font-bold text-amber-300">
                      <Coins className="w-3 h-3 text-amber-400" />
                      <span>{req.coins} Coins</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    Session Duration: <strong className="text-slate-300">{req.durationMinutes} mins</strong> · {req.category}
                  </div>

                  {req.note && (
                    <p className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-900 mt-1">
                      "{req.note}"
                    </p>
                  )}
                </div>

                {/* Action Buttons (Only for Incoming Pending requests) */}
                {tab === 'incoming' && isPending && (
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => onRejectRequest(req.id)}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-300 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 border border-slate-700/60"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>

                    <button
                      onClick={() => onAcceptRequest(req.id)}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept (+{req.coins} Coins)</span>
                    </button>
                  </div>
                )}

                {tab === 'incoming' && isAccepted && (
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Accepted! You earned +{req.coins} SkillCoins. Ready for session!</span>
                  </div>
                )}

                {!req.isIncoming && isAccepted && (
                  <div className="text-[11px] text-purple-300 font-medium flex items-center gap-1 bg-purple-950/30 p-2 rounded-xl border border-purple-900/40">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{req.receiverName} accepted your request. Meet on campus!</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
