export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'module' | 'quiz' | 'challenge' | 'streak' | 'special';
  requirement: string;
  points: number;
}

export const badges: Badge[] = [
  // Module completion badges
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌱',
    category: 'module',
    requirement: 'Complete 1 lesson',
    points: 10,
  },
  {
    id: 'fundamentals-master',
    name: 'Fundamentals Master',
    description: 'Complete Introduction, AI Fundamentals, and Machine Learning',
    icon: '🧠',
    category: 'module',
    requirement: 'Complete 3 foundation lessons',
    points: 30,
  },
  {
    id: 'deep-diver',
    name: 'Deep Diver',
    description: 'Complete Deep Learning, Generative AI, and LLMs',
    icon: '🔬',
    category: 'module',
    requirement: 'Complete 3 advanced lessons',
    points: 30,
  },
  {
    id: 'tool-user',
    name: 'Tool User',
    description: 'Complete AI Tools, Electronics Applications, and Prompt Engineering',
    icon: '🛠',
    category: 'module',
    requirement: 'Complete 3 application lessons',
    points: 30,
  },
  {
    id: 'full-graduate',
    name: 'Workshop Graduate',
    description: 'Complete all 19 workshop modules',
    icon: '🎓',
    category: 'module',
    requirement: 'Complete all modules',
    points: 100,
  },

  // Quiz badges
  {
    id: 'quiz-ace',
    name: 'Quiz Ace',
    description: 'Score 100% on the workshop quiz',
    icon: '💯',
    category: 'quiz',
    requirement: '100% quiz score',
    points: 50,
  },
  {
    id: 'quiz-pass',
    name: 'Quiz Pass',
    description: 'Score 80% or higher on the workshop quiz',
    icon: '✅',
    category: 'quiz',
    requirement: '80%+ quiz score',
    points: 25,
  },
  {
    id: 'quiz-retry',
    name: 'Persistent Learner',
    description: 'Retake the quiz after initially failing',
    icon: '💪',
    category: 'quiz',
    requirement: 'Retake quiz after <80% score',
    points: 10,
  },

  // Challenge badges
  {
    id: 'first-challenge',
    name: 'Challenge Accepted',
    description: 'Complete your first engineering challenge',
    icon: '⚡',
    category: 'challenge',
    requirement: 'Complete 1 challenge',
    points: 15,
  },
  {
    id: 'prompt-crafter',
    name: 'Prompt Crafter',
    description: 'Copy and use 5 AI prompts from the library',
    icon: '✍️',
    category: 'challenge',
    requirement: 'Copy 5 prompts',
    points: 15,
  },

  // Streak badges
  {
    id: 'week-streak',
    name: 'Weekly Warrior',
    description: 'Study for 7 consecutive days',
    icon: '🔥',
    category: 'streak',
    requirement: '7-day study streak',
    points: 20,
  },

  // Special badges
  {
    id: 'lab-builder',
    name: 'Lab Builder',
    description: 'Build your first circuit in the Electronics Lab',
    icon: '🔌',
    category: 'special',
    requirement: 'Complete 1 Electronics Lab activity',
    points: 15,
  },
  {
    id: 'interview-ready',
    name: 'Interview Ready',
    description: 'Review 10 interview questions',
    icon: '💼',
    category: 'special',
    requirement: 'Review 10 interview questions',
    points: 20,
  },
  {
    id: 'project-planner',
    name: 'Project Planner',
    description: 'Explore all 4 project domains in Project Builder',
    icon: '📋',
    category: 'special',
    requirement: 'View all 4 project domains',
    points: 10,
  },
  {
    id: 'component-expert',
    name: 'Component Expert',
    description: 'View all components in the Component Encyclopedia',
    icon: '🔧',
    category: 'special',
    requirement: 'View all 5 component pages',
    points: 15,
  },
];

export const badgeCategories = [
  { id: 'all', label: 'All Badges', icon: '🏆' },
  { id: 'module', label: 'Modules', icon: '📚' },
  { id: 'quiz', label: 'Quiz', icon: '📝' },
  { id: 'challenge', label: 'Challenges', icon: '⚡' },
  { id: 'streak', label: 'Streaks', icon: '🔥' },
  { id: 'special', label: 'Special', icon: '✨' },
] as const;
