import React from 'react';
import { Home, Compass, BookOpen, ArrowLeftRight, User } from 'lucide-react';
import { MainNavTab } from '../types';

interface M3BottomNavProps {
  currentTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  pendingRequestsCount: number;
}

export const M3BottomNav: React.FC<M3BottomNavProps> = ({
  currentTab,
  onTabChange,
  pendingRequestsCount,
}) => {
  const tabs = [
    { id: 'home' as MainNavTab, label: 'Home', icon: Home },
    { id: 'explore' as MainNavTab, label: 'Explore', icon: Compass },
    { id: 'my_skills' as MainNavTab, label: 'My Skills', icon: BookOpen },
    {
      id: 'requests' as MainNavTab,
      label: 'Requests',
      icon: ArrowLeftRight,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { id: 'profile' as MainNavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-purple-950/40 px-2 pt-1.5 pb-2 transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      aria-label="Bottom Navigation"
    >
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center justify-center w-full py-1 focus:outline-none transition-transform active:scale-95"
            >
              {/* Material 3 Active Pill Indicator */}
              <div
                className={`relative flex items-center justify-center w-14 h-8 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-purple-300 stroke-[2.2]' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {/* Badge for Requests */}
                {tab.badge && (
                  <span className="absolute -top-1 -right-0.5 min-w-[18px] h-[18px] px-1 bg-purple-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'font-semibold text-purple-300' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
