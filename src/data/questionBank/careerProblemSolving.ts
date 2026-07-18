export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const careerProblemSolvingQuestions: LessonQuestion[] = [
  {
    id: "career-1",
    question: "Which combination of skills is most in demand for an embedded AI engineer role?",
    options: [
      "Circuit design and analog layout only",
      "C/C++ firmware, ML model deployment, and edge hardware knowledge",
      "Web development and database administration",
      "Technical writing and project management only"
    ],
    correctAnswer: "C/C++ firmware, ML model deployment, and edge hardware knowledge",
    explanation: "Embedded AI engineers bridge ML and hardware, so firmware skills plus model quantization/deployment on edge devices is the core competency."
  },
  {
    id: "career-2",
    question: "What is the most effective way to demonstrate AI+hardware abilities in a portfolio?",
    options: [
      "Listing course certificates without projects",
      "Shipping end-to-end projects with schematics, firmware, and model code on GitHub",
      "Writing a long blog about theoretical AI concepts",
      "Posting screenshots of purchased development boards"
    ],
    correctAnswer: "Shipping end-to-end projects with schematics, firmware, and model code on GitHub",
    explanation: "Concrete, reproducible projects showing the full stack from hardware to deployed model prove both engineering and AI skills."
  },
  {
    id: "career-3",
    question: "When asked a system-design question in an embedded AI interview, the best strategy is to:",
    options: [
      "Jump straight to code without clarifying constraints",
      "Clarify requirements, define constraints, then propose a layered architecture",
      "Defer all decisions to the interviewer",
      "Memorize one generic architecture and reuse it"
    ],
    correctAnswer: "Clarify requirements, define constraints, then propose a layered architecture",
    explanation: "Clarifying latency, power, and memory constraints before designing shows structured thinking valued in senior interviews."
  },
  {
    id: "career-4",
    question: "A systematic debugging methodology for firmware should begin with:",
    options: [
      "Randomly rewriting code until it works",
      "Reproducing the failure and isolating the smallest failing condition",
      "Replacing the hardware immediately",
      "Asking a colleague to fix it"
    ],
    correctAnswer: "Reproducing the failure and isolating the smallest failing condition",
    explanation: "Reproducibility is the foundation of debugging; without a reliable repro you cannot confirm a fix actually works."
  },
  {
    id: "career-5",
    question: "Root cause analysis using the '5 Whys' technique primarily helps you:",
    options: [
      "Assign blame to a team member",
      "Drill past symptoms to the underlying systemic cause",
      "Document the first obvious failure",
      "Skip testing the fix"
    ],
    correctAnswer: "Drill past symptoms to the underlying systemic cause",
    explanation: "5 Whys iteratively asks why a fault occurred, exposing process or design gaps rather than just patching the symptom."
  },
  {
    id: "career-6",
    question: "When reading a microcontroller datasheet to configure an ADC, the most critical parameter to check first is:",
    options: [
      "The package color",
      "Reference voltage and resolution (bits) of the ADC",
      "The marketing headline on the first page",
      "The number of GPIO pins only"
    ],
    correctAnswer: "Reference voltage and resolution (bits) of the ADC",
    explanation: "ADC accuracy depends directly on the reference voltage and bit resolution, which define the measurable range and step size."
  },
  {
    id: "career-7",
    question: "Which documentation practice best serves long-term hardware project maintenance?",
    options: [
      "Keeping all design knowledge in one engineer's head",
      "Maintaining a hardware design doc with BOM, schematics, and revision history",
      "Writing documentation only after the product is discontinued",
      "Storing notes in private chat messages"
    ],
    correctAnswer: "Maintaining a hardware design doc with BOM, schematics, and revision history",
    explanation: "A versioned design doc with BOM and revisions lets any engineer reproduce and maintain the hardware across the product lifecycle."
  },
  {
    id: "career-8",
    question: "For firmware version control with Git, the recommended practice for hardware releases is:",
    options: [
      "Commit binaries only and never use branches",
      "Tag releases, use feature branches, and store build artifacts separately",
      "Keep one massive commit per year",
      "Avoid Git because firmware is binary"
    ],
    correctAnswer: "Tag releases, use feature branches, and store build artifacts separately",
    explanation: "Tagging pins reproducible firmware versions to hardware revisions, while branches keep development organized and reviewable."
  },
  {
    id: "career-9",
    question: "Applying Agile to hardware projects differs from software because:",
    options: [
      "Hardware has long lead times and physical prototyping costs",
      "Agile cannot be used for any hardware work",
      "Hardware iterations are always free and instant",
      "There are no sprints in engineering"
    ],
    correctAnswer: "Hardware has long lead times and physical prototyping costs",
    explanation: "Physical fabrication and component lead times make rapid iteration expensive, so Agile must adapt with staged prototyping."
  },
  {
    id: "career-10",
    question: "Effective cross-functional collaboration between ML and hardware teams requires:",
    options: [
      "Isolating teams to avoid conflicts",
      "Shared specs, common metrics, and regular design reviews",
      "Letting one team make all decisions unilaterally",
      "Avoiding any documentation exchange"
    ],
    correctAnswer: "Shared specs, common metrics, and regular design reviews",
    explanation: "A common set of specs and metrics ensures ML model requirements align with hardware constraints before costly integration."
  },
  {
    id: "career-11",
    question: "For continuous learning in embedded AI, the most sustainable path is:",
    options: [
      "Earning one certificate and stopping",
      "Combining vendor docs, open courses, and hands-on project practice",
      "Only reading social media posts",
      "Waiting for employer-mandated training"
    ],
    correctAnswer: "Combining vendor docs, open courses, and hands-on project practice",
    explanation: "Mixing authoritative vendor documentation with practical projects keeps skills current as tools and silicon evolve quickly."
  },
  {
    id: "career-12",
    question: "Contributing to open-source embedded AI projects benefits your career by:",
    options: [
      "Hiding your work from employers",
      "Demonstrating real collaboration, code quality, and domain depth publicly",
      "Guaranteeing a job offer automatically",
      "Avoiding learning version control"
    ],
    correctAnswer: "Demonstrating real collaboration, code quality, and domain depth publicly",
    explanation: "Public contributions show reviewers concrete evidence of how you write, review, and collaborate on production-grade code."
  },
  {
    id: "career-13",
    question: "A key best practice for hardware prototyping is to:",
    options: [
      "Order final production PCBs for the first build",
      "Start with breadboards or dev boards to validate the concept cheaply",
      "Skip testing and go straight to mass manufacturing",
      "Design the enclosure before the circuit"
    ],
    correctAnswer: "Start with breadboards or dev boards to validate the concept cheaply",
    explanation: "Low-cost prototyping surfaces design flaws early before committing to expensive fabrication and assembly."
  },
  {
    id: "career-14",
    question: "When presenting a technical project to stakeholders, the most effective approach is:",
    options: [
      "Dump every line of code on the slides",
      "Lead with the problem and outcome, then justify with evidence",
      "Use only jargon with no context",
      "Avoid showing any results"
    ],
    correctAnswer: "Lead with the problem and outcome, then justify with evidence",
    explanation: "Stakeholders engage when the value and result are clear first; details support rather than obscure the message."
  },
  {
    id: "career-15",
    question: "An important ethical consideration when deploying AI on edge hardware is:",
    options: [
      "Maximizing model size regardless of power",
      "Data privacy and on-device processing to avoid transmitting sensitive data",
      "Ignoring bias because hardware is neutral",
      "Shipping without any fail-safe behavior"
    ],
    correctAnswer: "Data privacy and on-device processing to avoid transmitting sensitive data",
    explanation: "Processing data locally reduces exposure of sensitive information and is a core ethical safeguard in edge AI deployments."
  }
];
