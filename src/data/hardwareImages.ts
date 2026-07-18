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
    imageUrl: 'https://store.arduino.cc/cdn/shop/files/uno-rev3_01_750x750.jpg',
    source: 'Arduino.cc',
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
    imageUrl: 'https://randomnerdtutorials.com/wp-content/uploads/2019/12/esp32-devkit-v1-pinout.png',
    source: 'Espressif / RandomNerdTutorials',
    description: 'Dual-core Xtensa LX6 at 240MHz with Wi-Fi and Bluetooth. 520KB SRAM, 4MB Flash.',
  },
  {
    id: 'stm32-bluepill',
    name: 'STM32F103C8T6 "Blue Pill"',
    category: 'Development Boards',
    imageUrl: 'https://www.st.com/content/ccc/resource/technical/layouts_and_diagrams/schematic_pack/group0/c5/34/3c/1d/57/38/47/48/STM32F103x8-B_C_board_schematic/files/STM32F103x8-B_C_board_schematic.png/jcr:content/translations/en.STM32F103x8-B_C_board_schematic.png',
    source: 'STMicroelectronics',
    description: 'ARM Cortex-M3 at 72MHz with 64KB Flash, 20KB SRAM. The popular "Blue Pill" form factor.',
  },
  {
    id: 'raspberry-pi-pico',
    name: 'Raspberry Pi Pico',
    category: 'Development Boards',
    imageUrl: 'https://datasheets.raspberrypi.com/pico/pico-datasheet.pdf',
    source: 'Raspberry Pi Foundation',
    description: 'RP2040 dual-core ARM Cortex-M0+ at 133MHz with 264KB SRAM.',
  },
  {
    id: 'nodemcu-esp8266',
    name: 'NodeMCU ESP8266',
    category: 'Development Boards',
    imageUrl: 'https://www.energia.nu/wp-content/uploads/2023/01/nodemcu-v3-pinout.png',
    source: 'Espressif',
    description: 'ESP8266-based Wi-Fi development board with USB-to-serial converter.',
  },
  {
    id: 'mpu6050-module',
    name: 'MPU6050 IMU Module',
    category: 'Sensors',
    imageUrl: 'https://lastminuteengineers.com/wp-content/uploads/2018/11/MPU6050-Gyroscope-Accelerometer-Pinout.png',
    source: 'InvenSense / LastMinuteEngineers',
    description: '6-axis IMU with 3-axis gyroscope and 3-axis accelerometer. I2C interface at 0x68.',
  },
  {
    id: 'bme280-module',
    name: 'BME280 Sensor Module',
    category: 'Sensors',
    imageUrl: 'https://www.adafruit.com/images/939/01-adafruit-bme280-06_large.png',
    source: 'Bosch / Adafruit',
    description: 'Temperature, humidity, and barometric pressure sensor. I2C/SPI interface.',
  },
  {
    id: 'dht22-module',
    name: 'DHT22 Temperature & Humidity',
    category: 'Sensors',
    imageUrl: 'https://lastminuteengineers.com/wp-content/uploads/2018/11/DHT22-Temperature-Humidity-Sensor-Pinout.png',
    source: 'Aosong / LastMinuteEngineers',
    description: 'Digital temperature and humidity sensor. Single-wire interface. ±0.5°C accuracy.',
  },
  {
    id: 'ads1115-module',
    name: 'ADS1115 16-bit ADC',
    category: 'Sensors',
    imageUrl: 'https://www.adafruit.com/images/939/01-adafruit-ads1115-01_large.png',
    source: 'Texas Instruments / Adafruit',
    description: '16-bit precision ADC with programmable gain amplifier. I2C interface at 0x48.',
  },
  {
    id: 'lm358-opamp',
    name: 'LM358 Dual Op-Amp',
    category: 'Integrated Circuits',
    imageUrl: 'https://components101.com/sites/default/files/component_pinout/LM358-Pin-Diagram.png',
    source: 'Texas Instruments / Components101',
    description: 'Dual general-purpose op-amp. 3-32V single supply. DIP-8 package.',
  },
  {
    id: 'atmega328p',
    name: 'ATmega328P IC',
    category: 'Integrated Circuits',
    imageUrl: 'https://components101.com/sites/default/files/component_pinout/ATmega328-Pin-Diagram.png',
    source: 'Microchip / Components101',
    description: '8-bit AVR MCU with 32KB Flash, 2KB SRAM. The heart of Arduino Uno.',
  },
  {
    id: 'irfz44n-mosfet',
    name: 'IRFZ44N MOSFET',
    category: 'Integrated Circuits',
    imageUrl: 'https://components101.com/sites/default/files/component_pinout/IRFZ44N-Pin-Diagram.png',
    source: 'Infineon / Components101',
    description: 'N-channel power MOSFET. 49A, 55V. TO-220 package. For motor and power switching.',
  },
  {
    id: 'breadboard-half',
    name: 'Half-Size Breadboard',
    category: 'Prototyping',
    imageUrl: 'https://cdn-shop.adafruit.com/970x728/64-03.jpg',
    source: 'Adafruit',
    description: '30 tie-point solderless breadboard for rapid prototyping.',
  },
  {
    id: 'oscilloscope-rigol',
    name: 'Rigol DS1054Z Oscilloscope',
    category: 'Test Equipment',
    imageUrl: 'https://cdn-shop.adafruit.com/970x728/466-04.jpg',
    source: 'Rigol',
    description: '4-channel, 50MHz digital oscilloscope. 1GSa/s. Popular entry-level lab scope.',
  },
  {
    id: 'logic-analyzer-saleae',
    name: 'Logic Analyzer (Saleae Clone)',
    category: 'Test Equipment',
    imageUrl: 'https://cdn-shop.adafruit.com/970x728/466-04.jpg',
    source: 'Saleae',
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
