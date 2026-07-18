export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const lessonQuizQuestions: Record<string, LessonQuestion[]> = {
  'introduction': [
    {
      id: 'intro-q1',
      question: 'What is the primary goal of this workshop?',
      options: [
        'Teach Python programming from scratch',
        'Bridge AI/ML concepts with real electronics engineering applications',
        'Replace traditional circuit design with AI',
        'Focus exclusively on theoretical machine learning'
      ],
      correctAnswer: 'Bridge AI/ML concepts with real electronics engineering applications',
      explanation: 'The workshop is designed specifically for electronics engineers to understand and apply AI/ML to hardware problems — not to replace EE fundamentals but to augment them.'
    },
    {
      id: 'intro-q2',
      question: 'Which of the following is NOT a module in this workshop?',
      options: [
        'Deep Learning',
        'Prompt Engineering',
        'Quantum Computing',
        'Electronics Lab'
      ],
      correctAnswer: 'Quantum Computing',
      explanation: 'The workshop covers AI Fundamentals, ML, Deep Learning, Generative AI, LLMs, AI Tools, Electronics Applications, Electronics Lab, and more — but not Quantum Computing.'
    },
    {
      id: 'intro-q3',
      question: 'Why is domain knowledge in electronics important when applying AI?',
      options: [
        'It is not important — AI works the same everywhere',
        'Because electronics engineers understand the physical constraints that AI models must respect',
        'Because AI cannot function without electronics',
        'Because AI models are trained on electronics data only'
      ],
      correctAnswer: 'Because electronics engineers understand the physical constraints that AI models must respect',
      explanation: 'Domain knowledge ensures AI solutions respect real-world constraints like power budgets, signal integrity, timing, and component tolerances.'
    }
  ],

  'ai-fundamentals': [
    {
      id: 'ai-fund-q1',
      question: 'What is the difference between AI and Machine Learning?',
      options: [
        'They are the same thing',
        'AI is a subset of Machine Learning',
        'ML is a subset of AI — ML is the technique that enables AI systems to learn from data',
        'AI only works with neural networks'
      ],
      correctAnswer: 'ML is a subset of AI — ML is the technique that enables AI systems to learn from data',
      explanation: 'AI is the broad field of creating intelligent systems. Machine Learning is a specific approach within AI where systems learn patterns from data rather than being explicitly programmed.'
    },
    {
      id: 'ai-fund-q2',
      question: 'Which type of learning uses labeled input-output pairs to train a model?',
      options: [
        'Unsupervised learning',
        'Reinforcement learning',
        'Supervised learning',
        'Self-supervised learning'
      ],
      correctAnswer: 'Supervised learning',
      explanation: 'Supervised learning trains on labeled data — each input has a known correct output. The model learns to map inputs to outputs by minimizing prediction error.'
    },
    {
      id: 'ai-fund-q3',
      question: 'In an electronics context, what would "features" most likely represent?',
      options: [
        'The physical dimensions of a PCB',
        'Measurable properties like voltage levels, frequency, temperature, or signal amplitude',
        'The brand of components used',
        'The color of the solder mask'
      ],
      correctAnswer: 'Measurable properties like voltage levels, frequency, temperature, or signal amplitude',
      explanation: 'Features are the measurable inputs to an ML model. In electronics, these are typically sensor readings, signal characteristics, or electrical measurements that the model uses to make predictions.'
    }
  ],

  'machine-learning': [
    {
      id: 'ml-q1',
      question: 'What is overfitting in machine learning?',
      options: [
        'When the model is too simple to capture patterns',
        'When the model memorizes training data including noise, performing poorly on new data',
        'When the model trains too slowly',
        'When the dataset is too large'
      ],
      correctAnswer: 'When the model memorizes training data including noise, performing poorly on new data',
      explanation: 'Overfitting happens when a model learns the noise in training data rather than the underlying pattern. It performs great on training data but fails to generalize to unseen data.'
    },
    {
      id: 'ml-q2',
      question: 'Which algorithm is best suited for classifying sensor data into "normal" vs "faulty"?',
      options: [
        'Linear regression',
        'K-means clustering',
        'Random Forest or Support Vector Machine',
        'Principal Component Analysis'
      ],
      correctAnswer: 'Random Forest or Support Vector Machine',
      explanation: 'Classification algorithms like Random Forest and SVM are designed to assign inputs to discrete categories. For a binary classification task (normal vs faulty), these are strong choices.'
    },
    {
      id: 'ml-q3',
      question: 'What is the purpose of a training/validation/test split?',
      options: [
        'To make the dataset smaller',
        'To ensure the model can generalize to data it has never seen before',
        'To speed up training',
        'To reduce memory usage'
      ],
      correctAnswer: 'To ensure the model can generalize to data it has never seen before',
      explanation: 'Splitting data ensures you can evaluate how well your model performs on truly unseen data. The training set teaches, the validation set tunes, and the test set gives an unbiased final evaluation.'
    }
  ],

  'deep-learning': [
    {
      id: 'dl-q1',
      question: 'What makes a neural network "deep"?',
      options: [
        'It has many parameters',
        'It has multiple hidden layers between input and output',
        'It processes deep technical data',
        'It requires a GPU to run'
      ],
      correctAnswer: 'It has multiple hidden layers between input and output',
      explanation: 'A deep neural network has two or more hidden layers. Each layer learns increasingly abstract representations of the input data.'
    },
    {
      id: 'dl-q2',
      question: 'What is backpropagation?',
      options: [
        'A method to increase model size',
        'An algorithm that computes gradients of the loss with respect to each weight, enabling weight updates',
        'A technique for data preprocessing',
        'A type of activation function'
      ],
      correctAnswer: 'An algorithm that computes gradients of the loss with respect to each weight, enabling weight updates',
      explanation: 'Backpropagation efficiently calculates how much each weight contributed to the error by applying the chain rule backward through the network, then updates weights to reduce the error.'
    },
    {
      id: 'dl-q3',
      question: 'Why are CNNs particularly useful for electronics applications like PCB defect detection?',
      options: [
        'CNNs can only process images',
        'CNNs automatically learn spatial features like edges, patterns, and component shapes from visual data',
        'CNNs are faster than other networks',
        'CNNs do not require training data'
      ],
      correctAnswer: 'CNNs automatically learn spatial features like edges, patterns, and component shapes from visual data',
      explanation: 'Convolutional layers detect local spatial patterns — edges, textures, shapes — making CNNs naturally suited for visual inspection tasks like identifying PCB defects or component placement errors.'
    }
  ],

  'generative-ai': [
    {
      id: 'gen-q1',
      question: 'What distinguishes generative AI from discriminative AI?',
      options: [
        'Generative AI is always more accurate',
        'Generative AI creates new data instances; discriminative AI classifies existing ones',
        'They are the same thing with different names',
        'Generative AI only works with text'
      ],
      correctAnswer: 'Generative AI creates new data instances; discriminative AI classifies existing ones',
      explanation: 'Discriminative models learn boundaries between classes (is this a cat or dog?). Generative models learn the distribution of data to create new samples (generate a new cat image).'
    },
    {
      id: 'gen-q2',
      question: 'In an electronics context, how could a variational autoencoder (VAE) be useful?',
      options: [
        'Generating synthetic sensor data for training when real data is scarce',
        'Replacing oscilloscopes',
        'Designing PCB layouts automatically',
        'It cannot be used in electronics'
      ],
      correctAnswer: 'Generating synthetic sensor data for training when real data is scarce',
      explanation: 'VAEs can learn the distribution of sensor signals and generate realistic synthetic samples, augmenting small datasets for training anomaly detectors or classifiers.'
    }
  ],

  'llms': [
    {
      id: 'llm-q1',
      question: 'What is the "transformer" architecture primarily known for?',
      options: [
        'Processing images faster',
        'The self-attention mechanism that allows models to weigh the importance of different parts of the input',
        'Reducing model size',
        'Working without any training data'
      ],
      correctAnswer: 'The self-attention mechanism that allows models to weigh the importance of different parts of the input',
      explanation: 'Self-attention lets transformers dynamically focus on relevant parts of the input sequence, making them powerful for language, code, and increasingly for time-series and signal data.'
    },
    {
      id: 'llm-q2',
      question: 'Why would an electronics engineer want to run an LLM locally instead of using a cloud API?',
      options: [
        'Local models are always more powerful',
        'To keep proprietary hardware designs, test data, and IP confidential',
        'Local models do not need any hardware',
        'Cloud APIs do not support technical content'
      ],
      correctAnswer: 'To keep proprietary hardware designs, test data, and IP confidential',
      explanation: 'Running LLMs locally (via Ollama, llama.cpp, etc.) ensures sensitive design files, test results, and proprietary schematics never leave your machine — critical for IP protection.'
    }
  ],

  'electronics-applications': [
    {
      id: 'eapp-q1',
      question: 'What is predictive maintenance in the context of electronics?',
      options: [
        'Fixing equipment after it breaks',
        'Using ML models to predict when a component is likely to fail, before it actually does',
        'Scheduling maintenance at fixed time intervals',
        'Replacing all components preventively'
      ],
      correctAnswer: 'Using ML models to predict when a component is likely to fail, before it actually does',
      explanation: 'Predictive maintenance uses sensor data and ML to detect early signs of degradation, allowing targeted maintenance only when needed — reducing downtime and cost vs. reactive or schedule-based approaches.'
    },
    {
      id: 'eapp-q2',
      question: 'What makes edge inference (running ML on-device) attractive for IoT sensors?',
      options: [
        'It requires less accurate models',
        'It eliminates the need for internet connectivity and reduces latency for real-time decisions',
        'It uses more power than cloud processing',
        'It always produces better results than cloud inference'
      ],
      correctAnswer: 'It eliminates the need for internet connectivity and reduces latency for real-time decisions',
      explanation: 'Edge inference processes data locally on the MCU/sensor, enabling real-time response without network dependency — critical for safety systems, remote deployments, and privacy-sensitive applications.'
    }
  ],

  'electronics-lab': [
    {
      id: 'lab-q1',
      question: 'When wiring an I2C sensor to a microcontroller, what two lines are required?',
      options: [
        'MOSI and MISO',
        'SDA and SCL',
        'TX and RX',
        'CS and INT'
      ],
      correctAnswer: 'SDA and SCL',
      explanation: 'I2C uses two lines: SDA (Serial Data) for data transfer and SCL (Serial Clock) for synchronization. Both require pull-up resistors to the supply voltage.'
    },
    {
      id: 'lab-q2',
      question: 'In a voltage divider with R1 = 10kΩ and R2 = 5kΩ, what is the output voltage when the input is 3.3V?',
      options: [
        '1.1V',
        '2.2V',
        '3.3V',
        '1.65V'
      ],
      correctAnswer: '1.1V',
      explanation: 'Vout = Vin × R2/(R1+R2) = 3.3V × 5k/(10k+5k) = 3.3V × 1/3 = 1.1V. Voltage dividers are fundamental for level shifting and sensor biasing.'
    }
  ],

  'prompt-engineering': [
    {
      id: 'pe-q1',
      question: 'What is the "role" section in a structured prompt?',
      options: [
        'The name of the AI model being used',
        'The persona or expertise context assigned to the AI before it generates a response',
        'The user\'s job title',
        'The programming language being used'
      ],
      correctAnswer: 'The persona or expertise context assigned to the AI before it generates a response',
      explanation: 'Setting a role (e.g., "You are a senior embedded systems engineer") frames the AI\'s response style, depth, and terminology to match the domain you need.'
    },
    {
      id: 'pe-q2',
      question: 'Why should you include constraints in a prompt?',
      options: [
        'To make the prompt longer',
        'To narrow the AI\'s output to match your actual requirements and prevent irrelevant suggestions',
        'Constraints are not important',
        'To confuse the AI'
      ],
      correctAnswer: 'To narrow the AI\'s output to match your actual requirements and prevent irrelevant suggestions',
      explanation: 'Constraints like "no external libraries", "target STM32F4", or "under 1KB RAM" prevent the AI from suggesting solutions that are technically correct but practically unusable in your context.'
    }
  ],

  'career-roadmap': [
    {
      id: 'cr-q1',
      question: 'Which skill combination is most valuable for an AI-for-hardware career?',
      options: [
        'Only Python programming',
        'Electronics fundamentals + ML understanding + domain-specific deployment skills',
        'Only cloud computing',
        'Only mechanical engineering'
      ],
      correctAnswer: 'Electronics fundamentals + ML understanding + domain-specific deployment skills',
      explanation: 'The highest-value profile combines solid EE fundamentals with the ability to train, optimize, and deploy ML models on real hardware — a rare and in-demand combination.'
    }
  ],

  'future-trends': [
    {
      id: 'ft-q1',
      question: 'What is "tinyML"?',
      options: [
        'A brand of microcontrollers',
        'Running ML models on resource-constrained microcontrollers with milliwatt-level power budgets',
        'A machine learning library for Python',
        'A type of PCB design tool'
      ],
      correctAnswer: 'Running ML models on resource-constrained microcontrollers with milliwatt-level power budgets',
      explanation: 'TinyML enables inference on MCUs consuming less than 1mW — bringing AI to battery-powered sensors, wearables, and edge devices without cloud connectivity.'
    }
  ],

  'ai-tools': [
    {
      id: 'tools-q1',
      question: 'What is the primary advantage of using Edge Impulse for embedded ML?',
      options: [
        'It only works with Arduino boards',
        'It provides an end-to-end pipeline from data collection to model deployment on real hardware',
        'It replaces the need for any coding',
        'It only supports image classification'
      ],
      correctAnswer: 'It provides an end-to-end pipeline from data collection to model deployment on real hardware',
      explanation: 'Edge Impulse handles the full workflow — data collection, labeling, training, optimization, and deployment — with support for many MCU targets and sensor types.'
    }
  ],

  'interview-prep': [
    {
      id: 'ip-q1',
      question: 'When explaining an ML project in an interview, what structure should you follow?',
      options: [
        'Just list the tools used',
        'Problem → Data → Approach → Results → Impact',
        'Only talk about the model architecture',
        'Only mention the accuracy metric'
      ],
      correctAnswer: 'Problem → Data → Approach → Results → Impact',
      explanation: 'This structure shows you understand the full ML lifecycle — from defining the problem through measuring real-world impact — not just model training.'
    }
  ],

  'project-builder': [
    {
      id: 'pb-q1',
      question: 'What should you define before starting an AI-for-hardware project?',
      options: [
        'The color of the PCB',
        'The success metric, constraints (power, memory, latency), and available data',
        'The AI framework version',
        'The number of layers in the neural network'
      ],
      correctAnswer: 'The success metric, constraints (power, memory, latency), and available data',
      explanation: 'Defining success criteria and constraints upfront prevents wasted effort on models that are theoretically correct but impractical for the target hardware.'
    }
  ],

  'component-encyclopedia': [
    {
      id: 'ce-q1',
      question: 'When selecting an ADC for a sensor interface, what specification matters most for signal quality?',
      options: [
        'Package color',
        'Resolution (bits) and sampling rate',
        'Number of GPIO pins',
        'Manufacturer name'
      ],
      correctAnswer: 'Resolution (bits) and sampling rate',
      explanation: 'Resolution determines the smallest detectable signal change, and sampling rate determines the maximum frequency you can accurately capture — both directly impact measurement quality.'
    }
  ],

  'live-demonstrations': [
    {
      id: 'ld-q1',
      question: 'In a live anomaly detection demo, what is the typical workflow?',
      options: [
        'Deploy the model immediately without testing',
        'Collect normal data → train an autoencoder → set reconstruction threshold → detect anomalies in real-time',
        'Only use pre-trained models',
        'Skip data collection entirely'
      ],
      correctAnswer: 'Collect normal data → train an autoencoder → set reconstruction threshold → detect anomalies in real-time',
      explanation: 'Autoencoder-based anomaly detection learns the pattern of "normal" behavior. New data that deviates significantly (high reconstruction error) is flagged as anomalous.'
    }
  ],

  'resources': [],
  'quiz': [],
  'downloads': [],
  'badges': []
};
