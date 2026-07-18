export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const embeddedSystemsQuestions: LessonQuestion[] = [
  {
    id: "embedded-1",
    question: "What is the key difference between Harvard and von Neumann architectures?",
    options: [
      "Harvard has separate instruction and data memory buses",
      "von Neumann has separate instruction and data memory buses",
      "Harvard has a larger address space",
      "von Neumann is faster for all workloads"
    ],
    correctAnswer: "Harvard has separate instruction and data memory buses",
    explanation: "Harvard architecture uses separate buses for instructions and data, allowing simultaneous access. von Neumann uses a single shared bus, creating a bottleneck."
  },
  {
    id: "embedded-2",
    question: "Which of the following is true of an FPGA compared to a microcontroller?",
    options: [
      "FPGAs are always faster at every task",
      "FPGAs allow custom hardware logic per application",
      "Microcontrollers use less power than FPGAs in all cases",
      "FPGAs cannot run C code"
    ],
    correctAnswer: "FPGAs allow custom hardware logic per application",
    explanation: "FPGAs are reconfigurable and let you design custom digital circuits, while microcontrollers execute software sequentially on a fixed core."
  },
  {
    id: "embedded-3",
    question: "What is the main advantage of the ARM Cortex-M4 over the Cortex-M0?",
    options: [
      "The M4 has built-in Wi-Fi",
      "The M4 adds DSP instructions and an optional FPU",
      "The M4 uses more power but has no performance gain",
      "The M0 is only available in 32-bit versions"
    ],
    correctAnswer: "The M4 adds DSP instructions and an optional FPU",
    explanation: "The Cortex-M4 includes DSP extensions and an optional floating-point unit, making it suitable for signal processing tasks beyond the M0's capabilities."
  },
  {
    id: "embedded-4",
    question: "Which memory type is non-volatile and commonly used for program storage in microcontrollers?",
    options: [
      "SRAM",
      "Flash",
      "Cache",
      "Register file"
    ],
    correctAnswer: "Flash",
    explanation: "Flash memory retains data without power and is used to store firmware. SRAM is volatile and used for runtime data."
  },
  {
    id: "embedded-5",
    question: "What does the `volatile` keyword tell the compiler?",
    options: [
      "The variable must be stored in Flash",
      "The variable may change outside the program's control, so always read it from memory",
      "The variable is read-only",
      "The variable should be placed in a register"
    ],
    correctAnswer: "The variable may change outside the program's control, so always read it from memory",
    explanation: "volatile prevents the compiler from optimizing away reads or caching the value, which is critical for memory-mapped I/O registers and interrupt-shared variables."
  },
  {
    id: "embedded-6",
    question: "In ARM Cortex-M processors, what does NVIC stand for?",
    options: [
      "Nested Vectored Interrupt Controller",
      "Non-Volatile Interrupt Circuit",
      "New Vector Interrupt Core",
      "Nested Variable Interrupt Control"
    ],
    correctAnswer: "Nested Vectored Interrupt Controller",
    explanation: "The NVIC is the built-in interrupt controller in ARM Cortex-M that supports nested and prioritized interrupts with automatic vectoring."
  },
  {
    id: "embedded-7",
    question: "What is the primary purpose of DMA in a microcontroller?",
    options: [
      "To encrypt firmware at startup",
      "To transfer data between memory and peripherals without CPU intervention",
      "To manage the system clock",
      "To handle serial communication protocols"
    ],
    correctAnswer: "To transfer data between memory and peripherals without CPU intervention",
    explanation: "DMA offloads data transfers from the CPU, allowing the processor to continue other tasks while data moves between peripherals and memory."
  },
  {
    id: "embedded-8",
    question: "What is a PLL used for in an embedded system clock tree?",
    options: [
      "To reduce the clock frequency below the crystal frequency",
      "To multiply a reference clock to a higher frequency",
      "To convert analog signals to digital",
      "To generate PWM signals"
    ],
    correctAnswer: "To multiply a reference clock to a higher frequency",
    explanation: "A Phase-Locked Loop multiplies or multiplies-and-divides an input clock to generate a higher system clock from a lower-frequency crystal."
  },
  {
    id: "embedded-9",
    question: "Which power mode preserves RAM contents but shuts down most peripherals?",
    options: [
      "Run mode",
      "Sleep mode",
      "Deep-sleep mode",
      "Standby mode"
    ],
    correctAnswer: "Sleep mode",
    explanation: "Sleep mode halts the CPU core while keeping SRAM powered. Deep-sleep may lose some SRAM, and standby powers down nearly everything."
  },
  {
    id: "embedded-10",
    question: "What is the function of an Independent Watchdog Timer (IWDG)?",
    options: [
      "It resets the MCU if the firmware fails to periodically acknowledge it",
      "It generates interrupts for real-time scheduling",
      "It measures the time between two external events",
      "It reduces power consumption during idle periods"
    ],
    correctAnswer: "It resets the MCU if the firmware fails to periodically acknowledge it",
    explanation: "IWDG requires periodic feeding (kicking). If the firmware hangs, the watchdog times out and forces a system reset to recover from faults."
  },
  {
    id: "embedded-11",
    question: "What distinguishes an MCU from an SoC?",
    options: [
      "MCUs contain a CPU, memory, and peripherals on a single chip; SoCs add OS-level features and often Wi-Fi/BT",
      "SoCs are always less capable than MCUs",
      "MCUs cannot run an operating system",
      "SoCs use proprietary instruction sets"
    ],
    correctAnswer: "MCUs contain a CPU, memory, and peripherals on a single chip; SoCs add OS-level features and often Wi-Fi/BT",
    explanation: "An SoC integrates a processor, memory, peripherals, and often wireless connectivity and OS support, while an MCU is a simpler single-chip microcomputer."
  },
  {
    id: "embedded-12",
    question: "What is memory-mapped I/O?",
    options: [
      "Storing I/O data in Flash memory",
      "Mapping peripheral registers into the processor's address space so they can be accessed like memory",
      "Using a separate bus for I/O operations",
      "Reading I/O through a dedicated instruction"
    ],
    correctAnswer: "Mapping peripheral registers into the processor's address space so they can be accessed like memory",
    explanation: "Memory-mapped I/O places peripheral control registers at specific memory addresses, allowing the CPU to read/write them using standard load/store instructions."
  },
  {
    id: "embedded-13",
    question: "What is the typical use case for bit manipulation in register-level programming?",
    options: [
      "Changing a single bit in a status register to clear a flag without affecting other bits",
      "Encrypting the entire register contents",
      "Increasing the clock speed of the MCU",
      "Allocating memory on the heap"
    ],
    correctAnswer: "Changing a single bit in a status register to clear a flag without affecting other bits",
    explanation: "Bit manipulation operators (AND, OR, XOR, shifts) let you set, clear, or toggle individual bits in a register while preserving adjacent bits."
  },
  {
    id: "embedded-14",
    question: "What is the purpose of the stack in an embedded system?",
    options: [
      "To store firmware images permanently",
      "To manage local variables, function parameters, and return addresses during execution",
      "To hold the program counter's reset value",
      "To buffer ADC samples before transmission"
    ],
    correctAnswer: "To manage local variables, function parameters, and return addresses during execution",
    explanation: "The stack is a LIFO memory region used by the CPU to store return addresses, local variables, and function call context."
  },
  {
    id: "embedded-15",
    question: "What happens if a deeply embedded system runs out of stack space?",
    options: [
      "The program automatically allocates heap to compensate",
      "It can corrupt adjacent memory and cause unpredictable behavior or a hard fault",
      "The compiler warns at build time",
      "The CPU automatically increases the stack size"
    ],
    correctAnswer: "It can corrupt adjacent memory and cause unpredictable behavior or a hard fault",
    explanation: "Stack overflow writes into adjacent memory (heap, global variables, or beyond), causing silent data corruption or a hard fault on ARM Cortex-M."
  },
  {
    id: "embedded-16",
    question: "What does the prescaler do in a timer peripheral?",
    options: [
      "It divides the input clock frequency to produce a slower timer tick",
      "It multiplies the timer period for longer timeouts",
      "It captures the current counter value",
      "It resets the timer to zero"
    ],
    correctAnswer: "It divides the input clock frequency to produce a slower timer tick",
    explanation: "The prescaler reduces the clock frequency reaching the timer counter, extending the range and resolution of time measurements and delays."
  },
  {
    id: "embedded-17",
    question: "What is PWM commonly used for in embedded applications?",
    options: [
      "Generating analog voltage levels by rapidly switching a digital output",
      "Transmitting serial data at high baud rates",
      "Storing configuration data in non-volatile memory",
      "Measuring the frequency of an external clock"
    ],
    correctAnswer: "Generating analog voltage levels by rapidly switching a digital output",
    explanation: "PWM modulates duty cycle to produce an effective average voltage, commonly used for motor speed control, LED dimming, and DAC approximation."
  },
  {
    id: "embedded-18",
    question: "What is the typical purpose of a bootloader in an embedded system?",
    options: [
      "To run the application firmware directly after power-on",
      "To load or update application firmware from a communication interface or alternate memory region",
      "To perform real-time signal processing",
      "To manage power consumption during sleep modes"
    ],
    correctAnswer: "To load or update application firmware from a communication interface or alternate memory region",
    explanation: "A bootloader executes at startup to initialize hardware and either boots the main application or enters a firmware update mode."
  },
  {
    id: "embedded-19",
    question: "In FreeRTOS, what is the difference between a binary semaphore and a mutex?",
    options: [
      "A binary semaphore has priority inheritance; a mutex does not",
      "A mutex has priority inheritance; a binary semaphore does not",
      "They are completely interchangeable",
      "A mutex can only be used from one task"
    ],
    correctAnswer: "A mutex has priority inheritance; a binary semaphore does not",
    explanation: "Mutexes support priority inheritance to prevent priority inversion, while binary semaphores are signaling mechanisms without ownership semantics."
  },
  {
    id: "embedded-20",
    question: "What is a FreeRTOS queue used for?",
    options: [
      "Allocating memory blocks dynamically",
      "Passing data between tasks in a thread-safe manner",
      "Managing peripheral register access",
      "Setting the system clock frequency"
    ],
    correctAnswer: "Passing data between tasks in a thread-safe manner",
    explanation: "Queues provide a thread-safe FIFO mechanism for inter-task communication, supporting both data transfer and synchronization."
  },
  {
    id: "embedded-21",
    question: "What is the key difference between EEPROM and Flash memory?",
    options: [
      "EEPROM can be erased and rewritten at the byte level; Flash is erased in blocks",
      "Flash is always faster than EEPROM",
      "EEPROM has a higher storage density than Flash",
      "Flash cannot be erased in-system"
    ],
    correctAnswer: "EEPROM can be erased and rewritten at the byte level; Flash is erased in blocks",
    explanation: "EEPROM allows byte-level erase/write operations, while Flash must be erased in large blocks before rewriting, making Flash better for bulk storage."
  },
  {
    id: "embedded-22",
    question: "What is the purpose of an interrupt vector table?",
    options: [
      "To store the firmware image for bootloading",
      "To map each interrupt source to the address of its handler function",
      "To configure the clock tree",
      "To define the memory layout of the application"
    ],
    correctAnswer: "To map each interrupt source to the address of its handler function",
    explanation: "The vector table is an array of function pointers indexed by interrupt number, allowing the CPU to jump to the correct handler when an interrupt fires."
  },
  {
    id: "embedded-23",
    question: "What does the Cortex-M7 add over the Cortex-M4?",
    options: [
      "Built-in Wi-Fi and Bluetooth",
      "Branch prediction, instruction and data caches, and a wider execution pipeline",
      "More GPIO pins on the die",
      "Support for 8-bit operations only"
    ],
    correctAnswer: "Branch prediction, instruction and data caches, and a wider execution pipeline",
    explanation: "The Cortex-M7 introduces caches, branch prediction, and a dual-issue pipeline for significantly higher performance over the M4."
  },
  {
    id: "embedded-24",
    question: "What is the main purpose of an ADC prescaler?",
    options: [
      "To increase the sampling rate beyond the reference clock",
      "To divide the clock before the ADC to control conversion speed and accuracy",
      "To amplify the input signal before conversion",
      "To store converted values in Flash"
    ],
    correctAnswer: "To divide the clock before the ADC to control conversion speed and accuracy",
    explanation: "The ADC prescaler reduces the clock frequency to keep the ADC within its specified operating range, balancing speed and conversion accuracy."
  },
  {
    id: "embedded-25",
    question: "What is a common use case for DMA in audio processing?",
    options: [
      "To encrypt audio data before transmission",
      "To transfer audio samples between an I2S peripheral and a memory buffer without CPU intervention",
      "To decode compressed audio formats",
      "To generate the I2S clock signal"
    ],
    correctAnswer: "To transfer audio samples between an I2S peripheral and a memory buffer without CPU intervention",
    explanation: "DMA fills and drains audio buffers in the background, preventing audio glitches that would occur if the CPU had to handle every sample transfer."
  },
  {
    id: "embedded-26",
    question: "What is the advantage of an RTOS over a bare-metal super loop?",
    options: [
      "RTOS always uses less memory",
      "RTOS provides preemptive multitasking with deterministic scheduling and resource management",
      "RTOS eliminates the need for interrupts",
      "RTOS runs on all microcontroller architectures without porting"
    ],
    correctAnswer: "RTOS provides preemptive multitasking with deterministic scheduling and resource management",
    explanation: "An RTOS lets multiple tasks run with priority-based scheduling, which is easier to manage and more maintainable than a single super loop for complex applications."
  },
  {
    id: "embedded-27",
    question: "What is an OTA (Over-The-Air) firmware update?",
    options: [
      "Updating firmware by physically connecting a programmer to the MCU",
      "Transmitting firmware wirelessly to a device and having the bootloader write it to Flash",
      "Updating the bootloader itself via a serial connection",
      "Compiling firmware on a remote server and downloading it"
    ],
    correctAnswer: "Transmitting firmware wirelessly to a device and having the bootloader write it to Flash",
    explanation: "OTA updates allow firmware to be delivered over Wi-Fi or Bluetooth, with the bootloader validating and writing the new image to Flash."
  },
  {
    id: "embedded-28",
    question: "What is the purpose of a prescaler on a microcontroller's clock system?",
    options: [
      "To convert the internal clock to an external crystal frequency",
      "To divide the system clock to generate slower peripheral clocks",
      "To amplify the clock signal for long PCB traces",
      "To generate a clock output for external devices"
    ],
    correctAnswer: "To divide the system clock to generate slower peripheral clocks",
    explanation: "Prescalers divide the system clock to create lower-frequency peripheral clocks, allowing peripherals to operate at their required speeds."
  },
  {
    id: "embedded-29",
    question: "What is the primary difference between a Cortex-M0 and a Cortex-M3?",
    options: [
      "The M0 supports Thumb-2 instructions; the M3 does not",
      "The M3 has a more advanced interrupt controller and supports more instructions than the M0",
      "The M0 has more Flash than the M3",
      "The M3 runs at a lower clock speed than the M0"
    ],
    correctAnswer: "The M3 has a more advanced interrupt controller and supports more instructions than the M0",
    explanation: "The Cortex-M3 supports the full Thumb-2 instruction set and has a more capable NVIC with more interrupt vectors, while the M0 uses the simpler Thumb-1 subset."
  },
  {
    id: "embedded-30",
    question: "What is the main reason to use a hardware watchdog timer in a production embedded system?",
    options: [
      "To reduce power consumption during idle time",
      "To recover from firmware crashes by automatically resetting the MCU",
      "To increase the system clock frequency",
      "To store error logs in non-volatile memory"
    ],
    correctAnswer: "To recover from firmware crashes by automatically resetting the MCU",
    explanation: "A watchdog timer resets the MCU if the firmware becomes unresponsive, ensuring the system recovers from software faults without manual intervention."
  }
];
