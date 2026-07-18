import React from 'react';
import Callout from '@/components/course/Callout';
import CodeBlock from '@/components/course/CodeBlock';
import InteractiveDiagram from '@/components/course/InteractiveDiagram';
import MiniQuiz from '@/components/course/MiniQuiz';
import KeyTakeaways from '@/components/course/KeyTakeaways';
import FlashCard from '@/components/course/FlashCard';
import ExpandableCard from '@/components/course/ExpandableCard';
import DebuggingMode from '@/components/course/DebuggingMode';
import HandsOnActivity from '@/components/course/HandsOnActivity';
import ThinkLikeAnEngineer from '@/components/course/ThinkLikeAnEngineer';
import DatasheetMode from '@/components/course/DatasheetMode';

const flashCards = [
  { front: 'What is edge inference?', back: 'Running a trained ML model directly on the microcontroller instead of sending data to a cloud server.' },
  { front: 'What is quantization?', back: 'Converting 32-bit floating-point model weights to 8-bit integers, reducing model size by 4x.' },
  { front: 'What is the purpose of a representative dataset during quantization?', back: 'It calibrates the dynamic range of activations so the int8 mapping is accurate.' },
  { front: 'What is DSP?', back: 'Digital Signal Processing — filtering, FFT, normalization applied to raw sensor data before feeding it to an ML model.' },
  { front: 'Why can\'t you flash a raw PyTorch model to an STM32?', back: 'PyTorch models use float32 weights that exceed the MCU\'s SRAM capacity. Quantization is required first.' },
];

