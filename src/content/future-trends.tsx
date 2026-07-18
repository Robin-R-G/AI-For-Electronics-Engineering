import React from 'react';
import Callout from '@/components/course/Callout';
import InteractiveDiagram from '@/components/course/InteractiveDiagram';
import MiniQuiz from '@/components/course/MiniQuiz';
import KeyTakeaways from '@/components/course/KeyTakeaways';
import CommonMistakes from '@/components/course/CommonMistakes';
import EngineeringChallenge from '@/components/course/EngineeringChallenge';
import AIChallenge from '@/components/course/AIChallenge';
import References from '@/components/course/References';

const FutureTrendsContent = () => {
  return (
    <>
      <p>
        The boundary between silicon and intelligence is dissolving. The trends below are not
        sci-fi — they are shaping the roadmaps of every major chip vendor and will define the
        next decade of electronics engineering hiring.
      </p>

      <h2>TinyML Goes Mainstream</h2>
      <p>
        <strong>TinyML</strong> — ML on microcontrollers under 1 mW — is moving from research to
        product. Expect default &ldquo;AI inside&rdquo; branding on sensors, where inference is
        baked into the component itself. As an engineer, model optimization (quantization,
        pruning, NAS) becomes as routine as picking a regulator.
      </p>

      <h2>Dedicated AI Accelerators (NPUs)</h2>
      <p>
        General-purpose MCUs are being joined by <strong>Neural Processing Units</strong> and
        dedicated MAC arrays. Modern SoCs pair an Cortex-M class core with an NPU that delivers
        tens of TOPS at milliwatts. Your job shifts toward scheduling work across heterogeneous
        compute: DSP block, NPU, and CPU.
      </p>

      <InteractiveDiagram
        title="The Next Decade, Signal by Signal"
        nodes={[
          { id: 'now', label: 'Now', description: 'Quantized CNNs/RNNs on MCUs; cloud coprocessors for heavier tasks.' },
          { id: 'npu', label: '1–2 yrs', description: 'NPUs standard on SoCs; sub-mW always-on inference everywhere.' },
          { id: 'neuro', label: '3–5 yrs', description: 'Neuromorphic and in-memory compute blur store/compute boundaries.' },
          { id: 'auto', label: '5+ yrs', description: 'Self-driving labs: AI designs, simulates, and validates hardware loops.' }
        ]}
      />

      <Callout type="important" title="Neuromorphic Computing">
        Instead of clocked von Neumann chips, neuromorphic silicon (e.g., spiking neural nets)
        processes events asynchronously and sips power only when something happens. For
        always-on sensing it can be 100–1000&times; more efficient than conventional inference.
      </Callout>

      <h2>Self-Driving Labs &amp; AI-Assisted Design</h2>
      <p>
        Closed-loop &ldquo;self-driving labs&rdquo; run experiments autonomously: an LLM proposes
        a hypothesis, a script drives the test equipment, a model reads the results, and the cycle
        repeats overnight. Closer to design, AI copilots already draft schematics, propose
        decoupling networks, and flag thermal issues before you route a board.
      </p>

      <Callout type="warning">
        With great generation comes great responsibility. AI-written hardware must still meet
        safety, EMC, and reliability standards. The engineer remains accountable — your judgment,
        not the model&rsquo;s confidence score, is the final sign-off.
      </Callout>

      <h2>Sustainable &amp; Efficient AI</h2>
      <p>
        Energy cost of training and inference is now a design constraint. Techniques like
        sparsity, mixed-precision, and efficient architectures (MobileNet-style) matter because
        the greenest joule is the one you never spend. Power-aware ML will be a differentiator in
        battery and edge products.
      </p>

      <MiniQuiz
        question="What is a key benefit of neuromorphic (spiking) hardware for always-on sensing?"
        options={[
          { id: 'a', text: 'It requires a faster system clock than normal MCUs.' },
          { id: 'b', text: 'It consumes power only when events occur, enabling extreme efficiency.' },
          { id: 'c', text: 'It removes the need for any sensors.' },
          { id: 'd', text: 'It runs large LLMs without quantization.' }
        ]}
        correctAnswerId="b"
        explanation="Neuromorphic chips process events asynchronously and draw power only on activity, making them dramatically more efficient than clocked inference for always-on sensing."
      />

      <KeyTakeaways
        points={[
          "TinyML and NPUs are becoming standard, shifting EE work to heterogeneous compute scheduling.",
          "Neuromorphic and in-memory computing promise order-of-magnitude efficiency gains.",
          "Self-driving labs and AI copilots will accelerate the design-validate loop.",
          "Efficiency and engineer accountability remain central as AI writes more hardware."
        ]}
      />

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Waiting for "perfect" AI tools before learning them',
            why: 'The tools will never be perfect. Early adopters gain a compounding advantage.',
            fix: 'Start using AI copilots now. The workflow skills transfer across tool generations.',
          },
          {
            mistake: 'Assuming NPUs replace the need to understand MCUs',
            why: 'NPUs are accelerators, not replacements. You still need to manage peripherals, interrupts, and power.',
            fix: 'Learn the MCU fundamentals first. NPUs are an additional compute layer, not a replacement.',
          },
          {
            mistake: 'Ignoring power constraints in AI hardware design',
            why: 'A model that runs perfectly on a dev board may drain a battery in hours.',
            fix: 'Profile power consumption on target hardware from the earliest design stage.',
          },
          {
            mistake: 'Over-relying on AI-generated designs without understanding fundamentals',
            why: 'AI tools accelerate design but cannot replace engineering judgment on safety-critical systems.',
            fix: 'Use AI as a copilot, not an autopilot. Verify every generated output against datasheets and standards.',
          },
        ]}
      />

      <EngineeringChallenge
        title="Explore Neuromorphic Sensing"
        description="Prototype an event-driven sensor system that mimics neuromorphic principles."
        difficulty="Advanced"
        steps={[
          { step: 'Research available neuromorphic sensors (e.g., DVS128, Prophesee EVK).', hint: 'Check Prophesee, iniVation, or SynSense websites for dev kits.' },
          { step: 'If no neuromorphic sensor is available, simulate one: threshold-crossing events from a standard accelerometer.', hint: 'Generate an event when the signal change exceeds a threshold.' },
          { step: 'Build a simple event-driven classifier: count events per time window, classify as "quiet" or "active".', hint: 'Use a sliding window of 100ms.' },
          { step: 'Compare power consumption: always-on polling vs. event-driven threshold.', hint: 'Measure average current with a multimeter or power profiler.' },
          { step: 'Write a brief report: what are the trade-offs between event-driven and clock-driven sensing?', hint: 'Consider latency, power, complexity, and data volume.' },
        ]}
        expectedOutcome="A working prototype (hardware or simulated) demonstrating that event-driven sensing reduces power by >50% compared to continuous polling for sparse events."
      />

      <AIChallenge
        title="Future-Proof Your Skills"
        role="Act as a Career Advisor specializing in AI and embedded systems engineering."
        objective="Create a 12-month upskilling plan for an electronics engineer to transition into AI-hardware co-design."
        background="I am an electronics engineer with 2 years of experience in MCU firmware (C, STM32, FreeRTOS). I want to move into roles that combine AI and hardware design, such as NPU integration, TinyML deployment, or AI accelerator design."
        requirements={[
          'Identify the 5 most in-demand skills for AI-hardware co-design roles in 2026',
          'Create a month-by-month learning plan with specific resources',
          'Include 2 portfolio projects that demonstrate AI+hardware skills',
          'Recommend certifications or courses that are recognized by employers',
          'Suggest open-source contributions that would build credibility',
        ]}
        expectedOutput="A structured 12-month plan with monthly milestones, specific resources, and portfolio project ideas."
        bestPractices={[
          'Focus on depth in one area (e.g., TinyML) rather than breadth across all AI-hardware topics.',
          'Build public projects on GitHub — hiring managers look for demonstrated capability.',
          'Contribute to open-source projects like Edge Impulse, TFLite Micro, or STM32 HAL.',
        ]}
      />

      <References
        references={[
          { title: 'Neuromorphic Computing — IEEE Spectrum', type: 'documentation', url: 'https://spectrum.ieee.org/topic/neuromorphic-computing/', description: 'Overview of neuromorphic hardware and research.' },
          { title: 'TinyML Foundation', type: 'documentation', url: 'https://tinyml.org/', description: 'Community and resources for ultra-low-power ML.' },
          { title: 'MIT Technology Review — AI Hardware', type: 'documentation', url: 'https://www.technologyreview.com/topic/artificial-intelligence/', description: 'Latest developments in AI hardware.' },
          { title: 'ARM AI Strategy', type: 'documentation', url: 'https://www.arm.com/solutions/artificial-intelligence', description: 'ARM vision for AI at the edge.' },
          { title: 'RISC-V AI Extensions', type: 'documentation', url: 'https://riscv.org/technical/technical-forums/risc-v-ai/', description: 'Emerging AI extensions for the RISC-V architecture.' },
        ]}
      />
    </>
  );
};

export default FutureTrendsContent;
