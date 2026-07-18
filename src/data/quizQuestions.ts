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
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
  relatedLesson: string;
  tags: string[];
}

export const quizQuestions: QuizQuestion[] = [
  // ── Concept Understanding ──────────────────────────────────────────
  {
    id: 'cu-1',
    category: 'concept-understanding',
    difficulty: 'Medium',
    question: 'In a convolutional neural network trained to detect solder defects on PCB X-ray images, what does the first convolutional layer typically learn compared to the final layers?',
    options: [
      'The first layer learns high-level features like component placement; final layers learn raw pixel values',
      'The first layer learns low-level features (edges, corners, textures); final layers learn task-specific patterns like solder joint shapes',
      'All layers learn identical features distributed equally across the network',
      'The first layer learns color information only; final layers learn spatial information'
    ],
    correctAnswer: 'The first layer learns low-level features (edges, corners, textures); final layers learn task-specific patterns like solder joint shapes',
    explanation: 'CNN feature hierarchy starts with simple edge/corner detectors in early layers and builds toward task-specific abstract representations in deeper layers. For PCB inspection, early layers detect basic geometric primitives while later layers combine these into defect-specific patterns.',
    relatedLesson: 'deep-learning',
    tags: ['concept-understanding', 'deep-learning', 'computer-vision', 'cnn']
  },
  {
    id: 'cu-2',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'A transformer model\'s self-attention mechanism computes attention scores between every pair of elements in a sequence. For a real-time vibration sensor monitoring system processing 1-second windows at 8kHz, what is the computational complexity of standard self-attention, and why does this matter for edge deployment?',
    options: [
      'O(n): linear in sequence length, making it ideal for long sensor streams',
      'O(n²): quadratic in sequence length, so an 8000-sample window requires 64 million pairwise comparisons per inference',
      'O(log n): logarithmic scaling, efficient regardless of sampling rate',
      'O(1): constant time, independent of window size'
    ],
    correctAnswer: 'O(n²): quadratic in sequence length, so an 8000-sample window requires 64 million pairwise comparisons per inference',
    explanation: 'Standard self-attention has O(n²) complexity. For 8kHz vibration data (8000 samples/second), each inference needs ~64M comparisons, which exceeds the compute budget of typical MCUs. This is why efficient attention variants (linear attention, Performer) or CNN-based alternatives are preferred for edge time-series processing.',
    relatedLesson: 'llms',
    tags: ['concept-understanding', 'transformers', 'edge-ai', 'computational-complexity']
  },
  {
    id: 'cu-3',
    category: 'concept-understanding',
    difficulty: 'Easy',
    question: 'What distinguishes reinforcement learning from supervised learning when applied to a robotics pick-and-place system?',
    options: [
      'Reinforcement learning requires labeled examples of correct placements; supervised learning does not',
      'Reinforcement learning learns from reward signals based on trial-and-error interaction with the environment; supervised learning learns from labeled input-output pairs',
      'They are identical except for the programming language used',
      'Reinforcement learning only works in simulations; supervised learning works in hardware'
    ],
    correctAnswer: 'Reinforcement learning learns from reward signals based on trial-and-error interaction with the environment; supervised learning learns from labeled input-output pairs',
    explanation: 'RL agents discover optimal actions through exploration and reward feedback — ideal for robotics where the correct action sequence isn\'t known in advance. Supervised learning requires pre-labeled examples of correct behavior, which are often impractical to generate for complex physical tasks.',
    relatedLesson: 'ai-fundamentals',
    tags: ['concept-understanding', 'reinforcement-learning', 'supervised-learning', 'robotics']
  },

  // ── Practical Application ──────────────────────────────────────────
  {
    id: 'pa-1',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'You trained a Keras model for motor fault classification (64×64 spectrogram inputs, 3 convolutional layers, 2 dense layers). The model achieves 98% accuracy but requires 2.3MB of RAM and 45ms inference on your target STM32F4 (168MHz). Your requirements are <256KB RAM and <10ms inference. Which combination of optimizations should you apply first?',
    options: [
      'Quantize weights to 8-bit integers, prune 50% of connections, and reduce input spectrogram size',
      'Switch to a Raspberry Pi instead of optimizing',
      'Add more convolutional layers to improve accuracy before optimizing',
      'Convert to TensorFlow without any changes — the compiler optimizes automatically'
    ],
    correctAnswer: 'Quantize weights to 8-bit integers, prune 50% of connections, and reduce input spectrogram size',
    explanation: 'INT8 quantization reduces memory 4× vs FP32 and can speed up inference 2-4× on MCUs with hardware SIMD. Pruning removes redundant connections. Input size reduction directly affects both memory and speed. These are standard TinyML optimization techniques, typically applied together for maximum impact.',
    relatedLesson: 'ai-tools',
    tags: ['practical-application', 'tinyml', 'model-optimization', 'quantization', 'edge-deployment']
  },
  {
    id: 'pa-2',
    category: 'practical-application',
    difficulty: 'Medium',
    question: 'A temperature sensor outputs 0-5V analog, but your ADC reference voltage is 3.3V. Directly connecting the sensor output to the ADC pin could damage the microcontroller. What is the correct practical approach to measure the full 0-5V range safely?',
    options: [
      'Use a voltage divider (e.g., R1=10kΩ, R2=20kΩ) to scale 5V to 3.33V',
      'Connect directly — the ADC will clip values above 3.3V automatically',
      'Add a 5V zener diode in parallel with the ADC pin',
      'Use a 3.3V-to-5V level shifter in reverse'
    ],
    correctAnswer: 'Use a voltage divider (e.g., R1=10kΩ, R2=20kΩ) to scale 5V to 3.33V',
    explanation: 'A voltage divider scales the 5V output to 3.33V (Vout = 5V × 20k/(10k+20k)), matching the ADC range without exceeding the absolute maximum input voltage. Always verify the divider\'s output impedance is compatible with the ADC\'s input impedance for accurate readings.',
    relatedLesson: 'electronics-lab',
    tags: ['practical-application', 'analog-design', 'adc', 'voltage-divider']
  },
  {
    id: 'pa-3',
    category: 'practical-application',
    difficulty: 'Medium',
    question: 'You need to add over-the-air (OTA) firmware update capability to a deployed IoT sensor network. The devices use ESP32 with 4MB flash. Each firmware binary is 1.2MB. What partitioning scheme ensures reliable updates with rollback capability?',
    options: [
      'Single flash partition — overwrite the current firmware directly',
      'Two OTA partitions (factory + OTA) plus a small bootloader — flash one while running from the other, with fallback',
      'Store the new firmware in RAM, then write to flash during operation',
      'No partition needed — ESP32 handles OTA automatically'
    ],
    correctAnswer: 'Two OTA partitions (factory + OTA) plus a small bootloader — flash one while running from the other, with fallback',
    explanation: 'Dual-partition OTA writes the new firmware to the inactive partition while the device runs normally from the active partition. On next boot, the bootloader switches to the new partition. If the update fails or the new firmware crashes, the bootloader automatically reverts to the known-good partition — critical for remote devices without physical access.',
    relatedLesson: 'project-builder',
    tags: ['practical-application', 'iot', 'ota', 'firmware', 'esp32']
  },

  // ── Debugging Scenarios ────────────────────────────────────────────
  {
    id: 'ds-1',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A FreeRTOS system has three tasks: a high-priority temperature monitoring task (reads I2C sensor every 100ms), a medium-priority data logging task (writes to SD card via SPI), and a low-priority display update task. After adding a new WiFi communication task at medium priority, the temperature monitoring task starts missing its 100ms deadline intermittently. What is the most likely cause?',
    options: [
      'The I2C sensor is faulty and needs replacement',
      'Priority inversion — the high-priority temperature task is indirectly blocked by the medium-priority tasks sharing a resource via a mutex',
      'The microcontroller is overheating and needs a heatsink',
      'The FreeRTOS kernel has a bug that limits the number of tasks to four'
    ],
    correctAnswer: 'Priority inversion — the high-priority temperature task is indirectly blocked by the medium-priority tasks sharing a resource via a mutex',
    explanation: 'Priority inversion occurs when a high-priority task waits on a mutex held by a low-priority task, but medium-priority tasks preempt the low-priority task, preventing it from releasing the mutex. The high-priority task effectively runs at the lowest priority. Fix: use a mutex with priority inheritance, or redesign to minimize shared resource contention between priority levels.',
    relatedLesson: 'electronics-applications',
    tags: ['debugging-scenarios', 'rtos', 'freertos', 'priority-inversion', 'real-time']
  },
  {
    id: 'ds-2',
    category: 'debugging-scenarios',
    difficulty: 'Medium',
    question: 'Your deployed ML model for fan bearing fault detection achieves 97% accuracy on your lab test set. On the factory floor, it triggers false alarms constantly on the first day of every month. Investigating further, you discover the factory runs a mandatory 30-minute full-speed test on all production equipment on the first of each month. What is the root cause?',
    options: [
      'The model has overfit to the training data and needs more regularization',
      'The model was trained only on steady-state vibration patterns; the full-speed test produces vibration signatures outside the training distribution',
      'The sensor is malfunctioning on the first of each month',
      'The factory Wi-Fi interference corrupts the model\'s weights'
    ],
    correctAnswer: 'The model was trained only on steady-state vibration patterns; the full-speed test produces vibration signatures outside the training distribution',
    explanation: 'Models fail when encountering data outside their training distribution. The full-speed test generates vibration patterns the model never saw during training, causing unpredictable predictions. Solution: include all known operating modes in training data, or train a separate classifier to first detect the operating mode before running the fault detection model.',
    relatedLesson: 'machine-learning',
    tags: ['debugging-scenarios', 'mlops', 'data-distribution', 'anomaly-detection', 'predictive-maintenance']
  },
  {
    id: 'ds-3',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'You\'re debugging a SPI communication between an STM32H7 master and a 16-bit ADC slave. At 20MHz clock, transmitted bytes are occasionally corrupted (wrong bit values). Lowering the clock to 5MHz fixes the problem. The PCB trace length is 12cm with no series termination resistor. What is the root cause?',
    options: [
      'The ADC is defective and needs replacement',
      'Signal reflections caused by impedance mismatch at 20MHz — the trace length is electrically long relative to the signal rise time, causing ringing and data corruption',
      'The STM32H7 cannot generate a 20MHz SPI clock — it\'s out of spec',
      'The SPI mode (CPOL/CPHA) is configured incorrectly at higher speeds'
    ],
    correctAnswer: 'Signal reflections caused by impedance mismatch at 20MHz — the trace length is electrically long relative to the signal rise time, causing ringing and data corruption',
    explanation: 'At 20MHz, the signal rise time is ~5ns. A 12cm trace has a propagation delay of ~0.6ns, making it electrically long (delay > rise_time/6). Without proper termination, reflections cause overshoot/undershoot that violates logic thresholds. Fix: add series termination resistor (typically 22-33Ω) at the source, match trace impedance, or reduce clock speed.',
    relatedLesson: 'electronics-lab',
    tags: ['debugging-scenarios', 'spi', 'signal-integrity', 'pcb-design', 'high-speed']
  },

  // ── Circuit Reasoning ──────────────────────────────────────────────
  {
    id: 'cr-1',
    category: 'circuit-reasoning',
    difficulty: 'Medium',
    question: 'An I2C bus operates at 400kHz (Fast Mode) with a total bus capacitance of 200pF and a 4.7kΩ pull-up resistor on SDA. The rise time of the SDA line is approximately τ = RC = 4.7kΩ × 200pF = 940ns. I2C Fast Mode specifies a maximum rise time of 300ns. What is the consequence of this violation?',
    options: [
      'The bus will consume less power, which is beneficial',
      'The SDA line may not reach a valid logic HIGH within the required timing window, causing data corruption',
      'The pull-up resistor will overheat and fail',
      'The I2C bus automatically switches to Standard Mode (100kHz) to compensate'
    ],
    correctAnswer: 'The SDA line may not reach a valid logic HIGH within the required timing window, causing data corruption',
    explanation: 'I2C timing specifications require the SDA line to rise above VIH (typically 0.7×VDD) within t_r(max) = 300ns for Fast Mode. With a 940ns rise time (3× the spec), the bus cannot reliably achieve valid logic levels. Fix: reduce pull-up resistor value (e.g., 2.2kΩ gives τ = 440ns) or reduce bus capacitance by shortening traces and reducing stub lengths.',
    relatedLesson: 'component-encyclopedia',
    tags: ['circuit-reasoning', 'i2c', 'timing-analysis', 'signal-integrity', 'pull-up']
  },
  {
    id: 'cr-2',
    category: 'circuit-reasoning',
    difficulty: 'Medium',
    question: 'You design an inverting op-amp amplifier with gain of -10 using an LM358. Input signal: 500mVpp at 50kHz sine wave. The LM358 has a gain-bandwidth product (GBW) of 1MHz. What will the actual gain be at 50kHz, and is this circuit suitable for the application?',
    options: [
      'Gain remains -10 at all frequencies — op-amp gain is frequency-independent',
      'The effective gain drops to approximately -20 (GBW/frequency = 1MHz/50kHz), making the output 2× larger than expected',
      'The effective gain drops to approximately -1.8 (the open-loop gain at 50kHz limits the closed-loop gain), distorting the output significantly',
      'The op-amp will oscillate at 50kHz and produce no output'
    ],
    correctAnswer: 'The effective gain drops to approximately -1.8 (the open-loop gain at 50kHz limits the closed-loop gain), distorting the output significantly',
    explanation: 'At 50kHz, the LM358\'s open-loop gain is GBW/f = 1MHz/50kHz = 20 (26dB). The closed-loop gain of -10 requires at least 40dB of open-loop gain for accuracy (loop gain margin). With only 20dB available, the actual gain deviates significantly and introduces distortion. Solution: choose an op-amp with GBW > 500kHz (e.g., 10MHz op-amp for 10× margin).',
    relatedLesson: 'component-encyclopedia',
    tags: ['circuit-reasoning', 'op-amp', 'gain-bandwidth', 'analog-design', 'frequency-response']
  },
  {
    id: 'cr-3',
    category: 'circuit-reasoning',
    difficulty: 'Easy',
    question: 'A 3.3V microcontroller GPIO pin drives an N-channel MOSFET gate to switch a 12V relay. The gate is connected through a 1kΩ resistor. When the GPIO goes HIGH (3.3V), the relay does not activate. The MOSFET datasheet shows Vgs(th) is 2.5V max. What is the most likely circuit problem?',
    options: [
      'The 1kΩ resistor is too large and limits gate current',
      'The relay requires 12V, but the MOSFET is only receiving 3.3V at the gate — the issue is that 3.3V may not be sufficient for the MOSFET to fully saturate (Rds(on) specified at Vgs=10V)',
      'The GPIO pin cannot source enough current to switch the MOSFET',
      'The MOSFET is damaged because of the 12V supply'
    ],
    correctAnswer: 'The relay requires 12V, but the MOSFET is only receiving 3.3V at the gate — the issue is that 3.3V may not be sufficient for the MOSFET to fully saturate (Rds(on) specified at Vgs=10V)',
    explanation: 'Vgs(th) is the threshold where the MOSFET JUST starts conducting — not where it fully saturates. Most power MOSFETs specify Rds(on) at Vgs = 10V. At 3.3V gate drive, the MOSFET operates in the linear region with high Rds(on), dropping significant voltage and dissipating excessive power. Solution: use a logic-level MOSFET (rated for Vgs=3.3V saturation) or add a gate driver to boost Vgs to 10-12V.',
    relatedLesson: 'electronics-lab',
    tags: ['circuit-reasoning', 'mosfet', 'gate-drive', 'power-electronics']
  },

  // ── Engineering Decisions ─────────────────────────────────────────
  {
    id: 'ed-1',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'You are selecting a communication protocol for a new medical sensor that streams 16-bit samples at 250ksps (4Mbps) with strict real-time requirements. The PCB has four layers with dedicated ground plane, and the sensor is 3cm from the MCU. Which protocol do you choose and what is the deciding factor?',
    options: [
      'I2C in Fast Mode (400kHz) — it uses only 2 wires and is simpler to implement',
      'UART at 4Mbps — RS232 voltage levels provide noise immunity',
      'SPI at 20MHz — it provides the required throughput with dedicated data/clock lines and full-duplex capability, and can be run synchronously without firmware protocol overhead',
      'CAN bus — it provides built-in error detection and is standard in medical devices'
    ],
    correctAnswer: 'SPI at 20MHz — it provides the required throughput with dedicated data/clock lines and full-duplex capability, and can be run synchronously without firmware protocol overhead',
    explanation: 'SPI easily handles 4Mbps (20MHz clock provides 20Mbps). For a short 3cm trace with ground plane, signal integrity at 20MHz is manageable. I2C Fast Mode maxes at 400kHz (3.2Mbps theoretical but with protocol overhead). UART has no clock and needs precise baud rate matching. CAN is robust but maxes at 1Mbps and has significant protocol overhead. SPI is the clear choice for high-speed, short-distance, real-time sensor streaming.',
    relatedLesson: 'component-encyclopedia',
    tags: ['engineering-decisions', 'communication-protocols', 'spi', 'real-time', 'embedded-design']
  },
  {
    id: 'ed-2',
    category: 'engineering-decisions',
    difficulty: 'Medium',
    question: 'Your team needs to deploy an anomaly detection system for 10,000 industrial motors. Two approaches are proposed: (A) Install a local Raspberry Pi running a TensorFlow model at each motor ($150/unit), or (B) Install a simple ESP32 that streams raw vibration data to a central server running the model ($25/unit + server costs). Considering total cost of ownership over 5 years, which is more maintainable at scale?',
    options: [
      'Approach A — local inference on Pi avoids network dependency and server costs',
      'Approach B — centralized processing makes model updates easy and leverages far more compute for better accuracy, with lower per-node hardware cost',
      'Neither — both approaches are equivalent in total cost',
      'Use FPGAs at each motor instead for maximum performance regardless of cost'
    ],
    correctAnswer: 'Approach B — centralized processing makes model updates easy and leverages far more compute for better accuracy, with lower per-node hardware cost',
    explanation: 'At 10,000 units, the $125/unit savings of Approach B = $1.25M in hardware alone. Centralized models are trivial to update (no OTA per node), can use more powerful models, and enable fleet-wide retraining when new fault patterns emerge. The trade-off is network reliability — mitigated by buffering data locally and batch-sending. Hybrid approach: local lightweight pre-filtering on ESP32, send anomalies to central server for detailed analysis.',
    relatedLesson: 'engineering-decisions',
    tags: ['engineering-decisions', 'system-architecture', 'edge-vs-cloud', 'scalability', 'iot']
  },
  {
    id: 'ed-3',
    category: 'engineering-decisions',
    difficulty: 'Easy',
    question: 'A senior engineer asks you to review a design for a battery-powered IoT sensor. The current design uses an ARM Cortex-M4 running at 200MHz continuously, polling an accelerometer at 1kHz and sending data via Wi-Fi every 10 seconds. The battery lasts 6 hours. The requirement is 6 months. What single change will have the greatest impact on battery life?',
    options: [
      'Replace the ARM Cortex-M4 with a more efficient Cortex-M0+ running at lower clock speed',
      'Switch from Wi-Fi to Bluetooth LE for data transmission',
      'Put the microcontroller in deep sleep mode between samples, waking only to read the sensor and transmit',
      'Increase the polling rate to improve data quality and reduce retransmissions'
    ],
    correctAnswer: 'Put the microcontroller in deep sleep mode between samples, waking only to read the sensor and transmit',
    explanation: 'The single most impactful power optimization is duty cycling. A microcontroller in deep sleep consumes microamps vs milliamps when active. If the device spends 99.9% of time in deep sleep (waking for ~10ms every 10 seconds), total current drops by ~1000×. Clock speed reduction and BLE help, but sleep/wake cycling provides orders of magnitude more savings and should be the first optimization in any battery-powered design.',
    relatedLesson: 'electronics-applications',
    tags: ['engineering-decisions', 'power-optimization', 'battery-life', 'iot', 'embedded-design']
  },

  // ── Real-World Situations ─────────────────────────────────────────
  {
    id: 'rw-1',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A factory deploys 500 IoT vibration sensors for predictive maintenance. Each sensor samples at 8kHz (16-bit samples = 128Kbps) and streams raw data continuously over LTE to the cloud. The monthly cellular data bill is now $4,000/month. The factory manager asks you to reduce costs while maintaining fault detection capability. What is the most practical engineering solution?',
    options: [
      'Reduce sampling rate to 1kHz — it still captures most vibration patterns and cuts data 8×',
      'Deploy a TinyML model on each sensor to extract features and transmit only anomaly scores and fault classifications (bytes/day instead of GB/day)',
      'Switch all sensors to Wi-Fi — factory Wi-Fi is free and covers the entire facility',
      'Negotiate a better cellular plan with the provider'
    ],
    correctAnswer: 'Deploy a TinyML model on each sensor to extract features and transmit only anomaly scores and fault classifications (bytes/day instead of GB/day)',
    explanation: 'Raw 8kHz streaming at scale is expensive and unnecessary. Edge processing extracts relevant features (FFT peaks, RMS, crest factor, or ML-based anomaly scores) and transmits only results — typically 100-500 bytes/day instead of 1.1GB/day per sensor. This cuts data costs ~99.9% while maintaining detection capability. A $5 MCU with edge ML capability pays for itself in data savings within weeks.',
    relatedLesson: 'real-world-situations',
    tags: ['real-world-situations', 'edge-computing', 'tinyml', 'iot', 'predictive-maintenance', 'cost-optimization']
  },
  {
    id: 'rw-2',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'Your medical device startup develops an AI-powered ECG monitor for detecting atrial fibrillation. The ML model achieves 99.5% sensitivity and 98% specificity on public datasets. The FDA requires clinical validation before approval. Besides the standard train/test split, what additional validation is essential for regulatory approval?',
    options: [
      'None — 99.5% sensitivity is already sufficient for FDA clearance',
      'A prospective clinical trial with diverse patient populations across multiple clinical sites, measuring sensitivity and specificity vs. gold-standard cardiologist annotation',
      'Run the model on 10× more public datasets to increase statistical significance',
      'Publish the model architecture in a peer-reviewed journal'
    ],
    correctAnswer: 'A prospective clinical trial with diverse patient populations across multiple clinical sites, measuring sensitivity and specificity vs. gold-standard cardiologist annotation',
    explanation: 'FDA requires clinical validation because public datasets don\'t represent real-world patient diversity (age, comorbidities, ethnicity, signal quality variation from different hardware). A prospective multi-site trial evaluates the entire system (sensor + algorithm + clinical workflow), not just the model. The model must also demonstrate consistent performance across subgroups and be validated against the clinically accepted gold standard, not just a software reference.',
    relatedLesson: 'interview-prep',
    tags: ['real-world-situations', 'medical-devices', 'fda', 'clinical-validation', 'regulatory']
  },
  {
    id: 'rw-3',
    category: 'real-world-situations',
    difficulty: 'Medium',
    question: 'An automotive Tier-1 supplier deploys ML-based optical inspection for PCB assembly. The system achieves 99% accuracy on the production line, but the quality team complains that the 1% false negatives (missed defects) always seem to be the most expensive assemblies to fail in the field. What systemic issue does this reveal?',
    options: [
      'The model needs more training data — accuracy will improve with more examples',
      'The evaluation metric (overall accuracy) is misleading — rare but costly defects contribute negligibly to the 99% metric, so the model optimizes for common easy-to-detect defects while missing expensive edge cases',
      'The camera is not high resolution enough for defect detection',
      'The production line speed is too fast for the model to process properly'
    ],
    correctAnswer: 'The evaluation metric (overall accuracy) is misleading — rare but costly defects contribute negligibly to the 99% metric, so the model optimizes for common easy-to-detect defects while missing expensive edge cases',
    explanation: 'Overall accuracy is the wrong metric when class imbalance is severe and misclassification costs are asymmetric. If 99.9% of assemblies are good and 0.1% have expensive defects, a model that classifies everything as "good" achieves 99.9% accuracy while missing ALL defects. Solution: use precision-recall curves, cost-sensitive learning that penalizes false negatives far more, and metrics aligned with business impact (e.g., expected cost per assembly).',
    relatedLesson: 'machine-learning',
    tags: ['real-world-situations', 'ml-metrics', 'class-imbalance', 'quality-assurance', 'cost-sensitive-learning']
  },

  // ── Interview-Style ────────────────────────────────────────────────
  {
    id: 'is-1',
    category: 'interview-style',
    difficulty: 'Medium',
    question: 'In an embedded systems interview, the interviewer asks: "How would you design a system to detect early bearing faults in an industrial motor using ML?" Which answer demonstrates the strongest engineering judgment?',
    options: [
      'Use a pre-trained ResNet-50 from the internet and fine-tune it on motor data — it works for everything',
      'Select an accelerometer, collect vibration data under normal and fault conditions at multiple RPMs, extract time/frequency-domain features, train a lightweight classifier (Random Forest or small CNN), validate against known failure cases, and deploy on a microcontroller with edge inference for real-time monitoring',
      'Buy a commercial vibration sensor with built-in alarms — no ML needed',
      'Train a large language model on motor manuals and use it to diagnose faults'
    ],
    correctAnswer: 'Select an accelerometer, collect vibration data under normal and fault conditions at multiple RPMs, extract time/frequency-domain features, train a lightweight classifier (Random Forest or small CNN), validate against known failure cases, and deploy on a microcontroller with edge inference for real-time monitoring',
    explanation: 'This answer demonstrates a complete engineering pipeline: sensor selection, data collection across operating conditions, domain-appropriate feature engineering, model selection appropriate for resource-constrained deployment, validation strategy, and deployment architecture. Strong interview answers show you understand the full lifecycle — not just model training, but also data acquisition, hardware constraints, and practical edge deployment.',
    relatedLesson: 'interview-prep',
    tags: ['interview-style', 'system-design', 'embedded-ml', 'engineering-lifecycle']
  },
  {
    id: 'is-2',
    category: 'interview-style',
    difficulty: 'Medium',
    question: 'An interviewer asks: "Tell me about a time you diagnosed a difficult hardware-software interaction issue." What response structure demonstrates the strongest engineering communication?',
    options: [
      'Describe the technical details of the microcontroller architecture and the OS scheduler',
      'Follow the STAR format (Situation, Task, Action, Result) — describe the symptom, your systematic debugging process (hypothesis → experiment → analysis), the root cause found, and the measured improvement after the fix',
      'Blame the vendor for providing defective components',
      'Explain that hardware issues are rare in your experience because you write careful software'
    ],
    correctAnswer: 'Follow the STAR format (Situation, Task, Action, Result) — describe the symptom, your systematic debugging process (hypothesis → experiment → analysis), the root cause found, and the measured improvement after the fix',
    explanation: 'STAR (Situation, Task, Action, Result) is the industry-standard behavioral interview format. For debugging stories, emphasize your methodical approach: how you isolated variables, what tools you used (oscilloscope, logic analyzer, debugger), how you formed and tested hypotheses, and what the root cause was (e.g., ISR timing violation, race condition, signal integrity issue). Quantify the result — "reduced crash rate from 5/day to 0."',
    relatedLesson: 'interview-prep',
    tags: ['interview-style', 'behavioral-interview', 'debugging', 'star-method']
  },
  {
    id: 'is-3',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'An interviewer asks: "Your FPGA-based object detection system meets timing closure at 100MHz but only achieves 15fps. The requirement is 30fps. You cannot change the hardware. What do you do?" Which optimization approach is most likely to succeed?',
    options: [
      'Overclock the FPGA to 200MHz — FPGAs usually handle double frequency',
      'Apply model quantization (INT8), network pruning, and layer fusion; explore reduced input resolution; pipeline the processing stages to improve throughput without changing clock frequency',
      'Switch from YOLO to a larger, more accurate model that requires fewer frames',
      'Reduce the power supply voltage to decrease heat and improve timing'
    ],
    correctAnswer: 'Apply model quantization (INT8), network pruning, and layer fusion; explore reduced input resolution; pipeline the processing stages to improve throughput without changing clock frequency',
    explanation: '2× throughput improvement is achievable via: (1) INT8 quantization reduces resource usage and latency ~2-4× on FPGA DSP slices; (2) pruning removes ~50% of weights with minimal accuracy loss; (3) layer fusion combines adjacent operations to reduce memory transfers; (4) pipeline design overlaps computation across frames. These are standard FPGA ML optimization techniques that don\'t require hardware changes. Reducing input resolution (e.g., 640×480 → 320×240) also provides ~4× fewer pixels to process.',
    relatedLesson: 'deep-learning',
    tags: ['interview-style', 'fpga', 'model-optimization', 'tinyml', 'edge-ai']
  },

  // ── Industry-Oriented ─────────────────────────────────────────────
  {
    id: 'io-1',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'An automotive electronics supplier must develop an ML-based pedestrian detection system for an ADAS camera module. The system must comply with ISO 26262 ASIL-B. What fundamentally changes about the ML development process compared to a non-safety-critical ML project?',
    options: [
      'ISO 26262 does not apply to ML-based systems — only traditional software qualifies',
      'The ML model must be developed with formal verification, comprehensive safety monitoring (input validity checking, output plausibility checks, confidence estimation), a fallback mechanism if the model is uncertain, and the entire development process must be auditable with traceability from requirements to testing',
      'The only change is that the model must achieve >99.99% accuracy',
      'ISO 26262 requires using only decision trees because they are interpretable'
    ],
    correctAnswer: 'The ML model must be developed with formal verification, comprehensive safety monitoring (input validity checking, output plausibility checks, confidence estimation), a fallback mechanism if the model is uncertain, and the entire development process must be auditable with traceability from requirements to testing',
    explanation: 'ISO 26262 for ML systems requires (1) a safety concept that handles ML-specific failure modes (distribution shift, adversarial inputs, low confidence), (2) runtime monitors that detect when the model operates outside its validated domain, (3) fallback mechanisms (degraded mode or handoff to driver), (4) comprehensive data management with traceability, and (5) argument-based safety cases rather than purely statistical evidence. Accuracy alone is insufficient — the system must prove it can fail safely.',
    relatedLesson: 'interview-prep',
    tags: ['industry-oriented', 'iso-26262', 'automotive', 'functional-safety', 'adas', 'safety-critical']
  },
  {
    id: 'io-2',
    category: 'industry-oriented',
    difficulty: 'Medium',
    question: 'A semiconductor wafer fabrication plant wants to use ML to predict yield from real-time process sensor data (temperature, pressure, gas flow, plasma power across 300+ process steps). An engineer suggests training a single end-to-end neural network on all the data. Why might this approach fail, and what is a better strategy?',
    options: [
      'The neural network won\'t fail — more data always improves predictions. This is the correct approach',
      'The data has high dimensionality (300+ steps × dozens of sensors) with complex temporal dependencies, but the main problem is that wafer fab data is too noisy for any ML approach',
      'A single end-to-end model is a black box that makes it impossible to attribute yield loss to specific process steps. Better: decompose the problem into per-step models or use interpretable feature engineering with domain knowledge about which physical parameters affect yield at each step',
      'The problem is that semiconductor data is proprietary and cannot be used for ML'
    ],
    correctAnswer: 'A single end-to-end model is a black box that makes it impossible to attribute yield loss to specific process steps. Better: decompose the problem into per-step models or use interpretable feature engineering with domain knowledge about which physical parameters affect yield at each step',
    explanation: 'In semiconductor manufacturing, you need to know which process step caused a yield drop — a single monolithic model masks this. Better approaches: (1) per-step statistical process control models using domain-specific features, (2) hierarchical models that predict yield contribution of each step, (3) interpretable methods like gradient-boosted trees with SHAP values for feature importance. The semiconductor industry values interpretability and root-cause analysis over raw predictive power.',
    relatedLesson: 'industry-oriented',
    tags: ['industry-oriented', 'semiconductor', 'manufacturing', 'interpretability', 'yield-prediction']
  },
  {
    id: 'io-3',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'An aerospace company must certify an ML-based system for detecting flight control surface icing (DO-178C DAL-A). Unlike consumer ML, DO-178C requires structural coverage of the software (MC/DC coverage at level A). How does this requirement conflict with typical neural network deployment, and what approach can satisfy both?',
    options: [
      'DO-178C does not apply to ML systems — AI-based aerospace systems have separate certification paths',
      'Neural networks cannot achieve MC/DC coverage because of their non-linear, highly coupled structure — proving that every condition independently affects every output is computationally intractable. A certified approach uses a verifiable traditional algorithm with ML providing supplementary input (e.g., ML model output is treated as "advisory" with a deterministic backup that has been certified to DO-178C)',
      'Train a smaller network with <1000 parameters — small networks are exempt from MC/DC requirements',
      'Use a support vector machine instead of a neural network — SVM models are inherently certifiable'
    ],
    correctAnswer: 'Neural networks cannot achieve MC/DC coverage because of their non-linear, highly coupled structure — proving that every condition independently affects every output is computationally intractable. A certified approach uses a verifiable traditional algorithm with ML providing supplementary input (e.g., ML model output is treated as "advisory" with a deterministic backup that has been certified to DO-178C)',
    explanation: 'DO-178C DAL-A requires Modified Condition/Decision Coverage (MC/DC) — proving every condition independently affects the outcome. Neural networks have millions of coupled, non-linear paths making MC/DC intractable. Current aerospace ML certification strategies include: (1) ML as advisory only (non-flight-critical), (2) ML with a formally verified "safety envelope" that overrides ML outputs if they exceed bounds, (3) ML used offline for maintenance recommendations, not real-time control. True flight-critical ML certification is still an open research problem.',
    relatedLesson: 'interview-prep',
    tags: ['industry-oriented', 'aerospace', 'do-178c', 'certification', 'safety-critical', 'formal-verification']
  }
];
