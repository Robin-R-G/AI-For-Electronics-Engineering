// ponytail: lazy-load lab JSON to avoid pulling ~300KB into every bundle that imports this module.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _categoryMap: Record<string, any[]> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadCategoryMap(): Promise<Record<string, any[]>> {
  if (_categoryMap) return _categoryMap;
  const [embedded, arduino, esp32, stm32, iot, robotics, ai, pcb, analog, digital, fpga] =
    await Promise.all([
      import('@/data/lab/embedded.json'),
      import('@/data/lab/arduino.json'),
      import('@/data/lab/esp32.json'),
      import('@/data/lab/stm32.json'),
      import('@/data/lab/iot.json'),
      import('@/data/lab/robotics.json'),
      import('@/data/lab/ai.json'),
      import('@/data/lab/pcb.json'),
      import('@/data/lab/analog.json'),
      import('@/data/lab/digital.json'),
      import('@/data/lab/fpga.json'),
    ]);
  _categoryMap = {
    'Embedded Systems': embedded.default,
    'Arduino Projects': arduino.default,
    'ESP32 Projects': esp32.default,
    'STM32 Projects': stm32.default,
    'IoT': iot.default,
    'Robotics': robotics.default,
    'AI + Electronics': ai.default,
    'PCB Design': pcb.default,
    'Analog Electronics': analog.default,
    'Digital Electronics': digital.default,
    'FPGA': fpga.default,
  };
  return _categoryMap;
}

export interface ComponentItem {
  name: string;
  quantity: number;
}

export interface DebuggingGuideEntry {
  symptom: string;
  cause: string;
  fix: string;
}

export interface AiPromptEntry {
  role: string;
  prompt: string;
}

export interface DownloadItem {
  name: string;
  fileUrl: string;
}

