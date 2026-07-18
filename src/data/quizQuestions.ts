export type QuestionType = 'multiple-choice' | 'true-false' | 'image-id' | 'scenario' | 'coding';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  questionText: string;
  codeSnippet?: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    difficulty: 'Easy',
    questionText: 'Which protocol is synchronous, full-duplex, and uses a master-slave architecture with multiple slave-select lines?',
    options: ['UART', 'I2C', 'SPI', 'CAN'],
    correctAnswer: 'SPI',
    explanation: 'SPI (Serial Peripheral Interface) is a synchronous, full-duplex protocol that uses separate MOSI, MISO, SCLK, and SS (Slave Select) lines for communication, making it master-slave oriented with hardware addressing.'
  },
  {
    id: 'q2',
    type: 'true-false',
    difficulty: 'Medium',
    questionText: 'True or False: In FreeRTOS, a binary semaphore is identical to a mutex because both are used for mutual exclusion and contain priority inheritance mechanisms.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Mutexes have priority inheritance mechanisms to prevent priority inversion, whereas semaphores do not. Semaphores are generally used for synchronization, while Mutexes are used for mutual exclusion.'
  },
  {
    id: 'q3',
    type: 'image-id',
    difficulty: 'Hard',
    questionText: 'Look at the highlighted peripheral layout block. Based on standard ARM Cortex-M architecture, which subsystem is typically responsible for directly routing external hardware interrupt signals directly to the CPU core?',
    imageUrl: '/images/quiz_mcu.png',
    options: ['DMA Controller', 'Nested Vectored Interrupt Controller (NVIC)', 'System Tick Timer (SysTick)', 'Reset and Clock Control (RCC)'],
    correctAnswer: 'Nested Vectored Interrupt Controller (NVIC)',
    explanation: 'The Nested Vectored Interrupt Controller (NVIC) is integral to the ARM Cortex-M processor core. It handles low-latency interrupt processing, prioritizing and nesting interrupts directly for execution.'
  },
  {
    id: 'q4',
    type: 'scenario',
    difficulty: 'Medium',
    questionText: 'Your ESP32 battery-powered monitor wakes from deep sleep, reads an analog sensor value, publishes it to MQTT over Wi-Fi, and sleeps again. However, the system hangs indefinitely on the WiFi connection step when the battery voltage drops below 3.0V, even though the MCU logic operates fine. What is the most likely root cause?',
    options: [
      'The ESP32 flash memory is corrupt.',
      'Brownout detector triggers due to the high peak current draw of the Wi-Fi radio (up to 250mA) under load.',
      'The analog sensor pins are causing a short circuit on wakeup.',
      'MQTT broker is rejecting the sleep payload.'
    ],
    correctAnswer: 'Brownout detector triggers due to the high peak current draw of the Wi-Fi radio (up to 250mA) under load.',
    explanation: 'Enabling the Wi-Fi RF transmitter demands peak currents of ~240-260mA. If the battery voltage is near 3.0V, the internal resistance of the battery or weak power path causes a voltage dip below the ESP32\'s brownout threshold (~2.4V to 2.8V depending on configuration), leading to an instant reset or hang loop.'
  },
  {
    id: 'q5',
    type: 'coding',
    difficulty: 'Hard',
    questionText: 'Examine the C++ code block below. What is the logic error in this interrupt service routine (ISR) that will cause a crash or lockup in a real-time system?',
    codeSnippet: `// Hardware Interrupt Service Routine
void IRAM_ATTR onButtonPress() {
    Serial.println("Button Pressed!");
    delay(100);
    buttonPressedCount++;
}`,
    options: [
      'The variable buttonPressedCount is not declared.',
      'Using blocking delay() and blocking Serial.println() calls inside an ISR context.',
      'IRAM_ATTR cannot be used with void return types.',
      'You cannot increment variables in hardware interrupts.'
    ],
    correctAnswer: 'Using blocking delay() and blocking Serial.println() calls inside an ISR context.',
    explanation: 'ISRs must be extremely fast and non-blocking. `Serial.println()` relies on interrupts and blocking buffers, which can cause a deadlock because interrupts are disabled during the ISR. `delay()` uses the system tick counter, which also requires interrupts to run, causing an infinite hang or system crash.'
  }
];
