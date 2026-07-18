import React from 'react';
import Callout from '@/components/course/Callout';
import InteractiveDiagram from '@/components/course/InteractiveDiagram';
import MiniQuiz from '@/components/course/MiniQuiz';
import KeyTakeaways from '@/components/course/KeyTakeaways';
import FlashCard from '@/components/course/FlashCard';
import ExpandableCard from '@/components/course/ExpandableCard';
import HandsOnActivity from '@/components/course/HandsOnActivity';
import ThinkLikeAnEngineer from '@/components/course/ThinkLikeAnEngineer';

const flashCards = [
  { front: 'What is Edge AI?', back: 'Running AI inference directly on the microcontroller or edge device instead of sending data to the cloud.' },
  { front: 'What is quantization?', back: 'Reducing the precision of model weights (e.g., float32 to int8) to fit neural networks within MCU memory constraints.' },
  { front: 'Why is local inference faster?', back: 'It eliminates network round-trip latency — the model runs on-device, so responses happen in milliseconds.' },
  { front: 'What is TinyML?', back: 'The field of running machine learning models on ultra-low-power microcontrollers (mW scale).' },
  { front: 'Name one advantage of edge AI for privacy.', back: 'Raw sensor data never leaves the device, keeping sensitive information local.' },
];

const IntroductionContent = () => {
  return (
    <>
      {/* ── Introduction ─────────────────────────────────── */}
      <p>
        Welcome to <strong>AI for Electronics Engineers</strong>. This is not a slide deck and
        not a documentation site — it is a hands-on learning ecosystem built for students and
        practicing engineers who want to put machine learning directly onto real hardware:
        microcontrollers, FPGAs, and custom PCBs.
      </p>

      <p>
        Over the last decade, artificial intelligence has moved out of research labs and into
        the silicon you design. A modern MCU can now run a neural network, a vibration sensor
        can predict its own failure, and a camera module can recognize defects on a production
        line in real time. If you can bridge electronics and AI, you become the rare engineer
        who can take a model from a notebook all the way to a shipped product.
      </p>

      {/* ── Learning Objectives ──────────────────────────── */}
      <Callout type="important" title="Learning Objectives">
        After completing this workshop, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain how AI inference works on microcontrollers and why edge processing matters.
        <br /><strong>2.</strong> Quantize a neural network from float32 to int8 for deployment on constrained hardware.
        <br /><strong>3.</strong> Read sensor data, preprocess it with DSP, and feed it into a trained model.
        <br /><strong>4.</strong> Deploy a working TinyML model to an Arduino Nano 33 BLE Sense or STM32 board.
        <br /><strong>5.</strong> Use AI tools (ChatGPT, Copilot, Claude) to accelerate firmware and hardware design.
        <br /><strong>6.</strong> Design a complete edge-AI pipeline from sensor input to actuator output.
      </Callout>

      {/* ── Overview ─────────────────────────────────────── */}
      <h2>Workshop Overview</h2>
      <p>
        This workshop spans <strong>15 modules</strong> across four phases, taking you from
        foundational AI concepts to a fully deployed edge-AI system. Each module includes
        interactive diagrams, working code, knowledge checks, and hands-on activities.
      </p>

      <ExpandableCard title="Phase 1: Foundations" icon="1" defaultOpen>
        <ul>
          <li><strong>Introduction</strong> — Why electronics engineers need AI skills</li>
          <li><strong>AI Fundamentals</strong> — The paradigm shift from rules to models</li>
          <li><strong>Machine Learning</strong> — Supervised learning, features, overfitting</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Phase 2: Deep Dive" icon="2">
        <ul>
          <li><strong>Deep Learning</strong> — Neural networks, CNNs, backpropagation</li>
          <li><strong>Generative AI</strong> — VAEs, GANs, diffusion models</li>
          <li><strong>LLMs</strong> — Transformers, attention, local deployment</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Phase 3: Application" icon="3">
        <ul>
          <li><strong>AI Tools</strong> — ChatGPT, Copilot, Claude for engineers</li>
          <li><strong>Electronics Applications</strong> — AI for PCBs, sensors, RTOS</li>
          <li><strong>Prompt Engineering</strong> — Crafting effective hardware prompts</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Phase 4: Build & Ship" icon="4">
        <ul>
          <li><strong>Career Roadmap</strong> — Pathways to AI + EE careers</li>
          <li><strong>Live Demonstrations</strong> — Real-world coding and hardware demos</li>
          <li><strong>Future Trends</strong> — What&apos;s coming next</li>
        </ul>
      </ExpandableCard>

      {/* ── Theory ───────────────────────────────────────── */}
      <h2>Why Electronics Engineers Need AI</h2>
      <p>
        Traditional firmware is built on explicit rules: <em>if the temperature exceeds 80&deg;C,
        turn on the fan</em>. That works until the real world gets messy. AI lets a device learn
        the pattern of &ldquo;normal&rdquo; from data, so it can react to situations you never
        thought to code for. For an electronics engineer this means:
      </p>
      <ul>
        <li><strong>Smaller bills of materials</strong> — replace dedicated sensors with software inference.</li>
        <li><strong>Lower power</strong> — process data locally instead of streaming it to the cloud.</li>
        <li><strong>New product classes</strong> — predictive maintenance, anomaly detection, voice control, vision.</li>
      </ul>

      <InteractiveDiagram
        title="Your Learning Path Through This Workshop"
        nodes={[
          { id: 'fundamentals', label: '1 · AI Fundamentals', description: 'The paradigm shift from rule-based firmware to data-driven models, and why edge inference matters.' },
          { id: 'ml', label: '2 · Machine Learning', description: 'Supervised learning, features from sensor data, training, and avoiding overfitting.' },
          { id: 'dl', label: '3 · Deep Learning', description: 'Neural networks, backpropagation, CNNs and RNNs for signals and images.' },
          { id: 'gen', label: '4 · Generative & LLMs', description: 'Transformers, foundation models, and using LLMs to write and review your firmware.' },
          { id: 'ship', label: '5 · Build & Ship', description: 'Quantize, deploy to the MCU, and validate on real hardware.' }
        ]}
      />

      {/* ── Advantages ───────────────────────────────────── */}
      <ExpandableCard title="Advantages of Edge AI" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Ultra-low latency</strong> — decisions in &lt;10ms without network round-trips</li>
          <li><strong>Bandwidth savings</strong> — transmit 1-byte alerts instead of 100MB of raw data</li>
          <li><strong>Privacy by design</strong> — raw sensor data never leaves the device</li>
          <li><strong>Reliability</strong> — works offline, no cloud dependency</li>
          <li><strong>Cost reduction</strong> — fewer cloud compute bills, smaller BOM</li>
        </ul>
      </ExpandableCard>

      {/* ── Limitations ──────────────────────────────────── */}
      <ExpandableCard title="Limitations to Consider" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Memory constraints</strong> — MCUs have limited SRAM (256KB–1MB typical)</li>
          <li><strong>Model size</strong> — only quantized, pruned models fit on-device</li>
          <li><strong>Training still happens in the cloud</strong> — edge devices run inference, not training</li>
          <li><strong>Power budget</strong> — always-on inference drains batteries faster</li>
          <li><strong>Update complexity</strong> — OTA model updates require careful versioning</li>
        </ul>
      </ExpandableCard>

      {/* ── Visual Explanation ────────────────────────────── */}
      <Callout type="example">
        By the end of this workshop you will have traced a complete pipeline: a raw accelerometer
        signal &rarr; DSP preprocessing &rarr; a quantized model &rarr; a 1-byte alert on an MCU.
        That single pipeline is the backbone of most commercial edge-AI products.
      </Callout>

      {/* ── Practical Applications ────────────────────────── */}
      <h2>Practical Applications</h2>
      <p>
        Edge AI is already shipping in millions of devices. Here are real products that use
        the exact techniques you&apos;ll learn:
      </p>
      <ul>
        <li><strong>Smart thermostat</strong> — learns occupancy patterns to optimize HVAC scheduling</li>
        <li><strong>Industrial vibration sensor</strong> — detects bearing wear before failure</li>
        <li><strong>Wearable fitness tracker</strong> — classifies activity type from accelerometer data</li>
        <li><strong>Security camera</strong> — person detection without cloud upload</li>
        <li><strong>Agricultural drone</strong> — crop health classification in real-time flight</li>
      </ul>

      {/* ── Industry Applications ─────────────────────────── */}
      <h2>Industry Applications</h2>
      <ul>
        <li><strong>Automotive</strong> — ADAS, driver monitoring, predictive maintenance</li>
        <li><strong>Healthcare</strong> — wearable ECG analysis, insulin pump optimization</li>
        <li><strong>Manufacturing</strong> — quality inspection, predictive maintenance</li>
        <li><strong>Agriculture</strong> — crop monitoring, soil analysis, drone mapping</li>
        <li><strong>Consumer Electronics</strong> — voice assistants, smart home, wearables</li>
      </ul>

      {/* ── Common Mistakes ───────────────────────────────── */}
      <ExpandableCard title="Common Beginner Mistakes" icon="&#10005;" variant="warning">
        <ul>
          <li><strong>Trying to deploy raw PyTorch models to MCUs</strong> — always quantize first</li>
          <li><strong>Ignoring sensor calibration</strong> — garbage in, garbage out applies to ML too</li>
          <li><strong>Overfitting to training data</strong> — your model must generalize to real-world noise</li>
          <li><strong>Skipping DSP preprocessing</strong> — raw sensor data needs filtering and normalization</li>
          <li><strong>Choosing the wrong MCU</strong> — check SRAM, FPU, and clock speed requirements</li>
        </ul>
      </ExpandableCard>

      {/* ── Engineering Tips ──────────────────────────────── */}
      <ExpandableCard title="Engineering Tips" icon="&#9889;" variant="info">
        <ul>
          <li><strong>Start with Python on your PC</strong> — get the model working before worrying about deployment</li>
          <li><strong>Profile memory early</strong> — use STM32CubeMX or Arduino MemoryFree to check SRAM usage</li>
          <li><strong>Use Edge Impulse</strong> — it handles the quantization and deployment pipeline for you</li>
          <li><strong>Capture your own data</strong> — real-world sensor data beats public datasets</li>
          <li><strong>Test on hardware ASAP</strong> — simulator results don&apos;t match real power consumption</li>
        </ul>
      </ExpandableCard>

      {/* ── Flash Cards ──────────────────────────────────── */}
      <FlashCard
        cards={flashCards}
        title="Key Concepts — Flash Cards"
      />

      {/* ── How to Use ───────────────────────────────────── */}
      <h2>How to Use This Platform</h2>
      <p>
        Each chapter opens with a reading time and difficulty badge. Work top to bottom using the
        navigation at the bottom of every page, or jump to what you need. Along the way you will
        find:
      </p>
      <ul>
        <li><strong>Interactive diagrams</strong> — click the nodes to explore a pipeline step by step.</li>
        <li><strong>Copy-ready code</strong> — every snippet runs in a real Python or C environment.</li>
        <li><strong>Knowledge checks</strong> — short quizzes to confirm you understood each concept.</li>
        <li><strong>Flash cards</strong> — flip to review key terms and definitions.</li>
        <li><strong>Debugging mode</strong> — walk through broken code to the fix.</li>
        <li><strong>Hands-on activities</strong> — step-by-step practical exercises.</li>
        <li><strong>Prompts &amp; tools</strong> — a curated library for using AI in your own workflow.</li>
        <li><strong>A final quiz + certificate</strong> — prove your completion.</li>
      </ul>

      {/* ── Mini Quiz ────────────────────────────────────── */}
      <MiniQuiz
        question="What is the main advantage of running AI inference on the device (edge) instead of in the cloud?"
        options={[
          { id: 'a', text: 'It makes the AI model more accurate.' },
          { id: 'b', text: 'It reduces latency, bandwidth, and power while improving privacy.' },
          { id: 'c', text: 'It removes the need for any microcontroller.' },
          { id: 'd', text: 'Cloud servers become unnecessary for training too.' }
        ]}
        correctAnswerId="b"
        explanation="Edge inference processes data locally, so the device reacts in milliseconds without a network round-trip, sends far less data, and keeps raw sensor data private on-device."
      />

      {/* ── Hands-On Activity ────────────────────────────── */}
      <HandsOnActivity
        title="Set Up Your Edge AI Environment"
        difficulty="Beginner"
        estimatedTime="15 minutes"
        objectives={[
          'Install Python 3.10+ and TensorFlow Lite',
          'Connect an Arduino Nano 33 BLE Sense to your PC',
          'Run the TensorFlow Lite Micro hello-world example',
          'Verify serial output shows inference results'
        ]}
        materials={[
          'Arduino Nano 33 BLE Sense (or compatible board)',
          'USB cable',
          'Arduino IDE or PlatformIO',
          'Python 3.10+ with pip',
          'TensorFlow Lite for Microcontrollers'
        ]}
        steps={[
          {
            instruction: 'Install the Arduino TFLite Micro library via Library Manager.',
            detail: 'Open Arduino IDE → Tools → Manage Libraries → Search "TensorFlow Lite" → Install by Arduino.',
            expectedResult: 'Library appears in your Arduino libraries folder.'
          },
          {
            instruction: 'Open the hello_world example from the TFLite Micro examples.',
            detail: 'File → Examples → Arduino_TensorFlowLite → hello_world',
          },
          {
            instruction: 'Select your board and upload the sketch.',
            detail: 'Tools → Board → Arduino Nano 33 BLE → Upload. Open Serial Monitor at 115200 baud.',
            expectedResult: 'You should see "x_value, predicted_y" pairs streaming — the model is running inference on the MCU!'
          }
        ]}
        verification="The serial monitor outputs x,y prediction pairs that approximate a sine wave. This confirms the MCU is running neural network inference locally."
      />

      {/* ── Think Like an Engineer ────────────────────────── */}
      <ThinkLikeAnEngineer
        problem="You are designing a battery-powered vibration sensor for industrial predictive maintenance. The sensor must run for 5 years on a single battery while continuously monitoring machine vibration and detecting anomalies. How do you approach the AI model design?"
        context="Constraints: 256KB SRAM, 1MB Flash, 32MHz ARM Cortex-M4, 3.3V lithium cell, 10μA sleep current budget."
        hints={[
          'Consider duty cycling — the MCU should sleep most of the time',
          'Think about what features you can extract in the time-domain before running the model',
          'A small anomaly detector needs fewer weights than a full classifier',
          'Quantized int8 models use 4x less memory than float32'
        ]}
        explanation="The key insight is duty cycling: wake the MCU every 100ms, capture a short vibration window, run a lightweight FFT or statistical feature extraction, feed a small quantized autoencoder (maybe 10KB), and compare the reconstruction error against a threshold. If anomaly detected, store the waveform and transmit an alert. Otherwise, go back to sleep. The entire inference cycle should complete in under 5ms to keep average current in the microamp range. A full CNN would be overkill — a simple dense autoencoder with 32-16-8-16-32 architecture quantized to int8 fits easily in 256KB SRAM."
        aiPrompt="Act as a Senior Embedded Systems Engineer. I need to design a battery-powered anomaly detection system for industrial vibration monitoring using an ARM Cortex-M4 with 256KB SRAM. The system must run 5+ years on a single battery. Design the complete system architecture including: duty cycling strategy, feature extraction pipeline, model architecture (must fit in 256KB), quantization approach, and power budget breakdown. Provide specific numbers for sleep/wake current, inference time, and battery life calculations."
      />

      {/* ── References ────────────────────────────────────── */}
      <ExpandableCard title="References & Further Reading" icon="&#128218;">
        <ul>
          <li><strong>TinyML</strong> — Pete Warden &amp; Daniel Situnayake (O&apos;Reilly, 2019)</li>
          <li><strong>TensorFlow Lite for Microcontrollers</strong> — <a href="https://www.tensorflow.org/lite/microcontrollers" target="_blank" rel="noopener noreferrer">tensorflow.org/lite/microcontrollers</a></li>
          <li><strong>Edge Impulse Documentation</strong> — <a href="https://docs.edgeimpulse.com" target="_blank" rel="noopener noreferrer">docs.edgeimpulse.com</a></li>
          <li><strong>Arduino Nano 33 BLE Sense Datasheet</strong> — <a href="https://store.arduino.cc/products/arduino-nano-33-ble-sense" target="_blank" rel="noopener noreferrer">store.arduino.cc</a></li>
          <li><strong>ARM Cortex-M4 Technical Reference Manual</strong> — <a href="https://developer.arm.com/documentation" target="_blank" rel="noopener noreferrer">developer.arm.com</a></li>
        </ul>
      </ExpandableCard>

      {/* ── Summary ───────────────────────────────────────── */}
      <Callout type="important" title="Summary">
        This module established why AI is becoming a core competency for electronics engineers.
        The key insight: edge AI moves inference from the cloud to the microcontroller, enabling
        lower latency, better privacy, and new product classes. You&apos;ll need to understand both
        the ML model and the hardware constraints to build effective edge-AI systems.
      </Callout>

      {/* ── Key Takeaways ────────────────────────────────── */}
      <KeyTakeaways
        points={[
          "AI has moved from the cloud into the silicon you design — it is now a core EE skill.",
          "Data-driven models handle messy real-world signals that hard-coded rules cannot.",
          "This workshop takes you from fundamentals to a deployed, quantized model on real hardware.",
          "Every chapter is interactive: diagrams, code, quizzes, flash cards, and tools you can reuse.",
          "The fastest way to learn is to build one complete end-to-end project on your own data."
        ]}
      />
    </>
  );
};

export default IntroductionContent;
