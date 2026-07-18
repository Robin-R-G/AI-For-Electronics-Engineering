import { standaloneExamEasyQuestions } from './standaloneExamEasy';
import { standaloneExamMediumQuestions } from './standaloneExamMedium';
import { standaloneExamHardQuestions } from './standaloneExamHard';

export { standaloneExamEasyQuestions, standaloneExamMediumQuestions, standaloneExamHardQuestions };

export const standaloneExamQuestions = [
  ...standaloneExamEasyQuestions,
  ...standaloneExamMediumQuestions,
  ...standaloneExamHardQuestions,
];
