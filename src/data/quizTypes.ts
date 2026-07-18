export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionCategory =
  | 'concept-understanding'
  | 'practical-application'
  | 'debugging-scenarios'
  | 'circuit-reasoning'
  | 'engineering-decisions'
  | 'real-world-situations'
  | 'interview-style'
  | 'industry-oriented';

export interface QuizQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  relatedLesson: string;
  tags: string[];
}
