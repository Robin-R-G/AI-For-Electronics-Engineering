export interface AITool {
  id: string;
  name: string;
  logo: string;
  purpose: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  bestFor: string;
  examplePrompts: string[];
  commonMistakes: string[];
  videoUrl?: string;
  links: { label: string; url: string }[];
}

export const aiToolsData: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: '💬',
    purpose: 'General purpose conversational AI and coding assistant.',
    strengths: ['Advanced reasoning (GPT-4)', 'Large ecosystem and plugins', 'Excellent at debugging and explaining concepts'],
    weaknesses: ['Knowledge cutoff dates', 'Can be overly verbose', 'UI is not IDE integrated by default'],
    pricing: 'Free (GPT-3.5) / $20/mo (Plus)',
    bestFor: 'General problem solving, brainstorming, and writing documentation.',
    examplePrompts: [
      'Explain the difference between SPI and I2C to a beginner.',
      'Write a Python script to parse serial data from an Arduino.',
      'Help me debug this C++ firmware memory leak: [code]'
    ],
    commonMistakes: [
      'Trusting it blindly on highly specific hardware datasheets.',
      'Asking it to write an entire project in one prompt.'
    ],

    links: [{ label: 'Website', url: 'https://chat.openai.com' }]
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: '🧠',
    purpose: 'Advanced reasoning AI with massive context window.',
    strengths: ['200k+ token context window', 'Excellent at analyzing large codebases or datasheets', 'Less prone to hallucination than competitors'],
    weaknesses: ['Slower on very large queries', 'Fewer integrations than OpenAI'],
    pricing: 'Free tier / $20/mo (Pro)',
    bestFor: 'Reading 500-page microcontroller datasheets and finding specific register addresses.',
    examplePrompts: [
      'I have attached the datasheet for the STM32F4. What is the base address of the GPIOA peripheral?',
      'Read this 1000-line C file and find the race condition.',
      'Summarize the key differences between these three components based on the attached PDFs.'
    ],
    commonMistakes: [
      'Not taking advantage of the large context window (uploading files is key).'
    ],

    links: [{ label: 'Website', url: 'https://claude.ai' }]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: '✨',
    purpose: 'Multimodal AI by Google, deeply integrated into Google Workspace.',
    strengths: ['Native multimodal capabilities (vision, audio)', 'Massive 1M+ token context (Gemini 1.5 Pro)', 'Fast inference'],
    weaknesses: ['Sometimes refuses prompts due to strict safety filters', 'Coding capability can be inconsistent in free tiers'],
    pricing: 'Free / $20/mo (Advanced)',
    bestFor: 'Analyzing schematics from images and multimodal data processing.',
    examplePrompts: [
      'Look at this photo of my breadboard. Why is my LED not lighting up?',
      'Analyze this schematic image and list all the I2C sensors.',
      'Here is an hour-long video of a soldering tutorial. Summarize the steps.'
    ],
    commonMistakes: [
      'Using text-only prompts when an image of the circuit would be much clearer.'
    ],

    links: [{ label: 'Website', url: 'https://gemini.google.com' }]
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logo: '🔍',
    purpose: 'AI-powered search engine that cites sources.',
    strengths: ['Real-time web search', 'Provides citations and links for every claim', 'Excellent for research'],
    weaknesses: ['Not designed for writing long code snippets', 'Less conversational context retention'],
    pricing: 'Free / $20/mo (Pro)',
    bestFor: 'Finding specific part numbers, comparing component prices, and researching modern hardware trends.',
    examplePrompts: [
      'What are the best low-power Wi-Fi microcontrollers available in 2026?',
      'Find me distributors with the ESP32-S3 in stock right now.',
      'What is the current standard for automotive CAN bus communication?'
    ],
    commonMistakes: [
      'Using it to write code instead of using it to research APIs.'
    ],

    links: [{ label: 'Website', url: 'https://www.perplexity.ai' }]
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    logo: '📓',
    purpose: 'Personalized AI research assistant grounded in your own documents.',
    strengths: ['Grounded solely in the documents you upload', 'Generates audio podcasts summarizing your notes', 'Reduces hallucination to near zero for source queries'],
    weaknesses: ['Cannot search the live web', 'Limited to Google ecosystem'],
    pricing: 'Free',
    bestFor: 'Creating a personalized knowledge base from your own project notes, schematics, and class lectures.',
    examplePrompts: [
      'Based on the lecture notes I uploaded, what did the professor say about parasitic capacitance?',
      'Generate an Audio Overview (podcast) explaining the 5 datasheets I just uploaded.',
      'Create a study guide from these 3 PDFs.'
    ],
    commonMistakes: [
      'Asking it general knowledge questions that aren\'t covered in the uploaded source documents.'
    ],

    links: [{ label: 'Website', url: 'https://notebooklm.google.com' }]
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    logo: '🐙',
    purpose: 'AI pair programmer integrated directly into your IDE.',
    strengths: ['Seamless IDE integration', 'Excellent autocomplete', 'Understands context of the open files'],
    weaknesses: ['Does not have internet access', 'Sometimes suggests outdated APIs'],
    pricing: '$10/mo',
    bestFor: 'Writing boilerplate C/C++ firmware, generating unit tests, and inline code completion.',
    examplePrompts: [
      '// Write a function to initialize the SPI peripheral on an STM32',
      '/* Generate a test bench for this Verilog module */',
      '@workspace Where is the I2C driver initialized in this project?'
    ],
    commonMistakes: [
      'Accepting large blocks of autocomplete code without reading them.',
      'Not opening relevant files before asking it a project-wide question.'
    ],

    links: [{ label: 'Website', url: 'https://github.com/features/copilot' }]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    logo: '💻',
    purpose: 'AI-first code editor built on VS Code.',
    strengths: ['Deepest AI integration of any editor', 'Composer feature can edit multiple files simultaneously', 'Can index your entire codebase'],
    weaknesses: ['Requires switching away from your existing IDE setup', 'Can be overwhelming for beginners'],
    pricing: 'Free / $20/mo (Pro)',
    bestFor: 'Rapid prototyping, full codebase refactoring, and building complex web dashboards for IoT devices.',
    examplePrompts: [
      'Refactor this entire file to use the new RTOS APIs.',
      'Look at my codebase and find why the sensor reading is returning null.',
      'Generate a Python script to graph the serial data coming from the port.'
    ],
    commonMistakes: [
      'Letting the Composer feature rewrite 20 files at once without using version control first.'
    ],

    links: [{ label: 'Website', url: 'https://cursor.sh' }]
  },
  {
    id: 'vscode-ai',
    name: 'VS Code AI (Various)',
    logo: '⚙️',
    purpose: 'AI extensions (like Codeium or Continue) added to standard VS Code.',
    strengths: ['Allows you to keep your existing extensions and workflow', 'Many free options available', 'Highly customizable'],
    weaknesses: ['Integration is not as seamless as a purpose-built IDE like Cursor', 'Can clash with other extensions'],
    pricing: 'Varies (Many Free)',
    bestFor: 'Engineers who have a very specific, customized VS Code setup they cannot abandon.',
    examplePrompts: [
      'Explain what this highlighted block of C code does.',
      'Generate a Makefile for this project.',
      'Optimize this loop for speed.'
    ],
    commonMistakes: [
      'Installing too many conflicting AI extensions at once, slowing down the editor.'
    ],

    links: [{ label: 'Website', url: 'https://code.visualstudio.com' }]
  }
];
