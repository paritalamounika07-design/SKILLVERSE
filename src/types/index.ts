export type SkillCategory = 
  | 'All'
  | 'Programming'
  | 'Design'
  | 'Communication'
  | 'Music'
  | 'Photography'
  | 'Academics';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  costPerSession: number; // in SkillCoins
  description?: string;
  sessionsCompleted?: number;
}

export interface StudentReview {
  id: string;
  authorName: string;
  authorDepartment: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  department: string;
  year: string;
  university: string;
  bio: string;
  rating: number;
  reviewCount: number;
  skillsOffered: SkillItem[];
  skillsWanted: string[];
  reviews: StudentReview[];
  online: boolean;
}

export type RequestStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Completed';

export interface ExchangeRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderDepartment: string;
  receiverId: string;
  receiverName: string;
  skillName: string;
  category: SkillCategory;
  coins: number;
  durationMinutes: number;
  status: RequestStatus;
  note: string;
  createdAt: string;
  isIncoming: boolean;
}

export interface WalletTransaction {
  id: string;
  title: string;
  peerName: string;
  skillName: string;
  amount: number; // positive for earned, negative for spent
  type: 'EARNED_TEACHING' | 'SPENT_LEARNING' | 'WELCOME_BONUS' | 'CAMPUS_BONUS';
  date: string;
  status: 'Completed' | 'Pending Escrow';
}

export type MainNavTab = 'home' | 'explore' | 'my_skills' | 'requests' | 'profile';
