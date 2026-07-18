export interface SpeakerNote {
  slug: string;
  notes: string;
  talkingPoints: string[];
  estimatedMinutes: number;
}

export const speakerNotes: SpeakerNote[] = [
  {
    slug: 'introduction',
    notes: 'Welcome everyone. Start by introducing yourself. Ask for a show of hands — who uses AI tools already?',
    talkingPoints: [
      'Background: your electronics journey',
      'What this workshop will cover in full',
      'Mention hands-on activities after each section',
      'Encourage questions via the chat or raised hands'
    ],
    estimatedMinutes: 5
  },
  {
    slug: 'ai-fundamentals',
    notes: 'This is the most important conceptual section. Go slowly. Use the Neural Network diagram on slide 12.',
    talkingPoints: [
      'Define AI vs ML vs DL with the Venn diagram',
      'Demo: show ChatGPT completing a simple code snippet live',
      'Key analogy: AI is like a very fast, pattern-matching intern',
      'Q&A checkpoint after this section'
    ],
    estimatedMinutes: 20
  },
  {
    slug: 'machine-learning',
    notes: 'Transition from theory into practice. Open the Jupyter notebook demo.',
    talkingPoints: [
      'Supervised vs Unsupervised vs Reinforcement learning',
      'Live demo: scikit-learn on the sensor dataset',
      'Show overfitting visually with the graph animation',
      'Pause for student questions'
    ],
    estimatedMinutes: 25
  },
  {
    slug: 'ai-tools',
    notes: 'This is the most exciting section for students. Have all tools open in tabs beforehand.',
    talkingPoints: [
      'Live compare: ChatGPT vs Claude vs Gemini on the SAME prompt',
      'Show GitHub Copilot inline completion in VS Code',
      'Demonstrate Cursor AI refactoring an Arduino sketch',
      'Poll: which tool are you most excited to try?'
    ],
    estimatedMinutes: 20
  },
  {
    slug: 'electronics-applications',
    notes: 'Slow down here — this is the most directly relevant content. Students should be fully attentive.',
    talkingPoints: [
      'Show the ESP32 + AI code generation live',
      'Walk through the PCB design prompt workflow with KiCad',
      'Mention the real ESP32 I2C debugging demo coming up',
      'Foreshadow the Live Demonstrations section'
    ],
    estimatedMinutes: 30
  },
  {
    slug: 'prompt-engineering',
    notes: 'Very hands-on. Students should be typing prompts on their devices now.',
    talkingPoints: [
      'Rule #1: Be specific about context (MCU, framework, version)',
      'Live transform: vague prompt → precise prompt, see the difference',
      'Share the Prompt Library URL for students to bookmark',
      'Student activity: 5 minutes to write their own first prompt'
    ],
    estimatedMinutes: 20
  },
  {
    slug: 'live-demonstrations',
    notes: 'Pre-warm hardware! Make sure ESP32 is connected and Arduino IDE is open.',
    talkingPoints: [
      'Demo 1: I2C Scanner — show the actual serial monitor output',
      'Demo 2: PID Controller — paste the Claude output live',
      'Demo 3: ESP32 Deep Sleep — show the multimeter current drop',
      'Involve students: ask them to predict what the AI will output'
    ],
    estimatedMinutes: 45
  },
  {
    slug: 'career-roadmap',
    notes: 'Motivational section. Students who feel overwhelmed need reassurance here.',
    talkingPoints: [
      'No one learns everything at once — show the timeline',
      'Your first embedded AI project is the biggest milestone',
      'LinkedIn post template: share your workshop project today',
      'Recruitment tip: contribute to one open source repo this month'
    ],
    estimatedMinutes: 15
  },
  {
    slug: 'quiz',
    notes: 'Give students 8–10 minutes to complete the quiz independently before reviewing answers.',
    talkingPoints: [
      'Open quiz at: localhost:3000/learn/quiz',
      'Announce the 80% threshold for the certificate',
      'Review each question answer with explanation after time is up',
      'Celebrate those who unlock certificates!'
    ],
    estimatedMinutes: 15
  }
];
