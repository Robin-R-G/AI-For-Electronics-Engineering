import { aiFundamentalsQuestions } from './questionBank/aiFundamentals';
import { machineLearningQuestions } from './questionBank/machineLearning';
import { deepLearningQuestions } from './questionBank/deepLearning';
import { generativeAiQuestions } from './questionBank/generativeAi';
import { edgeAiTinyMlQuestions } from './questionBank/edgeAiTinyMl';
import { embeddedSystemsQuestions } from './questionBank/embeddedSystems';
import { mcuPlatformsQuestions } from './questionBank/mcuPlatforms';
import { sensorsIoTQuestions } from './questionBank/sensorsIoT';
import { protocolsQuestions } from './questionBank/protocols';
import { pcbElectronicsQuestions } from './questionBank/pcbElectronics';
import { fpgaVerilogQuestions } from './questionBank/fpgaVerilog';
import { signalProcessingQuestions } from './questionBank/signalProcessing';
import { controlRoboticsQuestions } from './questionBank/controlRobotics';
import { careerProblemSolvingQuestions } from './questionBank/careerProblemSolving';

export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  whyWrong?: string;
  commonMistake?: string;
  relatedConcept?: string;
  practicalUse?: string;
}

const baseLessonQuizQuestions: Record<string, LessonQuestion[]> = {
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
      explanation: 'The workshop is designed specifically for electronics engineers to understand and apply AI/ML to hardware problems — not to replace EE fundamentals but to augment them.',
      whyWrong: 'This workshop assumes you already have Python basics. It builds on your EE knowledge to add AI skills, not teach coding from zero.',
      commonMistake: 'Assuming AI workshops are about coding. The real value is learning when and how to apply ML to hardware — a decision-making skill, not a coding skill.',
      relatedConcept: 'Domain-specific AI application',
      practicalUse: 'An EE who understands both signal integrity and ML can design a sensor pipeline where the model accounts for real noise characteristics — something a pure data scientist would miss.'
    },
    {
      id: 'intro-q2',
      question: 'Which of the following is NOT a module in this workshop?',
      options: [
        'Deep Learning',
        'Prompt Engineering',
        'Quantum Computing',
        'Engineering Project Studio'
      ],
      correctAnswer: 'Quantum Computing',
      explanation: 'The workshop covers AI Fundamentals, ML, Deep Learning, Generative AI, LLMs, AI Tools, Electronics Applications, Engineering Project Studio, and more — but not Quantum Computing.',
      whyWrong: 'Deep Learning, Prompt Engineering, and Engineering Project Studio are all core modules in this workshop curriculum.',
      commonMistake: 'Confusing the workshop scope with general CS AI programs. This workshop is laser-focused on the intersection of AI and embedded electronics.',
      relatedConcept: 'Workshop curriculum structure',
      practicalUse: 'Knowing the curriculum helps you plan your learning path — skip what you know, dive deep into TinyML and edge inference where EE knowledge gives you an edge.'
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
      explanation: 'Domain knowledge ensures AI solutions respect real-world constraints like power budgets, signal integrity, timing, and component tolerances.',
      whyWrong: 'AI absolutely works differently across domains — a model trained on images needs different treatment than one processing sensor signals. Domain context shapes every design decision.',
      commonMistake: 'Thinking AI is domain-agnostic. A data scientist might build a 99% accurate model that fails in production because it ignores brownout voltages, EMI, or thermal limits.',
      relatedConcept: 'Domain-driven design in ML',
      practicalUse: 'When deploying an anomaly detector on a motor controller, your EE knowledge tells you which signal features matter (back-EMF ripple, current spikes) and which are noise — something no algorithm can learn from raw data alone.'
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
      explanation: 'AI is the broad field of creating intelligent systems. Machine Learning is a specific approach within AI where systems learn patterns from data rather than being explicitly programmed.',
      whyWrong: 'AI encompasses much more than ML — it includes expert systems, rule-based logic, search algorithms, and more. ML is one powerful technique within the broader AI toolbox.',
      commonMistake: 'Using "AI" and "ML" interchangeably. In engineering conversations, precision matters — saying "ML" when you mean "AI" (or vice versa) signals unclear thinking.',
      relatedConcept: 'AI taxonomy and subfields',
      practicalUse: 'When pitching an AI solution to management, correctly distinguishing "we need an ML model" from "we need an AI system" (which might include rule-based logic + ML) leads to better scoping and fewer surprises.'
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
      explanation: 'Supervised learning trains on labeled data — each input has a known correct output. The model learns to map inputs to outputs by minimizing prediction error.',
      whyWrong: 'Unsupervised learning finds patterns without labels. Reinforcement learning learns through trial-and-error with rewards. Self-supervised creates its own labels from unlabeled data.',
      commonMistake: 'Assuming you need massive labeled datasets. In electronics, domain knowledge lets you create small, high-quality labeled datasets (e.g., 50 labeled "normal" vs "faulty" vibration samples) that outperform thousands of poorly labeled ones.',
      relatedConcept: 'Training data strategy',
      practicalUse: 'For predictive maintenance, you label vibration sensor recordings as "normal bearing" or "worn bearing" — that supervised signal teaches the model what failure looks like in your specific motor.'
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
      explanation: 'Features are the measurable inputs to an ML model. In electronics, these are typically sensor readings, signal characteristics, or electrical measurements that the model uses to make predictions.',
      whyWrong: 'PCB dimensions and component brands are design attributes, not signal features. The solder mask color is cosmetic and has zero predictive value for ML.',
      commonMistake: 'Including irrelevant features. An ML model trained on motor fault data does not need the motor manufacturer name — it needs current waveform RMS,谐波 distortion, and temperature rise.',
      relatedConcept: 'Feature engineering for sensor data',
      practicalUse: 'For a current-sensing anomaly detector, your features might be: RMS current, peak-to-peak ripple, THD, and thermal slope — each one a window into the motor\'s health.'
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
      explanation: 'Overfitting happens when a model learns the noise in training data rather than the underlying pattern. It performs great on training data but fails to generalize to unseen data.',
      whyWrong: 'A too-simple model underfits — it misses real patterns. Slow training and large datasets are operational issues, not model quality problems.',
      commonMistake: 'Not validation-splitting sensor data. If your training and test data come from the same time window, temporal correlations leak and accuracy is artificially inflated. Always split by time.',
      relatedConcept: 'Bias-variance tradeoff',
      practicalUse: 'A motor fault classifier trained only on one batch of sensors may score 99% in the lab but 60% in the field. Cross-validation across different motor ages and loads catches this before deployment.'
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
      explanation: 'Classification algorithms like Random Forest and SVM are designed to assign inputs to discrete categories. For a binary classification task (normal vs faulty), these are strong choices.',
      whyWrong: 'Linear regression predicts continuous values, not categories. K-means finds groups but does not assign labels. PCA reduces dimensions but does not classify.',
      commonMistake: 'Using PCA as a classifier. PCA is a dimensionality reduction tool — it can preprocess your data before classification, but it cannot decide "normal" vs "faulty" on its own.',
      relatedConcept: 'Algorithm selection for classification',
      practicalUse: 'Random Forest handles noisy sensor data well and gives feature importance scores — telling you which signal characteristic (e.g., vibration frequency at 2.5kHz) is most indicative of bearing wear.'
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
      explanation: 'Splitting data ensures you can evaluate how well your model performs on truly unseen data. The training set teaches, the validation set tunes, and the test set gives an unbiased final evaluation.',
      whyWrong: 'Dataset size, speed, and memory are practical concerns addressed by sampling and hardware — not by data splitting strategy.',
      commonMistake: 'Testing on training data. Engineers sometimes skip the test set because data is scarce. This gives a false sense of accuracy — your model might just be memorizing.',
      relatedConcept: 'Cross-validation and data leakage',
      practicalUse: 'For a temperature sensor anomaly detector, train on January–March data, validate on April, test on May. This catches seasonal drift your model would otherwise miss.'
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
      explanation: 'A deep neural network has two or more hidden layers. Each layer learns increasingly abstract representations of the input data.',
      whyWrong: 'Many parameters is a consequence, not the definition. "Deep technical data" is a wordplay. GPUs accelerate training but do not define depth.',
      commonMistake: 'Adding layers without purpose. More layers = more parameters = more overfitting risk. Each layer should justify its existence by learning a meaningful representation.',
      relatedConcept: 'Network architecture design',
      practicalUse: 'A 3-layer CNN for PCB defect detection: Layer 1 learns edges, Layer 2 learns component shapes, Layer 3 learns defect patterns. Each layer builds understanding.'
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
      explanation: 'Backpropagation efficiently calculates how much each weight contributed to the error by applying the chain rule backward through the network, then updates weights to reduce the error.',
      whyWrong: 'Model size is a design choice. Preprocessing happens before training. Activation functions are mathematical operations applied at neurons — they are not backpropagation.',
      commonMistake: 'Confusing backprop with the optimizer. Backprop computes gradients; optimizers (SGD, Adam) use those gradients to update weights. Both are needed, but they are separate steps.',
      relatedConcept: 'Gradient descent optimizers',
      practicalUse: 'When training a neural network to classify ECG arrhythmias, backpropagation identifies which weights in which layers need adjustment to reduce misclassification — iterating until the model learns the signal patterns.'
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
      explanation: 'Convolutional layers detect local spatial patterns — edges, textures, shapes — making CNNs naturally suited for visual inspection tasks like identifying PCB defects or component placement errors.',
      whyWrong: 'CNNs can process 1D signals (time-series) too, not just images. Speed depends on architecture and hardware. All ML requires training data.',
      commonMistake: 'Using CNNs for non-spatial data. If your sensor data is a 1D time-series, a CNN might work (1D convolutions), but an RNN or transformer could be more appropriate. Match architecture to data structure.',
      relatedConcept: 'Architecture selection for signal data',
      practicalUse: 'A CNN trained on PCB images learns to detect solder bridges, missing components, and tombstoning by recognizing visual patterns — achieving inspection speeds impossible for human operators.'
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
      explanation: 'Discriminative models learn boundaries between classes (is this a cat or dog?). Generative models learn the distribution of data to create new samples (generate a new cat image).',
      whyWrong: 'Accuracy depends on the task, not the model type. They are fundamentally different approaches. Generative models work with images, audio, code, and more.',
      commonMistake: 'Thinking generative AI is only for creative content. In engineering, generative models create synthetic training data, augment datasets, and simulate failure modes that are rare in real data.',
      relatedConcept: 'GANs, VAEs, and diffusion models',
      practicalUse: 'A VAE trained on motor vibration signals can generate synthetic "faulty" samples, augmenting a small dataset of real failures for training a more robust classifier.'
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
      explanation: 'VAEs can learn the distribution of sensor signals and generate realistic synthetic samples, augmenting small datasets for training anomaly detectors or classifiers.',
      whyWrong: 'VAEs generate data patterns, not physical measurements. PCB layout is a constraint-satisfaction problem better solved by EDA tools. VAEs are data tools, not measurement instruments.',
      commonMistake: 'Using synthetic data without validation. Always compare generated signals against real oscilloscope captures. Synthetic data that does not match physical reality will degrade model performance.',
      relatedConcept: 'Data augmentation for sensor signals',
      practicalUse: 'You have 20 real recordings of a motor bearing failure. A VAE generates 500 realistic synthetic failure signals, giving your classifier enough training data to generalize across different operating conditions.'
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
      explanation: 'Self-attention lets transformers dynamically focus on relevant parts of the input sequence, making them powerful for language, code, and increasingly for time-series and signal data.',
      whyWrong: 'Transformers can process images (Vision Transformers) but speed is not their defining trait. They require massive training data. They do not reduce model size.',
      commonMistake: 'Treating transformers as text-only. Vision Transformers (ViT) apply attention to image patches. Transformers process ECG sequences, vibration time-series, and network logs just as effectively.',
      relatedConcept: 'Attention mechanisms in signal processing',
      practicalUse: 'A transformer processing a 24-hour current waveform can attend to a brief 50ms transient at 3am that preceded a failure — self-attention captures long-range dependencies that RNNs miss.'
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
      explanation: 'Running LLMs locally (via Ollama, llama.cpp, etc.) ensures sensitive design files, test results, and proprietary schematics never leave your machine — critical for IP protection.',
      whyWrong: 'Cloud models are typically larger. Local models need significant hardware (RAM, GPU). Cloud APIs handle technical content well — the concern is data privacy, not capability.',
      commonMistake: 'Assuming cloud is always faster. For small, frequent queries (e.g., auto-completing a SPICE netlist), a local 7B model on a decent GPU responds faster than an API round-trip.',
      relatedConcept: 'Edge LLM deployment and quantization',
      practicalUse: 'Your company\'s unreleased chip design has test data that competitors would kill for. Running Llama 3 locally with Ollama means that data never touches an external server.'
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
      explanation: 'Predictive maintenance uses sensor data and ML to detect early signs of degradation, allowing targeted maintenance only when needed — reducing downtime and cost vs. reactive or schedule-based approaches.',
      whyWrong: 'Fixing after failure is reactive maintenance. Fixed schedules waste resources on healthy components. Preventive replacement is cheaper than failure but more expensive than prediction.',
      commonMistake: 'Overcomplicating the model. A simple threshold on RMS vibration with a moving average can detect 80% of bearing faults. Start simple, add complexity only when the baseline is insufficient.',
      relatedConcept: 'Condition monitoring and fault detection',
      practicalUse: 'A semiconductor fab monitors chamber temperature, gas flow, and RF power. An ML model detects that a 0.3°C temperature drift over 6 hours predicts a deposition thickness excursion — triggering maintenance before wafers are scrapped.'
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
      explanation: 'Edge inference processes data locally on the MCU/sensor, enabling real-time response without network dependency — critical for safety systems, remote deployments, and privacy-sensitive applications.',
      whyWrong: 'Edge models are often less accurate (quantization tradeoff), not more. They use less power overall (no radio). Results are not better — they are faster and more private.',
      commonMistake: 'Ignoring the power budget. An STM32 running a quantized model at 100μA average can last 5 years on a coin cell — but only if inference happens at 1Hz, not 1kHz. Profile your duty cycle.',
      relatedConcept: 'TinyML and energy-aware inference',
      practicalUse: 'A vibration sensor on a remote wind turbine runs a TFLite Micro model that detects bearing faults in real-time, sending only anomaly alerts via LoRa — no continuous internet needed.'
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
      explanation: 'I2C uses two lines: SDA (Serial Data) for data transfer and SCL (Serial Clock) for synchronization. Both require pull-up resistors to the supply voltage.',
      whyWrong: 'MOSI/MISO are SPI lines. TX/RX are UART. CS/INT are chip select and interrupt — SPI and general GPIO concepts.',
      commonMistake: 'Forgetting pull-up resistors. I2C is open-drain — without pull-ups (typically 4.7kΩ to 3.3V), the lines float and communication fails silently.',
      relatedConcept: 'I2C bus electrical characteristics',
      practicalUse: 'When connecting a BME280 temperature/humidity sensor to an ESP32, you connect SDA to GPIO21, SCL to GPIO22, and add 4.7kΩ pull-ups to 3.3V. Missing the pull-ups is the #1 I2C debugging headache.'
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
      explanation: 'Vout = Vin × R2/(R1+R2) = 3.3V × 5k/(10k+5k) = 3.3V × 1/3 = 1.1V. Voltage dividers are fundamental for level shifting and sensor biasing.',
      whyWrong: '2.2V would require R2/(R1+R2) = 2/3, meaning R2 > R1. 3.3V is the input (no division). 1.65V is the midpoint (R1 = R2).',
      commonMistake: 'Using voltage dividers for power supply. Dividers are for signal-level shifting only — they cannot supply current. Use a regulator for power.',
      relatedConcept: 'Impedance loading and buffer circuits',
      practicalUse: 'A 5V sensor output needs to feed a 3.3V ADC input. A divider with R1 = 10kΩ and R2 = 20kΩ gives Vout = 3.3V. Adding a voltage follower (op-amp buffer) prevents the ADC impedance from loading the divider.'
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
      explanation: 'Setting a role (e.g., "You are a senior embedded systems engineer") frames the AI\'s response style, depth, and terminology to match the domain you need.',
      whyWrong: 'The model name is metadata, not part of the prompt structure. The user\'s job title is context, not a prompt section. Programming language is a constraint, not a role.',
      commonMistake: 'Being too vague with the role. "You are an engineer" is weak. "You are a senior embedded systems engineer with 15 years of experience in motor control firmware and RTOS optimization" gives the model a specific lens.',
      relatedConcept: 'Prompt structure (Role/Objective/Background/Requirements)',
      practicalUse: 'Asking an LLM to debug a FreeRTOS deadlock? Set the role: "You are a senior embedded RTOS developer specializing in ARM Cortex-M4 with deep knowledge of priority inversion and mutex protocols." The response will use correct terminology and suggest the right debugging approach.'
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
      explanation: 'Constraints like "no external libraries", "target STM32F4", or "under 1KB RAM" prevent the AI from suggesting solutions that are technically correct but practically unusable in your context.',
      whyWrong: 'Longer prompts are not better — precision is. Constraints are the most important part of a technical prompt. Confusing the AI produces garbage output.',
      commonMistake: 'Omitting hardware constraints. Asking "write a PID controller" without specifying "on an STM32F0 with 64KB flash and no FPU" gets you a floating-point implementation that will not fit.',
      relatedConcept: 'Constraint-driven prompt design',
      practicalUse: 'Prompt: "Write a Kalman filter for IMU sensor fusion targeting ESP32-S3, using only integer math, under 2KB RAM, with 100Hz update rate." The constraints force a solution that actually compiles and runs on your hardware.'
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
      explanation: 'The highest-value profile combines solid EE fundamentals with the ability to train, optimize, and deploy ML models on real hardware — a rare and in-demand combination.',
      whyWrong: 'Python alone makes you a generalist. Cloud computing misses the edge/embedded world. Mechanical engineering overlaps but does not cover the AI-EE intersection.',
      commonMistake: 'Chasing every new framework. The fundamentals (signal processing, control theory, ML math) outlast any specific tool. Learn PyTorch OR TensorFlow deeply, not both shallowly.',
      relatedConcept: 'Career pivoting from pure EE to AI-EE',
      practicalUse: 'An EE who can train a model in Python, quantize it to INT8, deploy it on an STM32, and validate it on a real motor — that person is the bridge between the data science team and the hardware team. That bridge is rare and valuable.'
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
      explanation: 'TinyML enables inference on MCUs consuming less than 1mW — bringing AI to battery-powered sensors, wearables, and edge devices without cloud connectivity.',
      whyWrong: 'TinyML is a field, not a product. It is not a Python library (that would be TensorFlow or PyTorch). It is not a PCB tool (that would be KiCad or Altium).',
      commonMistake: 'Assuming TinyML means tiny models. The constraint is power and memory, not just model size. A 100KB model on a 256KB MCU running at 10μA average is TinyML. A 1GB model on a GPU is not.',
      relatedConcept: 'Model quantization and pruning for edge',
      practicalUse: 'A soil moisture sensor with a tiny ML model on an Arduino Nano 33 BLE can classify "dry", "optimal", and "waterlogged" locally, transmitting only the result via BLE — running for months on a AA battery.'
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
      explanation: 'Edge Impulse handles the full workflow — data collection, labeling, training, optimization, and deployment — with support for many MCU targets and sensor types.',
      whyWrong: 'Edge Impulse supports STM32, Nordic, Espressif, and many more — not just Arduino. It requires coding for custom integrations. It supports audio, vibration, time-series, and more.',
      commonMistake: 'Not collecting enough diverse data. Edge Impulse is only as good as your training data. Collect across different temperatures, loads, and operating conditions for a robust model.',
      relatedConcept: 'MLOps for embedded systems',
      practicalUse: 'With Edge Impulse, an engineer can collect vibration data from a shaking motor, train a K-means anomaly detector, and deploy it to a TinyML-ready board in an afternoon — no PhD required.'
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
      explanation: 'This structure shows you understand the full ML lifecycle — from defining the problem through measuring real-world impact — not just model training.',
      whyWrong: 'Listing tools shows what you used, not what you learned. Architecture alone misses the business context. A single accuracy number does not tell the story.',
      commonMistake: 'Skipping the "Impact" step. "I trained a model with 94% accuracy" is weak. "I deployed a model that reduced false rejects by 30%, saving $50K/year in manual inspection" is compelling.',
      relatedConcept: 'Technical storytelling and STAR method',
      practicalUse: 'Interview answer: "We had a problem with false alarms on our vibration monitoring system (Problem). I collected 6 months of motor data across 3 operating speeds (Data). I trained a random forest on frequency-domain features (Approach). False alarm rate dropped from 12% to 3% (Results). This saved the maintenance team 8 hours/week of unnecessary inspections (Impact)."'
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
      explanation: 'Defining success criteria and constraints upfront prevents wasted effort on models that are theoretically correct but impractical for the target hardware.',
      whyWrong: 'PCB color is cosmetic. Framework version changes. Network architecture is a design decision that comes after constraints are defined.',
      commonMistake: 'Starting with the model instead of the problem. "I want to use a CNN" is a solution looking for a problem. "I need to detect solder defects at 10 images/second on a $5 MCU" is a problem that drives architecture choices.',
      relatedConcept: 'Requirements-driven ML design',
      practicalUse: 'Project brief: "Detect motor bearing faults with <100ms latency, <500KB model, <1mW average power, on an nRF52840. Success = 95% detection rate with <5% false positives." Every design decision flows from these constraints.'
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
      explanation: 'Resolution determines the smallest detectable signal change, and sampling rate determines the maximum frequency you can accurately capture — both directly impact measurement quality.',
      whyWrong: 'Package color is cosmetic. GPIO count affects system design, not signal quality. Manufacturer affects reliability and cost, not measurement accuracy.',
      commonMistake: 'Overspecifying resolution. A 24-bit ADC sounds impressive, but if your sensor noise floor is 12 bits, the extra 12 bits measure noise. Match ADC resolution to your sensor\'s actual dynamic range.',
      relatedConcept: 'Nyquist theorem and ADC selection',
      practicalUse: 'For audio analysis of motor bearing noise, you need at least 40kHz sampling rate (2× the 20kHz audible range) and 12-bit resolution (72dB dynamic range). A 24-bit ADC at 48kHz is overkill; a 12-bit at 1kHz misses everything above 500Hz.'
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
      explanation: 'Autoencoder-based anomaly detection learns the pattern of "normal" behavior. New data that deviates significantly (high reconstruction error) is flagged as anomalous.',
      whyWrong: 'Never deploy without testing. Pre-trained models need fine-tuning for your specific sensor and environment. Data collection is the foundation of any ML system.',
      commonMistake: 'Setting the threshold too aggressively. A threshold that catches 100% of anomalies also catches normal variation as "anomalous." Start with a 95% normal baseline and adjust based on false positive rate.',
      relatedConcept: 'Autoencoder anomaly detection',
      practicalUse: 'Collect 1 hour of normal motor vibration → train autoencoder → set threshold at 95th percentile of reconstruction error → real-time monitoring flags any deviation as potential fault, triggering an alert.'
    }
  ],

  'resources': [],
  'quiz': [],
  'downloads': [],
  'badges': []
};

