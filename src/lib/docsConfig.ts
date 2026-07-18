export type DocSection = {
  title: string;
  slug: string;
  readingTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export const docsSections: DocSection[] = [
  { title: "Introduction", slug: "introduction", readingTime: "5 min", difficulty: "Beginner", description: "Welcome to the AI for Electronics Engineers workshop." },
  { title: "AI Fundamentals", slug: "ai-fundamentals", readingTime: "15 min", difficulty: "Beginner", description: "Core concepts of AI and Machine Learning for hardware." },
  { title: "Machine Learning", slug: "machine-learning", readingTime: "20 min", difficulty: "Intermediate", description: "Diving into ML algorithms and training." },
  { title: "Deep Learning", slug: "deep-learning", readingTime: "25 min", difficulty: "Advanced", description: "Neural networks, CNNs, and backpropagation." },
  { title: "Generative AI", slug: "generative-ai", readingTime: "20 min", difficulty: "Intermediate", description: "Understanding generative models and latent spaces." },
  { title: "LLMs", slug: "llms", readingTime: "25 min", difficulty: "Advanced", description: "Large Language Models architecture and capabilities." },
  { title: "AI Tools", slug: "ai-tools", readingTime: "15 min", difficulty: "Beginner", description: "Tools and frameworks for AI development." },
  { title: "Electronics Applications", slug: "electronics-applications", readingTime: "30 min", difficulty: "Intermediate", description: "Applying AI directly to electronics and PCBs." },
  { title: "Electronics Lab", slug: "electronics-lab", readingTime: "30 min", difficulty: "Intermediate", description: "Virtual electronics lab with breadboard layouts and working code." },
  { title: "Component Encyclopedia", slug: "component-encyclopedia", readingTime: "15 min", difficulty: "Beginner", description: "Searchable library of common electronic components." },
  { title: "Interview Preparation", slug: "interview-prep", readingTime: "20 min", difficulty: "Intermediate", description: "Technical interview questions with explanations." },
  { title: "Project Builder", slug: "project-builder", readingTime: "15 min", difficulty: "Intermediate", description: "Build projects with AI-suggested architecture and prompts." },
  { title: "Prompt Engineering", slug: "prompt-engineering", readingTime: "15 min", difficulty: "Beginner", description: "Crafting effective prompts for code generation and hardware design." },
  { title: "Career Roadmap", slug: "career-roadmap", readingTime: "10 min", difficulty: "Beginner", description: "Pathways to a career in AI and hardware." },
  { title: "Live Demonstrations", slug: "live-demonstrations", readingTime: "45 min", difficulty: "Advanced", description: "Real-world live coding and hardware demos." },
  { title: "Future Trends", slug: "future-trends", readingTime: "10 min", difficulty: "Intermediate", description: "What's next for AI in the electronics industry." },
  { title: "Resources", slug: "resources", readingTime: "5 min", difficulty: "Beginner", description: "Links, repositories, and recommended reading." },
  { title: "Quiz", slug: "quiz", readingTime: "10 min", difficulty: "Intermediate", description: "Test your knowledge." },
  { title: "Downloads", slug: "downloads", readingTime: "2 min", difficulty: "Beginner", description: "Download workshop assets." },
  { title: "Badges & Achievements", slug: "badges", readingTime: "2 min", difficulty: "Beginner", description: "Track your progress and earn badges." }
];
