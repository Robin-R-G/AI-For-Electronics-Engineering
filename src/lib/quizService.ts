'use client';

import { QuizQuestion, Difficulty } from '@/data/quizTypes';

// Import static JSON databases
import aiQuestionsRaw from '@/data/quiz/ai.json';
import embeddedQuestionsRaw from '@/data/quiz/embedded.json';
import pcbQuestionsRaw from '@/data/quiz/pcb.json';
import stm32QuestionsRaw from '@/data/quiz/stm32.json';
import iotQuestionsRaw from '@/data/quiz/iot.json';
import fpgaQuestionsRaw from '@/data/quiz/fpga.json';

// Local storage keys
const CUSTOM_QUESTIONS_KEY = 'workshop_custom_questions_v1';
const ANALYTICS_ANSWERS_KEY = 'workshop_quiz_answers_analytics_v1';

// Add topic information and cast questions to QuizQuestion type
const aiQuestions: QuizQuestion[] = (aiQuestionsRaw as any[]).map(q => ({ ...q, topic: 'AI' }));
const embeddedQuestions: QuizQuestion[] = (embeddedQuestionsRaw as any[]).map(q => ({ ...q, topic: 'Embedded Systems' }));
const pcbQuestions: QuizQuestion[] = (pcbQuestionsRaw as any[]).map(q => ({ ...q, topic: 'PCB Design' }));
const stm32Questions: QuizQuestion[] = (stm32QuestionsRaw as any[]).map(q => ({ ...q, topic: 'STM32' }));
const iotQuestions: QuizQuestion[] = (iotQuestionsRaw as any[]).map(q => ({ ...q, topic: 'IoT' }));
const fpgaQuestions: QuizQuestion[] = (fpgaQuestionsRaw as any[]).map(q => ({ ...q, topic: 'FPGA' }));

export const staticTopicQuestions: QuizQuestion[] = [
  ...aiQuestions,
  ...embeddedQuestions,
  ...pcbQuestions,
  ...stm32Questions,
  ...iotQuestions,
  ...fpgaQuestions
];

// Helper to map old difficulties to new ones
export function mapDifficulty(diff: string): Difficulty {
  if (diff === 'Easy') return 'Beginner';
  if (diff === 'Medium') return 'Intermediate';
  if (diff === 'Hard') return 'Advanced';
  return (diff as Difficulty) || 'Intermediate';
}

/**
 * Loads all questions by merging the static JSON files, base quiz questions,
 * and custom questions stored in localStorage.
 */
export function loadQuestions(baseQuizQuestions: QuizQuestion[] = []): QuizQuestion[] {
  // 1. Get static topic-specific questions
  const staticQuestions = [...staticTopicQuestions];

  // 2. Get base questions mapped to the new difficulty format
  const mappedBaseQuestions = baseQuizQuestions.map(q => ({
    ...q,
    difficulty: mapDifficulty(q.difficulty),
    topic: q.topic || getTopicFromLesson(q.relatedLesson)
  }));

  // 3. Load custom questions from localStorage
  let customQuestions: QuizQuestion[] = [];
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
      if (raw) {
        customQuestions = JSON.parse(raw) as QuizQuestion[];
      }
    } catch (e) {
      console.error('Failed to load custom questions', e);
    }
  }

  // 4. Merge all, avoiding duplicates by ID
  const allQuestionsMap = new Map<string, QuizQuestion>();

  // Base questions first
  mappedBaseQuestions.forEach(q => allQuestionsMap.set(q.id, q));
  // Static JSON questions overwrite/add
  staticQuestions.forEach(q => allQuestionsMap.set(q.id, q));
  // Custom questions overwrite/add
  customQuestions.forEach(q => allQuestionsMap.set(q.id, q));

  return Array.from(allQuestionsMap.values());
}

function getTopicFromLesson(lesson: string): string {
  if (!lesson) return 'AI';
  const l = lesson.toLowerCase();
  if (l.includes('pcb') || l.includes('electronic')) return 'PCB Design';
  if (l.includes('embedded') || l.includes('mcu')) return 'Embedded Systems';
  if (l.includes('iot') || l.includes('sensor')) return 'IoT';
  if (l.includes('fpga') || l.includes('verilog')) return 'FPGA';
  if (l.includes('stm32')) return 'STM32';
  return 'AI';
}

/**
 * Saves a custom question to localStorage (Admin feature).
 */
export function saveCustomQuestion(q: QuizQuestion): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    const list = raw ? (JSON.parse(raw) as QuizQuestion[]) : [];
    
    const index = list.findIndex(item => item.id === q.id);
    if (index >= 0) {
      list[index] = q; // Edit existing
    } else {
      list.push(q); // Add new
    }
    
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('questions-updated'));
  } catch (e) {
    console.error('Failed to save custom question', e);
  }
}

