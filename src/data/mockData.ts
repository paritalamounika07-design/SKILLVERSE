import { Student, SkillItem, ExchangeRequest, WalletTransaction } from '../types';

export const APP_LOGO = '/src/assets/images/skillverse_logo_1793622570237.jpg';
export const AVATAR_ANANYA = '/src/assets/images/student_avatar_ananya_1793622571410.jpg';
export const AVATAR_MARCUS = '/src/assets/images/student_avatar_marcus_1793622572091.jpg';
export const AVATAR_SOPHIA = '/src/assets/images/student_avatar_sophia_1793622572575.jpg';

export const INITIAL_CURRENT_USER: Student = {
  id: 'user_alex',
  name: 'Alex Chen',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  department: 'Computer Science & Engineering',
  year: '3rd Year (Junior)',
  university: 'Metropolitan Tech University',
  bio: 'Passionate about full-stack web development and UI animations. Love teaching Python and learning creative audio production & public speaking.',
  rating: 4.9,
  reviewCount: 16,
  online: true,
  skillsOffered: [
    {
      id: 'skill_alex_1',
      name: 'Python & Data Structures',
      category: 'Programming',
      level: 'Advanced',
      costPerSession: 25,
      description: 'Hands-on practice with LeetCode patterns, trees, recursion, and clean Pythonic code.',
      sessionsCompleted: 11
    },
    {
      id: 'skill_alex_2',
      name: 'React & Tailwind UI',
      category: 'Programming',
      level: 'Intermediate',
      costPerSession: 20,
      description: 'Build responsive components, custom hooks, and modern frontend design.',
      sessionsCompleted: 5
    }
  ],
  skillsWanted: [
    'UI/UX Prototyping (Figma)',
    'Public Speaking & Debating',
    'Acoustic Guitar Chords',
    'Street Photography'
  ],
  reviews: [
    {
      id: 'rev_1',
      authorName: 'Marcus Rivera',
      authorDepartment: 'Design',
      rating: 5,
      comment: 'Alex explained binary trees so clearly! Helped me ace my midterm coding quiz.',
      date: '2 days ago'
    },
    {
      id: 'rev_2',
      authorName: 'Priya Sharma',
      authorDepartment: 'Electrical Eng.',
      rating: 5,
      comment: 'Patient and encouraging. Highly recommend for any beginner struggling with Python syntax.',
      date: '1 week ago'
    }
  ]
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student_1',
    name: 'Ananya Sharma',
    avatar: AVATAR_ANANYA,
    department: 'Computer Science',
    year: '4th Year (Senior)',
    university: 'Metropolitan Tech University',
    bio: 'Android developer and competitive programmer. Taught 40+ campus peers Kotlin, Jetpack Compose, and Git mastery.',
    rating: 4.9,
    reviewCount: 38,
    online: true,
    skillsOffered: [
      {
        id: 'sk_an_1',
        name: 'Kotlin & Jetpack Compose',
        category: 'Programming',
        level: 'Advanced',
        costPerSession: 30,
        description: 'Native Android architecture, declarative UI state, Coroutines & Flow.',
        sessionsCompleted: 24
      },
      {
        id: 'sk_an_2',
        name: 'Technical Interview Prep',
        category: 'Academics',
        level: 'Advanced',
        costPerSession: 35,
        description: 'Mock interviews, algorithmic problem solving, resume roast.',
        sessionsCompleted: 14
      }
    ],
    skillsWanted: ['Figma UI Design', 'Presentation Skills', 'Graphic Illustration'],
    reviews: [
      {
        id: 'r_an_1',
        authorName: 'Alex Chen',
        authorDepartment: 'CS',
        rating: 5,
        comment: 'Ananya is an absolute wizard with Jetpack Compose state hoisting!',
        date: '3 days ago'
      },
      {
        id: 'r_an_2',
        authorName: 'Liam Vance',
        authorDepartment: 'Info Tech',
        rating: 5,
        comment: 'Her mock interview was tougher than the real thing. I landed my summer internship thanks to her!',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'student_2',
    name: 'Marcus Rivera',
    avatar: AVATAR_MARCUS,
    department: 'Interaction & UI/UX Design',
    year: '3rd Year (Junior)',
    university: 'School of Design & Arts',
    bio: 'Product designer obsessed with micro-interactions, typography, and design systems. Former student design lead.',
    rating: 4.8,
    reviewCount: 29,
    online: true,
    skillsOffered: [
      {
        id: 'sk_ma_1',
        name: 'Figma Auto-Layout & Tokens',
        category: 'Design',
        level: 'Advanced',
        costPerSession: 25,
        description: 'Master auto-layout v5, variables, components, and responsive mobile mockups.',
        sessionsCompleted: 19
      },
      {
        id: 'sk_ma_2',
        name: 'Design System Architecture',
        category: 'Design',
        level: 'Intermediate',
        costPerSession: 25,
        description: 'How to build accessible color palettes, scalable typography, and component libraries.',
        sessionsCompleted: 10
      }
    ],
    skillsWanted: ['React Basics', 'Python for Automation', 'Spanish Conversation'],
    reviews: [
      {
        id: 'r_ma_1',
        authorName: 'Sophia Lee',
        authorDepartment: 'Marketing',
        rating: 5,
        comment: 'Marcus showed me how to structure pitch decks in Figma that look 10x better!',
        date: 'Yesterday'
      }
    ]
  },
  {
    id: 'student_3',
    name: 'Sophia Patel',
    avatar: AVATAR_SOPHIA,
    department: 'Business & Digital Marketing',
    year: '2nd Year (Sophomore)',
    university: 'Metropolitan Tech University',
    bio: 'President of Campus Toastmasters Club. Passionate about helping introverted engineers conquer pitch talks and interviews.',
    rating: 5.0,
    reviewCount: 22,
    online: false,
    skillsOffered: [
      {
        id: 'sk_so_1',
        name: 'Public Speaking & Pitching',
        category: 'Communication',
        level: 'Advanced',
        costPerSession: 20,
        description: 'Overcome stage fright, master vocal modulation, structure compelling 3-minute project pitches.',
        sessionsCompleted: 18
      },
      {
        id: 'sk_so_2',
        name: 'Personal Branding & LinkedIn',
        category: 'Communication',
        level: 'Intermediate',
        costPerSession: 15,
        description: 'Optimize your LinkedIn profile, network with alumni, write impactful cold messages.',
        sessionsCompleted: 4
      }
    ],
    skillsWanted: ['Video Editing', 'Python Data Scraping', 'Podcast Recording'],
    reviews: [
      {
        id: 'r_so_1',
        authorName: 'David Kim',
        authorDepartment: 'Mechanical Eng.',
        rating: 5,
        comment: 'Sophia transformed how I presented my senior capstone project to faculty!',
        date: '4 days ago'
      }
    ]
  },
  {
    id: 'student_4',
    name: 'Julian Alvarez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    department: 'Music & Media Production',
    year: '4th Year (Senior)',
    university: 'City Arts Conservatory',
    bio: 'Guitarist and audio engineer. Teaching acoustic fingerpicking, chord theory, and Ableton Live mixing.',
    rating: 4.9,
    reviewCount: 31,
    online: true,
    skillsOffered: [
      {
        id: 'sk_ju_1',
        name: 'Acoustic Guitar for Beginners',
        category: 'Music',
        level: 'Beginner',
        costPerSession: 20,
        description: 'First chords, rhythm strumming, easy fingerpicking patterns, and song learning.',
        sessionsCompleted: 22
      },
      {
        id: 'sk_ju_2',
        name: 'Audio Mixing & Podcasting',
        category: 'Music',
        level: 'Intermediate',
        costPerSession: 25,
        description: 'EQ, compression, noise removal, and mastering tracks in Reaper or Logic.',
        sessionsCompleted: 9
      }
    ],
    skillsWanted: ['Digital Marketing', 'Calculus Help', 'Web Portfolio'],
    reviews: [
      {
        id: 'r_ju_1',
        authorName: 'Elena Rostova',
        authorDepartment: 'Literature',
        rating: 5,
        comment: 'Learned 4 songs in my first 3 sessions! Julian is remarkably patient.',
        date: '5 days ago'
      }
    ]
  },
  {
    id: 'student_5',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    department: 'Visual Arts & Photography',
    year: '3rd Year (Junior)',
    university: 'School of Design & Arts',
    bio: 'Campus photographer for the university magazine. Love teaching manual camera exposure, portrait lighting, and Lightroom CC.',
    rating: 4.7,
    reviewCount: 19,
    online: false,
    skillsOffered: [
      {
        id: 'sk_el_1',
        name: 'Manual Camera & Composition',
        category: 'Photography',
        level: 'Beginner',
        costPerSession: 20,
        description: 'Understanding aperture, shutter speed, ISO, rule of thirds, and golden hour lighting.',
        sessionsCompleted: 15
      },
      {
        id: 'sk_el_2',
        name: 'Lightroom Color Grading',
        category: 'Photography',
        level: 'Intermediate',
        costPerSession: 20,
        description: 'Tone curves, HSL color tuning, batch editing, and cinematic presets.',
        sessionsCompleted: 4
      }
    ],
    skillsWanted: ['C++ Basics', 'Video Animation', 'French Beginner'],
    reviews: [
      {
        id: 'r_el_1',
        authorName: 'Alex Chen',
        authorDepartment: 'CS',
        rating: 5,
        comment: 'Elena took my photography from random phone snaps to crisp, cinematic portraits.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'student_6',
    name: 'Prof. Assistant Ethan Brooks',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    department: 'Applied Mathematics',
    year: 'Graduate / TA',
    university: 'Metropolitan Tech University',
    bio: 'Graduate TA for Differential Equations and Linear Algebra. Passionate about demystifying proof intuition.',
    rating: 5.0,
    reviewCount: 45,
    online: true,
    skillsOffered: [
      {
        id: 'sk_et_1',
        name: 'Calculus II & Linear Algebra',
        category: 'Academics',
        level: 'Advanced',
        costPerSession: 30,
        description: 'Eigenvalues, vector spaces, integration techniques, and exam prep shortcuts.',
        sessionsCompleted: 35
      }
    ],
    skillsWanted: ['Figma Basics', 'German Conversation', 'Rock Climbing Tips'],
    reviews: [
      {
        id: 'r_et_1',
        authorName: 'Kavita Rao',
        authorDepartment: 'Data Science',
        rating: 5,
        comment: 'Ethan made vector calculus actually make visual sense. Highest grade in my batch!',
        date: '3 weeks ago'
      }
    ]
  }
];

export const INITIAL_REQUESTS: ExchangeRequest[] = [
  {
    id: 'req_1',
    senderId: 'student_2',
    senderName: 'Marcus Rivera',
    senderAvatar: AVATAR_MARCUS,
    senderDepartment: 'Interaction Design',
    receiverId: 'user_alex',
    receiverName: 'Alex Chen',
    skillName: 'Python & Data Structures',
    category: 'Programming',
    coins: 25,
    durationMinutes: 45,
    status: 'Pending',
    note: 'Hey Alex! I am working on a script to batch automate SVG exports in Python and getting stuck with dictionaries. Would love a 45-min session this Thursday!',
    createdAt: '15 mins ago',
    isIncoming: true
  },
  {
    id: 'req_2',
    senderId: 'student_5',
    senderName: 'Elena Rostova',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    senderDepartment: 'Visual Arts',
    receiverId: 'user_alex',
    receiverName: 'Alex Chen',
    skillName: 'React & Tailwind UI',
    category: 'Programming',
    coins: 20,
    durationMinutes: 40,
    status: 'Pending',
    note: 'Hi Alex! I want to build a portfolio gallery with smooth filter buttons. Can you teach me the basics of React components?',
    createdAt: '2 hours ago',
    isIncoming: true
  },
  {
    id: 'req_3',
    senderId: 'user_alex',
    senderName: 'Alex Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    senderDepartment: 'Computer Science',
    receiverId: 'student_1',
    receiverName: 'Ananya Sharma',
    skillName: 'Kotlin & Jetpack Compose',
    category: 'Programming',
    coins: 30,
    durationMinutes: 60,
    status: 'Accepted',
    note: 'Hey Ananya, preparing for mobile Android hackathon. Need guidance on Jetpack Compose navigation architecture.',
    createdAt: 'Yesterday',
    isIncoming: false
  },
  {
    id: 'req_4',
    senderId: 'user_alex',
    senderName: 'Alex Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    senderDepartment: 'Computer Science',
    receiverId: 'student_3',
    receiverName: 'Sophia Patel',
    skillName: 'Public Speaking & Pitching',
    category: 'Communication',
    coins: 20,
    durationMinutes: 45,
    status: 'Completed',
    note: 'Practicing for student council election presentation.',
    createdAt: '3 days ago',
    isIncoming: false
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_1',
    title: 'Taught Python Basics',
    peerName: 'David Kim',
    skillName: 'Python & Data Structures',
    amount: 25,
    type: 'EARNED_TEACHING',
    date: 'Today, 2:30 PM',
    status: 'Completed'
  },
  {
    id: 'tx_2',
    title: 'Learned Pitching & Delivery',
    peerName: 'Sophia Patel',
    skillName: 'Public Speaking & Pitching',
    amount: -20,
    type: 'SPENT_LEARNING',
    date: '3 days ago',
    status: 'Completed'
  },
  {
    id: 'tx_3',
    title: 'Campus Daily Activity Bonus',
    peerName: 'SkillVerse Campus',
    skillName: 'Peer Engagement Reward',
    amount: 10,
    type: 'CAMPUS_BONUS',
    date: '4 days ago',
    status: 'Completed'
  },
  {
    id: 'tx_4',
    title: 'Taught Web Layout Basics',
    peerName: 'Kavita Rao',
    skillName: 'React & Tailwind UI',
    amount: 20,
    type: 'EARNED_TEACHING',
    date: 'Last week',
    status: 'Completed'
  },
  {
    id: 'tx_5',
    title: 'SkillVerse Welcome Grant',
    peerName: 'SkillVerse System',
    skillName: 'New Peer Onboarding Grant',
    amount: 100,
    type: 'WELCOME_BONUS',
    date: 'Semester Start',
    status: 'Completed'
  }
];

export const SKILL_CATEGORIES = [
  'All',
  'Programming',
  'Design',
  'Communication',
  'Music',
  'Photography',
  'Academics'
] as const;

export const POPULAR_SKILLS = [
  { name: 'Kotlin & Compose', category: 'Programming', learners: 142 },
  { name: 'Figma Auto-Layout', category: 'Design', learners: 118 },
  { name: 'Public Speaking', category: 'Communication', learners: 94 },
  { name: 'Python for DSA', category: 'Programming', learners: 210 },
  { name: 'Guitar Fundamentals', category: 'Music', learners: 67 },
  { name: 'Calculus II Prep', category: 'Academics', learners: 156 },
  { name: 'Street Photography', category: 'Photography', learners: 53 }
];