const AIFundamentalsContent = () => {
  return (
    <>
      {/* ── Introduction ─────────────────────────────────── */}
      <p>
        Artificial Intelligence is rapidly shifting from massive cloud servers down to
        power-constrained edge devices. As an electronics engineer, understanding how
        machine learning models operate is no longer optional — it is a core competency.
      </p>

      {/* ── Learning Objectives ──────────────────────────── */}
      <Callout type="important" title="Learning Objectives">
        After this module, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain the difference between cloud and edge AI inference.
        <br /><strong>2.</strong> Describe why quantization is essential for MCU deployment.
        <br /><strong>3.</strong> Apply TensorFlow Lite quantization to convert a model to int8.
        <br /><strong>4.</strong> Identify memory constraints on common microcontrollers.
        <br /><strong>5.</strong> Trace the complete data pipeline from sensor to inference.
      </Callout>

      {/* ── Theory ───────────────────────────────────────── */}
      <h2>Cloud vs. Edge Inference</h2>
      <p>
        Historically, IoT devices acted purely as sensors, sending raw data to the cloud
        for AI inference. Today, we perform inference directly on the MCU (Microcontroller Unit).
      </p>

      <InteractiveDiagram
        title="Data Processing Pipelines"
        nodes={[
          { id: 'sensor', label: 'Sensor Array', description: 'Raw analog data is captured and converted via ADC.' },
          { id: 'dsp', label: 'DSP / Pre-processing', description: 'Data is filtered and normalized (e.g., FFT for audio) before hitting the model.' },
          { id: 'inference', label: 'NPU / MCU Inference', description: 'The quantized neural network runs a forward pass locally without internet.' },
          { id: 'actuation', label: 'Actuation', description: 'The system responds in milliseconds (e.g., triggering a motor or alert).' }
        ]}
      />

      <Callout type="example">
        Consider a smart factory vibration sensor. Instead of transmitting 100MB of raw accelerometer
        data per minute to a cloud server, the edge MCU runs an anomaly detection model and simply
        transmits a 1-byte alert when a bearing is failing.
      </Callout>

      {/* ── Advantages ───────────────────────────────────── */}
      <ExpandableCard title="Advantages of Edge Inference" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Sub-10ms latency</strong> — no network round-trip, critical for safety systems</li>
          <li><strong>99% bandwidth reduction</strong> — transmit 1-byte alerts instead of raw waveforms</li>
          <li><strong>Privacy preservation</strong> — biometric and industrial data stays on-device</li>
          <li><strong>Offline operation</strong> — works in dead zones, tunnels, remote sites</li>
          <li><strong>Reduced cloud costs</strong> — fewer API calls, less storage</li>
        </ul>
      </ExpandableCard>

      {/* ── Limitations ──────────────────────────────────── */}
      <ExpandableCard title="Limitations of Edge Inference" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Model size ceiling</strong> — typical MCU has 256KB–1MB SRAM vs. 16GB on a GPU server</li>
          <li><strong>No training on-device</strong> — inference only; training still requires a PC or cloud</li>
          <li><strong>Limited accuracy</strong> — quantized int8 models sacrifice ~1-3% accuracy vs. float32</li>
          <li><strong>Power budget</strong> — continuous inference draws more current than deep sleep</li>
          <li><strong>OTA complexity</strong> — updating deployed models requires careful versioning</li>
        </ul>
      </ExpandableCard>

      {/* ── Theory (continued) ───────────────────────────── */}
      <h2>Memory Constraints &amp; Quantization</h2>
      <p>
        A typical MCU might only have 256KB of SRAM. A standard neural network trained in TensorFlow
        uses 32-bit floating-point numbers, easily exceeding megabytes in size.
      </p>

      <Callout type="warning">
        You cannot just flash a raw PyTorch model to an STM32. It will result in an immediate out-of-memory exception.
      </Callout>

      <p>
        To solve this, we use <strong>Quantization</strong>. This converts 32-bit floats down to
        8-bit integers (int8), reducing the model size by 4x while barely affecting accuracy.
      </p>

      <CodeBlock
        filename="quantize.py"
        language="python"
        code={`import tensorflow as tf

# Load the trained 32-bit model
converter = tf.lite.TFLiteConverter.from_saved_model('my_model')

# Enable integer quantization
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Provide a representative dataset to calibrate ranges
def representative_dataset():
    for data in train_dataset.take(100):
        yield [tf.dtypes.cast(data, tf.float32)]

converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8

# Convert and save the model
tflite_quant_model = converter.convert()
with open('model_quant.tflite', 'wb') as f:
    f.write(tflite_quant_model)`}
      />

      {/* ── Common Mistakes ───────────────────────────────── */}
      <ExpandableCard title="Common Mistakes" icon="&#10005;" variant="warning">
        <ul>
          <li><strong>Skipping the representative dataset</strong> — without it, quantization ranges are wrong and accuracy drops significantly</li>
          <li><strong>Not checking SRAM usage before deployment</strong> — always profile with STM32CubeMX or MemoryFree</li>
          <li><strong>Using float32 on MCUs without FPU</strong> — software float emulation is 10-100x slower</li>
          <li><strong>Ignoring sensor noise</strong> — real sensors have drift, noise, and outliers that training data may not capture</li>
          <li><strong>Deploying before validating on PC</strong> — always confirm model accuracy on your laptop before touching hardware</li>
        </ul>
      </ExpandableCard>

      {/* ── Engineering Tips ──────────────────────────────── */}
      <ExpandableCard title="Engineering Tips" icon="&#9889;" variant="info">
        <ul>
          <li><strong>Profile early</strong> — use <code>arm-none-eabi-size</code> to check .text and .data sections</li>
          <li><strong>Use INT8 on Cortex-M4+</strong> — the SIMD instructions accelerate int8 multiplication by 4x</li>
          <li><strong>Batch your sensor reads</strong> — collect N samples in a buffer before running inference to amortize ADC overhead</li>
          <li><strong>Test with real hardware noise</strong> — bench power supplies are clean; real sensors are not</li>
          <li><strong>Start with Edge Impulse</strong> — it handles quantization, deployment, and OTA updates for you</li>
        </ul>
      </ExpandableCard>

      {/* ── Flash Cards ──────────────────────────────────── */}
      <FlashCard
        cards={flashCards}
        title="AI Fundamentals — Flash Cards"
      />

      {/* ── Debugging Mode ───────────────────────────────── */}
      <DebuggingMode
        title="Why Your Model Crashes on the MCU"
        language="c"
        brokenCode={`#include "model_data.h"

// Model data from TFLite conversion (float32)
const float model_weights[] = MODEL_DATA;  // 2.4MB — too large!

void setup() {
  Serial.begin(115200);
  // Crashes here: not enough SRAM
  TfLiteMicroInit(model_weights, sizeof(model_weights));
}`}
        fixedCode={`#include "model_data.h"

// Model data quantized to int8 (4x smaller)
const int8_t model_weights[] = MODEL_DATA_QUANT;  // 600KB — fits!

void setup() {
  Serial.begin(115200);
  // Uses int8 interpreter — fast on Cortex-M4
  TfLiteMicroInit(model_weights, sizeof(model_weights));
  Serial.println("Model loaded successfully");
}`}
        steps={[
          { label: 'Identify', explanation: 'The original model uses float32 weights (4 bytes per weight). A model with 600K parameters = 2.4MB. The STM32F4 has only 192KB SRAM. Immediate out-of-memory crash.' },
          { label: 'Quantize', explanation: 'Run TFLite quantization with a representative dataset. This converts float32 to int8 (1 byte per weight). 600K parameters = 600KB, which fits in SRAM.' },
          { label: 'Verify', explanation: 'After quantization, check accuracy on your test set. Typically you lose only 1-2% accuracy. Then flash to the MCU and verify serial output.' },
          { label: 'Profile', explanation: 'Use arm-none-eabi-size to confirm the binary fits in Flash and SRAM. Check .bss and .data sections in the linker map.' }
        ]}
        commonMistakes={[
          'Converting model without a representative dataset (causes accuracy collapse)',
          'Not checking MCU memory map — .data + .bss must fit in SRAM',
          'Using float32 on MCUs without hardware FPU (100x slower)',
          'Forgetting to set input/output types to int8 in the converter'
        ]}
      />

      {/* ── Practical Applications ────────────────────────── */}
      <h2>Practical Applications</h2>
      <ul>
        <li><strong>Predictive maintenance</strong> — vibration anomaly detection on industrial motors</li>
        <li><strong>Smart agriculture</strong> — soil moisture prediction from sensor fusion</li>
        <li><strong>Wearable health</strong> — heart rate variability analysis from PPG sensors</li>
        <li><strong>Industrial safety</strong> — gas leak detection with multi-sensor arrays</li>
        <li><strong>Consumer IoT</strong> — voice keyword detection on battery-powered devices</li>
      </ul>

      {/* ── Industry Applications ─────────────────────────── */}
      <h2>Industry Applications</h2>
      <ul>
        <li><strong>Automotive</strong> — tire pressure anomaly detection, engine fault prediction</li>
        <li><strong>Aerospace</strong> — structural health monitoring, drone obstacle avoidance</li>
        <li><strong>Medical devices</strong> — insulin pump automation, seizure detection</li>
        <li><strong>Energy</strong> — smart grid fault detection, solar panel degradation monitoring</li>
      </ul>

      {/* ── Datasheet Mode ────────────────────────────────── */}
      <DatasheetMode
        componentName="Arduino Nano 33 BLE Sense"
        packageType="Nano Form Factor"
        pins={[
          { name: '3.3V', number: 1, type: 'power', description: '3.3V regulated output' },
          { name: '5V', number: 2, type: 'power', description: '5V input/output' },
          { name: 'GND', number: 3, type: 'ground', description: 'Ground' },
          { name: 'A0-A7', number: 4, type: 'analog', description: '8-channel 10-bit ADC' },
          { name: 'D2-D13', number: 5, type: 'bidirectional', description: 'Digital I/O pins' },
          { name: 'SDA/SCL', number: 6, type: 'bidirectional', description: 'I2C communication' },
          { name: 'MO/M1', number: 7, type: 'bidirectional', description: 'SPI MOSI/MISO' },
          { name: 'SCK', number: 8, type: 'input', description: 'SPI clock' },
        ]}
        specifications={[
          { label: 'Processor', value: 'nRF52840', unit: 'ARM Cortex-M4F' },
          { label: 'Clock Speed', value: '64', unit: 'MHz' },
          { label: 'SRAM', value: '256', unit: 'KB' },
          { label: 'Flash', value: '1', unit: 'MB' },
          { label: 'ADC Resolution', value: '12', unit: 'bits' },
          { label: 'Operating Voltage', value: '1.7-3.6', unit: 'V' },
        ]}
        electricalRatings={[
          { label: 'Max GPIO Current', value: '15', unit: 'mA per pin' },
          { label: 'Total Package Power', value: '200', unit: 'mW' },
          { label: 'Deep Sleep Current', value: '1.5', unit: 'μA' },
          { label: 'Active Current (CPU)', value: '3.3', unit: 'mA' },
        ]}
        recommendedDesign={[
          'Always use 3.3V logic levels — 5V will damage the nRF52840',
          'Add 4.7kΩ pull-ups on I2C lines (SDA/SCL)',
          'Use the built-in IMU (LSM9DS1) for motion sensing projects',
          'Enable DC-DC converter for lower power consumption in battery projects',
        ]}
        commonMistakes={[
          'Connecting 5V sensors directly to GPIO pins',
          'Forgetting that the ADC reference is 3.3V, not 5V',
          'Not using pull-up resistors on I2C bus',
          'Ignoring the 15mA per-pin current limit',
        ]}
        interviewQuestions={[
          'What is the difference between the nRF52840 and nRF52832?',
          'How would you achieve sub-microamp sleep current on this board?',
          'Explain the difference between the 10-bit and 12-bit ADC modes.',
          'How does the built-in IMU communicate with the main processor?',
        ]}
      />

      {/* ── Hands-On Activity ────────────────────────────── */}
      <HandsOnActivity
        title="Deploy Your First Quantized Model"
        difficulty="Intermediate"
        estimatedTime="30 minutes"
        objectives={[
          'Train a simple TensorFlow model on sensor data',
          'Quantize it to int8 using TFLite',
          'Flash it to an Arduino Nano 33 BLE Sense',
          'Verify inference output via serial monitor'
        ]}
        materials={[
          'Arduino Nano 33 BLE Sense',
          'USB cable',
          'Python 3.10+ with TensorFlow installed',
          'Arduino IDE with TensorFlow Lite library',
          'A sensor dataset (accelerometer or temperature CSV)'
        ]}
        steps={[
          {
            instruction: 'Train a small neural network in Python on your sensor dataset.',
            codeSnippet: `import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(6,)),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(2, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_data, train_labels, epochs=20)`,
            expectedResult: 'Model achieves >90% accuracy on test set.'
          },
          {
            instruction: 'Convert to TFLite with int8 quantization.',
            codeSnippet: `converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
tflite_model = converter.convert()
open('model_quant.tflite', 'wb').write(tflite_model)`,
            expectedResult: 'model_quant.tflite file is created (should be <50KB).'
          },
          {
            instruction: 'Convert the .tflite file to a C header using xxd.',
            codeSnippet: `xxd -i model_quant.tflite > model_data.h`,
            expectedResult: 'model_data.h contains the model as a C byte array.'
          },
          {
            instruction: 'Flash the Arduino sketch that loads and runs the model.',
            expectedResult: 'Serial monitor shows prediction outputs for each sensor sample.'
          }
        ]}
        verification="The serial monitor displays class predictions (0 or 1) with confidence scores >0.85 for known patterns."
      />

      {/* ── Think Like an Engineer ────────────────────────── */}
      <ThinkLikeAnEngineer
        problem="Your team is building a smart thermostat that learns occupancy patterns. The initial prototype uses a cloud-based ML model, but the client demands a 90% reduction in cloud API costs. Design an edge-AI solution that maintains the same accuracy."
        context="Hardware: ESP32 with 520KB SRAM, 4MB Flash, Wi-Fi. Current cloud model: 2MB float32 ResNet-18 classifier. API calls: 1000/hour at $0.001/call."
        hints={[
          'Quantize the ResNet-18 to int8 — this alone gives 4x compression',
          'Consider knowledge distillation to create a smaller student model',
          'Batch inference locally and only wake Wi-Fi for periodic syncs',
          'Profile the actual inference time on ESP32 before claiming it works'
        ]}
        explanation="The solution: quantize the ResNet-18 to int8 (500KB, fits in 4MB Flash), run inference locally on the ESP32 at 10Hz, and only transmit occupancy summaries to the cloud every 5 minutes via MQTT. This reduces API calls from 1000/hr to 12/hr — a 99% reduction. The int8 model on ESP32's dual-core Xtensa achieves ~15ms inference time, well within the 100ms window. Cloud costs drop from $1/hr to $0.012/hr, saving $8,640/year per device."
        aiPrompt="Act as a Senior IoT Solutions Architect. I need to migrate a cloud-based ResNet-18 classifier (2MB float32) to run locally on an ESP32 (520KB SRAM, 4MB Flash). The model classifies occupancy patterns from PIR and temperature sensors at 10Hz. Design the migration strategy including: quantization approach, memory mapping, inference scheduling, power budget, Wi-Fi duty cycling for periodic cloud sync, and cost analysis comparing cloud-only vs edge+cloud architecture."
      />

      {/* ── Mini Quiz ────────────────────────────────────── */}
      <MiniQuiz
        question="Why do we quantize neural networks for microcontrollers?"
        options={[
          { id: 'a', text: 'To increase the accuracy of the model.' },
          { id: 'b', text: 'To convert the model from Python to C++.' },
          { id: 'c', text: 'To drastically reduce memory footprint and latency.' },
          { id: 'd', text: 'To allow the model to communicate over Wi-Fi.' }
        ]}
        correctAnswerId="c"
        explanation="Quantization reduces the precision of the numbers (e.g., float32 to int8), which drastically lowers memory usage and speeds up inference on MCUs without FPU support."
      />

      {/* ── References ────────────────────────────────────── */}
      <ExpandableCard title="References & Further Reading" icon="&#128218;">
        <ul>
          <li><strong>TensorFlow Lite Quantization Guide</strong> — <a href="https://www.tensorflow.org/lite/performance/quantization" target="_blank" rel="noopener noreferrer">tensorflow.org/lite/performance/quantization</a></li>
          <li><strong>Edge Impulse — Getting Started</strong> — <a href="https://docs.edgeimpulse.com/docs" target="_blank" rel="noopener noreferrer">docs.edgeimpulse.com</a></li>
          <li><strong>nRF52840 Product Specification</strong> — Nordic Semiconductor</li>
          <li><strong>ARM CMSIS-NN Library</strong> — optimized NN kernels for Cortex-M</li>
        </ul>
      </ExpandableCard>

      {/* ── Summary ───────────────────────────────────────── */}
      <Callout type="important" title="Summary">
        Edge AI moves inference from cloud servers to the local microcontroller. This paradigm shift
        reduces latency, saves bandwidth, and increases privacy. Neural networks must be quantized
        (usually to int8) to fit within strict SRAM constraints. Understanding DSP is just as
        important as the ML model itself — raw sensor data needs filtering before it can be
        classified.
      </Callout>

      {/* ── Key Takeaways ────────────────────────────────── */}
      <KeyTakeaways
        points={[
          "Edge AI moves inference from the cloud to the local microcontroller.",
          "This paradigm shift reduces latency, saves bandwidth, and increases privacy.",
          "Neural networks must be quantized (usually to int8) to fit within strict SRAM constraints.",
          "Understanding DSP (Digital Signal Processing) is just as important as the ML model itself.",
          "Always profile memory usage before attempting deployment — not every model fits on every MCU."
        ]}
      />
    </>
  );
};

export default AIFundamentalsContent;
