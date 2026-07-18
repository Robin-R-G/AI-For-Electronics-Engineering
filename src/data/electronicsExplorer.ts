export interface RealProject {
  title: string;
  description: string;
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface ElectronicsCategory {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  theory: string;
  applications: string[];
  aiUsage: string;
  promptExamples: string[];
  realProjects: RealProject[];
  datasheets: ResourceLink[];
  githubRepos: ResourceLink[];
  roadmap: string[];
}

export const explorerData: ElectronicsCategory[] = [
  {
    id: 'esp32',
    name: 'ESP32',
    icon: '📶',
    shortDesc: 'Powerful Wi-Fi and Bluetooth MCU for IoT.',
    theory: 'The ESP32 is a low-cost, low-power system on a chip (SoC) series with Wi-Fi & dual-mode Bluetooth capabilities. It features a dual-core Tensilica Xtensa LX6 microprocessor running at 160 or 240 MHz, making it significantly more powerful than traditional 8-bit AVRs.',
    applications: ['IoT Smart Home Hubs', 'Wireless Audio Streaming', 'Edge AI / TinyML Vision', 'Industrial Sensor Gateways'],
    aiUsage: 'AI tools like ChatGPT and GitHub Copilot are exceptional at writing FreeRTOS tasks for the ESP32. You can also use AI to optimize network payloads and generate OTA (Over-The-Air) update scripts.',
    promptExamples: [
      'Write an ESP-IDF C function to connect to Wi-Fi and perform an HTTPS GET request.',
      'How do I configure FreeRTOS to run this task exclusively on Core 1 of the ESP32?',
      'Generate a Python script to parse the MQTT payload coming from my ESP32.'
    ],
    realProjects: [
      { title: 'ESP-WHO Face Recognition', description: 'A computer vision framework for the ESP32-S3.' },
      { title: 'Smart Agriculture Sensor', description: 'Deep sleep soil moisture monitor lasting 2 years on a LiPo battery.' }
    ],
    datasheets: [{ name: 'ESP32 Technical Reference Manual', url: 'https://www.espressif.com/en/support/documents/technical-documents' }],
    githubRepos: [{ name: 'esp-idf', url: 'https://github.com/espressif/esp-idf' }],
    roadmap: ['Basic GPIOs', 'Wi-Fi/Bluetooth stack', 'FreeRTOS Task Management', 'Ultra-Low Power Co-Processor (ULP)']
  },
  {
    id: 'kicad',
    name: 'KiCad',
    icon: '📐',
    shortDesc: 'Open-source PCB design suite.',
    theory: 'KiCad is an open-source software suite for Electronic Design Automation (EDA). It facilitates the design of schematics for electronic circuits and their conversion to PCB designs.',
    applications: ['Multilayer PCB Design', 'Open-source Hardware Sharing', '3D Board Visualization'],
    aiUsage: 'While AI cannot yet completely design a complex PCB from scratch, you can use Claude or GPT-4 to write Python scripts for KiCad\'s pcbnew API (e.g., auto-arranging LEDs in a circle) or to parse and compare BOMs (Bill of Materials).',
    promptExamples: [
      'Write a Python script for KiCad 7 that selects all footprints named "LED" and arranges them in a perfect circle of radius 20mm.',
      'Check this KiCad ERC report and explain why I have an "unconnected pin" error on my GND net.',
      'Generate a Digikey BOM template based on this list of components.'
    ],
    realProjects: [
      { title: 'Open-Source Smartwatch', description: 'A fully open hardware 4-layer PCB design.' },
      { title: 'Custom Mechanical Keyboard', description: 'Designing the matrix schematic and routing traces.' }
    ],
    datasheets: [{ name: 'KiCad Documentation', url: 'https://docs.kicad.org' }],
    githubRepos: [{ name: 'KiCad Source', url: 'https://gitlab.com/kicad/code/kicad' }],
    roadmap: ['Schematic Capture (Eeschema)', 'Footprint Assignment', 'PCB Layout (Pcbnew)', 'Gerber Generation']
  },
  {
    id: 'sensors',
    name: 'Sensors',
    icon: '🌡️',
    shortDesc: 'The eyes and ears of embedded systems.',
    theory: 'Sensors convert physical phenomena (temperature, light, acceleration) into measurable electrical signals (analog voltage, resistance changes) which are then digitized by an ADC (Analog-to-Digital Converter).',
    applications: ['Environmental Monitoring', 'IMU (Inertial Measurement Units) for Drones', 'Biometric Wearables'],
    aiUsage: 'AI is critical for Sensor Fusion (e.g., combining Accelerometer and Gyroscope data using Kalman filters). You can ask AI to generate the complex matrix math required for these filters.',
    promptExamples: [
      'Explain how a Kalman filter works for fusing an MPU6050 accelerometer and gyroscope.',
      'Write C code to read the BME280 temperature sensor via I2C.',
      'What is the difference between an active and passive infrared sensor?'
    ],
    realProjects: [
      { title: 'Drone Flight Controller', description: 'High-speed sensor fusion for stabilization.' },
      { title: 'Air Quality Index Monitor', description: 'Fusing particulate and gas sensor data.' }
    ],
    datasheets: [{ name: 'Adafruit Sensor Learning Guide', url: 'https://learn.adafruit.com/' }],
    githubRepos: [{ name: 'Adafruit Sensor Library', url: 'https://github.com/adafruit/Adafruit_Sensor' }],
    roadmap: ['Analog vs Digital Interfaces', 'I2C/SPI Protocols', 'Calibration Techniques', 'Sensor Fusion Algorithms']
  },
  {
    id: 'arduino',
    name: 'Arduino',
    icon: '♾️',
    shortDesc: 'Accessible microcontroller platform for prototyping.',
    theory: 'Arduino is an open-source ecosystem of easy-to-use hardware and software. A board pairs an 8- or 32-bit microcontroller with a bootloader and a simplified C/C++ toolchain, so you can flash code without a separate programmer. The Uno (ATmega328P) is the classic entry point; the Nano and Portenta extend into 32-bit territory.',
    applications: ['Rapid Prototyping', 'Education & Workshops', 'Simple Home Automation', 'Interactive Art Installations'],
    aiUsage: 'Every major AI model is trained on huge volumes of Arduino code, so it is the most reliable target for generating first-draft firmware. Use it to scaffold setup()/loop() skeletons and debugging serial prints.',
    promptExamples: [
      'Write an Arduino sketch to blink an LED without using delay().',
      'Read an analog potentiometer on A0 and print the mapped 0-100% value.',
      'Explain why my servo jitters when powered from the same 5V rail as the Arduino.'
    ],
    realProjects: [
      { title: 'Plant Watering Bot', description: 'Soil sensor triggers a pump through a MOSFET driver.' },
      { title: 'BLE Macro Keyboard', description: 'ESP32-based Arduino board sending shortcuts over Bluetooth.' }
    ],
    datasheets: [{ name: 'Arduino Documentation', url: 'https://docs.arduino.cc' }],
    githubRepos: [{ name: 'arduino/Arduino', url: 'https://github.com/arduino/Arduino' }],
    roadmap: ['Digital I/O & Blink', 'Analog Read/Write (PWM)', 'Serial Communication', 'Libraries & Shields']
  },
  {
    id: 'stm32',
    name: 'STM32',
    icon: '⚡',
    shortDesc: 'High-performance 32-bit ARM Cortex-M MCUs.',
    theory: 'STM32 is a family of 32-bit ARM Cortex-M microcontrollers by STMicroelectronics, ranging from the ultra-low-power L0 series to the high-performance H7. They expose rich peripherals (timers, ADCs, CAN, USB, FMC) and are configured through the STM32CubeMX graphical tool that generates HAL/LL initialization code.',
    applications: ['Industrial Automation', 'Motor Control (FOC)', 'Consumer Electronics', 'Medical Devices'],
    aiUsage: 'AI can assist in writing HAL (Hardware Abstraction Layer) code and configuring clock trees. Paste the generated clock summary and ask it to explain which buses run at which frequency.',
    promptExamples: [
      'How do I configure the STM32 timer for PWM generation on PA8?',
      'Write a DMA-driven ADC continuous-conversion routine using the LL driver.',
      'Explain the difference between STM32 HAL and LL libraries.'
    ],
    realProjects: [
      { title: 'FOC Motor Controller', description: 'Field-oriented control of a BLDC using the STM32 motor SDK.' },
      { title: 'USB CDC Debug Bridge', description: 'Tiny STM32 acting as a virtual COM port sniffer.' }
    ],
    datasheets: [{ name: 'STM32 Documentation', url: 'https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html' }],
    githubRepos: [{ name: 'STMicroelectronics', url: 'https://github.com/STMicroelectronics' }],
    roadmap: ['CubeMX & Clock Tree', 'GPIO & External Interrupts', 'Timers & PWM', 'ADC + DMA', 'RTOS Integration']
  },
  {
    id: 'fpga',
    name: 'FPGA',
    icon: '🧩',
    shortDesc: 'Field-Programmable Gate Arrays for custom hardware.',
    theory: 'FPGAs contain an array of programmable logic blocks and reconfigurable interconnect that can implement any digital circuit. Unlike a CPU, they run your design in true parallel hardware — ideal for bit-level throughput. Designs are described in RTL (Verilog/VHDL) and synthesized into a bitstream.',
    applications: ['High-Frequency Trading', 'Video & Image Pipelines', 'Custom AI Accelerators', 'Signal Generation'],
    aiUsage: 'AI can generate boilerplate Verilog/VHDL and assist with testbenches. Describe the waveform you expect and ask it to write the stimulus file.',
    promptExamples: [
      'Write a Verilog module for a 4-bit synchronous up-counter with active-low reset.',
      'Generate a SystemVerilog assertion that flags when ready and valid are both low for 10 cycles.',
      'Explain setup and hold time violations in a 100 MHz design.'
    ],
    realProjects: [
      { title: 'HDMI Pattern Generator', description: 'Streams test patterns from block RAM to an HDMI PHY.' },
      { title: 'CNN Inference Accelerator', description: 'Pipelined MAC array for quantized inference on-chip.' }
    ],
    datasheets: [{ name: 'FPGA Documentation', url: 'https://www.xilinx.com' }],
    githubRepos: [{ name: 'fpgawars/apio', url: 'https://github.com/fpgawars/apio' }],
    roadmap: ['Boolean & Verilog Basics', 'Combinational vs Sequential', 'State Machines', 'Timing & Constraints', 'On-board Debug']
  },
  {
    id: 'matlab',
    name: 'MATLAB',
    icon: '📈',
    shortDesc: 'Numerical computing environment.',
    theory: 'MATLAB is a multi-paradigm language and IDE built around matrices. Its toolboxes (Signal Processing, Control System, Simulink) make it the standard for modeling, simulation, and algorithm prototyping before porting to C or HDL.',
    applications: ['Signal Processing', 'Control Systems', 'Data Analysis', 'Algorithm Prototyping'],
    aiUsage: 'AI models can translate Python algorithms into MATLAB, vectorize slow loops, and debug matrix dimension errors. Hand it a NumPy snippet and ask for the equivalent vectorized m-code.',
    promptExamples: [
      'Plot a 3D surface representing a sinc function in MATLAB.',
      'Write a script to design a 4th-order Butterworth low-pass filter at 1 kHz.',
      'Convert this Python FFT analysis to MATLAB and explain the scaling differences.'
    ],
    realProjects: [
      { title: 'PID Tuner', description: 'GUI to tune and simulate a closed-loop controller.' },
      { title: 'ECG Filter Pipeline', description: 'Removes baseline wander and detects R-peaks.' }
    ],
    datasheets: [{ name: 'MATLAB Documentation', url: 'https://www.mathworks.com/help/matlab/' }],
    githubRepos: [],
    roadmap: ['Matrix Operations', 'Plotting & Visualization', 'Signal Processing Toolbox', 'Simulink Modeling']
  },
  {
    id: 'ltspice',
    name: 'LTSpice',
    icon: '⚡',
    shortDesc: 'High-performance SPICE simulator software.',
    theory: 'LTspice is a free SPICE-class simulator from Analog Devices providing schematic capture and a fast waveform viewer. It solves the differential equations of your analog circuit (transient, AC, DC sweep) so you can verify behavior before building.',
    applications: ['Power Supply Design', 'Amplifier Simulation', 'Filter Analysis', 'Switching Regulators'],
    aiUsage: 'AI can help explain SPICE netlist syntax or suggest component values for a target filter frequency and cutoff.',
    promptExamples: [
      'Explain the .tran directive in LTSpice and how to set a 10 ms stop time.',
      'Pick R and C values for a 1 kHz low-pass RC filter with a 1 kΩ source.',
      'Why does my buck converter simulation show ringing on the switch node?'
    ],
    realProjects: [
      { title: 'LM358 Amplifier', description: 'Non-inverting stage simulated for gain and bandwidth.' },
      { title: 'Buck Converter', description: 'Efficiency and ripple verified across load steps.' }
    ],
    datasheets: [{ name: 'Analog Devices LTspice', url: 'https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html' }],
    githubRepos: [],
    roadmap: ['Schematic Capture', 'Transient vs AC Analysis', 'Component Models', 'Parametric Sweeps']
  },
  {
    id: 'easyeda',
    name: 'EasyEDA',
    icon: '🌐',
    shortDesc: 'Web-based EDA tool with direct manufacturing links.',
    theory: 'EasyEDA is a cloud-based electronic design automation tool focused on ease of use and rapid prototyping. Schematics, simulation (based on ngspice), and PCB layout live in the browser and link directly to the LCSC parts catalog and JLCPCB fabrication.',
    applications: ['Hobbyist PCBs', 'Rapid Prototyping', 'Shared Team Projects', 'Low-Cost Fabrication'],
    aiUsage: 'AI is useful for generating JSON scripts for the EasyEDA API or finding LCSC part numbers for a given component.',
    promptExamples: [
      'Find me the LCSC part number for a cheap 0402 10k resistor.',
      'Write an EasyEDA script that places a 4-pin header at (50mm, 50mm).',
      'How do I export Gerbers from EasyEDA for JLCPCB?'
    ],
    realProjects: [
      { title: 'USB-C Dev Board', description: 'Schematic to JLCPCB order in one afternoon.' },
      { title: 'Breakout Board', description: 'QFN-to-DIP adapter for a sensor.' }
    ],
    datasheets: [{ name: 'EasyEDA Help', url: 'https://docs.easyeda.com' }],
    githubRepos: [],
    roadmap: ['Schematic Capture', 'Component Search (LCSC)', 'PCB Layout', 'One-Click Order']
  },
  {
    id: 'proteus',
    name: 'Proteus',
    icon: '🛡️',
    shortDesc: 'PCB design and circuit simulator software.',
    theory: 'Proteus (Labcenter Electronics) is known for co-simulation: it can run compiled microcontroller hex/elf code alongside analog and digital electronics, so you can watch an LED toggle driven by a simulated PIC or AVR before touching hardware.',
    applications: ['Educational Simulation', 'Embedded System Verification', 'PCB Layout', 'Virtual Prototyping'],
    aiUsage: 'AI can help write the C code that you ultimately compile and load into the Proteus simulation.',
    promptExamples: [
      'How do I simulate an LCD display connected to a PIC microcontroller in Proteus?',
      'Write the C code to toggle an LED on RB0 every 500 ms for the Proteus PIC model.',
      'Why does my Proteus simulation show VCC at 0V on the MCU?'
    ],
    realProjects: [
      { title: 'Traffic Light Controller', description: 'State machine verified in Proteus before breadboarding.' },
      { title: 'UART Echo', description: 'PIC firmware loopback tested against a virtual terminal.' }
    ],
    datasheets: [{ name: 'Proteus Documentation', url: 'https://www.labcenter.com' }],
    githubRepos: [],
    roadmap: ['Schematic & ISIS', 'MCU Co-Simulation', 'VSM Debugging', 'ARES PCB Layout']
  },
  {
    id: 'protocols',
    name: 'Comm Protocols',
    icon: '🔄',
    shortDesc: 'I2C, SPI, UART, CAN, and more.',
    theory: 'Communication protocols are the rules that let chips exchange data. UART is asynchronous point-to-point; I2C is a 2-wire multi-master bus; SPI is a fast 4-wire master-slave bus; CAN is a robust differential bus for noisy automotive/industrial environments. Choosing the right one is a core EE skill.',
    applications: ['Inter-chip Communication', 'Automotive Networks (CAN)', 'Industrial Buses (Modbus)', 'Sensor Busses'],
    aiUsage: 'AI is excellent at decoding raw hex dumps from logic analyzers into human-readable transactions, and at suggesting pull-up values or baud rates.',
    promptExamples: [
      'I have this logic analyzer dump of an I2C transaction. What is the slave address and data payload?',
      'Compare SPI and I2C for connecting three sensors to an MCU.',
      'Calculate the CAN bit timing for a 500 kbps bus with an 8 MHz crystal.'
    ],
    realProjects: [
      { title: 'I2C Sensor Hub', description: 'Arbitrates six sensors on one bus with clock stretching.' },
      { title: 'CAN Bridge', description: 'Translates OBD-II CAN frames to UART for logging.' }
    ],
    datasheets: [{ name: 'I2C Bus Specification', url: 'https://www.nxp.com/docs/en/user-guide/UM10204.pdf' }],
    githubRepos: [],
    roadmap: ['UART & Baud Rate', 'I2C Addressing', 'SPI Modes', 'CAN Frame Format']
  },
  {
    id: 'iot',
    name: 'IoT',
    icon: '☁️',
    shortDesc: 'Internet of Things ecosystem.',
    theory: 'IoT connects physical devices to the internet to collect and exchange data. A typical node reads sensors, processes locally (often with an ESP32 or similar), and publishes over MQTT/HTTPS to a broker or cloud function, which stores, visualizes, and acts on the data.',
    applications: ['Smart Cities', 'Industrial IoT (IIoT)', 'Home Automation', 'Asset Tracking'],
    aiUsage: 'AI can design the full-stack architecture, from the C firmware to the AWS Lambda backend, and generate the infrastructure-as-code to deploy it.',
    promptExamples: [
      'Design an MQTT topic structure for a fleet of 1000 temperature sensors.',
      'Write an ESP32 sketch that publishes BME280 data to AWS IoT Core over MQTT.',
      'How do I secure an IoT device with X.509 certificates and OTA updates?'
    ],
    realProjects: [
      { title: 'Cold-Chain Logger', description: 'Battery IoT node reporting temperature breaches to the cloud.' },
      { title: 'Smart Meter', description: 'Aggregates consumption and pushes hourly to a dashboard.' }
    ],
    datasheets: [{ name: 'MQTT Specification', url: 'https://mqtt.org' }],
    githubRepos: [],
    roadmap: ['Sensor & MCU Choice', 'Connectivity (Wi-Fi/LoRa/NB-IoT)', 'MQTT & Brokers', 'Cloud Ingestion', 'Security & OTA']
  }
];
