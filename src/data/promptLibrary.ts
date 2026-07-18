export type PromptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type AIQuality = 'Excellent' | 'Good' | 'Fair';

export interface PromptEntry {
  id: string;
  title: string;
  category: string;
  difficulty: PromptDifficulty;
  role: string;
  objective: string;
  background?: string;
  requirements: string[];
  constraints?: string[];
  expectedOutput: string;
  bestPractices?: string[];
  commonMistakes?: string[];
  usageTips: string;
  aiResponseQuality: AIQuality;
}

export const promptCategories = [
  'All',
  'Arduino',
  'ESP32',
  'STM32',
  'PCB Design',
  'MATLAB',
  'Research',
  'Resume',
  'GitHub',
  'LinkedIn',
  'Reports',
  'Circuit Analysis'
];

export const promptLibraryData: PromptEntry[] = [
  {
    id: 'p1',
    title: 'Non-Blocking Blink',
    category: 'Arduino',
    difficulty: 'Beginner',
    role: 'Act as a Senior Embedded Systems Engineer teaching firmware state machines.',
    objective: 'Write an Arduino sketch to blink two LEDs at different frequencies without using the delay() function.',
    background: 'I am learning state machine concepts and want to understand how millis()-based timing works for non-blocking firmware.',
    requirements: [
      'Define two LEDs on different pins (e.g., LED1 on pin 8, LED2 on pin 13)',
      'Use millis() to track elapsed time for each LED independently',
      'LED1 blinks every 500ms, LED2 blinks every 1000ms',
      'Use a state variable (HIGH/LOW) that toggles on each interval',
      'Add a comment explaining why delay() is problematic in real firmware',
    ],
    expectedOutput: 'A complete Arduino sketch with two independent timing loops, no delay() calls, and clear variable naming.',
    bestPractices: [
      'Always use unsigned long for millis() comparisons to avoid overflow bugs',
      'Define timing intervals as named constants, not magic numbers',
      'Consider using a struct to group per-LED state for scalability',
    ],
    commonMistakes: [
      'Using int instead of unsigned long for millis() storage — causes overflow at ~32 days',
      'Forgetting that millis() resets on board reset but does not pause',
    ],
    usageTips: 'Great for learning state machine concepts early on. Ask the AI to extend it to 3 LEDs for extra practice.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p2',
    title: 'FreeRTOS Task Allocation',
    category: 'ESP32',
    difficulty: 'Intermediate',
    role: 'Act as a Senior Embedded Systems Engineer specializing in FreeRTOS on ESP32.',
    objective: 'Write an ESP-IDF C code snippet using FreeRTOS with two tasks: Task A reads a DHT22 sensor on core 0, and Task B sends that data via MQTT on core 1.',
    background: 'I am building a sensor gateway using ESP-IDF and need to understand task allocation, queue-based data passing, and dual-core utilization on the ESP32.',
    requirements: [
      'Use xTaskCreatePinnedToCore to assign tasks to specific cores',
      'Use a FreeRTOS queue to pass sensor data from Task A to Task B',
      'Task A: read DHT22 every 2 seconds, send struct to queue',
      'Task B: receive from queue, publish to MQTT broker',
      'Include proper error handling for queue满 and MQTT connection failures',
    ],
    constraints: [
      'Must use ESP-IDF APIs, not Arduino framework',
      'Queue depth should be at least 5 to handle burst reads',
    ],
    expectedOutput: 'Complete C code with xTaskCreatePinnedToCore, xQueueSend/Receive, DHT22 read function, and MQTT publish call.',
    bestPractices: [
      'Pin sensor-reading tasks to core 0 (protocol core handles Wi-Fi on core 1)',
      'Use a struct for queue data, not raw floats — easier to extend later',
      'Add vTaskDelay between reads to yield CPU time',
    ],
    usageTips: 'Specify the ESP-IDF version if you need specific API compatibility.',
    aiResponseQuality: 'Good'
  },
  {
    id: 'p3',
    title: 'HAL Timer PWM',
    category: 'STM32',
    difficulty: 'Advanced',
    role: 'Act as a Senior Firmware Engineer with 15 years of experience in motor control and STM32 HAL.',
    objective: 'Explain how to configure an advanced-control timer (TIM1) on an STM32F4 to generate a center-aligned PWM signal with dead-time insertion for a half-bridge motor driver.',
    background: 'I am designing a BLDC motor controller using an STM32F407 and need center-aligned PWM to minimize switching losses and dead-time to prevent shoot-through in the H-bridge.',
    requirements: [
      'Configure TIM1 for center-aligned mode (CMS = 01)',
      'Set up two complementary channels (CH1/CH1N) for high-side and low-side',
      'Configure dead-time register (DTG) with a specific value and explain the calculation',
      'Provide the HAL C code for TIM_OCInitTypeDef and TIM_BreakDeadTimeConfig',
      'Explain how to dynamically adjust duty cycle from a control loop',
    ],
    expectedOutput: 'Detailed explanation of center-aligned PWM, dead-time calculation, and complete HAL initialization code.',
    bestPractices: [
      'Dead-time must account for MOSFET turn-off delay — check your FET datasheet for t_off',
      'Use the break input (BKIN) for overcurrent protection',
      'Center-aligned PWM halves the effective switching frequency seen by the load',
    ],
    commonMistakes: [
      'Setting dead-time too short — causes shoot-through and destroys MOSFETs',
      'Forgetting to enable the main output (MOE bit) in TIM1_BDTR',
    ],
    usageTips: 'Best used with Claude or GPT-4 due to the complexity of STM32 HAL.',
    aiResponseQuality: 'Good'
  },
  {
    id: 'p4',
    title: 'KiCad BOM Script',
    category: 'PCB Design',
    difficulty: 'Advanced',
    role: 'Act as a Professional PCB Design Engineer with expertise in KiCad automation.',
    objective: 'Write a Python script for KiCad 7 pcbnew that iterates through all footprints and generates a CSV Bill of Materials grouping identical components.',
    background: 'I need to automate BOM generation for a production run. The KiCad BOM export does not group identical parts by default, making procurement inefficient.',
    requirements: [
      'Use the pcbnew Python API (pcbnew.GetBoard())',
      'Iterate through all footprints on the board',
      'Group components by (value, footprint) tuple',
      'Output CSV with columns: Reference, Value, Footprint, Quantity, Datasheet',
      'Sort groups by quantity descending for easy procurement review',
    ],
    expectedOutput: 'A Python script that can be run from KiCad scripting console, producing a correctly grouped BOM CSV.',
    bestPractices: [
      'Run the script from within KiCad, not standalone — pcbnew module requires KiCad context',
      'Add a header row for spreadsheet compatibility',
      'Handle components with empty values gracefully (group as "UNSPECIFIED")',
    ],
    usageTips: 'Run this script inside the KiCad scripting console. Ask the AI to add supplier part numbers if needed.',
    aiResponseQuality: 'Fair'
  },
  {
    id: 'p5',
    title: 'Bode Plot Generation',
    category: 'MATLAB',
    difficulty: 'Beginner',
    role: 'Act as a MATLAB Application Engineer specializing in signal processing and control systems.',
    objective: 'Generate a MATLAB script to plot the Bode diagram of a second-order low-pass filter with a natural frequency of 1kHz and a damping ratio of 0.707.',
    background: 'I am learning analog filter design and need to visualize the frequency response of a standard second-order system before implementing it in hardware.',
    requirements: [
      'Define the transfer function H(s) = ωn² / (s² + 2ζωn·s + ωn²)',
      'Use tf() to create the system model',
      'Use bode() to generate the frequency response plot',
      'Set ωn = 2π×1000 rad/s and ζ = 0.707 (Butterworth response)',
      'Add grid, title, and axis labels for clarity',
    ],
    expectedOutput: 'A complete MATLAB script using tf() and bode() functions that produces a properly formatted Bode plot.',
    bestPractices: [
      'ζ = 0.707 gives a maximally flat (Butterworth) response — explain why this is useful',
      'Add margin() to check gain and phase margins for stability analysis',
      'Compare with different ζ values to see the effect on peaking and rolloff',
    ],
    usageTips: 'You can ask the AI to add grid lines, title formatting, or compare multiple filter orders.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p6',
    title: 'IC Component Alternatives',
    category: 'Research',
    difficulty: 'Intermediate',
    role: 'Act as a Senior Hardware Design Engineer specializing in low-power IoT sensor design.',
    objective: 'Recommend 3 alternative ICs to the INA219 for current sensing in a battery-powered IoT device, with lower quiescent current and I2C communication.',
    background: 'I am designing a battery-powered IoT device that must last 5+ years on a coin cell. The INA219 works but its 1mA quiescent current is too high for my power budget.',
    requirements: [
      'Recommend 3 specific IC alternatives (part numbers, not vague descriptions)',
      'For each: provide quiescent current, I2C address range, and measurement range',
      'Compare them in a table format for easy evaluation',
      'Explain which is best for my use case (battery-powered, sub-100μA budget)',
      'Include links to datasheets or product pages',
    ],
    expectedOutput: 'A comparison table of 3 INA219 alternatives with quiescent current, price, and recommendation.',
    bestPractices: [
      'Always verify I2C address conflicts with other sensors on the bus',
      'Check if the IC supports a shutdown/sleep mode for duty-cycled measurements',
      'Consider INA226 as a direct upgrade — same pinout, better specs',
    ],
    usageTips: 'Use Perplexity AI for this prompt to get up-to-date component pricing and availability.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p7',
    title: 'Engineering Resume Tailoring',
    category: 'Resume',
    difficulty: 'Intermediate',
    role: 'Act as a Senior Technical Recruiter at a robotics/automation company who reviews 200+ embedded systems resumes per week.',
    objective: 'Rewrite my "Experience" bullet points to highlight my C++ and RTOS skills using the STAR method.',
    background: 'I am applying for an Embedded Systems Engineer position at a robotics company. My current resume has generic descriptions that do not stand out.',
    requirements: [
      'Rewrite each experience bullet using the STAR format (Situation, Task, Action, Result)',
      'Use strong action verbs (designed, implemented, optimized, validated)',
      'Quantify results where possible (reduced power by 40%, improved throughput by 3x)',
      'Highlight C++, FreeRTOS, and HAL experience specifically',
      'Keep each bullet to 1-2 lines maximum',
    ],
    expectedOutput: 'Polished bullet points focusing on Situation, Task, Action, Result with quantified achievements.',
    bestPractices: [
      'Tailor bullets to match keywords from the job description',
      'Lead with the technology (C++, RTOS, STM32), not the company name',
      'Include one "impact" metric per bullet — recruiters scan for numbers',
    ],
    usageTips: 'Provide as much detail as possible in your raw resume. Ask the AI to tailor for a specific job posting.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p8',
    title: 'Automated GitHub CI/CD',
    category: 'GitHub',
    difficulty: 'Advanced',
    role: 'Act as a DevOps Engineer specializing in embedded systems CI/CD pipelines.',
    objective: 'Generate a GitHub Actions workflow that compiles an Arduino sketch on push to main and fails on compilation errors.',
    background: 'I want to ensure my firmware compiles cleanly before merging pull requests. Manual compilation is slow and error-prone.',
    requirements: [
      'Trigger on push to main and on pull requests',
      'Setup Arduino CLI using the official setup-arduino-cli action',
      'Install the Arduino AVR core',
      'Compile the sketch in the /src folder for Arduino Uno',
      'Fail the workflow if compilation returns a non-zero exit code',
      'Cache the Arduino core installation for faster subsequent runs',
    ],
    expectedOutput: 'A complete .github/workflows/build.yml file using arduino/setup-arduino-cli.',
    bestPractices: [
      'Pin action versions to specific SHA hashes, not tags — prevents supply chain attacks',
      'Add a matrix build to compile for multiple boards (Uno, Nano, Mega)',
      'Include a separate job for linting with arduino-lint if available',
    ],
    commonMistakes: [
      'Using deprecated action versions — always check for the latest stable release',
      'Forgetting to install the board core before compilation',
    ],
    usageTips: 'Verify the action versions suggested by the AI are not deprecated. Ask about matrix builds for multi-board testing.',
    aiResponseQuality: 'Good'
  },
  {
    id: 'p9',
    title: 'Project Showcase Post',
    category: 'LinkedIn',
    difficulty: 'Beginner',
    role: 'Act as a Technical Content Strategist who specializes in engineering career development.',
    objective: 'Write an engaging LinkedIn post to showcase my automated plant watering system project to other engineers.',
    background: 'I just finished building a plant watering system using an ESP32, soil moisture sensor, and water pump. I want to share it on LinkedIn to build my professional network.',
    requirements: [
      'Write a professional but enthusiastic tone',
      'Include a hook in the first line (stop the scroll)',
      'List the key technologies used (ESP32, sensor, MQTT, etc.)',
      'Include 2-3 relevant hashtags',
      'Keep the post under 200 words',
      'End with a question to drive engagement',
    ],
    expectedOutput: 'A LinkedIn post with hook, technical highlights, and engagement-driving conclusion.',
    bestPractices: [
      'Open with a result or insight, not "I built..." — that is the hook',
      'Tag the manufacturer accounts (Espressif, etc.) for visibility',
      'Post on Tuesday-Thursday morning for maximum engineering audience reach',
    ],
    usageTips: 'Ask the AI to include relevant hashtags. Customize the technologies to match your actual project.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p10',
    title: 'Lab Report Introduction',
    category: 'Reports',
    difficulty: 'Beginner',
    role: 'Act as a University Physics Professor who has graded thousands of lab reports.',
    objective: 'Write an introduction section for a university lab report about characterizing a BJT transistor.',
    background: 'I am writing a lab report for my Analog Electronics course. The experiment involves measuring the I-V characteristics of a 2N2222 BJT and plotting the output curves.',
    requirements: [
      'Write in formal academic tone (third person, passive voice where appropriate)',
      'Cover the basic theory of BJT operation (active, saturation, cutoff regions)',
      'Explain the purpose of plotting I-V curves',
      'Keep the introduction to 2-3 paragraphs',
      'Include at least one in-text citation format placeholder',
    ],
    expectedOutput: 'A formal 2-3 paragraph academic introduction suitable for a university lab report.',
    bestPractices: [
      'Always cite your textbook or datasheet — even a placeholder shows you understand academic conventions',
      'End the introduction with a clear statement of what this lab demonstrates',
      'Do not include results or conclusions in the introduction',
    ],
    usageTips: 'Ensure you review the output for academic integrity compliance. Always add your own citations.',
    aiResponseQuality: 'Excellent'
  },
  {
    id: 'p11',
    title: 'Op-Amp Filter Analysis',
    category: 'Circuit Analysis',
    difficulty: 'Intermediate',
    role: 'Act as an Analog Circuit Design Engineer with deep expertise in active filter design.',
    objective: 'Analyze a Sallen-Key low-pass filter circuit using an op-amp. Derive the transfer function H(s) in terms of R1, R2, C1, and C2.',
    background: 'I am designing a 2nd-order Sallen-Key low-pass filter for anti-aliasing before ADC sampling. I need to understand the transfer function to select component values for a 1kHz cutoff.',
    requirements: [
      'Start from the Sallen-Key circuit topology (show node equations)',
      'Apply KCL at each node to derive the transfer function',
      'Express H(s) in standard second-order form: ωn² / (s² + 2ζωn·s + ωn²)',
      'Identify ωn and ζ in terms of R1, R2, C1, C2',
      'Provide the component selection equations for a 1kHz Butterworth response',
    ],
    expectedOutput: 'Step-by-step mathematical derivation of the transfer function with component selection equations.',
    bestPractices: [
      'For Butterworth response (maximally flat): set R1=R2 and C1/C2 = 2',
      'Verify the derivation by checking unit consistency at each step',
      'Compare the derived response with SPICE simulation to validate',
    ],
    commonMistakes: [
      'Forgetting that the op-amp is configured as a unity-gain buffer in standard Sallen-Key',
      'Mixing up the capacitor positions — C1 goes from non-inverting input to output, C2 goes from non-inverting input to ground',
    ],
    usageTips: 'Use Claude for complex math derivations as it handles step-by-step logic better. Ask for SPICE verification.',
    aiResponseQuality: 'Good'
  }
];
