import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor, SplitSquareVertical } from 'lucide-react';

export type ViewMode = 'phone_frame' | 'mobile_full' | 'split_view';

interface AndroidFrameProps {
  children: React.ReactNode;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCodeInspector: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  viewMode,
  onViewModeChange,
  onOpenCodeInspector,
}) => {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Meta Toolbar for preview controls */}
      <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-slate-200">Android 14 (API 34)</span>
          <span className="text-slate-500">·</span>
          <span className="text-purple-300 font-mono">Jetpack Compose + Material 3</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onViewModeChange('phone_frame')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'phone_frame'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Google Pixel 8 Pro Frame"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pixel 8 Frame</span>
          </button>
          <button
            onClick={() => onViewModeChange('mobile_full')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'mobile_full'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Full Mobile Canvas"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
          <button
            onClick={() => onViewModeChange('split_view')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'split_view'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Side-by-Side App & Kotlin Code"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Code</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {viewMode === 'phone_frame' ? (
          <div className="relative w-full max-w-[400px] h-[840px] max-h-[92vh] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] border-4 border-slate-700/60 flex flex-col">
            {/* Volume & Power buttons visual indicators on chassis */}
            <div className="absolute -right-2 top-28 w-1 h-12 bg-slate-600 rounded-r-md"></div>
            <div className="absolute -right-2 top-44 w-1 h-20 bg-slate-600 rounded-r-md"></div>

            {/* Inner Phone Screen */}
            <div className="relative flex-1 bg-slate-950 rounded-[38px] overflow-hidden flex flex-col border border-slate-800/80 shadow-inner">
              {/* Android Status Bar */}
              <div className="h-9 px-6 flex items-center justify-between text-xs text-slate-300 font-medium z-30 shrink-0 select-none bg-slate-950/80 backdrop-blur-sm">
                <span>{currentTime}</span>

                {/* Camera Punch Hole */}
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold tracking-tight text-slate-400">5G</span>
                  <Signal className="w-3 h-3 text-slate-300" />
                  <Wifi className="w-3.5 h-3.5 text-slate-300" />
                  <BatteryMedium className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-950">
                {children}
              </div>

              {/* Android Gesture Bar */}
              <div className="h-5 bg-slate-950 flex items-center justify-center shrink-0 z-40 select-none">
                <div className="w-28 h-1 bg-slate-600 hover:bg-slate-500 rounded-full transition-colors cursor-pointer"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[92vh] max-h-[860px] bg-slate-950 rounded-3xl overflow-hidden flex flex-col border border-slate-800 shadow-2xl relative">
            {/* Compact Status Bar */}
            <div className="h-8 px-5 flex items-center justify-between text-xs text-slate-300 font-medium z-30 shrink-0 select-none bg-slate-950/80 backdrop-blur-sm">
              <span>{currentTime}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400">5G</span>
                <Signal className="w-3 h-3 text-slate-300" />
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                <BatteryMedium className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-950">
              {children}
            </div>

            {/* Android Gesture Bar */}
            <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0 z-40 select-none">
              <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
