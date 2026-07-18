export interface InterviewQuestion {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  answer: string;
  followUp?: string;
}

export const interviewCategories = [
  'All',
  'Embedded C',
  'Microcontrollers',
  'RTOS',
  'Communication Protocols',
  'PCB Design',
  'AI/ML for Hardware',
  'General Electronics',
] as const;

export const interviewQuestions: InterviewQuestion[] = [
  // Embedded C
  {
    id: 'ec-1',
    category: 'Embedded C',
    difficulty: 'Easy',
    question: 'What is the difference between a pointer and an array in C?',
    answer: 'An array is a contiguous block of memory holding elements of the same type. A pointer is a variable that stores the memory address of another variable. When you declare `int arr[10]`, `arr` decays to a pointer to its first element in most expressions, but `arr` is not a modifiable lvalue (you can\'t reassign it), while a pointer is. `sizeof(arr)` gives the total size of the array, while `sizeof(ptr)` gives the size of the pointer itself.',
    followUp: 'How would you pass a 2D array to a function in C?',
  },
  {
    id: 'ec-2',
    category: 'Embedded C',
    difficulty: 'Medium',
    question: 'Explain the volatile keyword and when you would use it.',
    answer: '`volatile` tells the compiler that a variable\'s value may change at any time — without any action being taken by the code the compiler finds nearby. It prevents the compiler from optimizing away reads/writes to that variable. Use it for: (1) memory-mapped hardware registers, (2) variables modified by interrupt service routines, (3) variables shared between threads in bare-metal code. Example: `volatile uint32_t *timer_reg = (uint32_t *)0x40000000;` Without volatile, the compiler might read the register once and cache the value, missing hardware state changes.',
  },
  {
    id: 'ec-3',
    category: 'Embedded C',
    difficulty: 'Hard',
    question: 'What is a memory-mapped register and how do you access it in C?',
    answer: 'Memory-mapped registers are hardware control/status registers that appear at specific memory addresses. In C, you access them by casting the address to a pointer: `#define REG *((volatile uint32_t*)0x40021000)`. Then `REG = 0x01;` writes to the register. The `volatile` qualifier is critical — without it, the compiler may optimize away repeated writes or cache stale reads. Example: GPIO mode register on STM32: `#define GPIOA_MODER *((volatile uint32_t*)0x48000000)`. This is how all ARM Cortex-M peripherals are controlled.',
  },
  // Microcontrollers
  {
    id: 'mc-1',
    category: 'Microcontrollers',
    difficulty: 'Easy',
    question: 'What is the difference between Flash and SRAM on a microcontroller?',
    answer: 'Flash is non-volatile memory that stores your program code and constants — it retains data when power is removed. SRAM is volatile memory used for variables, the stack, and heap — it loses data when power is removed. Flash is slower to write (must erase blocks first) but much larger. SRAM is fast for read/write but much smaller. Example: ATmega328P has 32KB Flash (program) and 2KB SRAM (variables). This is why you can\'t just declare large arrays in embedded C — they live in SRAM.',
  },
  {
    id: 'mc-2',
    category: 'Microcontrollers',
    difficulty: 'Medium',
    question: 'Explain the startup sequence of a microcontroller after reset.',
    answer: 'After reset: (1) The CPU loads the reset vector (address 0x0000 on AVR, 0x08000000 on STM32) which points to the startup code. (2) Startup code initializes the stack pointer, copies .data section from Flash to SRAM, zeroes the .bss section, and calls SystemInit() to configure clocks. (3) Then main() is called. On STM32, SystemInit() configures the PLL, sets the system clock (e.g., 72MHz), and enables peripheral clocks. This entire sequence happens in microseconds before your first line of code executes.',
  },
  {
    id: 'mc-3',
    category: 'Microcontrollers',
    difficulty: 'Hard',
    question: 'How would you implement a bootloader for firmware updates?',
    answer: 'A bootloader is a small program that runs first after reset and decides whether to run the existing firmware or accept a new one. Implementation: (1) Divide Flash into bootloader region (first 4-8KB) and application region. (2) Bootloader checks a flag (in Flash or RAM) or receives a UART command to enter update mode. (3) If updating: receive new firmware via UART/SPI/USB, write to application Flash region. (4) If not: jump to application entry point (set stack pointer to app\'s initial SP, jump to app\'s reset vector). Key detail: the application must use interrupt vector table starting at the app offset, not 0x0000.',
  },
  // RTOS
  {
    id: 'rtos-1',
    category: 'RTOS',
    difficulty: 'Easy',
    question: 'What is the difference between a task and an interrupt?',
    answer: 'A task (or thread) is a software unit that runs cooperatively — it has its own stack, runs to a scheduling point (yield, delay, or blocking call), and is managed by the RTOS scheduler. An interrupt is a hardware-triggered event that preempts ALL running tasks, runs an ISR (Interrupt Service Routine) with minimal stack, and returns to the interrupted context. Tasks have latency in microseconds; interrupts respond in nanoseconds. Use tasks for periodic work, interrupts for time-critical events (GPIO change, timer overflow, UART byte received).',
  },
  {
    id: 'rtos-2',
    category: 'RTOS',
    difficulty: 'Medium',
    question: 'Explain priority inversion and how to prevent it.',
    answer: 'Priority inversion occurs when a high-priority task is blocked waiting for a resource held by a low-priority task, while a medium-priority task preempts the low-priority one. Result: high-priority task waits for medium-priority — effectively inverting priorities. The Mars Pathfinder experienced this on Mars in 1997. Prevention: Priority Inheritance Protocol (PIP) — when a high-priority task blocks on a mutex, the holder temporarily inherits the higher priority. Or Priority Ceiling Protocol — assign each mutex the priority of its highest-priority user. FreeRTOS supports both via configUSE_MUTEXES and configUSE_PRIORITY_CEILING.',
  },
  // Communication Protocols
  {
    id: 'comm-1',
    category: 'Communication Protocols',
    difficulty: 'Easy',
    question: 'What is the difference between I2C and SPI?',
    answer: 'I2C uses 2 wires (SDA, SCL) with addressing — multiple slaves share the same bus, each with a unique address (7-bit). Speed: 100kHz/400kHz/1MHz. Good for slow sensors, displays. SPI uses 4 wires (MOSI, MISO, SCK, CS) with dedicated chip select per slave — no addressing needed. Speed: up to 50MHz+. Good for fast peripherals (ADCs, displays, memory). I2C is simpler to wire (2 wires vs 4+N), SPI is faster and simpler to protocol (no ACK/NACK, no addressing overhead).',
  },
  {
    id: 'comm-2',
    category: 'Communication Protocols',
    difficulty: 'Medium',
    question: 'How would you debug an I2C bus that isn\'t communicating?',
    answer: 'Systematic approach: (1) Check power — is the slave getting correct voltage? (2) Check pull-up resistors — SDA and SCL need 4.7kΩ to VCC. Without them, signals float. (3) Check address — use an I2C scanner sketch to detect devices. Common mistake: 7-bit address vs 8-bit address (0x68 vs 0xD0). (4) Check logic levels — is the slave 3.3V and MCU 5V? Need level shifter. (5) Probe with oscilloscope — look for clean edges, correct clock frequency, ACK bit after address. (6) Check for bus contention — are two devices driving SDA simultaneously?',
  },
  {
    id: 'comm-3',
    category: 'Communication Protocols',
    difficulty: 'Hard',
    question: 'Explain the CAN bus arbitration process.',
    answer: 'CAN (Controller Area Network) uses non-destructive bitwise arbitration. When multiple nodes transmit simultaneously: (1) Each node transmits its message ID bit-by-bit on the CANH/CANL differential pair. (2) CAN uses "wired-AND" logic — dominant (0) overrides recessive (1). (3) A node that transmits recessive (1) but detects dominant (0) on the bus loses arbitration and stops transmitting. (4) The node with the lowest message ID wins (highest priority). This happens in real-time with zero data loss — the winning message continues uninterrupted. This is why CAN is ideal for automotive: deterministic, collision-free, multi-master.',
  },
  // PCB Design
  {
    id: 'pcb-1',
    category: 'PCB Design',
    difficulty: 'Easy',
    question: 'What is a decoupling capacitor and where should you place it?',
    answer: 'A decoupling capacitor (typically 100nF ceramic) provides a local energy reservoir to smooth out voltage fluctuations caused by rapid current draw in ICs. Place it as close as possible to the IC\'s VCC and GND pins — ideally within 3mm. The capacitor filters high-frequency noise that the power supply traces can\'t handle due to their inductance. Rule of thumb: one 100nF cap per power pin, plus a bulk 10μF cap per IC. Without decoupling caps, ICs can exhibit erratic behavior, especially at high switching speeds.',
  },
  {
    id: 'pcb-2',
    category: 'PCB Design',
    difficulty: 'Medium',
    question: 'What are the key considerations for a 4-layer PCB stackup?',
    answer: 'Standard 4-layer stackup: (1) Top layer — signals and components, (2) Inner layer 1 — GND plane (continuous, no cuts), (3) Inner layer 2 — Power plane (VCC, split by voltage), (4) Bottom layer — signals and components. Key rules: Keep GND plane intact — it provides return paths for signals and reduces EMI. Route high-speed signals adjacent to GND plane. Place decoupling caps on the same layer as the IC. Impedance control: trace width + dielectric thickness determines impedance (50Ω single-ended, 90Ω differential for USB). Use a trace width calculator.',
  },
  // AI/ML for Hardware
  {
    id: 'ai-1',
    category: 'AI/ML for Hardware',
    difficulty: 'Easy',
    question: 'What is TinyML and why is it important for electronics engineers?',
    answer: 'TinyML is the field of running machine learning models on ultra-low-power microcontrollers (mW scale). It\'s important because it enables intelligent devices that: (1) operate without internet (offline inference), (2) preserve privacy (data stays on-device), (3) use minimal power (battery life of years), (4) respond in real-time (sub-10ms). As an electronics engineer, TinyML lets you add intelligence to your hardware without increasing BOM cost — the intelligence lives in software running on the MCU you already have.',
  },
  {
    id: 'ai-2',
    category: 'AI/ML for Hardware',
    difficulty: 'Medium',
    question: 'Explain the trade-off between model accuracy and inference latency on an MCU.',
    answer: 'On an MCU, every parameter costs memory and every multiply-accumulate (MAC) costs cycles. A larger model (more layers, more neurons) typically has higher accuracy but: (1) More SRAM needed for weights and activations, (2) More Flash for model storage, (3) More MACs = slower inference = higher power consumption. Practical trade-off: a 10KB int8 model on Cortex-M4 runs in ~2ms at 92% accuracy. A 100KB model might hit 95% accuracy but take 15ms. For a 10Hz sensor pipeline, 15ms is fine. For a 1000Hz motor control loop, you need <1ms — accept the accuracy hit.',
  },
  // General Electronics
  {
    id: 'gen-1',
    category: 'General Electronics',
    difficulty: 'Easy',
    question: 'What is the difference between analog and digital signals?',
    answer: 'Analog signals are continuous — they can take any value within a range (e.g., a temperature sensor outputting 0-3.3V representing -40°C to 125°C). Digital signals are discrete — they have defined states (HIGH/LOW, 1/0). A microcontroller reads analog signals through an ADC (Analog-to-Digital Converter) which samples and quantizes the continuous signal into discrete digital values. Example: 10-bit ADC on 3.3V range → 0-1023 values, each step ≈ 3.2mV resolution.',
  },
  {
    id: 'gen-2',
    category: 'General Electronics',
    difficulty: 'Medium',
    question: 'How do you select the right ADC resolution for a sensor application?',
    answer: 'Match ADC resolution to your signal\'s dynamic range and required precision. Formula: resolution = Vref / 2^n. For a 3.3V signal with 10-bit ADC: 3.3V / 1024 ≈ 3.2mV per step. If your sensor output varies by 10mV, that\'s only 3 steps — you need more resolution. Guidelines: 10-bit for basic hobby projects, 12-bit for industrial sensors (0.8mV/step at 3.3V), 16-bit for precision measurement. But higher resolution = slower conversion, more noise susceptibility, and higher cost. Always check if your noise floor is below 1 LSB.',
  },
];
