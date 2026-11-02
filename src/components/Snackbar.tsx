import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface SnackbarMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface SnackbarProps {
  message: SnackbarMessage | null;
  onDismiss: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, message.duration || 3500);

    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-20 left-4 right-4 z-50 pointer-events-auto"
        >
          <div className="bg-slate-900 text-slate-50 px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {message.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : message.type === 'info' ? (
                <Info className="w-4 h-4 text-purple-300 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span className="text-xs font-medium text-slate-100 truncate">
                {message.text}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {message.actionLabel && message.onAction && (
                <button
                  onClick={() => {
                    message.onAction?.();
                    onDismiss();
                  }}
                  className="text-xs font-bold text-purple-300 hover:text-purple-200 uppercase tracking-wider px-2 py-1 rounded"
                >
                  {message.actionLabel}
                </button>
              )}
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white p-1 rounded-full transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
