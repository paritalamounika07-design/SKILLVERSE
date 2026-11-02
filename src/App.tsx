/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Student,
  SkillCategory,
  SkillItem,
  MainNavTab,
  ExchangeRequest,
  WalletTransaction,
} from './types';
import {
  INITIAL_CURRENT_USER,
  MOCK_STUDENTS,
  INITIAL_REQUESTS,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import { AndroidFrame, ViewMode } from './components/AndroidFrame';
import { M3TopBar } from './components/M3TopBar';
import { M3BottomNav } from './components/M3BottomNav';
import { Snackbar, SnackbarMessage } from './components/Snackbar';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { MySkillsScreen } from './components/screens/MySkillsScreen';
import { ExchangeRequestsScreen } from './components/screens/ExchangeRequestsScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { MyProfileScreen } from './components/screens/MyProfileScreen';

// Modals
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { RequestExchangeModal } from './components/modals/RequestExchangeModal';
import { AddSkillModal } from './components/modals/AddSkillModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { KotlinInspectorModal, KOTLIN_CODE_SNIPPETS } from './components/modals/KotlinInspectorModal';

export default function App() {
  // App navigation state
  const [appStage, setAppStage] = useState<'splash' | 'auth' | 'main'>('splash');
  const [currentTab, setCurrentTab] = useState<MainNavTab | 'wallet'>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('phone_frame');

  // Application Data State
  const [currentStudent, setCurrentStudent] = useState<Student>(INITIAL_CURRENT_USER);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [requests, setRequests] = useState<ExchangeRequest[]>(INITIAL_REQUESTS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [skillCoins, setSkillCoins] = useState<number>(150);
  const [hasClaimedDailyBonus, setHasClaimedDailyBonus] = useState<boolean>(false);

  // Filters & Selected entities
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [selectedStudentForRequest, setSelectedStudentForRequest] = useState<Student | null>(null);

  // Modals state
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [addSkillType, setAddSkillType] = useState<'teach' | 'learn'>('teach');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isKotlinInspectorOpen, setIsKotlinInspectorOpen] = useState(false);

  // Snackbar notifications
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);

  const showSnackbar = (text: string, type: 'success' | 'info' | 'error' = 'success', actionLabel?: string, onAction?: () => void) => {
    setSnackbar({
      id: Math.random().toString(),
      text,
      type,
      actionLabel,
      onAction,
      duration: 3500,
    });
  };

  // --- Handlers ---

  // Auth flow
  const handleLoginSuccess = (name: string, email: string) => {
    setCurrentStudent((prev) => ({
      ...prev,
      name,
      department: name.includes('Marcus') ? 'Interaction Design' : prev.department,
    }));
    setAppStage('main');
    setCurrentTab('home');
    showSnackbar(`Welcome to campus, ${name.split(' ')[0]}!`, 'success');
  };

  const handleLogout = () => {
    setAppStage('auth');
    showSnackbar('Signed out of demo session', 'info');
  };

  // Claim Daily Bonus
  const handleClaimDailyBonus = () => {
    if (hasClaimedDailyBonus) return;
    setSkillCoins((prev) => prev + 10);
    setHasClaimedDailyBonus(true);
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title: 'Daily Campus Activity Grant',
      peerName: 'SkillVerse System',
      skillName: 'Peer Engagement Bonus',
      amount: 10,
      type: 'CAMPUS_BONUS',
      date: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
    showSnackbar('Claimed +10 SkillCoins daily bonus! 🎉', 'success');
  };

  // Simulate Teach Session bonus
  const handleSimulateTeachSession = () => {
    setSkillCoins((prev) => prev + 25);
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title: 'Taught Campus Peer Session',
      peerName: 'Elena Rostova',
      skillName: 'React & Tailwind UI',
      amount: 25,
      type: 'EARNED_TEACHING',
      date: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);
    showSnackbar('Session completed! Earned +25 SkillCoins! 🪙', 'success');
  };

  // Accept Exchange Request
  const handleAcceptRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Accepted' as const } : r))
    );

    // Credit coins to user for teaching
    setSkillCoins((prev) => prev + req.coins);

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title: `Accepted Exchange: ${req.skillName}`,
      peerName: req.senderName,
      skillName: req.skillName,
      amount: req.coins,
      type: 'EARNED_TEACHING',
      date: 'Just now',
      status: 'Completed',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showSnackbar(
      `Accepted request from ${req.senderName}! Earned +${req.coins} SkillCoins.`,
      'success'
    );
  };

  // Reject Exchange Request
  const handleRejectRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Rejected' as const } : r))
    );
    showSnackbar(
      `Declined exchange request from ${req ? req.senderName : 'student'}`,
      'info'
    );
  };

  // Submit new Outgoing Request
  const handleSubmitExchangeRequest = (
    student: Student,
    skill: SkillItem,
    durationMinutes: number,
    note: string
  ) => {
    if (skillCoins < skill.costPerSession) {
      showSnackbar('Insufficient SkillCoins for this session!', 'error');
      return;
    }

    // Escrow deduct coins
    setSkillCoins((prev) => prev - skill.costPerSession);

    const newRequest: ExchangeRequest = {
      id: `req_${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      senderAvatar: currentStudent.avatar,
      senderDepartment: currentStudent.department,
      receiverId: student.id,
      receiverName: student.name,
      skillName: skill.name,
      category: skill.category,
      coins: skill.costPerSession,
      durationMinutes,
      status: 'Pending',
      note,
      createdAt: 'Just now',
      isIncoming: false,
    };

    setRequests((prev) => [newRequest, ...prev]);

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      title: `Requested: ${skill.name}`,
      peerName: student.name,
      skillName: skill.name,
      amount: -skill.costPerSession,
      type: 'SPENT_LEARNING',
      date: 'Just now',
      status: 'Pending Escrow',
    };
    setTransactions((prev) => [newTx, ...prev]);

    setSelectedStudentForRequest(null);
    showSnackbar(
      `Exchange request sent to ${student.name}! (-${skill.costPerSession} SkillCoins in escrow)`,
      'success',
      'View',
      () => setCurrentTab('requests')
    );
  };

  // Add / Remove Skills
  const handleAddSkillToTeach = (skill: Omit<SkillItem, 'id' | 'sessionsCompleted'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `skill_${Date.now()}`,
      sessionsCompleted: 0,
    };
    setCurrentStudent((prev) => ({
      ...prev,
      skillsOffered: [...prev.skillsOffered, newSkill],
    }));
    showSnackbar(`Added "${newSkill.name}" to your teaching offers!`, 'success');
  };

  const handleAddSkillToLearn = (skillName: string) => {
    if (currentStudent.skillsWanted.includes(skillName)) {
      showSnackbar('This skill is already in your wishlist!', 'info');
      return;
    }
    setCurrentStudent((prev) => ({
      ...prev,
      skillsWanted: [...prev.skillsWanted, skillName],
    }));
    showSnackbar(`Added "${skillName}" to your learning wishlist!`, 'success');
  };

  const handleRemoveSkillToTeach = (skillId: string) => {
    const target = currentStudent.skillsOffered.find((s) => s.id === skillId);
    setCurrentStudent((prev) => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((s) => s.id !== skillId),
    }));
    showSnackbar(`Removed "${target ? target.name : 'skill'}"`, 'info');
  };

  const handleRemoveSkillToLearn = (skillName: string) => {
    setCurrentStudent((prev) => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((s) => s !== skillName),
    }));
    showSnackbar(`Removed "${skillName}" from wishlist`, 'info');
  };

  // Edit Profile
  const handleSaveProfile = (updated: Partial<Student>) => {
    setCurrentStudent((prev) => ({
      ...prev,
      ...updated,
    }));
    showSnackbar('Profile updated successfully!', 'success');
  };

  const pendingIncomingCount = requests.filter(
    (r) => r.isIncoming && r.status === 'Pending'
  ).length;

  // Render Inner Screen Content
  const renderScreen = () => {
    if (appStage === 'splash') {
      return <SplashScreen onContinue={() => setAppStage('auth')} />;
    }

    if (appStage === 'auth') {
      return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // Main 5-tab + Wallet views
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 relative">
        {/* Top App Bar */}
        <M3TopBar
          title={
            currentTab === 'wallet'
              ? 'SkillCoin Wallet'
              : currentTab === 'explore'
              ? 'Explore Skills'
              : currentTab === 'my_skills'
              ? 'My Skills'
              : currentTab === 'requests'
              ? 'Exchange Requests'
              : currentTab === 'profile'
              ? 'Student Profile'
              : undefined
          }
          showBack={currentTab === 'wallet'}
          onBack={() => setCurrentTab('home')}
          skillCoins={skillCoins}
          onOpenWallet={() => setCurrentTab('wallet')}
          onOpenCodeInspector={() => setIsKotlinInspectorOpen(true)}
        />

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {currentTab === 'home' && (
            <HomeScreen
              currentStudent={currentStudent}
              skillCoins={skillCoins}
              recommendedStudents={students}
              pendingRequestsCount={pendingIncomingCount}
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectStudent={(student) => setSelectedStudentForProfile(student)}
              onSelectCategory={(category) => {
                setSelectedCategory(category);
                setCurrentTab('explore');
              }}
              onRequestExchange={(student) => setSelectedStudentForRequest(student)}
              onClaimDailyBonus={handleClaimDailyBonus}
              hasClaimedDailyBonus={hasClaimedDailyBonus}
            />
          )}

          {currentTab === 'explore' && (
            <ExploreScreen
              students={students}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectStudent={(student) => setSelectedStudentForProfile(student)}
              onRequestExchange={(student) => setSelectedStudentForRequest(student)}
            />
          )}

          {currentTab === 'my_skills' && (
            <MySkillsScreen
              currentStudent={currentStudent}
              onRemoveSkillToTeach={handleRemoveSkillToTeach}
              onRemoveSkillToLearn={handleRemoveSkillToLearn}
              onOpenAddSkill={(type) => {
                setAddSkillType(type);
                setIsAddSkillOpen(true);
              }}
            />
          )}

          {currentTab === 'requests' && (
            <ExchangeRequestsScreen
              requests={requests}
              onAcceptRequest={handleAcceptRequest}
              onRejectRequest={handleRejectRequest}
              onSelectStudentByName={(name) => {
                const found = students.find((s) => s.name === name);
                if (found) setSelectedStudentForProfile(found);
              }}
            />
          )}

          {currentTab === 'wallet' && (
            <WalletScreen
              skillCoins={skillCoins}
              transactions={transactions}
              onClaimDailyBonus={handleClaimDailyBonus}
              hasClaimedDailyBonus={hasClaimedDailyBonus}
              onSimulateTeachSession={handleSimulateTeachSession}
            />
          )}

          {currentTab === 'profile' && (
            <MyProfileScreen
              currentStudent={currentStudent}
              skillCoins={skillCoins}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onOpenCodeInspector={() => setIsKotlinInspectorOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </div>

        {/* Material 3 Bottom Navigation Bar */}
        <M3BottomNav
          currentTab={currentTab === 'wallet' ? 'home' : currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
          pendingRequestsCount={pendingIncomingCount}
        />

        {/* Android Snackbar Toast */}
        <Snackbar message={snackbar} onDismiss={() => setSnackbar(null)} />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col">
      {viewMode === 'split_view' ? (
        <div className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden">
          {/* Left: Android App Container */}
          <div className="w-full lg:w-[460px] h-full flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950 shrink-0">
            <AndroidFrame
              viewMode="mobile_full"
              onViewModeChange={setViewMode}
              onOpenCodeInspector={() => setIsKotlinInspectorOpen(true)}
            >
              {renderScreen()}
            </AndroidFrame>
          </div>

          {/* Right: Embedded Jetpack Compose Kotlin Inspector */}
          <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
            <div className="px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  SkillVerse Android Native Jetpack Compose Codebase
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60 font-mono">
                    Kotlin 2.0 · Material 3
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time synchronization with Android UI prototype
                </p>
              </div>

              <button
                onClick={() => setViewMode('phone_frame')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
              >
                Exit Split View
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-purple-200 select-text leading-relaxed">
              <div className="text-slate-500 pb-2 mb-4 border-b border-slate-800 text-xs">
                // MainActivity.kt - Entrypoint with Material 3 Theme & Navigation Compose
              </div>
              <pre className="overflow-x-auto text-xs leading-relaxed text-purple-100">
                {KOTLIN_CODE_SNIPPETS[0].code}
              </pre>

              <div className="text-slate-500 pb-2 my-4 border-b border-slate-800 text-xs">
                // NavGraph.kt - 5-Tab Navigation Compose Architecture
              </div>
              <pre className="overflow-x-auto text-xs leading-relaxed text-purple-100">
                {KOTLIN_CODE_SNIPPETS[1].code}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <AndroidFrame
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenCodeInspector={() => setIsKotlinInspectorOpen(true)}
        >
          {renderScreen()}
        </AndroidFrame>
      )}

      {/* Modals & Dialogs */}
      <StudentProfileModal
        student={selectedStudentForProfile}
        onClose={() => setSelectedStudentForProfile(null)}
        onRequestExchange={(student) => {
          setSelectedStudentForProfile(null);
          setSelectedStudentForRequest(student);
        }}
      />

      <RequestExchangeModal
        student={selectedStudentForRequest}
        currentUserCoins={skillCoins}
        onClose={() => setSelectedStudentForRequest(null)}
        onSubmitRequest={handleSubmitExchangeRequest}
      />

      <AddSkillModal
        isOpen={isAddSkillOpen}
        initialType={addSkillType}
        onClose={() => setIsAddSkillOpen(false)}
        onAddSkillToTeach={handleAddSkillToTeach}
        onAddSkillToLearn={handleAddSkillToLearn}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        currentStudent={currentStudent}
        onClose={() => setIsEditProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      <KotlinInspectorModal
        isOpen={isKotlinInspectorOpen}
        onClose={() => setIsKotlinInspectorOpen(false)}
      />
    </div>
  );
}