/**
 * Deletes a question (handles both custom deletion and archiving if static).
 */
export function deleteQuestion(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    // Check if it is a custom question and remove it
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    let list = raw ? (JSON.parse(raw) as QuizQuestion[]) : [];
    
    const initialLength = list.length;
    list = list.filter(q => q.id !== id);
    
    if (list.length !== initialLength) {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(list));
    } else {
      // If it's a static question, we can keep track of a "deleted_static_ids" list
      const deletedRaw = localStorage.getItem('workshop_deleted_static_ids') || '[]';
      const deletedIds = JSON.parse(deletedRaw) as string[];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('workshop_deleted_static_ids', JSON.stringify(deletedIds));
      }
    }
    window.dispatchEvent(new Event('questions-updated'));
  } catch (e) {
    console.error('Failed to delete question', e);
  }
}

/**
 * Resets deleted static questions and custom questions.
 */
export function resetQuestions(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CUSTOM_QUESTIONS_KEY);
  localStorage.removeItem('workshop_deleted_static_ids');
  window.dispatchEvent(new Event('questions-updated'));
}

/**
 * Question of the Day structure.
 */
export interface QuestionOfTheDay {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  relatedLesson: string;
  aiPrompt: string;
}

const QOTD_POOL: QuestionOfTheDay[] = [
  {
    question: "Why do we place a decoupling capacitor near an MCU power pin?",
    options: [
      "To increase the logic voltage level of the MCU pins",
      "To supply instant localized charge during switching, minimizing voltage sag and EMI",
      "To insulate the PCB traces from heat",
      "To measure battery levels dynamically"
    ],
    correctAnswer: "To supply instant localized charge during switching, minimizing voltage sag and EMI",
    explanation: "When MCU internal transistors switch states, they pull high-frequency current spikes. Decoupling capacitors (e.g. 100nF ceramic) serve as local reservoirs to feed these currents, preventing voltage rail dips and restricting EMI generation.",
    relatedLesson: "electronics-lab",
    aiPrompt: "Explain the calculation of the ideal value for decoupling capacitors on a 100MHz ARM Cortex-M4 microcontroller."
  },
  {
    question: "Why is a flyback diode placed in parallel with a relay coil?",
    options: [
      "To increase current flow through the coil",
      "To suppress the high-voltage spike generated when the relay coil is turned off, protecting the driving transistor",
      "To change the relay from AC to DC mode",
      "To delay the switching time of the relay"
    ],
    correctAnswer: "To suppress the high-voltage spike generated when the relay coil is turned off, protecting the driving transistor",
    explanation: "Relay coils are inductors. When current stops flowing, the magnetic field collapses and generates a large reverse voltage spike (V = L * di/dt). A flyback diode provides a path to safely dissipate this energy, protecting the switching transistor.",
    relatedLesson: "electronics-lab",
    aiPrompt: "How do I choose the correct rating for a flyback diode to protect a BJT driving a 12V automotive relay?"
  },
  {
    question: "What happens if you route a high-speed signal trace across a split in a reference ground plane?",
    options: [
      "The signal travels faster due to reduced capacitance",
      "It forces the return current to find a long loop path, creating high loop inductance, signal distortion, and high EMI",
      "The split acts as a natural noise filter, improving signal quality",
      "It has no impact if the trace is shielded"
    ],
    correctAnswer: "It forces the return current to find a long loop path, creating high loop inductance, signal distortion, and high EMI",
    explanation: "High-frequency return current follows the path of least inductance, which is directly beneath the signal trace. If a split is crossed, the return current must route around the split, expanding the current loop area and causing massive radiation and cross-talk.",
    relatedLesson: "electronics-lab",
    aiPrompt: "Write a guideline for PCB layout engineers on how to manage splits in ground planes when routing mixed-signal designs."
  },
  {
    question: "What is the consequence of choosing too small a pull-up resistor (e.g., 470 ohms) on an I2C bus?",
    options: [
      "The rise time of the I2C lines becomes extremely slow",
      "The devices may fail to pull the line low enough to register a valid logic '0' because of excessive sink current",
      "The I2C bus will consume less power overall",
      "The bus clock speed will be limited to 10kHz"
    ],
    correctAnswer: "The devices may fail to pull the line low enough to register a valid logic '0' because of excessive sink current",
    explanation: "A small resistor pulls the line high strongly. However, when an I2C slave tries to pull the line low, it must sink more current (I = V/R). If this current exceeds the driver's maximum sink capacity (typically 3mA), the voltage will not drop below the logic '0' threshold (0.3 * VDD).",
    relatedLesson: "component-encyclopedia",
    aiPrompt: "Calculate the minimum and maximum pull-up resistor values for a 400kHz I2C bus with a 3.3V supply and 200pF load capacitance."
  },
  {
    question: "Why does USB use differential signaling (D+ and D-) rather than single-ended signaling?",
    options: [
      "Differential lines double the voltage level to speed up charging",
      "Differential signaling provides excellent common-mode noise rejection, allowing high data rates over long, unshielded cables",
      "It allows two different devices to communicate on the same wire simultaneously",
      "To prevent short circuits in USB ports"
    ],
    correctAnswer: "Differential signaling provides excellent common-mode noise rejection, allowing high data rates over long, unshielded cables",
    explanation: "Differential receivers measure the difference in voltage between D+ and D-. Any external electromagnetic noise affects both lines equally (common-mode noise). Since the receiver subtracts the two voltages, this common-mode noise is cancelled out completely.",
    relatedLesson: "component-encyclopedia",
    aiPrompt: "How does common-mode noise rejection work in RS-485 compared to USB differential signaling?"
  }
];

