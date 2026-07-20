// POLICY: Hardware images must be authentic photographs of the real board/part.
// Never substitute an AI-generated image for a real board.
// AI-generated graphics are allowed only for: backgrounds, icons, illustrations,
// infographics, architecture diagrams, and flowcharts.
// All `imageUrl` values below must point to a real product photo (manufacturer site
// or an authentic photo host such as Wikimedia Commons). Verify links stay alive.

export interface HardwareImage {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  source: string;
  description: string;
}

// URLs sourced from official manufacturer websites and open-source hardware repositories
export const hardwareImages: HardwareImage[] = [
  {
    id: 'arduino-uno',
    name: 'Arduino Uno R3',
    category: 'Development Boards',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
    source: 'Wikimedia Commons (Arduino Uno R3)',
    description: 'ATmega328P-based development board with 14 digital I/O, 6 analog inputs, USB connectivity.',
  },
  {
    id: 'arduino-nano-33-ble',
    name: 'Arduino Nano 33 BLE Sense',
    category: 'Development Boards',
    imageUrl: 'https://store.arduino.cc/cdn/shop/files/nano33ble_01_750x750.jpg',
    source: 'Arduino.cc',
    description: 'nRF52840-based board with built-in IMU, microphone, temperature, humidity, and barometric sensors.',
  },
  {
    id: 'esp32-devkit',
    name: 'ESP32 DevKit V1',
    category: 'Development Boards',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/RISC-V_ESP32-C6-WROOM-1.devboard.jpg',
    source: 'Wikimedia Commons (ESP32 dev board)',
    description: 'Dual-core Xtensa LX6 at 240MHz with Wi-Fi and Bluetooth. 520KB SRAM, 4MB Flash.',
  },
  {
    id: 'stm32-bluepill',
    name: 'STM32F103C8T6 "Blue Pill"',
    category: 'Development Boards',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Core_Learning_Board_module_Arduino_STM32_F103_C8T6.jpg',
    source: 'Wikimedia Commons (STM32F103C8T6 Blue Pill)',
    description: 'ARM Cortex-M3 at 72MHz with 64KB Flash, 20KB SRAM. The popular "Blue Pill" form factor.',
  },
  {
    id: 'raspberry-pi-pico',
    name: 'Raspberry Pi Pico',
    category: 'Development Boards',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Raspberry_Pi_Pico.jpg',
    source: 'Wikimedia Commons (Raspberry Pi Pico)',
    description: 'RP2040 dual-core ARM Cortex-M0+ at 133MHz with 264KB SRAM.',
  },
  {
    id: 'nodemcu-esp8266',
    name: 'NodeMCU ESP8266',
    category: 'Development Boards',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/NodeMCU_DEVKIT_1.0.jpg',
    source: 'Wikimedia Commons (NodeMCU DevKit)',
    description: 'ESP8266-based Wi-Fi development board with USB-to-serial converter.',
  },
  {
    id: 'mpu6050-module',
    name: 'MPU6050 IMU Module',
    category: 'Sensors',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Invensense-MPU6050-HD.jpg',
    source: 'Wikimedia Commons (InvenSense MPU-6050)',
    description: '6-axis IMU with 3-axis gyroscope and 3-axis accelerometer. I2C interface at 0x68.',
  },
  {
    id: 'bme280-module',
    name: 'BME280 Sensor Module',
    category: 'Sensors',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/BME280.jpg',
    source: 'Wikimedia Commons (BME280)',
    description: 'Temperature, humidity, and barometric pressure sensor. I2C/SPI interface.',
  },
  {
    id: 'dht22-module',
    name: 'DHT22 Temperature & Humidity',
    category: 'Sensors',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/AM2302_%28DHT22%29_digital_temperature_and_humidity_sensor_module.jpg',
    source: 'Wikimedia Commons (DHT22 / AM2302)',
    description: 'Digital temperature and humidity sensor. Single-wire interface. ±0.5°C accuracy.',
  },
  {
    id: 'ads1115-module',
    name: 'ADS1115 16-bit ADC',
    category: 'Sensors',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/16bit_ADC_Card.jpg',
    source: 'Wikimedia Commons (16-bit ADC module)',
    description: '16-bit precision ADC with programmable gain amplifier. I2C interface at 0x48.',
  },
  {
    id: 'lm358-opamp',
    name: 'LM358 Dual Op-Amp',
    category: 'Integrated Circuits',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/LM358N.jpg',
    source: 'Wikimedia Commons (LM358)',
    description: 'Dual general-purpose op-amp. 3-32V single supply. DIP-8 package.',
  },
  {
    id: 'atmega328p',
    name: 'ATmega328P IC',
    category: 'Integrated Circuits',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/ATMEGA328P-PU.jpg',
    source: 'Wikimedia Commons (ATmega328P)',
    description: '8-bit AVR MCU with 32KB Flash, 2KB SRAM. The heart of Arduino Uno.',
  },
  {
    id: 'irfz44n-mosfet',
    name: 'IRFZ44N MOSFET',
    category: 'Integrated Circuits',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/IRFZ44N_N-Channel_power_MOSFET_transistor_%284%29.jpg',
    source: 'Wikimedia Commons (IRFZ44N)',
    description: 'N-channel power MOSFET. 49A, 55V. TO-220 package. For motor and power switching.',
  },
  {
    id: 'breadboard-half',
    name: 'Half-Size Breadboard',
    category: 'Prototyping',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Breadboard.jpg',
    source: 'Wikimedia Commons (Breadboard)',
    description: '30 tie-point solderless breadboard for rapid prototyping.',
  },
  {
    id: 'oscilloscope-rigol',
    name: 'Rigol DS1054Z Oscilloscope',
    category: 'Test Equipment',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/RIGOL_DS1054Z_Digital_Storage_Oscilloscope.jpg',
    source: 'Wikimedia Commons (RIGOL DS1054Z)',
    description: '4-channel, 50MHz digital oscilloscope. 1GSa/s. Popular entry-level lab scope.',
  },
  {
    id: 'logic-analyzer-saleae',
    name: 'Logic Analyzer (Saleae Clone)',
    category: 'Test Equipment',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/8_Channel_USB_logic_analyzer_%285172098012%29.jpg',
    source: 'Wikimedia Commons (8-channel USB logic analyzer)',
    description: '8/16-channel logic analyzer for SPI, I2C, UART, and custom protocol debugging.',
  },
];

export const hardwareCategories = [
  'All',
  'Development Boards',
  'Sensors',
  'Integrated Circuits',
  'Prototyping',
  'Test Equipment',
] as const;
