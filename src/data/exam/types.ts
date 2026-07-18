export type ExamMode = 'timed-exam' | 'practice' | 'mock-interview' | 'adaptive-drills';

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type QuestionCategory = 'embedded-systems' | 'pcb-design' | 'ai-ml' | 'iot' | 'fpga' | 'signal-processing' | 'rtos' | 'power-electronics';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  tags: string[];
  relatedLesson?: string;
  codeSnippet?: string;
  imageUrl?: string;
  // For interview questions
  starCriteria?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  // For adaptive drills
  conceptId?: string;
}

export interface ExamQuestion extends Question {
  // Additional exam-specific fields
  points?: number;
  timeEstimate?: number; // seconds
}

export interface ExamSession {
  id: string;
  mode: ExamMode;
  startedAt: number;
  endedAt?: number;
  pausedAt?: number;
  totalPausedDuration: number;
  questions: ExamQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  startTime: number;
  timeLimit?: number; // milliseconds
  // Practice mode
  selectedTopics?: QuestionCategory[];
  selectedDifficulty?: QuestionDifficulty;
  // Adaptive drills
  dailyGoal?: number;
  streak?: number;
  // Interview
  interviewScores?: InterviewScore[];
}

export interface InterviewScore {
  questionId: string;
  starScore: {
    situation: number; // 0-2
    task: number; // 0-2
    action: number; // 0-3
    result: number; // 0-3
  };
  totalScore: number; // 0-10
  feedback: string;
}

export interface ExamResult {
  sessionId: string;
  mode: ExamMode;
  score: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  timeTaken: number; // milliseconds
  timeLimit?: number;
  categoryBreakdown: Record<QuestionCategory, { correct: number; total: number }>;
  difficultyBreakdown: Record<QuestionDifficulty, { correct: number; total: number }>;
  completedAt: number;
  // Interview specific
  interviewScores?: InterviewScore[];
  avgStarScore?: number;
  // Adaptive drills specific
  streaks?: number;
  masteryGain?: Record<string, number>;
}

export interface DailyDrillProgress {
  date: string; // YYYY-MM-DD
  questionsCompleted: number;
  correctCount: number;
  timeSpent: number; // seconds
  streak: number;
  conceptsReviewed: string[];
}

export interface UserExamProgress {
  totalExamsTaken: number;
  timedExamBest: number; // percentage
  practiceQuestionsDone: number;
  interviewBest: number; // avg STAR score
  adaptiveDrillStreak: number;
  lastDrillDate: string | null;
  conceptMastery: Record<string, number>; // 0-100
  examHistory: ExamResult[];
  dailyDrills: DailyDrillProgress[];
}