/**
 * Returns the Question of the Day based on the current date.
 */
export function getQuestionOfTheDay(): QuestionOfTheDay {
  const day = typeof window !== 'undefined' ? new Date().getDate() : 1;
  const index = day % QOTD_POOL.length;
  return QOTD_POOL[index];
}

/**
 * Record a question answer for analytics.
 */
export function recordQuestionAnswer(questionId: string, topic: string, correct: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ANALYTICS_ANSWERS_KEY);
    const data = raw ? JSON.parse(raw) as Record<string, { total: number; correct: number; topic: string }> : {};
    
    if (!data[questionId]) {
      data[questionId] = { total: 0, correct: 0, topic };
    }
    
    data[questionId].total += 1;
    if (correct) {
      data[questionId].correct += 1;
    }
    
    localStorage.setItem(ANALYTICS_ANSWERS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to record question answer', e);
  }
}

export interface QuestionAnalytics {
  mostDifficultQuestions: { question: string; errorRate: number }[];
  mostIncorrectTopics: { topic: string; incorrectCount: number }[];
  averageScore: number;
  categoryPopularity: { topic: string; attempts: number }[];
}

/**
 * Get question-level analytics for admin dashboard.
 */
export function getQuestionAnalytics(allQuestions: QuizQuestion[] = []): QuestionAnalytics {
  if (typeof window === 'undefined') {
    return { mostDifficultQuestions: [], mostIncorrectTopics: [], averageScore: 0, categoryPopularity: [] };
  }
  
  try {
    const raw = localStorage.getItem(ANALYTICS_ANSWERS_KEY);
    if (!raw) {
      return { mostDifficultQuestions: [], mostIncorrectTopics: [], averageScore: 0, categoryPopularity: [] };
    }
    
    const data = JSON.parse(raw) as Record<string, { total: number; correct: number; topic: string }>;
    
    let totalAttempts = 0;
    let totalCorrect = 0;
    
    const questionList: { id: string; question: string; errorRate: number; attempts: number }[] = [];
    const topicStats: Record<string, { attempts: number; correct: number }> = {};
    
    Object.entries(data).forEach(([qId, stats]) => {
      const q = allQuestions.find(item => item.id === qId);
      const questionText = q ? q.question : `Question #${qId}`;
      const errorRate = stats.total > 0 ? (stats.total - stats.correct) / stats.total : 0;
      
      totalAttempts += stats.total;
      totalCorrect += stats.correct;
      
      questionList.push({
        id: qId,
        question: questionText,
        errorRate,
        attempts: stats.total
      });
      
      const t = stats.topic || 'General';
      if (!topicStats[t]) {
        topicStats[t] = { attempts: 0, correct: 0 };
      }
      topicStats[t].attempts += stats.total;
      topicStats[t].correct += stats.correct;
    });
    
    // 1. Most difficult questions (errorRate sorted, min attempts > 0)
    const mostDifficultQuestions = questionList
      .filter(q => q.attempts > 0)
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 5)
      .map(q => ({ question: q.question, errorRate: Math.round(q.errorRate * 100) }));
      
    // 2. Most incorrect topics
    const mostIncorrectTopics = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        incorrectCount: stats.attempts - stats.correct
      }))
      .sort((a, b) => b.incorrectCount - a.incorrectCount)
      .slice(0, 5);
      
    // 3. Average score percentage
    const averageScore = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    
    // 4. Category popularity
    const categoryPopularity = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        attempts: stats.attempts
      }))
      .sort((a, b) => b.attempts - a.attempts);
      
    return {
      mostDifficultQuestions,
      mostIncorrectTopics,
      averageScore,
      categoryPopularity
    };
  } catch (e) {
    console.error('Failed to get question analytics', e);
    return { mostDifficultQuestions: [], mostIncorrectTopics: [], averageScore: 0, categoryPopularity: [] };
  }
}
