export interface ComponentEntry {
  id: string;
  name: string;
  category: string;
  package: string;
  description: string;
  pinout: { name: string; number: number; type: string; description: string }[];
  specifications: { label: string; value: string; unit?: string }[];
  applications: string[];
  datasheetUrl: string;
  commonMistakes: string[];
  sampleCircuit: string;
}

export const componentCategories = [
  'All',
  'Microcontrollers',
  'Op-Amps',
  'Voltage Regulators',
  'Sensors',
  'Communication ICs',
  'Memory',
  'Power Management',
  'Logic ICs',
] as const;

export const components: ComponentEntry[] = [
  {
    id: 'atmega328p',
    name: 'ATmega328P',
    category: 'Microcontrollers',
    package: 'DIP-28 / TQFP-32',
    description: 'The heart of Arduino Uno. 8-bit AVR microcontroller with 32KB Flash, 2KB SRAM, and rich peripheral set including ADC, SPI, I2C, and UART.',
    pinout: [
      { name: 'VCC', number: 7, type: 'power', description: 'Digital supply voltage (2.7-5.5V)' },
      { name: 'GND', number: 8, type: 'ground', description: 'Ground' },
      { name: 'PB5 (SCK)', number: 13, type: 'bidirectional', description: 'SPI clock / Built-in LED' },
      { name: 'PD0 (RXD)', number: 2, type: 'input', description: 'UART receive' },
      { name: 'PD1 (TXD)', number: 3, type: 'output', description: 'UART transmit' },
      { name: 'PC0 (ADC0)', number: 23, type: 'analog', description: 'ADC channel 0' },
      { name: 'PC4 (SDA)', number: 27, type: 'bidirectional', description: 'I2C data' },
      { name: 'PC5 (SCL)', number: 28, type: 'bidirectional', description: 'I2C clock' },
    ],
    specifications: [
      { label: 'Architecture', value: '8-bit AVR' },
      { label: 'Clock Speed', value: '16', unit: 'MHz' },
      { label: 'Flash', value: '32', unit: 'KB' },
      { label: 'SRAM', value: '2', unit: 'KB' },
      { label: 'EEPROM', value: '1', unit: 'KB' },
      { label: 'ADC Channels', value: '8' },
      { label: 'ADC Resolution', value: '10', unit: 'bits' },
      { label: 'Operating Voltage', value: '1.8-5.5', unit: 'V' },
    ],
    applications: ['Arduino Uno/Nano', 'Basic IoT sensors', 'Robotics', 'Educational projects'],
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega328P-Complete.pdf',
    commonMistakes: [
      'Forgetting that analogRead() returns 0-1023, not 0-5V',
      'Not using external reference voltage for accurate ADC',
      'Exceeding 40mA per GPIO pin',
    ],
    sampleCircuit: `// ATmega328P ADC Reading Circuit
// A0 ← Potentiometer (10kΩ)
// A0 ──── VCC (5V)
// GND ──── Potentiometer middle pin
//
// Code:
// int val = analogRead(A0);  // 0-1023
// float voltage = val * 5.0 / 1023.0;`,
  },
  {
    id: 'stm32f103',
    name: 'STM32F103C8T6',
    category: 'Microcontrollers',
    package: 'LQFP-48',
    description: 'The "Blue Pill" MCU. ARM Cortex-M3 at 72MHz with 64KB Flash and 20KB SRAM. Popular for hobbyist and professional embedded projects.',
    pinout: [
      { name: 'VDD', number: 24, type: 'power', description: '3.3V supply' },
      { name: 'VSS', number: 23, type: 'ground', description: 'Ground' },
      { name: 'PA0', number: 10, type: 'analog', description: 'ADC1_IN0 / GPIO' },
      { name: 'PA9 (TX)', number: 21, type: 'output', description: 'USART1_TX' },
      { name: 'PA10 (RX)', number: 22, type: 'input', description: 'USART1_RX' },
      { name: 'PB6 (SCL)', number: 27, type: 'bidirectional', description: 'I2C1_SCL' },
      { name: 'PB7 (SDA)', number: 28, type: 'bidirectional', description: 'I2C1_SDA' },
      { name: 'PA13 (SWDIO)', number: 34, type: 'bidirectional', description: 'SWD debug' },
    ],
    specifications: [
      { label: 'Architecture', value: 'ARM Cortex-M3' },
      { label: 'Clock Speed', value: '72', unit: 'MHz' },
      { label: 'Flash', value: '64', unit: 'KB' },
      { label: 'SRAM', value: '20', unit: 'KB' },
      { label: 'ADC Channels', value: '10' },
      { label: 'ADC Resolution', value: '12', unit: 'bits' },
      { label: 'Operating Voltage', value: '2.0-3.6', unit: 'V' },
    ],
    applications: ['Blue Pill projects', 'Motor control', 'Industrial automation', 'USB devices'],
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',
    commonMistakes: [
      'Supplying 5V to 3.3V-only pins',
      'Not enabling SWD debug interface before locking the chip',
      'Forgetting pull-up resistors on I2C bus',
    ],
    sampleCircuit: `// STM32F103 I2C OLED Display
// PB6 (SCL) ──── OLED SCL (with 4.7kΩ pull-up to 3.3V)
// PB7 (SDA) ──── OLED SDA (with 4.7kΩ pull-up to 3.3V)
// 3.3V ──── OLED VCC
// GND ──── OLED GND`,
  },
  {
    id: 'lm358',
    name: 'LM358',
    category: 'Op-Amps',
    package: 'DIP-8 / SOIC-8',
    description: 'Dual general-purpose op-amp. Works on single supply (3-32V). Ubiquitous in analog signal conditioning, active filters, and sensor interfaces.',
    pinout: [
      { name: 'OUT1', number: 1, type: 'output', description: 'Output of op-amp 1' },
      { name: 'IN1-', number: 2, type: 'input', description: 'Inverting input of op-amp 1' },
      { name: 'IN1+', number: 3, type: 'input', description: 'Non-inverting input of op-amp 1' },
      { name: 'GND', number: 4, type: 'ground', description: 'Ground / VEE' },
      { name: 'IN2+', number: 5, type: 'input', description: 'Non-inverting input of op-amp 2' },
      { name: 'IN2-', number: 6, type: 'input', description: 'Inverting input of op-amp 2' },
      { name: 'OUT2', number: 7, type: 'output', description: 'Output of op-amp 2' },
      { name: 'VCC', number: 8, type: 'power', description: 'Positive supply (3-32V)' },
    ],
    specifications: [
      { label: 'Supply Voltage', value: '3-32', unit: 'V' },
      { label: 'Input Offset', value: '2', unit: 'mV' },
      { label: 'GBW', value: '1', unit: 'MHz' },
      { label: 'Slew Rate', value: '0.3', unit: 'V/μs' },
      { label: 'Input Bias Current', value: '45', unit: 'nA' },
      { label: 'Output Current', value: '30', unit: 'mA' },
    ],
    applications: ['Signal conditioning', 'Active filters', 'Comparator circuits', 'Sensor amplifiers'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',
    commonMistakes: [
      'Not accounting for output voltage swing (doesn\'t rail-to-rail)',
      'Exceeding common-mode input range (VCC-1.5V)',
      'Using without bypass capacitors (causes oscillation)',
    ],
    sampleCircuit: `// Non-Inverting Amplifier (Gain = 1 + R2/R1)
// Vout = Vin × (1 + R2/R1)
//
// For gain of 10:
// R1 = 1kΩ (IN1- to GND)
// R2 = 9kΩ (IN1- to OUT1)
// Vin → IN1+
// OUT1 → Load`,
  },
  {
    id: 'mpu6050',
    name: 'MPU6050',
    category: 'Sensors',
    package: 'QFN-24',
    description: '6-axis IMU combining a 3-axis gyroscope and 3-axis accelerometer with DMP (Digital Motion Processor). Industry standard for motion sensing.',
    pinout: [
      { name: 'VCC', number: 8, type: 'power', description: '3.3V or 5V supply' },
      { name: 'GND', number: 1, type: 'ground', description: 'Ground' },
      { name: 'SDA', number: 6, type: 'bidirectional', description: 'I2C data (400kHz max)' },
      { name: 'SCL', number: 7, type: 'input', description: 'I2C clock' },
      { name: 'INT', number: 12, type: 'output', description: 'Interrupt output (active high)' },
      { name: 'AD0', number: 9, type: 'input', description: 'I2C address LSB (0x68 or 0x69)' },
    ],
    specifications: [
      { label: 'Accelerometer Range', value: '±2/4/8/16', unit: 'g' },
      { label: 'Gyroscope Range', value: '±250/500/1000/2000', unit: '°/s' },
      { label: 'ADC Resolution', value: '16', unit: 'bits' },
      { label: 'I2C Address', value: '0x68 / 0x69' },
      { label: 'Sample Rate', value: '1-8000', unit: 'Hz' },
      { label: 'Operating Voltage', value: '2.375-3.46', unit: 'V' },
    ],
    applications: ['Drone stabilization', 'Motion tracking', 'Robotics', 'Gesture recognition'],
    datasheetUrl: 'https://invensense.tdk.com/wp-content/uploads/2015/10/MPU-6050-RegisterMap1.pdf',
    commonMistakes: [
      'Connecting 5V directly (needs 3.3V logic level shifter)',
      'Forgetting pull-up resistors on I2C (4.7kΩ recommended)',
      'Not waiting 100ms after power-up before first I2C communication',
    ],
    sampleCircuit: `// MPU6050 I2C Wiring
// MPU6050 VCC → 3.3V
// MPU6050 GND → GND
// MPU6050 SDA → MCU SDA (with 4.7kΩ pull-up to 3.3V)
// MPU6050 SCL → MCU SCL (with 4.7kΩ pull-up to 3.3V)
// MPU6050 AD0 → GND (address = 0x68)`,
  },
  {
    id: 'esp8266',
    name: 'ESP8266',
    category: 'Communication ICs',
    package: 'Various (ESP-01, ESP-12E, Module)',
    description: 'Wi-Fi SoC by Espressif. Single-core 80/160MHz, 80KB SRAM, built-in Wi-Fi. The chip that launched the IoT revolution.',
    pinout: [
      { name: 'VCC', number: 1, type: 'power', description: '3.3V supply (NOT 5V tolerant)' },
      { name: 'GND', number: 2, type: 'ground', description: 'Ground' },
      { name: 'GPIO0', number: 3, type: 'bidirectional', description: 'GPIO / Boot mode select' },
      { name: 'GPIO2', number: 4, type: 'bidirectional', description: 'GPIO / Must be high at boot' },
      { name: 'RX', number: 5, type: 'input', description: 'UART receive' },
      { name: 'TX', number: 6, type: 'output', description: 'UART transmit' },
      { name: 'CH_PD', number: 7, type: 'input', description: 'Chip enable (pull HIGH)' },
      { name: 'RST', number: 8, type: 'input', description: 'Reset (active low)' },
    ],
    specifications: [
      { label: 'Processor', value: '80/160', unit: 'MHz Tensilica' },
      { label: 'SRAM', value: '80', unit: 'KB' },
      { label: 'Wi-Fi', value: '802.11 b/g/n 2.4GHz' },
      { label: 'Max TX Power', value: '+20', unit: 'dBm' },
      { label: 'Operating Voltage', value: '3.0-3.6', unit: 'V' },
      { label: 'Deep Sleep', value: '20', unit: 'μA' },
    ],
    applications: ['IoT sensors', 'Smart home', 'Weather stations', 'Remote monitoring'],
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp8266-technical_reference_en.pdf',
    commonMistakes: [
      'Connecting 5V directly — ESP8266 is NOT 5V tolerant',
      'Not providing enough current from the power supply (needs 300mA peak)',
      'Forgetting to pull CH_PD high',
      'GPIO0 must be HIGH for normal boot, LOW for flash mode',
    ],
    sampleCircuit: `// ESP8266 Basic Circuit
// VCC → 3.3V (dedicated supply, not from Arduino)
// GND → GND
// CH_PD → 3.3V (via 10kΩ pull-up)
// RST → 3.3V (via 10kΩ pull-up)
// GPIO0 → 3.3V (via 10kΩ pull-up) for normal boot
// TX → MCU RX (via voltage divider if MCU is 5V)`,
  },
];
