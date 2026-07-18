export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const protocolsQuestions: LessonQuestion[] = [
  {
    id: "protocol-1",
    question: "What is the key feature of CAN bus arbitration?",
    options: [
      "A master node controls all bus access",
      "Non-destructive bitwise arbitration based on message ID priority",
      "Time-division multiplexing across all nodes",
      "Token passing between nodes"
    ],
    correctAnswer: "Non-destructive bitwise arbitration based on message ID priority",
    explanation: "CAN uses wired-AND arbitration: lower ID values have higher priority. When multiple nodes transmit, the one with the lowest ID wins without losing or corrupting its message."
  },
  {
    id: "protocol-2",
    question: "Why is CAN bus preferred over I2C in automotive and industrial environments?",
    options: [
      "CAN uses fewer wires than I2C",
      "CAN supports differential signaling and high noise immunity over long distances",
      "CAN has a simpler protocol stack",
      "CAN operates at higher clock frequencies"
    ],
    correctAnswer: "CAN supports differential signaling and high noise immunity over long distances",
    explanation: "CAN uses differential signaling on twisted-pair wire, providing excellent noise immunity. It also supports multi-master, error detection, and distances up to 1 km at lower bitrates."
  },
  {
    id: "protocol-3",
    question: "What is the main difference between RS-232 and RS-485?",
    options: [
      "RS-232 is faster than RS-485",
      "RS-232 uses single-ended signaling; RS-485 uses differential signaling",
      "RS-485 can only connect two devices",
      "RS-232 supports multi-drop, RS-485 does not"
    ],
    correctAnswer: "RS-232 uses single-ended signaling; RS-485 uses differential signaling",
    explanation: "RS-232 uses single-ended voltage levels (±3–15V) and is limited to short distances (~15m). RS-485 uses differential signaling, supporting multi-drop (up to 32 nodes) and distances up to 1200m."
  },
  {
    id: "protocol-4",
    question: "In Modbus RTU, how is a transaction identified?",
    options: [
      "By the IP address of the slave",
      "By the function code and slave address in the frame",
      "By the TCP port number",
      "By a unique session token"
    ],
    correctAnswer: "By the function code and slave address in the frame",
    explanation: "Modbus RTU frames contain a slave address (1–247) and a function code (e.g., 0x03 = read holding registers) followed by data and a CRC for error checking."
  },
  {
    id: "protocol-5",
    question: "What does CPOL=1, CPHA=1 correspond to in SPI clock modes?",
    options: [
      "SPI Mode 0",
      "SPI Mode 1",
      "SPI Mode 2",
      "SPI Mode 3"
    ],
    correctAnswer: "SPI Mode 3",
    explanation: "SPI modes are defined by CPOL (clock polarity) and CPHA (clock phase). Mode 0 = CPOL0/CPHA0, Mode 1 = CPOL0/CPHA1, Mode 2 = CPOL1/CPHA0, Mode 3 = CPOL1/CPHA1."
  },
  {
    id: "protocol-6",
    question: "What is the purpose of a repeated start condition in I2C?",
    options: [
      "To reset the I2C bus",
      "To switch between write and read without releasing the bus",
      "To increase the clock speed",
      "To address multiple slaves simultaneously"
    ],
    correctAnswer: "To switch between write and read without releasing the bus",
    explanation: "A repeated start (Sr) allows the master to change the data direction (write→read) without issuing a stop, preventing another master from taking over the bus mid-transaction."
  },
  {
    id: "protocol-7",
    question: "What is the difference between hardware flow control (RTS/CTS) and software flow control (XON/XOFF) in UART?",
    options: [
      "Hardware uses extra wires, software uses in-band control characters",
      "Software flow control is more reliable at high baud rates",
      "Hardware flow control requires both devices to support XON/XOFF",
      "Software flow control uses differential signaling"
    ],
    correctAnswer: "Hardware uses extra wires, software uses in-band control characters",
    explanation: "RTS/CTS uses dedicated wires to signal readiness. XON/XOFF sends special bytes (0x11/0x13) within the data stream, which can be problematic if those byte values appear in binary data."
  },
  {
    id: "protocol-8",
    question: "Which protocol has the lowest per-message overhead for small data transfers?",
    options: [
      "HTTP/REST",
      "MQTT",
      "CoAP",
      "SOAP"
    ],
    correctAnswer: "CoAP",
    explanation: "CoAP has a minimal 4-byte header and uses UDP, avoiding TCP handshake overhead. MQTT has a 2-byte header but requires a TCP connection. CoAP is designed for the most constrained devices."
  },
  {
    id: "protocol-9",
    question: "What is impedance matching in signal integrity?",
    options: [
      "Matching the voltage levels of driver and receiver",
      "Matching source, trace, and load impedance to minimize reflections",
      "Equalizing the rise and fall times of a signal",
      "Matching the clock frequency of transmitter and receiver"
    ],
    correctAnswer: "Matching source, trace, and load impedance to minimize reflections",
    explanation: "When impedance is mismatched at boundaries, signal energy reflects back, causing ringing and data errors. Proper termination (series or parallel) absorbs reflected energy."
  },
  {
    id: "protocol-10",
    question: "What causes crosstalk in PCB traces?",
    options: [
      "Power supply voltage drops",
      "Electromagnetic coupling between adjacent signal traces",
      "Excessive trace length",
      "Incorrect via placement"
    ],
    correctAnswer: "Electromagnetic coupling between adjacent signal traces",
    explanation: "Crosstalk is caused by capacitive (electric field) and inductive (magnetic field) coupling between adjacent traces. Increasing spacing or adding ground traces between signals reduces it."
  },
  {
    id: "protocol-11",
    question: "What is the main advantage of differential signaling for noise immunity?",
    options: [
      "It uses less power than single-ended signaling",
      "Common-mode noise is rejected since the receiver measures the voltage difference",
      "It requires fewer wires",
      "It operates at higher frequencies"
    ],
    correctAnswer: "Common-mode noise is rejected since the receiver measures the voltage difference",
    explanation: "Noise that affects both wires equally (common-mode) is rejected by the differential receiver, which only responds to the voltage difference between the two lines."
  },
  {
    id: "protocol-12",
    question: "Which wireless protocol has the longest range but the lowest data rate?",
    options: [
      "Wi-Fi (802.11ac)",
      "Bluetooth Low Energy (BLE)",
      "Zigbee",
      "LoRa"
    ],
    correctAnswer: "LoRa",
    explanation: "LoRa achieves multi-kilometer range using spread spectrum modulation at the cost of very low data rates (0.3–50 kbps), ideal for battery-powered sensors sending small packets."
  },
  {
    id: "protocol-13",
    question: "What is the key difference between Wi-Fi 802.11n (2.4 GHz) and 802.11ac (5 GHz)?",
    options: [
      "802.11ac supports more encryption standards",
      "802.11ac offers higher throughput using wider channels and more spatial streams",
      "802.11n has a longer range than 802.11ac",
      "802.11ac uses mesh networking, 802.11n does not"
    ],
    correctAnswer: "802.11ac offers higher throughput using wider channels and more spatial streams",
    explanation: "802.11ac operates at 5 GHz with wider channel bandwidths (up to 160 MHz) and up to 8 spatial streams, enabling gigabit throughput compared to 802.11n's ~600 Mbps max."
  },
  {
    id: "protocol-14",
    question: "What is the primary purpose of PTP (IEEE 1588) over NTP?",
    options: [
      "PTP is simpler to implement",
      "PTP achieves sub-microsecond time synchronization using hardware timestamping",
      "PTP works over wider area networks",
      "PTP uses less network bandwidth"
    ],
    correctAnswer: "PTP achieves sub-microsecond time synchronization using hardware timestamping",
    explanation: "PTP uses hardware-assisted timestamping at the PHY layer and boundary clocks, achieving sub-microsecond accuracy, while NTP typically achieves millisecond accuracy over networks."
  },
  {
    id: "protocol-15",
    question: "In the TCP/IP model, which layer is responsible for MAC addressing?",
    options: [
      "Application layer",
      "Transport layer",
      "Internet layer",
      "Link layer"
    ],
    correctAnswer: "Link layer",
    explanation: "The link layer (Layer 2 in OSI, equivalent to network access in TCP/IP) handles MAC addressing, Ethernet framing, and physical media access."
  },
  {
    id: "protocol-16",
    question: "What is the role of the PHY layer in Ethernet?",
    options: [
      "It manages IP addressing and routing",
      "It handles physical signaling, encoding, and medium access",
      "It encrypts data for secure transmission",
      "It manages TCP connections"
    ],
    correctAnswer: "It handles physical signaling, encoding, and medium access",
    explanation: "The PHY (Physical Layer) converts digital data to electrical/optical signals, handles line coding (e.g., 4B/5B, PAM-5), and manages the electrical interface to the cable."
  },
  {
    id: "protocol-17",
    question: "What is the difference between a USB host and a USB device?",
    options: [
      "Host and device are interchangeable roles",
      "The host initiates transfers and provides power; the device responds",
      "The device initiates all communication",
      "Only devices can be bus-powered"
    ],
    correctAnswer: "The host initiates transfers and provides power; the device responds",
    explanation: "In USB, the host controller manages the bus, schedules transfers, and provides 5V power. Devices enumerate when connected and respond to host requests."
  },
  {
    id: "protocol-18",
    question: "What is the purpose of JTAG/SWD in embedded systems?",
    options: [
      "To provide high-speed data transfer to external memory",
      "To debug, program, and test microcontrollers via a standardized interface",
      "To implement CAN bus communication",
      "To replace the need for a UART bootloader"
    ],
    correctAnswer: "To debug, program, and test microcontrollers via a standardized interface",
    explanation: "JTAG/SWD provides on-chip debugging (breakpoints, register inspection), flash programming, and boundary scan testing, essential for embedded development."
  },
  {
    id: "protocol-19",
    question: "What is the main difference between a protocol analyzer and an oscilloscope?",
    options: [
      "A protocol analyzer shows voltage waveforms; an oscilloscope decodes protocols",
      "A protocol analyzer decodes and displays protocol-level transactions; an oscilloscope shows raw electrical waveforms",
      "Both are interchangeable",
      "An oscilloscope can only measure DC voltages"
    ],
    correctAnswer: "A protocol analyzer decodes and displays protocol-level transactions; an oscilloscope shows raw electrical waveforms",
    explanation: "Protocol analyzers (e.g., Saleae Logic, Bus Pirate) decode digital protocols into readable packets and fields. Oscilloscopes display analog waveforms for signal integrity analysis."
  },
  {
    id: "protocol-20",
    question: "Which bus topology allows a single cable failure to take down the entire network?",
    options: [
      "Star topology",
      "Bus topology",
      "Ring topology",
      "Mesh topology"
    ],
    correctAnswer: "Bus topology",
    explanation: "In a bus topology, all devices share a single backbone cable. A break anywhere on the cable divides the bus and can bring down the entire network segment."
  },
  {
    id: "protocol-21",
    question: "What is daisy-chain topology?",
    options: [
      "All devices connect to a central hub",
      "Each device connects to the next in sequence, forming a linear chain",
      "Each device connects to every other device",
      "Devices are connected randomly"
    ],
    correctAnswer: "Each device connects to the next in sequence, forming a linear chain",
    explanation: "In daisy-chain topology, data passes through each device in sequence. Common in RS-485 and some industrial networks, but a single device failure can break the chain."
  },
  {
    id: "protocol-22",
    question: "What is the key advantage of star topology over bus topology?",
    options: [
      "Lower cable cost",
      "Easier to troubleshoot and isolate faults to individual devices",
      "Higher data throughput",
      "No central point of failure"
    ],
    correctAnswer: "Easier to troubleshoot and isolate faults to individual devices",
    explanation: "In star topology, each device has a dedicated link to a central switch/hub. A failure in one link only affects that device, making fault isolation straightforward."
  },
  {
    id: "protocol-23",
    question: "What is the purpose of a CRC in CAN bus frames?",
    options: [
      "To identify the sender node",
      "To detect bit errors in the transmitted data",
      "To determine the message priority",
      "To manage bus arbitration"
    ],
    correctAnswer: "To detect bit errors in the transmitted data",
    explanation: "CRC (Cyclic Redundancy Check) in CAN is a 15-bit checksum computed over the frame data. The receiver recalculates CRC and flags an error if it doesn't match."
  },
  {
    id: "protocol-24",
    question: "What is the main difference between Modbus RTU and Modbus TCP?",
    options: [
      "Modbus RTU supports more function codes than Modbus TCP",
      "Modbus RTU uses serial (RS-232/485) with CRC; Modbus TCP uses Ethernet with MBAP header and no CRC",
      "Modbus TCP is slower than Modbus RTU",
      "Modbus RTU uses ASCII encoding, Modbus TCP uses binary"
    ],
    correctAnswer: "Modbus RTU uses serial (RS-232/485) with CRC; Modbus TCP uses Ethernet with MBAP header and no CRC",
    explanation: "Modbus RTU frames on serial lines include a CRC-16 for error detection. Modbus TCP encapsulates Modbus PDU in TCP packets with an MBAP header; TCP itself provides error checking."
  },
  {
    id: "protocol-25",
    question: "Why is termination required on a CAN bus?",
    options: [
      "To increase the bus voltage",
      "To prevent signal reflections on the bus at high bitrates",
      "To reduce power consumption",
      "To set the bus speed"
    ],
    correctAnswer: "To prevent signal reflections on the bus at high bitrates",
    explanation: "CAN bus uses a twisted-pair cable with characteristic impedance (typically 120Ω). Termination resistors at both ends absorb signal energy, preventing reflections that corrupt data."
  }
];
