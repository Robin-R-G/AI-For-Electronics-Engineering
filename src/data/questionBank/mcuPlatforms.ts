export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const mcuPlatformsQuestions: LessonQuestion[] = [
  {
    id: "mcu-1",
    question: "What microcontroller architecture does the Arduino Uno use?",
    options: [
      "ARM Cortex-M0",
      "ATmega328P (AVR 8-bit)",
      "ESP32 (Xtensa LX6)",
      "STM32F103 (ARM Cortex-M3)"
    ],
    correctAnswer: "ATmega328P (AVR 8-bit)",
    explanation: "The Arduino Uno uses the ATmega328P, an 8-bit AVR microcontroller running at 16 MHz with 32 KB Flash and 2 KB SRAM."
  },
  {
    id: "mcu-2",
    question: "What is the main advantage of the ESP32 over the Arduino Uno?",
    options: [
      "The ESP32 has more analog inputs",
      "The ESP32 has Wi-Fi and Bluetooth connectivity and a dual-core processor",
      "The ESP32 uses less power in all modes",
      "The ESP32 has a simpler programming model"
    ],
    correctAnswer: "The ESP32 has Wi-Fi and Bluetooth connectivity and a dual-core processor",
    explanation: "The ESP32 integrates 2.4 GHz Wi-Fi and Bluetooth in a dual-core 240 MHz processor, making it far more capable than the single-core 8-bit Arduino Uno."
  },
  {
    id: "mcu-3",
    question: "What does the ESP32's deep sleep mode do?",
    options: [
      "Shuts down the CPU but keeps Wi-Fi active",
      "Powers down most components but maintains the RTC and can wake on GPIO or timer",
      "Disables all interrupts permanently",
      "Resets the chip to factory defaults"
    ],
    correctAnswer: "Powers down most components but maintains the RTC and can wake on GPIO or timer",
    explanation: "Deep sleep draws ~5 µA while keeping the RTC alive, allowing the ESP32 to wake on external signals or timed intervals for ultra-low-power applications."
  },
  {
    id: "mcu-4",
    question: "What is the ESP32-C3's processor architecture?",
    options: [
      "Xtensa LX6 dual-core",
      "RISC-V 32-bit single-core",
      "ARM Cortex-M0+",
      "AVR 8-bit"
    ],
    correctAnswer: "RISC-V 32-bit single-core",
    explanation: "The ESP32-C3 uses a 32-bit RISC-V single-core processor at 160 MHz, offering an open-source ISA alternative to the Xtensa cores."
  },
  {
    id: "mcu-5",
    question: "What protocol does the ESP32-C6 support that makes it suitable for smart home devices?",
    options: [
      "Zigbee only",
      "Matter over Thread",
      "LoRaWAN",
      "NFC-A"
    ],
    correctAnswer: "Matter over Thread",
    explanation: "The ESP32-C6 supports Thread and Wi-Fi, enabling it to run the Matter protocol for interoperable smart home devices."
  },
  {
    id: "mcu-6",
    question: "What is the primary purpose of STM32CubeMX?",
    options: [
      "Writing application firmware",
      "Configuring MCU peripherals, pin assignments, and clock trees in a GUI before code generation",
      "Debugging firmware over JTAG",
      "Simulating analog circuits"
    ],
    correctAnswer: "Configuring MCU peripherals, pin assignments, and clock trees in a GUI before code generation",
    explanation: "CubeMX generates initialization C code for STM32 microcontrollers based on GUI configuration, reducing manual setup time."
  },
  {
    id: "mcu-7",
    question: "What is the difference between STM32F1 and STM32F4 families?",
    options: [
      "F1 has a Cortex-M4 with FPU; F4 has a Cortex-M3",
      "F4 has higher-performance Cortex-M cores with DSP and FPU, while F1 uses Cortex-M3 without FPU",
      "F1 and F4 have identical cores but different pin counts",
      "F4 is a 16-bit family while F1 is 32-bit"
    ],
    correctAnswer: "F4 has higher-performance Cortex-M cores with DSP and FPU, while F1 uses Cortex-M3 without FPU",
    explanation: "The F1 uses Cortex-M3 cores (up to 72 MHz) while F4 uses Cortex-M4 cores (up to 168 MHz) with DSP extensions and optional floating-point support."
  },
  {
    id: "mcu-8",
    question: "What is the main advantage of STM32 HAL over bare-metal register programming?",
    options: [
      "HAL runs faster than direct register access",
      "HAL provides a portable, standardized API across STM32 families with less hardware-specific code",
      "HAL uses less Flash memory than register code",
      "HAL eliminates the need for interrupts"
    ],
    correctAnswer: "HAL provides a portable, standardized API across STM32 families with less hardware-specific code",
    explanation: "HAL abstracts hardware details into a consistent API, making code portable across STM32 variants, though it adds some overhead."
  },
  {
    id: "mcu-9",
    question: "What does the STM32CubeIDE provide?",
    options: [
      "Only a code editor for STM32 development",
      "An integrated development environment combining code editing, debugging, build, and CubeMX configuration",
      "A hardware simulator for testing circuits",
      "A cloud-only development platform"
    ],
    correctAnswer: "An integrated development environment combining code editing, debugging, build, and CubeMX configuration",
    explanation: "STM32CubeIDE bundles Eclipse-based editing, GDB debugging, GCC toolchain, and CubeMX integration in a single free tool."
  },
  {
    id: "mcu-10",
    question: "What is the difference between PlatformIO and the Arduino IDE?",
    options: [
      "PlatformIO only supports ESP32 chips",
      "PlatformIO offers multi-platform support, library management, and project automation beyond Arduino IDE's basic functionality",
      "Arduino IDE supports more boards than PlatformIO",
      "PlatformIO cannot compile Arduino sketches"
    ],
    correctAnswer: "PlatformIO offers multi-platform support, library management, and project automation beyond Arduino IDE's basic functionality",
    explanation: "PlatformIO supports multiple frameworks (Arduino, ESP-IDF, STM32) and provides dependency management, CI integration, and professional tooling."
  },
  {
    id: "mcu-11",
    question: "What is the NodeMCU board based on?",
    options: [
      "STM32F103",
      "ESP8266 with integrated Wi-Fi",
      "ATmega328P",
      "Raspberry Pi RP2040"
    ],
    correctAnswer: "ESP8266 with integrated Wi-Fi",
    explanation: "NodeMCU is an open-source board built around the ESP8266 SoC, providing Wi-Fi connectivity with Lua scripting support."
  },
  {
    id: "mcu-12",
    question: "What is the Blue Pill board?",
    options: [
      "An ESP32 development board",
      "A low-cost STM32F103 development board with ARM Cortex-M3",
      "An Arduino Mega clone",
      "A Raspberry Pi HAT"
    ],
    correctAnswer: "A low-cost STM32F103 development board with ARM Cortex-M3",
    explanation: "The Blue Pill is a compact, inexpensive board using the STM32F103C8T6, popular for STM32 development and Arduino IDE compatibility."
  },
  {
    id: "mcu-13",
    question: "What is the I2C address of a typical I2C device?",
    options: [
      "Always 0x00",
      "A 7-bit or 10-bit value determined by the device manufacturer and pin configuration",
      "The same for all devices on the bus",
      "Assigned dynamically at runtime by the master"
    ],
    correctAnswer: "A 7-bit or 10-bit value determined by the device manufacturer and pin configuration",
    explanation: "I2C devices have fixed addresses set by the manufacturer, with some allowing a few address bits to be configured via hardware pins."
  },
  {
    id: "mcu-14",
    question: "How do you differentiate multiple SPI devices on the same bus?",
    options: [
      "Each device must use a different SPI mode",
      "Each device gets a separate Chip Select (CS) line",
      "SPI devices auto-negotiate addresses like I2C",
      "You cannot share an SPI bus between multiple devices"
    ],
    correctAnswer: "Each device gets a separate Chip Select (CS) line",
    explanation: "SPI uses dedicated CS lines per device to select which slave is active, unlike I2C which uses device addresses on shared lines."
  },
  {
    id: "mcu-15",
    question: "What does PWM frequency mean for motor control?",
    options: [
      "The number of times per second the motor rotates",
      "The rate at which the PWM signal switches on and off, affecting audible noise and motor smoothness",
      "The supply voltage of the motor",
      "The current draw of the motor"
    ],
    correctAnswer: "The rate at which the PWM signal switches on and off, affecting audible noise and motor smoothness",
    explanation: "Higher PWM frequencies reduce audible buzzing and produce smoother motor operation but increase switching losses in the driver."
  },
  {
    id: "mcu-16",
    question: "What is the ADC resolution of the Arduino Uno?",
    options: [
      "8 bits",
      "10 bits (0–1023)",
      "12 bits (0–4095)",
      "16 bits"
    ],
    correctAnswer: "10 bits (0–1023)",
    explanation: "The Arduino Uno's ATmega328P has a 10-bit ADC, providing 1024 discrete levels from 0 to 5V, which is about 4.9 mV per step."
  },
  {
    id: "mcu-17",
    question: "What is the ADC resolution of most STM32F4 series microcontrollers?",
    options: [
      "8 bits",
      "10 bits",
      "12 bits (0–4095)",
      "16 bits"
    ],
    correctAnswer: "12 bits (0–4095)",
    explanation: "Most STM32F4 MCUs have a 12-bit ADC providing 4096 levels, offering better precision than the Arduino Uno's 10-bit ADC."
  },
  {
    id: "mcu-18",
    question: "What is the main purpose of JTAG or SWD debugging?",
    options: [
      "To upload firmware to Flash memory only",
      "To step through code, inspect registers, set breakpoints, and debug hardware in real time",
      "To measure analog voltages on GPIO pins",
      "To configure the chip's clock tree"
    ],
    correctAnswer: "To step through code, inspect registers, set breakpoints, and debug hardware in real time",
    explanation: "JTAG and SWD provide on-chip debugging capabilities, allowing real-time code inspection and control without affecting the target system."
  },
  {
    id: "mcu-19",
    question: "What is a logic analyzer used for in embedded debugging?",
    options: [
      "Measuring continuous analog voltage levels",
      "Capturing and displaying digital signal timing across multiple channels simultaneously",
      "Programming Flash memory",
      "Simulating CPU execution"
    ],
    correctAnswer: "Capturing and displaying digital signal timing across multiple channels simultaneously",
    explanation: "A logic analyzer captures digital waveforms on multiple channels, making it ideal for debugging protocols like SPI, I2C, and UART with precise timing."
  },
  {
    id: "mcu-20",
    question: "How does the ESP-IDF framework differ from the Arduino framework on ESP32?",
    options: [
      "ESP-IDF cannot compile C code",
      "ESP-IDF provides a lower-level, production-grade SDK with FreeRTOS integration and full peripheral access",
      "Arduino framework supports more peripherals than ESP-IDF",
      "ESP-IDF only supports single-core operation"
    ],
    correctAnswer: "ESP-IDF provides a lower-level, production-grade SDK with FreeRTOS integration and full peripheral access",
    explanation: "ESP-IDF is Espressif's official SDK with full API access, while Arduino wraps it for simplicity but limits advanced features and control."
  },
  {
    id: "mcu-21",
    question: "What is the key difference between STM32 HAL and LL (Low-Level) libraries?",
    options: [
      "LL is for Arduino; HAL is for STM32CubeIDE",
      "LL provides thin, register-level wrappers with minimal overhead; HAL provides a higher-level abstraction",
      "HAL is faster than LL for all operations",
      "LL does not support DMA or interrupts"
    ],
    correctAnswer: "LL provides thin, register-level wrappers with minimal overhead; HAL provides a higher-level abstraction",
    explanation: "LL libraries are lightweight register-level abstractions, while HAL provides a more portable but heavier abstraction layer."
  },
  {
    id: "mcu-22",
    question: "What is the purpose of brownout detection on the ESP32?",
    options: [
      "To reset the chip when supply voltage drops below a safe threshold",
      "To detect when the chip overheats",
      "To monitor Wi-Fi signal strength",
      "To detect serial communication errors"
    ],
    correctAnswer: "To reset the chip when supply voltage drops below a safe threshold",
    explanation: "Brownout detection prevents erratic behavior by resetting the ESP32 when the supply voltage falls below the configured threshold."
  },
  {
    id: "mcu-23",
    question: "What is the STM32H7 family known for?",
    options: [
      "Being the lowest-power STM32 family",
      "High-performance Cortex-M7 core with large SRAM and advanced peripherals",
      "Having only 8-bit cores",
      "Being the cheapest STM32 family"
    ],
    correctAnswer: "High-performance Cortex-M7 core with large SRAM and advanced peripherals",
    explanation: "The STM32H7 features a Cortex-M7 at up to 480 MHz with 1 MB SRAM, double-precision FPU, and advanced peripherals for demanding applications."
  },
  {
    id: "mcu-24",
    question: "What is the purpose of the ESP32's ULP (Ultra-Low Power) co-processor?",
    options: [
      "To handle Wi-Fi communication during deep sleep",
      "To run simple sensor reading tasks while the main core is in deep sleep",
      "To accelerate cryptographic operations",
      "To manage Bluetooth pairing"
    ],
    correctAnswer: "To run simple sensor reading tasks while the main core is in deep sleep",
    explanation: "The ULP coprocessor operates during deep sleep, performing ADC reads and GPIO monitoring at microwatt-level power consumption."
  },
  {
    id: "mcu-25",
    question: "What is the typical use case for the STM32L0 family?",
    options: [
      "High-performance audio processing",
      "Ultra-low-power applications like battery-operated sensors and wearables",
      "Graphics rendering on TFT displays",
      "High-speed motor control"
    ],
    correctAnswer: "Ultra-low-power applications like battery-operated sensors and wearables",
    explanation: "The STM32L0 uses a Cortex-M0+ core optimized for low power, making it ideal for applications requiring years of battery life."
  },
  {
    id: "mcu-26",
    question: "What does `analogRead()` return on an Arduino Uno when the input is at 2.5V?",
    options: [
      "512",
      "256",
      "1023",
      "0"
    ],
    correctAnswer: "512",
    explanation: "With a 10-bit ADC and 5V reference, 2.5V reads as (2.5/5.0) * 1023 = 511.5, which rounds to 512."
  },
  {
    id: "mcu-27",
    question: "What is the advantage of using FreeRTOS tasks on the ESP32?",
    options: [
      "It eliminates the need for Arduino libraries",
      "It allows running separate functions concurrently on each core with priority-based scheduling",
      "It disables all interrupts for deterministic behavior",
      "It reduces Flash memory usage"
    ],
    correctAnswer: "It allows running separate functions concurrently on each core with priority-based scheduling",
    explanation: "FreeRTOS on ESP32 enables true concurrent execution across dual cores with task priorities, mutexes, and queues for robust multitasking."
  },
  {
    id: "mcu-28",
    question: "What is the role of the `Serial.begin()` function in Arduino?",
    options: [
      "To start the ADC conversion",
      "To initialize the UART serial port at a specified baud rate for communication",
      "To begin analogWrite on all pins",
      "To start the system clock"
    ],
    correctAnswer: "To initialize the UART serial port at a specified baud rate for communication",
    explanation: "Serial.begin() configures the UART peripheral with a baud rate, enabling serial communication with a PC or other devices."
  },
  {
    id: "mcu-29",
    question: "What is the main reason to use an external ADC instead of the built-in MCU ADC?",
    options: [
      "External ADCs are always cheaper",
      "External ADCs can offer higher resolution, lower noise, and faster sampling rates",
      "Built-in ADCs cannot convert positive voltages",
      "External ADCs do not require any communication interface"
    ],
    correctAnswer: "External ADCs can offer higher resolution, lower noise, and faster sampling rates",
    explanation: "External ADCs like the ADS1115 (16-bit) or AD7606 (16-bit, simultaneous sampling) exceed the 10-12 bit resolution of most MCU ADCs with better noise performance."
  },
  {
    id: "mcu-30",
    question: "What is the primary benefit of OTA updates on an ESP32-based IoT device?",
    options: [
      "It increases the processor clock speed",
      "It allows firmware to be updated wirelessly without physical access to the device",
      "It reduces Flash memory usage",
      "It disables the watchdog timer"
    ],
    correctAnswer: "It allows firmware to be updated wirelessly without physical access to the device",
    explanation: "OTA updates let you push firmware to deployed ESP32 devices over Wi-Fi, critical for maintaining IoT fleets in the field."
  }
];