export interface QuizQuestionEntry {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface LabProject {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  
  // 34 required sections
  estimatedTime: string;
  requiredSkills: string[];
  overview: string;
  problemStatement: string;
  learningObjectives: string[];
  realWorldApplications: string[];
  components: ComponentItem[];
  circuitDiagramUrl: string;
  pinConnections: string[];
  hardwareExplanation: string;
  softwareExplanation: string;
  architectureDiagramUrl: string;
  workingPrinciple: string;
  procedure: string[];
  code: string;
  codeExplanation: string[];
  commonErrors: string[];
  debuggingGuide: DebuggingGuideEntry[];
  testingProcedure: string[];
  improvements: string[];
  futureScope: string[];
  industryApplications: string[];
  safetyPrecautions: string[];
  relatedLessons: string[];
  aiPrompts: AiPromptEntry[];
  downloads: DownloadItem[];
  quiz: QuizQuestionEntry[];
  engineeringChallenge: string;
  references: string[];
  industryRelevance: string;
  careerRoles: string[];
  suggestedNextProjects: string[]; // List of project IDs recommended next
}

// Recommendation engine helper
function getRecommendations(currentId: string, category: string, allBaselines: any[]): string[] {
  const sameCategory = allBaselines.filter(p => p.category === category && p.id !== currentId);
  const diffCategory = allBaselines.filter(p => p.category !== category);
  
  // Merge, prioritizing same category
  const pool = [...sameCategory, ...diffCategory];
  return pool.slice(0, 3).map(p => p.id);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compileProject(p: any, allBaselines: any[]): LabProject {
  const id = (p.id as string) || 'untitled';
  const title = (p.title as string) || 'Untitled Project';
  const category = (p.category as string) || 'General';
  const difficulty = p.difficulty || 'Intermediate';
  const componentsList = p.components || [];
  const connections = p.connections || [];
  const code = p.code || '';
  const tips = p.tips || [];
  
  // Map components to the object structure
  const components: ComponentItem[] = componentsList.map((comp: string) => ({
    name: comp,
    quantity: comp.includes('×') || comp.includes('x') 
      ? parseInt(comp.split(/[×x]/)[1]) || 1 
      : 1
  }));

  // Estimate completion time
  const timeEstimates = {
    'Beginner': '1 - 2 Hours',
    'Intermediate': '2 - 4 Hours',
    'Advanced': '6 - 10 Hours',
    'Expert': '12 - 20 Hours'
  };
  const estimatedTime = timeEstimates[difficulty as keyof typeof timeEstimates] || '3 Hours';

  // Dynamic Required Skills
  const requiredSkills = [
    'Breadboard Circuit Prototyping',
    'Digital Multimeter Operation'
  ];
  if (category.includes('STM32') || category.includes('Embedded')) {
    requiredSkills.push('GPIO Register Mapping', 'Interrupt Handlers (ISRs)', 'Timing Loops');
  } else if (category.includes('ESP32') || category.includes('IoT')) {
    requiredSkills.push('WiFi Sockets', 'REST APIs / HTTP Protocol', 'Serial Monitoring');
  } else if (category.includes('PCB')) {
    requiredSkills.push('Schematic Routing', 'Creepage & Clearances', 'Trace Impedance Matching');
  } else if (category.includes('FPGA')) {
    requiredSkills.push('Verilog/VHDL RTL Syntax', 'State Machine (FSM) Synthesis', 'Clock Domain Crossing');
  } else if (category.includes('Robotics')) {
    requiredSkills.push('H-Bridge Hysteresis', 'PWM Duty Cycle Tuning', 'Kinematic Coordinates');
  } else if (category.includes('AI')) {
    requiredSkills.push('TensorFlow Model Quantization', 'MFCC Feature Extraction', 'Edge Classification');
  }

  // Related Lessons slugs
  let relatedLessons = ['introduction'];
  if (category === 'AI + Electronics') relatedLessons = ['ai-fundamentals', 'machine-learning'];
  else if (category === 'Embedded Systems') relatedLessons = ['ai-tools', 'component-encyclopedia'];
  else if (category === 'PCB Design') relatedLessons = ['electronics-applications', 'resources'];
  else if (category === 'FPGA') relatedLessons = ['future-trends', 'resources'];

  // AI Prompt Pack
  const aiPrompts: AiPromptEntry[] = [
    {
      role: 'Senior Embedded Systems Engineer',
      prompt: `Act as a Senior Embedded Systems Engineer. Optimize this firmware implementation of the ${title} to run on low-power battery supplies. Suggest specific Sleep states (Light/Deep Sleep) and write a non-blocking execution loop using timer overflows. Here is the code:\n\n${code}`
    },
    {
      role: 'Senior Firmware Engineer',
      prompt: `Act as a Senior Firmware Engineer. Refactor the I/O driver routines for ${title} to be entirely interrupt-driven (handling button press debouncing and threshold violations using hardware ISRs instead of polling). State the priority configuration needed for the Nested Vectored Interrupt Controller (NVIC).`
    },
    {
      role: 'Senior PCB Design Engineer',
      prompt: `Act as a Senior PCB Design Engineer. Detail a layout design strategy for the ${title} board. The BOM contains: ${componentsList.join(', ')}. Provide guidelines for trace widths supporting high current rails, ground plane divisions, and decoupling capacitor placement to minimize switching ripple.`
    },
    {
      role: 'Senior Hardware Validation Engineer',
      prompt: `Act as a Senior Hardware Validation Engineer. Write a comprehensive hardware test plan for the ${title} assembly. Design a validation matrix verifying power rails under switching loads, measuring signal rise-times on SPI/I2C buses, and checking thermal load under continuous operation.`
    },
    {
      role: 'Senior IoT Solutions Architect',
      prompt: `Act as a Senior IoT Solutions Architect. Design a cloud telemetry ingestion architecture for ${title} deploying thousands of nodes in the field. Outline a broker connection scheme using MQTT, describe a security layout utilizing TLS 1.3, and draft a JSON payload schema containing diagnostic parameters.`
    },
    {
      role: 'Senior Robotics Engineer',
      prompt: `Act as a Senior Robotics Engineer. Refactor the actuator velocity profile for ${title}. Provide a control algorithm (such as a PID loop or trapezoidal acceleration profile) in C++ to smooth joint movements and prevent mechanical backlash.`
    },
    {
      role: 'Senior Technical Reviewer',
      prompt: `Act as a Senior Technical Reviewer. Audit this implementation of the ${title} for register leaks, resource constraints, memory boundaries, and logic hazards. Review this code for production-level standard compliance:\n\n${code}`
    }
  ];

  // Downloads files list
  const downloads: DownloadItem[] = [
    { name: '📋 Complete Project PDF Manual', fileUrl: '#' },
    { name: '⚡ Circuit Schematic Diagram (PDF)', fileUrl: '#' },
    { name: '💻 Source Code Implementation Archive', fileUrl: '#' },
    { name: '📈 Component Datasheets pack', fileUrl: '#' },
    { name: '🤖 AI Engineering Prompt Pack', fileUrl: '#' },
    { name: '📦 Bill of Materials (BOM) CSV Sheet', fileUrl: '#' }
  ];

  // Knowledge check mini quiz
  const quiz: QuizQuestionEntry[] = [
    {
      question: `What is the primary function of decoupling capacitors in the ${title}?`,
      options: [
        "To increase the overall output voltage",
        "To filter high-frequency switching noise and stabilize power rails close to the load",
        "To introduce clock signal propagation delays",
        "To pull up open-drain digital bus lines"
      ],
      answer: "To filter high-frequency switching noise and stabilize power rails close to the load",
      explanation: "Decoupling capacitors act as local energy reservoirs, absorbing high-frequency ripples caused by logic gates switching state, protecting ICs from voltage dips."
    },
    {
      question: `Which error is most likely to cause garbled or unreadable characters on the UART console during testing of ${title}?`,
      options: [
        "Mismatched baud rate configurations between the MCU and terminal",
        "Omitting pull-up resistors on the SPI chip-select line",
        "Leaving analog input pins floating",
        "Using 100nF decoupling capacitors instead of 10uF"
      ],
      answer: "Mismatched baud rate configurations between the MCU and terminal",
      explanation: "For asynchronous serial communication (UART) to work, the transmitter and receiver must agree on the symbol duration (baud rate) to decode bitstreams correctly."
    },
    {
      question: `Why is a freewheeling diode (like the 1N4007) wired in reverse-parallel with relays or motors in this circuit?`,
      options: [
        "To double the current capacity of the relay coils",
        "To act as a voltage-divider network",
        "To suppress high-voltage inductive spikes (back-EMF) when the coil turns off",
        "To block positive supply voltage from entering the transistor base"
      ],
      answer: "To suppress high-voltage inductive spikes (back-EMF) when the coil turns off",
      explanation: "Inductors store energy in a magnetic field. When the current path is suddenly cut, the collapsing field generates a high-voltage back-EMF spike. The diode provides a safe dissipation path."
    }
  ];

  // Debugging Symptom / Cause / Fix Guide
  const debuggingGuide: DebuggingGuideEntry[] = [
    {
      symptom: "Main microcontroller resets repeatedly whenever inductive loads (motors/relays) toggle ON/OFF.",
      cause: "High-voltage back-EMF inductive spike feedback coupling into the processor rails or causing momentary supply dip.",
      fix: "Install a 1N4148 or 1N4007 freewheeling diode parallel to the coil leads and place a 470uF bulk capacitor across the power rails."
    },
    {
      symptom: "Garbled, invalid, or empty characters printing on the serial terminal monitor.",
      cause: "Baud rate mismatch between the hardware UART settings and the computer's terminal program.",
      fix: "Verify serial init speed matches (e.g. Serial.begin(115200)) and ensure your PC terminal monitor dropdown is configured to the identical baud rate."
    },
    {
      symptom: "Digital input readings bounce erratically between logic HIGH and LOW states without pressing buttons.",
      cause: "Floating inputs. The pin is high-impedance and picks up ambient electromagnetic noise because no pull-up/pull-down path is defined.",
      fix: "Enable the microcontroller's internal pull-up resistor (pinMode(pin, INPUT_PULLUP)) or solder an external 10kΩ resistor from the pin to VCC."
    }
  ];

  // Final suggestions
  const suggestedNextProjects = getRecommendations(p.id as string, category, allBaselines);

  return {
    id,
    title,
    category,
    difficulty,
    estimatedTime,
    requiredSkills,
    overview: p.overview || `A professional development curriculum for building the ${title}. This module guides you through planning, schematic design, firmware programming, validation, and debugging routines.`,
    problemStatement: `Construct a noise-resistant, production-ready ${title}. Standard designs are prone to timing jitter, inductive voltage spikes, and floating logic lines. Your challenge is to build a robust circuit and write efficient, non-blocking code.`,
    learningObjectives: [
      `Construct interface connections and wire layouts for: ${componentsList.join(', ')}.`,
      `Design and compile non-blocking firmware / HDL routines.`,
      `Troubleshoot hardware anomalies using systematic signal and voltage checks.`
    ],
    realWorldApplications: category.includes('IoT') || category.includes('ESP32') 
      ? ["Smart utility metering grids", "Remote agricultural status reporting nodes", "Sub-sea telemetry systems"]
      : category.includes('Robotics')
      ? ["Autonomous warehouse automated-guided-vehicles (AGVs)", "Industrial pick-and-place arms", "Surgical positioning actuators"]
      : ["Industrial automation machinery", "Consumer electronics interfaces", "Automotive sensor acquisition modules"],
    components,
    circuitDiagramUrl: `<svg viewBox="0 0 400 180" width="100%" style="background:#091220; border:1px solid #1e293b; border-radius:8px; margin:1rem 0;">
      <rect x="20" y="30" width="100" height="70" rx="4" fill="#0c4a6e" stroke="var(--color-cyan)" stroke-width="2"/>
      <text x="70" y="70" fill="white" font-size="10" font-family="monospace" text-anchor="middle">MCU / CPU</text>
      <rect x="260" y="30" width="100" height="70" rx="4" fill="#312e81" stroke="var(--color-brand-hover)" stroke-width="2"/>
      <text x="310" y="70" fill="white" font-size="10" font-family="monospace" text-anchor="middle">LOAD/BOARD</text>
      <line x1="120" y1="50" x2="260" y2="50" stroke="var(--color-warning)" stroke-width="2" stroke-dasharray="4"/>
      <text x="190" y="44" fill="var(--color-warning)" font-size="9" text-anchor="middle">GPIO / BUS</text>
      <line x1="120" y1="80" x2="260" y2="80" stroke="#e11d48" stroke-width="2"/>
      <text x="190" y="74" fill="#e11d48" font-size="9" text-anchor="middle">3.3V / 5V</text>
      <line x1="70" y1="100" x2="70" y2="140" stroke="var(--color-success)" stroke-width="2"/>
      <line x1="310" y1="100" x2="310" y2="140" stroke="var(--color-success)" stroke-width="2"/>
      <line x1="70" y1="140" x2="310" y2="140" stroke="var(--color-success)" stroke-width="2"/>
      <text x="190" y="135" fill="var(--color-success)" font-size="9" text-anchor="middle">COMMON GND PLANE</text>
    </svg>`,
    pinConnections: connections,
    hardwareExplanation: `The power supply delivers steady voltages bypassed by 100nF and 10uF capacitors located close to the active IC VCC pins. I/O communication pins interface over SPI or I2C, terminating with 4.7kΩ pull-up resistors to prevent bus line floating.`,
    softwareExplanation: `The software initializes GPIO configurations, sets clock registers, and begins serial console print debugging. The main execution loops execute non-blocking checks to service tasks at accurate periods.`,
    architectureDiagramUrl: `<svg viewBox="0 0 450 100" width="100%" style="background:#020617; border:1px solid #1e293b; border-radius:8px; margin:1rem 0;">
      <rect x="10" y="30" width="100" height="40" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="60" y="55" fill="white" font-size="10" text-anchor="middle">1. SENSE inputs</text>
      <path d="M 110 50 L 160 50" stroke="var(--color-cyan)" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="170" y="30" width="110" height="40" rx="6" fill="#0f172a" stroke="var(--color-cyan)" stroke-width="2"/>
      <text x="225" y="55" fill="white" font-size="10" text-anchor="middle">2. PROCESS logic</text>
      <path d="M 280 50 L 330 50" stroke="var(--color-cyan)" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="340" y="30" width="100" height="40" rx="6" fill="#111827" stroke="#374151" stroke-width="2"/>
      <text x="390" y="55" fill="white" font-size="10" text-anchor="middle">3. DRIVE outputs</text>
    </svg>`,
    workingPrinciple: `Analog sensor signals are converted by the ADC to binary data. The firmware compares this data with preset threshold bands, calculating and outputting targeted PWM duty cycles to the active loads.`,
    procedure: [
      "Prepare your workstation and double-check you are grounded using ESD straps.",
      "Place components on the breadboard based on the pinout wiring guide.",
      "Measure board voltages using a digital multimeter to confirm no short circuits.",
      "Upload the source code firmware via ST-Link, JTAG, or USB.",
      "Inspect serial output logs on a terminal monitor to confirm successful startup calibration."
    ],
    code,
    codeExplanation: [
      "Initializes interface headers, serial libraries, and pin assignments.",
      "Setup Block: Declares pin modes and boots serial protocols at standard baud rates.",
      "Execution Loop: Reads logic states periodically and updates motor speeds or indicator lights."
    ],
    commonErrors: [
      "Missing pull-up resistors on open-drain I2C lines (SDA/SCL) causing bus freeze.",
      "Floating input pins generating random logic triggers due to electrostatic build-up.",
      "Powering inductive relays directly from processor pins, causing GPIO current burn-out."
    ],
    debuggingGuide,
    testingProcedure: [
      "Confirm supply voltage is within tolerances (+3.3V or +5.0V).",
      "Probe high-speed clock pins using an oscilloscope to verify square wave shape.",
      "Solder 100nF decoupling capacitors directly at the sensor power pins."
    ],
    improvements: [
      "Implement deep sleep configurations to reduce quiescent current below 15µA.",
      "Transition to dedicated buck-converter power tracks to minimize heating."
    ],
    futureScope: [
      "Integrate wireless mesh nodes (LoRa or Bluetooth Mesh) to enable long-range telemetry.",
      "Deploy optimized TinyML classifiers to automate local anomaly processing."
    ],
    industryApplications: [
      "Automotive electronic control units (ECUs)",
      "Industrial smart sensor transmitters",
      "Consumer electronics power management boards"
    ],
    safetyPrecautions: [
      "Always shut down active input power before changing circuit wires.",
      "Ground yourself before touching sensitive CMOS semiconductor boards.",
      "Double-check voltage polarities before powering up electrolytic capacitors."
    ],
    relatedLessons,
    aiPrompts,
    downloads,
    quiz,
    engineeringChallenge: `Design a software hysteretic filter to prevent the outputs from oscillating rapidly when input variables flutter exactly at the trigger threshold. Write out your pseudo-code logic.`,
    references: [
      "STMicroelectronics: STM32F103 Reference Manual (RM0008)",
      "IPC-2221: Generic Standard on Printed Board Design Guidelines",
      "IEEE 802.11 WiFi Protocol Standards Handbook"
    ],
    industryRelevance: difficulty === 'Expert' ? '98% (Critical)' : difficulty === 'Advanced' ? '92% (High)' : '85% (Medium)',
    careerRoles: category.includes('PCB') || category.includes('Analog')
      ? ["Hardware Board Designer", "PCB Layout Specialist", "Analog Engineer"]
      : ["Firmware Architect", "Embedded Systems Developer", "IoT Solutions Engineer"],
    suggestedNextProjects
  };
}

export async function loadAllProjects(): Promise<LabProject[]> {
  const CATEGORY_MAP = await loadCategoryMap();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baselines: any[] = [];
  Object.entries(CATEGORY_MAP).forEach(([categoryName, list]) => {
    list.forEach((item: any) => {
      baselines.push({
        ...item,
        category: categoryName
      });
    });
  });

  // Compile each baseline to possess all 34 sections
  return baselines.map(p => compileProject(p, baselines));
}

export async function getCategoriesList(): Promise<string[]> {
  const CATEGORY_MAP = await loadCategoryMap();
  return Object.keys(CATEGORY_MAP);
}