export const lessonQuizQuestions: Record<string, LessonQuestion[]> = {
  ...baseLessonQuizQuestions,
  'ai-fundamentals': [...baseLessonQuizQuestions['ai-fundamentals'], ...aiFundamentalsQuestions],
  'machine-learning': [...baseLessonQuizQuestions['machine-learning'], ...machineLearningQuestions],
  'deep-learning': [...baseLessonQuizQuestions['deep-learning'], ...deepLearningQuestions],
  'generative-ai': [...baseLessonQuizQuestions['generative-ai'], ...generativeAiQuestions],
  'electronics-applications': [
    ...baseLessonQuizQuestions['electronics-applications'],
    ...embeddedSystemsQuestions,
    ...sensorsIoTQuestions,
    ...protocolsQuestions,
    ...controlRoboticsQuestions,
    ...edgeAiTinyMlQuestions,
  ],
  'electronics-lab': [
    ...baseLessonQuizQuestions['electronics-lab'],
    ...mcuPlatformsQuestions,
    ...pcbElectronicsQuestions,
  ],
  'live-demonstrations': [
    ...baseLessonQuizQuestions['live-demonstrations'],
    ...fpgaVerilogQuestions,
  ],
  'component-encyclopedia': [
    ...baseLessonQuizQuestions['component-encyclopedia'],
    ...signalProcessingQuestions,
  ],
  'career-roadmap': [
    ...baseLessonQuizQuestions['career-roadmap'],
    ...careerProblemSolvingQuestions,
  ],
};
