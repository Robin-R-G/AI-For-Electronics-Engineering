export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const edgeAiTinyMlQuestions: LessonQuestion[] = [
  {
    id: "edge-1",
    question: "Edge AI refers to running AI inference:",
    options: [
      "Only in centralized data centers",
      "Directly on local devices near the data source",
      "Exclusively on GPUs in the cloud",
      "Only during model training"
    ],
    correctAnswer: "Directly on local devices near the data source",
    explanation: "Edge AI performs inference on-device (sensors, MCUs, gateways), avoiding round-trips to the cloud for low-latency, private, and bandwidth-efficient operation."
  },
  {
    id: "edge-2",
    question: "A primary motivation for edge AI over cloud inference is:",
    options: [
      "Higher model training cost",
      "Reduced latency and improved privacy by keeping data local",
      "Needing larger models",
      "Requiring constant internet connectivity"
    ],
    correctAnswer: "Reduced latency and improved privacy by keeping data local",
    explanation: "Processing locally cuts network round-trip delay and keeps sensitive sensor data on the device rather than uploading it."
  },
  {
    id: "edge-3",
    question: "TinyML is best described as:",
    options: [
      "Training large models on supercomputers",
      "Running ML models on resource-constrained microcontrollers, often under 1MB",
      "A cloud-based inference service",
      "A type of quantum computer"
    ],
    correctAnswer: "Running ML models on resource-constrained microcontrollers, often under 1MB",
    explanation: "TinyML brings inference to MCUs with kilobytes of RAM and flash, enabling always-on intelligence on battery-powered devices."
  },
  {
    id: "edge-4",
    question: "INT8 quantization represents model weights and activations using:",
    options: [
      "32-bit floating point",
      "8-bit integers with a scale and zero-point",
      "64-bit doubles",
      "Uncompressed text"
    ],
    correctAnswer: "8-bit integers with a scale and zero-point",
    explanation: "INT8 maps floats to 8-bit integers via a scale/zero-point, roughly 4x smaller and faster than FP32 with minimal accuracy loss."
  },
  {
    id: "edge-5",
    question: "Compared to INT8, INT4 quantization:",
    options: [
      "Uses more memory per weight",
      "Further halves model size but typically loses more accuracy",
      "Is identical in size and accuracy",
      "Requires full 32-bit computation"
    ],
    correctAnswer: "Further halves model size but typically loses more accuracy",
    explanation: "INT4 packs two weights per byte, doubling compression versus INT8, but the coarser representation increases quantization error."
  },
  {
    id: "edge-6",
    question: "Mixed-precision quantization uses different bit-widths for:",
    options: [
      "Only the input layer",
      "Different layers or tensors based on sensitivity to accuracy",
      "Only the output layer",
      "The entire model uniformly"
    ],
    correctAnswer: "Different layers or tensors based on sensitivity to accuracy",
    explanation: "Sensitive layers keep higher precision (e.g., FP16) while robust ones use INT8/INT4, balancing size and accuracy."
  },
  {
    id: "edge-7",
    question: "Unstructured pruning removes:",
    options: [
      "Entire channels or filters",
      "Individual weights with near-zero magnitude, wherever they occur",
      "Whole neural network layers only",
      "All bias terms"
    ],
    correctAnswer: "Individual weights with near-zero magnitude, wherever they occur",
    explanation: "Unstructured pruning zeroes out insignificant weights arbitrarily; it saves compute only with sparse kernels and yields irregular sparsity."
  },
  {
    id: "edge-8",
    question: "Structured pruning removes:",
    options: [
      "Random single weights",
      "Whole channels, filters, or neurons, keeping hardware-friendly regular structure",
      "Only the input layer",
      "Bias terms exclusively"
    ],
    correctAnswer: "Whole channels, filters, or neurons, keeping hardware-friendly regular structure",
    explanation: "Structured pruning deletes entire filters/channels, producing dense smaller models that standard MCU libraries can run efficiently."
  },
  {
    id: "edge-9",
    question: "TensorFlow Lite Micro is designed to:",
    options: [
      "Train models on servers",
      "Run inference on microcontrollers with no OS dependency or dynamic allocation",
      "Replace Python entirely",
      "Only support cloud deployment"
    ],
    correctAnswer: "Run inference on microcontrollers with no OS dependency or dynamic allocation",
    explanation: "TFLM provides a bare-metal interpreter with a static memory arena, fitting ML into the tight RAM budgets of Cortex-M class MCUs."
  },
  {
    id: "edge-10",
    question: "In the Edge Impulse workflow, the typical sequence is:",
    options: [
      "Deploy → Collect → Train",
      "Collect data → Design features/impulse → Train → Deploy to device",
      "Train → Collect → Deploy",
      "Deploy → Train → Collect"
    ],
    correctAnswer: "Collect data → Design features/impulse → Train → Deploy to device",
    explanation: "Edge Impulse guides users from data acquisition through feature extraction, model training, and one-click firmware deployment."
  },
  {
    id: "edge-11",
    question: "For on-device keyword spotting, audio is commonly converted to features using:",
    options: [
      "Raw PCM samples only",
      "MFCCs (Mel-Frequency Cepstral Coefficients)",
      "JPEG compression",
      "Random projection"
    ],
    correctAnswer: "MFCCs (Mel-Frequency Cepstral Coefficients)",
    explanation: "MFCCs emulate human hearing by summarizing the spectral envelope into a compact feature vector suitable for tiny models."
  },
  {
    id: "edge-12",
    question: "Gesture recognition from a wearable typically uses:",
    options: [
      "Still images from a camera only",
      "Accelerometer/IMU time-series classified with small CNNs or RNNs",
      "Microphone audio only",
      "Ambient light sensors only"
    ],
    correctAnswer: "Accelerometer/IMU time-series classified with small CNNs or RNNs",
    explanation: "IMU tri-axis acceleration captured as a windowed signal is the standard input for TinyML gesture and activity classification."
  },
  {
    id: "edge-13",
    question: "MCU-based anomaly detection on sensor data often works by:",
    options: [
      "Comparing live signals to a learned normal pattern and flagging deviations",
      "Uploading everything to the cloud first",
      "Disabling the sensor when abnormal",
      "Training a new model every second"
    ],
    correctAnswer: "Comparing live signals to a learned normal pattern and flagging deviations",
    explanation: "Autoencoders or distance-based models learn 'normal' behavior; high reconstruction error or distance signals an anomaly on-device."
  },
  {
    id: "edge-14",
    question: "A typical Cortex-M MCU budget for TinyML might be:",
    options: [
      "Several GB of RAM and TB of flash",
      "Tens to hundreds of KB of RAM and up to ~1-2MB of flash",
      "Unlimited memory",
      "Only external SSD storage"
    ],
    correctAnswer: "Tens to hundreds of KB of RAM and up to ~1-2MB of flash",
    explanation: "MCUs like the STM32 or Arduino Nano 33 BLE Sense offer ~256KB RAM and ~1MB flash, forcing aggressive model compression."
  },
  {
    id: "edge-15",
    question: "CMSIS-NN is a library that:",
    options: [
      "Trains neural networks in the cloud",
      "Provides optimized ARM Cortex-M neural network kernels (conv, fully-connected, activation)",
      "Replaces the C compiler",
      "Only handles audio codecs"
    ],
    correctAnswer: "Provides optimized ARM Cortex-M neural network kernels (conv, fully-connected, activation)",
    explanation: "CMSIS-NN supplies hand-tuned int8 kernels leveraging SIMD/DSP instructions, dramatically speeding up inference on Cortex-M."
  },
  {
    id: "edge-16",
    question: "Running ML inference on an MCU versus the cloud typically:",
    options: [
      "Consumes more total energy per inference",
      "Consumes far less energy per inference and avoids network transmit cost",
      "Requires a continuous internet connection",
      "Is always less accurate"
    ],
    correctAnswer: "Consumes far less energy per inference and avoids network transmit cost",
    explanation: "Local inference skips the radios; transmitting data to the cloud often costs orders of magnitude more energy than the compute itself."
  },
  {
    id: "edge-17",
    question: "A realistic edge vs cloud latency comparison for a simple inference is roughly:",
    options: [
      "Cloud 10-200ms (network round-trip) vs edge <10ms local",
      "Both always under 1ms",
      "Cloud always faster than edge",
      "Edge always over 1 second"
    ],
    correctAnswer: "Cloud 10-200ms (network round-trip) vs edge <10ms local",
    explanation: "Network latency and queueing dominate cloud inference; on-device inference removes the round-trip, giving near-real-time response."
  },
  {
    id: "edge-18",
    question: "CMOS (Complementary Metal-Oxide-Semiconductor) technology is fundamental to edge AI chips because it:",
    options: [
      "Is used only for displays",
      "Enables low-power digital logic and dense integration of processors",
      "Requires high voltage to operate",
      "Cannot be scaled below 1 micron"
    ],
    correctAnswer: "Enables low-power digital logic and dense integration of processors",
    explanation: "CMOS logic consumes power mainly during switching, making it the basis for energy-efficient processors used in edge devices."
  },
  {
    id: "edge-19",
    question: "A FinFET is a transistor structure that:",
    options: [
      "Is planar and two-dimensional",
      "Uses a 3D fin-shaped channel to improve control and reduce leakage at small nodes",
      "Only works above 100nm",
      "Replaces all memory cells"
    ],
    correctAnswer: "Uses a 3D fin-shaped channel to improve control and reduce leakage at small nodes",
    explanation: "FinFET's wrapped gate controls the channel better than planar transistors, enabling lower leakage and higher performance at 22nm and below."
  },
  {
    id: "edge-20",
    question: "Process nodes such as 7nm or 5nm refer to:",
    options: [
      "The physical size of the entire chip",
      "A marketing label for transistor feature size and density, not a single measured dimension",
      "The number of CPU cores",
      "The flash memory capacity"
    ],
    correctAnswer: "A marketing label for transistor feature size and density, not a single measured dimension",
    explanation: "Node names approximate generational density/performance improvements; actual gate lengths differ and the term is largely nominal."
  },
  {
    id: "edge-21",
    question: "Moore's Law observes that:",
    options: [
      "Transistor counts double roughly every two years",
      "Clock speed doubles every month",
      "Power consumption is constant",
      "Chip area halves yearly"
    ],
    correctAnswer: "Transistor counts double roughly every two years",
    explanation: "Moore's observation of exponential density growth has historically delivered more compute per dollar, fueling edge AI capability."
  },
  {
    id: "edge-22",
    question: "An implication of slowing Moore's Law for edge AI is:",
    options: [
      "Software optimization no longer matters",
      "Greater reliance on specialized accelerators (NPUs, DSPs) and efficient algorithms",
      "Transistor counts will decrease",
      "Cloud becomes impossible"
    ],
    correctAnswer: "Greater reliance on specialized accelerators (NPUs, DSPs) and efficient algorithms",
    explanation: "As general scaling slows, efficiency gains come from domain-specific architectures and quantization/pruning rather than raw density."
  },
  {
    id: "edge-23",
    question: "FP16 (half-precision) is used in edge ML primarily to:",
    options: [
      "Increase memory and compute cost",
      "Halve memory versus FP32 with adequate range for many inference tasks",
      "Replace integer quantization entirely",
      "Train models from scratch only"
    ],
    correctAnswer: "Halve memory versus FP32 with adequate range for many inference tasks",
    explanation: "FP16 cuts storage and bandwidth in half and is supported by many NPUs, often with negligible accuracy impact for inference."
  },
  {
    id: "edge-24",
    question: "The main advantage of a neural network accelerator (NPU) on an edge SoC is:",
    options: [
      "It runs general-purpose code faster than a CPU",
      "It executes matrix multiply / conv operations with high energy efficiency",
      "It increases flash size",
      "It eliminates the need for RAM"
    ],
    correctAnswer: "It executes matrix multiply / conv operations with high energy efficiency",
    explanation: "NPUs are parallel MAC engines tailored to DNN workloads, delivering far better inferences-per-joule than a general CPU."
  },
  {
    id: "edge-25",
    question: "Knowledge distillation helps TinyML by:",
    options: [
      "Training a small 'student' model to mimic a large 'teacher' model's outputs",
      "Increasing model size",
      "Removing the need for data",
      "Running training on the MCU"
    ],
    correctAnswer: "Training a small 'student' model to mimic a large 'teacher' model's outputs",
    explanation: "Distillation transfers the teacher's learned behavior to a compact student, often achieving better accuracy than training small models directly."
  }
];
