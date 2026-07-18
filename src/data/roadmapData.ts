export interface RoadmapNodeData {
  id: string;
  title: string;
  estimatedTime: string;
  description: string;
  projects: string[];
  resources: string[];
  courses: string[];
  videos: string[];
  interviewQuestions: string[];
}

export const roadmapData: RoadmapNodeData[] = [
  {
    id: 'c',
    title: 'C Programming',
    estimatedTime: '4 Weeks',
    description: 'The foundational language of all electronics and embedded systems.',
    projects: ['Command Line Calculator', 'Linked List Data Structure', 'File I/O Parser'],
    resources: ['Beej\'s Guide to C Programming', 'C Programming: A Modern Approach (Book)'],
    courses: ['Harvard CS50', 'Coursera: C for Everyone'],
    videos: ['Neso Academy C Programming', 'FreeCodeCamp C Tutorial'],
    interviewQuestions: ['What is the difference between malloc() and calloc()?', 'Explain pointer arithmetic.', 'What is a memory leak?']
  },
  {
    id: 'embedded-c',
    title: 'Embedded C',
    estimatedTime: '4 Weeks',
    description: 'Applying C to constrained microcontrollers, focusing on registers, bit-manipulation, and interrupts.',
    projects: ['Bare-metal LED Blink', 'UART Driver from scratch', 'Timer Interrupt Handler'],
    resources: ['Making Embedded Systems by Elecia White', 'Bit Twiddling Hacks'],
    courses: ['FastBit Embedded Brain Academy (Udemy)'],
    videos: ['Quantum Leaps: Modern Embedded Systems Programming'],
    interviewQuestions: ['Write a macro to set and clear a specific bit in a register.', 'What is the `volatile` keyword used for?', 'Explain the Interrupt Vector Table.']
  },
  {
    id: 'arduino',
    title: 'Arduino Framework',
    estimatedTime: '2 Weeks',
    description: 'Rapid prototyping ecosystem to validate hardware concepts quickly.',
    projects: ['Weather Station', 'Line Following Robot', 'Smart Plant Waterer'],
    resources: ['Arduino Official Reference', 'Adafruit Learning System'],
    courses: ['Arduino Step by Step (Udemy)'],
    videos: ['DroneBot Workshop', 'Jeremy Blum Arduino Tutorials'],
    interviewQuestions: ['What is the difference between `setup()` and `loop()`?', 'How does `millis()` work and how do you handle rollover?']
  },
  {
    id: 'esp32',
    title: 'ESP32 & IoT',
    estimatedTime: '4 Weeks',
    description: 'Connecting embedded systems to the internet using Wi-Fi, Bluetooth, and MQTT.',
    projects: ['MQTT Smart Home Node', 'Web Server Dashboard', 'BLE Beacon Scanner'],
    resources: ['Random Nerd Tutorials', 'Espressif ESP-IDF Programming Guide'],
    courses: ['Learn ESP32 with Arduino IDE'],
    videos: ['Andreas Spiess ESP32 Playlist', 'Mooc - IoT with ESP32'],
    interviewQuestions: ['Explain the publish/subscribe model of MQTT.', 'What is FreeRTOS and why does the ESP32 use it?']
  },
  {
    id: 'git',
    title: 'Git & Version Control',
    estimatedTime: '1 Week',
    description: 'Essential software engineering practice for tracking changes and collaborating.',
    projects: ['Create a GitHub Portfolio', 'Contribute to an Open Source hardware repo'],
    resources: ['Pro Git Book', 'GitHub Guides'],
    courses: ['Udacity: Version Control with Git'],
    videos: ['Corey Schafer Git Tutorial'],
    interviewQuestions: ['What is the difference between `git merge` and `git rebase`?', 'How do you resolve a merge conflict?']
  },
  {
    id: 'python',
    title: 'Python for Hardware',
    estimatedTime: '3 Weeks',
    description: 'Used for writing test scripts, data analysis, and MicroPython/CircuitPython.',
    projects: ['Serial Port Data Logger', 'Raspberry Pi Pico Weather Station', 'Automated Testing Script'],
    resources: ['Automate the Boring Stuff with Python', 'Real Python'],
    courses: ['100 Days of Code: The Complete Python Pro Bootcamp'],
    videos: ['Tech With Tim Python Basics'],
    interviewQuestions: ['What is the GIL in Python?', 'How do you read from a serial port using PySerial?']
  },
  {
    id: 'stm32',
    title: 'STM32 & ARM Cortex-M',
    estimatedTime: '6 Weeks',
    description: 'Industry-standard 32-bit microcontrollers used in professional products.',
    projects: ['Custom USB HID Device', 'DMA-based ADC Sampler', 'CAN Bus Node'],
    resources: ['Mastering STM32 by Carmine Noviello', 'STMicroelectronics Reference Manuals'],
    courses: ['Udemy: Mastering Microcontroller and Embedded Driver Development'],
    videos: ['Controllers Tech STM32 Tutorials'],
    interviewQuestions: ['What is DMA and why is it useful?', 'Explain the difference between Cortex-M0 and Cortex-M4.', 'How do you configure the clock tree?']
  },
  {
    id: 'rtos',
    title: 'Real-Time Operating Systems',
    estimatedTime: '4 Weeks',
    description: 'Managing complex multitasking environments with deterministic timing.',
    projects: ['Task Scheduler with FreeRTOS', 'Mutex-protected Shared Resource', 'Message Queue Data Pipeline'],
    resources: ['FreeRTOS Official Documentation', 'Operating Systems: Three Easy Pieces'],
    courses: ['Udemy: FreeRTOS on STM32'],
    videos: ['Digi-Key Introduction to RTOS'],
    interviewQuestions: ['What is priority inversion and how is it solved?', 'Explain the difference between a Mutex and a Semaphore.', 'What causes a stack overflow in an RTOS task?']
  },
  {
    id: 'linux',
    title: 'Embedded Linux',
    estimatedTime: '8 Weeks',
    description: 'Running a full OS on application processors (e.g., Raspberry Pi, BeagleBone).',
    projects: ['Custom Yocto Image', 'Write a Character Device Driver', 'Device Tree Overlay'],
    resources: ['Mastering Embedded Linux Programming', 'Bootlin Training Materials'],
    courses: ['Linux Foundation: Embedded Linux Development'],
    videos: ['Derek Molloy: Exploring BeagleBone'],
    interviewQuestions: ['What is U-Boot?', 'Explain the purpose of the Device Tree.', 'How does user space communicate with kernel space?']
  },
  {
    id: 'pcb',
    title: 'PCB Design',
    estimatedTime: '6 Weeks',
    description: 'Turning breadboard prototypes into manufacturable printed circuit boards.',
    projects: ['Custom ESP32 Dev Board', 'Switching Power Supply Layout', 'Motor Driver Hat'],
    resources: ['KiCad Documentation', 'High Speed Digital Design: A Handbook of Black Magic'],
    courses: ['Phil\'s Lab KiCad Course', 'Contextual Electronics'],
    videos: ['Phil\'s Lab YouTube Channel', 'Altium Academy'],
    interviewQuestions: ['What is characteristic impedance?', 'Explain the difference between a blind and buried via.', 'Why is decoupling capacitance important?']
  },
  {
    id: 'tinyml',
    title: 'TinyML',
    estimatedTime: '4 Weeks',
    description: 'Deploying machine learning models on resource-constrained microcontrollers.',
    projects: ['Voice Keyword Spotting', 'Accelerometer Gesture Recognition', 'Low-res Image Classification'],
    resources: ['TinyML Book by Pete Warden', 'TensorFlow Lite for Microcontrollers docs'],
    courses: ['HarvardX: TinyML Fundamentals'],
    videos: ['Edge Impulse YouTube Tutorials'],
    interviewQuestions: ['Why do we need to quantize ML models for microcontrollers?', 'What is an inference engine?']
  },
  {
    id: 'edge-ai',
    title: 'Edge AI',
    estimatedTime: '4 Weeks',
    description: 'Running advanced AI models on hardware accelerators (NVIDIA Jetson, Coral TPU).',
    projects: ['Real-time Object Detection with YOLO', 'Automated Optical Inspection', 'Autonomous Robot Navigation'],
    resources: ['NVIDIA Jetson Developer Zone', 'Google Coral Documentation'],
    courses: ['NVIDIA DLI: Getting Started with AI on Jetson Nano'],
    videos: ['JetsonHacks YouTube Channel'],
    interviewQuestions: ['What is TensorRT?', 'How does a TPU differ from a GPU in architecture?', 'Explain the tradeoff between inference speed and accuracy.']
  },
  {
    id: 'career',
    title: 'Career Placement',
    estimatedTime: 'Ongoing',
    description: 'Preparing for technical interviews, networking, and landing a job.',
    projects: ['Build a Personal Portfolio Website', 'Contribute a major feature to Open Source', 'Write a Technical Blog Post'],
    resources: ['Cracking the Coding Interview', 'Pragmatic Programmer'],
    courses: ['System Design Interview Course'],
    videos: ['Tech Interview Pro'],
    interviewQuestions: ['Walk me through a time you debugged a tough hardware issue.', 'Describe your most complex project from block diagram to final PCB.', 'How do you stay up-to-date with new technologies?']
  }
];
