export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const sensorsIoTQuestions: LessonQuestion[] = [
  {
    id: "sensor-1",
    question: "What is the primary advantage of a digital temperature sensor (e.g., DS18B20) over an analog sensor (e.g., LM35)?",
    options: [
      "Higher accuracy without calibration",
      "Directly outputs a digital value, immune to noise over long wires",
      "Lower power consumption in all cases",
      "Faster sampling rate"
    ],
    correctAnswer: "Directly outputs a digital value, immune to noise over long wires",
    explanation: "Digital sensors transmit data as serial digital signals, which are more resistant to analog noise degradation over long cable runs compared to voltage-level analog outputs."
  },
  {
    id: "sensor-2",
    question: "An ADC has a 12-bit resolution and a reference voltage of 3.3V. What is the smallest detectable voltage change (LSB)?",
    options: [
      "0.806 mV",
      "1.612 mV",
      "3.225 mV",
      "0.403 mV"
    ],
    correctAnswer: "0.806 mV",
    explanation: "LSB = Vref / 2^n = 3.3V / 4096 ≈ 0.806 mV. The resolution is the reference voltage divided by the number of quantization levels."
  },
  {
    id: "sensor-3",
    question: "According to the Nyquist-Shannon sampling theorem, the minimum sampling frequency must be:",
    options: [
      "Equal to the highest frequency component of the signal",
      "At least twice the highest frequency component of the signal",
      "Half the highest frequency component of the signal",
      "Ten times the highest frequency component of the signal"
    ],
    correctAnswer: "At least twice the highest frequency component of the signal",
    explanation: "The Nyquist theorem states that to reconstruct a signal without aliasing, it must be sampled at a rate of at least 2× its maximum frequency component."
  },
  {
    id: "sensor-4",
    question: "In I2C communication, what is the role of the pull-up resistors on SDA and SCL lines?",
    options: [
      "They boost the signal voltage to 5V",
      "They pull the lines HIGH; the device only pulls LOW (open-drain)",
      "They protect against ESD damage",
      "They set the clock frequency"
    ],
    correctAnswer: "They pull the lines HIGH; the device only pulls LOW (open-drain)",
    explanation: "I2C uses open-drain outputs, so devices can only pull lines low. External pull-up resistors are required to return the lines to a HIGH state when idle."
  },
  {
    id: "sensor-5",
    question: "What is the maximum number of devices on a single I2C bus without an address extender, given 7-bit addressing?",
    options: [
      "32",
      "64",
      "128",
      "256"
    ],
    correctAnswer: "128",
    explanation: "With 7-bit addressing, there are 2^7 = 128 possible addresses. However, 16 addresses are reserved, leaving 112 usable addresses in practice."
  },
  {
    id: "sensor-6",
    question: "What is the key difference between SPI and I2C regarding duplex mode?",
    options: [
      "SPI is half-duplex, I2C is full-duplex",
      "SPI is full-duplex, I2C is half-duplex",
      "Both are full-duplex",
      "Both are half-duplex"
    ],
    correctAnswer: "SPI is full-duplex, I2C is half-duplex",
    explanation: "SPI uses separate MOSI and MISO lines, allowing simultaneous bidirectional data transfer. I2C uses a single shared SDA line, so communication is half-duplex."
  },
  {
    id: "sensor-7",
    question: "In SPI, what does the CS (Chip Select) line do?",
    options: [
      "Clocks the data transfer",
      "Selects the SPI clock mode",
      "Enables a specific slave device for communication",
      "Indicates the bus is busy"
    ],
    correctAnswer: "Enables a specific slave device for communication",
    explanation: "CS (active low) is driven low by the master to select a specific slave device. Each slave on the bus requires its own CS line from the master."
  },
  {
    id: "sensor-8",
    question: "What is baud rate in UART communication?",
    options: [
      "The number of data bits per second",
      "The number of signal transitions per second",
      "The clock frequency of the UART peripheral",
      "The buffer size of the UART FIFO"
    ],
    correctAnswer: "The number of signal transitions per second",
    explanation: "Baud rate is the symbol rate — the number of symbols (signal changes) transmitted per second. In simple UART (1 bit per symbol), it equals the bit rate."
  },
  {
    id: "sensor-9",
    question: "When should you choose UART over I2C or SPI?",
    options: [
      "When you need high-speed multi-device bus communication",
      "When you need simple point-to-point communication with no clock line",
      "When you need full-duplex communication with multiple slaves",
      "When you need hardware flow control for sensors"
    ],
    correctAnswer: "When you need simple point-to-point communication with no clock line",
    explanation: "UART is ideal for simple asynchronous point-to-point links (e.g., debug console, GPS module) where no shared clock or multi-device bus is needed."
  },
  {
    id: "sensor-10",
    question: "The DS18B20 temperature sensor uses which communication protocol?",
    options: [
      "I2C",
      "SPI",
      "1-Wire",
      "UART"
    ],
    correctAnswer: "1-Wire",
    explanation: "The DS18B20 uses the Dallas 1-Wire protocol, which requires only a single data line (plus ground) and supports parasitic power from the data line."
  },
  {
    id: "sensor-11",
    question: "What does sensor calibration with offset and gain adjustment correct?",
    options: [
      "Power supply noise",
      "Systematic measurement errors (bias and scale factor)",
      "Random noise in the ADC",
      "Clock drift in the microcontroller"
    ],
    correctAnswer: "Systematic measurement errors (bias and scale factor)",
    explanation: "Offset corrects constant bias (zero error), and gain corrects scale factor error. Together they linearize and align the sensor output to the true value."
  },
  {
    id: "sensor-12",
    question: "What is sensor fusion in the context of an IMU?",
    options: [
      "Using multiple sensors to increase power consumption",
      "Combining accelerometer, gyroscope, and magnetometer data to estimate orientation more accurately",
      "Connecting multiple IMUs in parallel",
      "Reducing the sampling rate of individual sensors"
    ],
    correctAnswer: "Combining accelerometer, gyroscope, and magnetometer data to estimate orientation more accurately",
    explanation: "Sensor fusion algorithms (e.g., Kalman filter, complementary filter) combine the strengths of multiple sensors to produce a more accurate and stable orientation estimate."
  },
  {
    id: "sensor-13",
    question: "What is the main purpose of a complementary filter in sensor fusion?",
    options: [
      "To replace the need for a gyroscope",
      "To combine the fast response of a gyroscope with the long-term stability of an accelerometer",
      "To convert analog signals to digital",
      "To synchronize multiple I2C devices"
    ],
    correctAnswer: "To combine the fast response of a gyroscope with the long-term stability of an accelerometer",
    explanation: "A complementary filter uses a high-pass on gyroscope data (fast but drifts) and low-pass on accelerometer data (noisy but stable), merging the best of both."
  },
  {
    id: "sensor-14",
    question: "In a typical IoT architecture, what sits between edge devices and the cloud?",
    options: [
      "A second microcontroller",
      "An IoT gateway",
      "A UART-to-USB converter",
      "A Wheatstone bridge"
    ],
    correctAnswer: "An IoT gateway",
    explanation: "The gateway aggregates data from multiple edge devices, performs protocol translation, and communicates with the cloud, often adding local processing and security."
  },
  {
    id: "sensor-15",
    question: "What is the core communication model of MQTT?",
    options: [
      "Client-server request-response",
      "Publish-subscribe via a broker",
      "Peer-to-peer broadcast",
      "Master-slave polling"
    ],
    correctAnswer: "Publish-subscribe via a broker",
    explanation: "MQTT uses a broker-based publish-subscribe model. Publishers send messages to topics, and subscribers receive messages on topics they subscribe to, decoupling sender and receiver."
  },
  {
    id: "sensor-16",
    question: "In MQTT, which QoS level guarantees exactly-once delivery?",
    options: [
      "QoS 0 (At most once)",
      "QoS 1 (At least once)",
      "QoS 2 (Exactly once)",
      "MQTT does not support exactly-once delivery"
    ],
    correctAnswer: "QoS 2 (Exactly once)",
    explanation: "QoS 2 uses a four-step handshake (PUBLISH → PUBREC → PUBREL → PUBCOMP) to ensure exactly-once delivery, at the cost of higher overhead."
  },
  {
    id: "sensor-17",
    question: "Why is MQTT generally preferred over HTTP/REST for constrained IoT devices?",
    options: [
      "MQTT supports richer data formats like JSON and XML",
      "MQTT has lower overhead with small packet sizes and persistent connections",
      "MQTT does not require a TCP connection",
      "MQTT is always more secure than HTTP"
    ],
    correctAnswer: "MQTT has lower overhead with small packet sizes and persistent connections",
    explanation: "MQTT's minimal header (2 bytes minimum) and persistent connections reduce bandwidth and power consumption compared to HTTP's request-response model with full headers."
  },
  {
    id: "sensor-18",
    question: "What is the primary advantage of CoAP over HTTP for IoT?",
    options: [
      "CoAP supports larger payloads",
      "CoAP runs over UDP, reducing overhead for constrained devices",
      "CoAP requires TLS by default",
      "CoAP uses JSON for all messages"
    ],
    correctAnswer: "CoAP runs over UDP, reducing overhead for constrained devices",
    explanation: "CoAP is designed for constrained devices and uses UDP with a lightweight RESTful model, avoiding the overhead of TCP and HTTP headers."
  },
  {
    id: "sensor-19",
    question: "What is the typical range of LoRa (sub-GHz) communication?",
    options: [
      "10–50 meters",
      "100–300 meters",
      "2–15 kilometers",
      "50–100 kilometers"
    ],
    correctAnswer: "2–15 kilometers",
    explanation: "LoRa uses spread spectrum modulation in sub-GHz bands (e.g., 868 MHz, 915 MHz) to achieve long-range communication (2–15 km in urban areas) at low power."
  },
  {
    id: "sensor-20",
    question: "What makes Bluetooth Low Energy (BLE) suitable for IoT wearables?",
    options: [
      "Higher data throughput than classic Bluetooth",
      "Low power consumption with short burst transmissions",
      "Longer range than Wi-Fi",
      "Support for large file transfers"
    ],
    correctAnswer: "Low power consumption with short burst transmissions",
    explanation: "BLE is designed for low duty-cycle applications, spending most time in sleep mode and waking briefly to transmit small packets, extending battery life to months or years."
  },
  {
    id: "sensor-21",
    question: "What is the main difference between Zigbee and Thread?",
    options: [
      "Zigbee uses mesh networking, Thread does not",
      "Thread is IP-based (IPv6/6LoWPAN), Zigbee uses a proprietary network layer",
      "Zigbee operates at 5 GHz, Thread at 2.4 GHz",
      "Thread has lower power consumption than Zigbee"
    ],
    correctAnswer: "Thread is IP-based (IPv6/6LoWPAN), Zigbee uses a proprietary network layer",
    explanation: "Thread uses open IP standards (6LoWPAN, IPv6) enabling direct cloud connectivity, while Zigbee uses its own network layer requiring a border router for IP connectivity."
  },
  {
    id: "sensor-22",
    question: "What does the Matter protocol aim to achieve for IoT?",
    options: [
      "Replace all existing wireless protocols",
      "Provide a unified, interoperable application-layer standard for smart home devices",
      "Define a new physical radio standard",
      "Standardize IoT power supply voltages"
    ],
    correctAnswer: "Provide a unified, interoperable application-layer standard for smart home devices",
    explanation: "Matter is an application-layer protocol that ensures devices from different ecosystems (Apple, Google, Amazon) can work together over existing networks like Wi-Fi and Thread."
  },
  {
    id: "sensor-23",
    question: "What is the main benefit of edge computing in IoT?",
    options: [
      "It eliminates the need for cloud storage",
      "It processes data locally, reducing latency and cloud bandwidth usage",
      "It always reduces hardware cost",
      "It eliminates the need for firmware updates"
    ],
    correctAnswer: "It processes data locally, reducing latency and cloud bandwidth usage",
    explanation: "Edge computing moves computation closer to data sources, enabling real-time decisions, filtering noise before cloud upload, and reducing bandwidth costs."
  },
  {
    id: "sensor-24",
    question: "What is the purpose of TLS in IoT communication?",
    options: [
      "To increase data transfer speed",
      "To provide encryption and authentication for secure data transmission",
      "To compress data packets",
      "To manage device power consumption"
    ],
    correctAnswer: "To provide encryption and authentication for secure data transmission",
    explanation: "TLS encrypts data in transit and authenticates server identity, preventing eavesdropping and man-in-the-middle attacks in IoT communications."
  },
  {
    id: "sensor-25",
    question: "Why is a pressure sensor often paired with a temperature sensor in industrial IoT?",
    options: [
      "Pressure sensors cannot measure absolute values alone",
      "Temperature affects pressure readings, so compensation improves accuracy",
      "They share the same I2C address",
      "Both require the same sampling rate"
    ],
    correctAnswer: "Temperature affects pressure readings, so compensation improves accuracy",
    explanation: "Piezoresistive pressure sensors have temperature-dependent drift. Combining temperature data allows software compensation, significantly improving measurement accuracy."
  }
];
