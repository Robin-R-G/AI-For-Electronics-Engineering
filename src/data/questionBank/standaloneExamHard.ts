import type { QuizQuestion, QuestionCategory, Difficulty } from '../quizTypes';

export const standaloneExamHardQuestions: QuizQuestion[] = [
  {
    id: 'exam-hard-1',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'A two-flip-flop synchronizer completely eliminates the possibility of metastability when crossing clock domains.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'A two-FF synchronizer only reduces the probability of a metastable failure to acceptably low levels; it cannot eliminate metastability in principle.',
    relatedLesson: 'electronics-applications',
    tags: ['metastability', 'cdc', 'synchronizer']
  },
  {
    id: 'exam-hard-2',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'FlashAttention reduces the memory footprint of self-attention by recomputing the softmax in the backward pass rather than storing the full score matrix.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'FlashAttention tiles the computation and recomputes the softmax during backward, trading FLOPs for much lower HBM traffic and O(n²) memory.',
    relatedLesson: 'llms',
    tags: ['flash-attention', 'attention', 'memory']
  },
  {
    id: 'exam-hard-3',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'DO-178C Level A avionics software certification requires Modified Condition/Decision Coverage (MC/DC) of the source code.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Level A, the most critical, mandates MC/DC to prove every condition independently affects each decision.',
    relatedLesson: 'electronics-applications',
    tags: ['do-178c', 'certification', 'safety']
  },
  {
    id: 'exam-hard-4',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'In continuous-conduction mode, an ideal buck converter can produce an output voltage greater than its input voltage.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'An ideal buck steps voltage down only: Vout = D·Vin with 0 < D < 1, so output never exceeds input.',
    relatedLesson: 'electronics-applications',
    tags: ['buck', 'dc-dc', 'power']
  },
  {
    id: 'exam-hard-5',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'In VHDL, a signal assignment inside a process takes effect immediately within the same simulation delta cycle.',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation: 'Signal assignments are scheduled and take effect only after the current delta cycle, modeling hardware propagation delay.',
    relatedLesson: 'electronics-applications',
    tags: ['vhdl', 'signals', 'delta-cycle']
  },
  {
    id: 'exam-hard-6',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'In the C++ backward kernel below, dout is the output delta δ. What does dW[i*n + j] compute?',
    codeSnippet: 'void linear_backward(float* dW, float* db, const float* dout,\n                      const float* x, int n, int m) {\n  for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n      dW[i*n + j] = dout[i] * x[j];\n    }\n    db[i] = dout[i];\n  }\n}',
    options: [
      '∂L/∂W_ij = δ_i · x_j',
      '∂L/∂x_j = δ_i · W_ij',
      'The activation a_i',
      'The scalar loss L'
    ],
    correctAnswer: '∂L/∂W_ij = δ_i · x_j',
    explanation: 'The weight gradient is the outer product of the output delta with the input, so each element is δ_i multiplied by x_j.',
    relatedLesson: 'deep-learning',
    tags: ['backprop', 'gradients', 'c-plus-plus']
  },
  {
    id: 'exam-hard-7',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'For the Python self-attention below, what is the asymptotic space complexity of storing `scores` for sequence length n and embedding d?',
    codeSnippet: 'def attention(Q, K, V, d):\n    scores = Q @ K.T            # shape (n, n)\n    weights = np.exp(scores / np.sqrt(d))\n    weights /= weights.sum(axis=1, keepdims=True)\n    return weights @ V',
    options: [
      'O(n^2)',
      'O(n)',
      'O(d)',
      'O(n*d)'
    ],
    correctAnswer: 'O(n^2)',
    explanation: 'The scores matrix is n×n regardless of d, giving O(n²) memory that dominates at long context.',
    relatedLesson: 'llms',
    tags: ['attention', 'complexity', 'python']
  },
  {
    id: 'exam-hard-8',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'In this FreeRTOS task, what guarantees a jitter-free 1 ms control period?',
    codeSnippet: 'void vControlTask(void* pv) {\n    const TickType_t period = pdMS_TO_TICKS(1);\n    TickType_t last = xTaskGetTickCount();\n    for (;;) {\n        vReadADCAndControl();\n        vTaskDelayUntil(&last, period);\n    }\n}',
    options: [
      'vTaskDelayUntil with a fixed period and highest priority',
      'vTaskDelay alone',
      'A bare while(1) with no delay',
      'Lowering the RTOS tick rate'
    ],
    correctAnswer: 'vTaskDelayUntil with a fixed period and highest priority',
    explanation: 'vTaskDelayUntil reschedules relative to a fixed anchor, and top priority prevents preemption, yielding a precise 1 ms loop.',
    relatedLesson: 'electronics-applications',
    tags: ['rtos', 'freertos', 'scheduling']
  },
  {
    id: 'exam-hard-9',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'With DMA_CIRCULAR set in this STM32 configuration, what happens after N samples are transferred?',
    codeSnippet: 'hdma.Instance = DMA1_Stream0;\nhdma.Init.Mode = DMA_CIRCULAR;\nhdma.Init.Priority = DMA_PRIORITY_HIGH;\nHAL_DMA_Start(&hdma, (uint32_t)&ADC->DR, (uint32_t)buf, N);',
    options: [
      'The stream automatically restarts from buf with no CPU intervention',
      'The DMA stops permanently',
      'The CPU must manually restart it each time',
      'Only the first sample is repeated'
    ],
    correctAnswer: 'The stream automatically restarts from buf with no CPU intervention',
    explanation: 'Circular mode wraps the pointer back to the buffer start, enabling continuous streaming with only half/complete interrupts.',
    relatedLesson: 'electronics-applications',
    tags: ['dma', 'stm32', 'embedded']
  },
  {
    id: 'exam-hard-10',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'What does this two-flip-flop Verilog structure protect against?',
    codeSnippet: 'reg [1:0] sync;\nalways @(posedge clk_b)\n  sync <= {sync[0], async_a};\nwire safe = sync[1];',
    options: [
      'Metastability on a single-bit clock-domain crossing',
      'Multi-bit bus skew',
      'Power-on reset',
      'Clock gating artifacts'
    ],
    correctAnswer: 'Metastability on a single-bit clock-domain crossing',
    explanation: 'The first flop may go metastable, but a second cycle lets it settle before the signal is used in clk_b domain.',
    relatedLesson: 'electronics-applications',
    tags: ['cdc', 'metastability', 'verilog']
  },
  {
    id: 'exam-hard-11',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'This affine quantization code assumes which integer range for the quantized tensor?',
    codeSnippet: 'scale = (max_val - min_val) / 255.0\nq = np.clip(np.round(x / scale), -128, 127)',
    options: [
      'Signed 8-bit [-128, 127]',
      'Unsigned 8-bit [0, 255]',
      'Float32',
      'Int4 [-8, 7]'
    ],
    correctAnswer: 'Signed 8-bit [-128, 127]',
    explanation: 'The clip bounds -128 to 127 match signed INT8; a 255 span would be unused for signed storage.',
    relatedLesson: 'ai-tools',
    tags: ['quantization', 'int8', 'edge-ai']
  },
  {
    id: 'exam-hard-12',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'In this discrete PID loop, which term introduces a pole at the origin and removes steady-state error?',
    codeSnippet: 'error = setpoint - measurement;\nintegral += error * dt;\nderiv = (error - prev_error) / dt;\noutput = Kp*error + Ki*integral + Kd*deriv;\nprev_error = error;',
    options: [
      'The integral term (Ki*integral)',
      'The proportional term (Kp*error)',
      'The derivative term (Kd*deriv)',
      'The setpoint value'
    ],
    correctAnswer: 'The integral term (Ki*integral)',
    explanation: 'Integration adds 1/s in the Laplace domain, a pole at the origin that drives steady-state error to zero.',
    relatedLesson: 'electronics-applications',
    tags: ['control-theory', 'pid', 'embedded']
  },
  {
    id: 'exam-hard-13',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'In this VHDL process, when does the signal q actually get its new value after d changes?',
    codeSnippet: 'process(clk)\nbegin\n  if rising_edge(clk) then\n    q <= d;\n  end if;\nend process;',
    options: [
      'One clock edge later, after the delta cycle',
      'Instantly within the same cycle',
      'Never, q is constant',
      'At the end of simulation'
    ],
    correctAnswer: 'One clock edge later, after the delta cycle',
    explanation: 'The non-blocking <= schedules the update; it becomes visible to other processes only after the next rising edge and delta cycle.',
    relatedLesson: 'electronics-applications',
    tags: ['vhdl', 'signals', 'simulation']
  },
  {
    id: 'exam-hard-14',
    category: 'concept-understanding',
    difficulty: 'Hard',
    question: 'Why does this tiled attention loop reduce memory versus the naive O(n²) implementation?',
    codeSnippet: 'for tile in tiles:\n    s = q_tile @ k_tile.T\n    m, l = update_running_max_and_sum(s)\n    acc += np.exp(s - m) * v_tile\n# only `acc` (n x d) is kept, not the n x n matrix',
    options: [
      'It never materializes the full n x n score matrix',
      'It doubles the matrix size for safety',
      'It stores all intermediate scores',
      'It requires FP64 precision'
    ],
    correctAnswer: 'It never materializes the full n x n score matrix',
    explanation: 'By keeping only running max/sum and the output, peak memory drops from O(n²) to O(n·d).',
    relatedLesson: 'llms',
    tags: ['flash-attention', 'attention', 'memory']
  },
  {
    id: 'exam-hard-15',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'In this INT8 convolution, why is the multiply-accumulate performed in int32?',
    codeSnippet: 'q_w = np.clip(np.round(w / w_scale), -128, 127)\nq_x = np.clip(np.round(x / x_scale), -128, 127)\nacc = np.sum(q_w * q_x)            # int32 accumulator\nout = acc * (w_scale * x_scale) / out_scale',
    options: [
      'To avoid overflow when summing many int8 products',
      'Because int8 cannot multiply',
      'To increase weight precision',
      'It is required by FP16 hardware'
    ],
    correctAnswer: 'To avoid overflow when summing many int8 products',
    explanation: 'Summing thousands of int8 products easily overflows 8 bits; an int32 accumulator captures the full result before rescale.',
    relatedLesson: 'ai-tools',
    tags: ['quantization', 'int8', 'edge-ai']
  },
  {
    id: 'exam-hard-16',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'You are laying out a 5 Gbps lane on a 4-layer board. To prevent reflections that corrupt the eye diagram, what must hold across source, trace, and load?',
    options: [
      'All three must be matched to 50Ω',
      'The trace must be 25Ω and load 100Ω',
      'Only the load needs to match the trace',
      'Z0 must be twice the load impedance'
    ],
    correctAnswer: 'All three must be matched to 50Ω',
    explanation: 'Impedance continuity from source through a 50Ω trace to a 50Ω termination prevents reflections at high speed.',
    relatedLesson: 'electronics-lab',
    tags: ['signal-integrity', 'impedance', 'pcb']
  },
  {
    id: 'exam-hard-17',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'For an ideal buck stepping 12V to 3.3V in continuous conduction, neglecting losses, what is the required switch duty cycle?',
    options: [
      '0.275',
      '0.725',
      '3.64',
      '0.5'
    ],
    correctAnswer: '0.275',
    explanation: 'Vout = D·Vin, so D = 3.3/12 ≈ 0.275.',
    relatedLesson: 'electronics-applications',
    tags: ['buck', 'duty-cycle', 'power']
  },
  {
    id: 'exam-hard-18',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'A safety-critical MCU must detect a stuck sensor every 10 ms per ISO 26262. Which approach best meets high diagnostic coverage?',
    options: [
      'Dual-channel redundant reading with cross-check and a timeout watchdog',
      'A single CRC over the last packet only',
      'Increasing ADC resolution',
      'Disabling the watchdog to save power'
    ],
    correctAnswer: 'Dual-channel redundant reading with cross-check and a timeout watchdog',
    explanation: 'Redundant sensing with cross-comparison and a watchdog gives timely, latched fault detection for high coverage.',
    relatedLesson: 'electronics-applications',
    tags: ['iso-26262', 'safety', 'diagnostics']
  },
  {
    id: 'exam-hard-19',
    category: 'practical-application',
    difficulty: 'Hard',
    question: 'To shrink a 70B-parameter LLM KV-cache on an 80GB GPU at batch 1, which lever most directly cuts memory?',
    options: [
      'Reduce context length or adopt grouped-query attention',
      'Increase the number of layers',
      'Raise the embedding dimension',
      'Use higher-precision weights'
    ],
    correctAnswer: 'Reduce context length or adopt grouped-query attention',
    explanation: 'KV-cache grows with context length and K/V head count; GQA shares heads and shorter contexts cut it linearly.',
    relatedLesson: 'llms',
    tags: ['kv-cache', 'llm-serving', 'attention']
  },
  {
    id: 'exam-hard-20',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'Your FPGA build passes simulation but fails intermittently on hardware. A 100 MHz signal crosses into a 50 MHz domain with no synchronizer. What is the root cause?',
    options: [
      'Metastability from an unsynchronized clock-domain crossing',
      'Wrong reset polarity',
      'Excessive combinational fanout',
      'A missing default in a case statement'
    ],
    correctAnswer: 'Metastability from an unsynchronized clock-domain crossing',
    explanation: 'Simulation ignores timing; an unsynchronized CDC can settle to an illegal state on hardware, causing intermittent failures.',
    relatedLesson: 'electronics-applications',
    tags: ['metastability', 'cdc', 'verilog']
  },
  {
    id: 'exam-hard-21',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A JTAG chain of three devices returns all-ones on the IR register during boundary scan. What is the most likely hardware fault?',
    options: [
      'A broken TDO-to-TDI daisy-chain connection',
      'Too low a TCK frequency',
      'Correct TRST polarity',
      'All devices sitting in BYPASS'
    ],
    correctAnswer: 'A broken TDO-to-TDI daisy-chain connection',
    explanation: 'A severed TDO→TDI link means later devices never receive shifted data, surfacing as stuck-at-ones IR reads.',
    relatedLesson: 'electronics-lab',
    tags: ['jtag', 'boundary-scan', 'debugging']
  },
  {
    id: 'exam-hard-22',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A Cortex-M SWD session drops under heavy DMA traffic. What is the likely cause and fix?',
    options: [
      'DMA starving the core bus; lower DMA priority or use a separate debug clock',
      'The breakpoint count exceeded four',
      'Wrong endianness in the probe',
      'Flash wait states set too low'
    ],
    correctAnswer: 'DMA starving the core bus; lower DMA priority or use a separate debug clock',
    explanation: 'High-priority DMA can block debug AP access; reducing DMA priority or isolating the debug clock restores stable SWD.',
    relatedLesson: 'electronics-lab',
    tags: ['swd', 'dma', 'debugging']
  },
  {
    id: 'exam-hard-23',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A training loop diverges with NaNs only on GPU after adding a custom kernel; gradients are finite on CPU. What is the probable cause?',
    options: [
      'A non-deterministic reduction without proper atomic or blocking sync',
      'Using too small a learning rate',
      'A batch size of one',
      'Float32 on CPU but float64 on GPU'
    ],
    correctAnswer: 'A non-deterministic reduction without proper atomic or blocking sync',
    explanation: 'A race in the kernel reduction yields different partial sums each run, breaking the gradient and producing NaNs only on GPU.',
    relatedLesson: 'deep-learning',
    tags: ['cuda', 'debugging', 'nan']
  },
  {
    id: 'exam-hard-24',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A VHDL simulation never updates a signal assigned inside a process. The sensitivity list contains only reset. Why does it not trigger?',
    options: [
      'The process resumes only on listed signals; the clock is missing',
      'The signal is of the wrong type',
      'The reset is active high',
      'Signals cannot be assigned in processes'
    ],
    correctAnswer: 'The process resumes only on listed signals; the clock is missing',
    explanation: 'A VHDL process resumes only on changes of signals in its sensitivity list, so omitting the clock leaves the body never executing.',
    relatedLesson: 'electronics-applications',
    tags: ['vhdl', 'sensitivity-list', 'simulation']
  },
  {
    id: 'exam-hard-25',
    category: 'debugging-scenarios',
    difficulty: 'Hard',
    question: 'A mixed-signal chip passes functional tests but fails EMC emission limits; the 400 MHz core has very fast edges. What is the likely fix?',
    options: [
      'Reduce edge rate, add spread-spectrum clocking, and shield',
      'Increase the clock frequency',
      'Remove the decoupling capacitors',
      'Disable the ground plane'
    ],
    correctAnswer: 'Reduce edge rate, add spread-spectrum clocking, and shield',
    explanation: 'Fast edges and their harmonics radiate; slew-rate limiting, SSC, and shielding lower peak emissions to pass EMC.',
    relatedLesson: 'electronics-lab',
    tags: ['emc', 'emission', 'clocking']
  },
  {
    id: 'exam-hard-26',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'You are tuning a 2nd-order RLC low-pass with R=1kΩ, L=10mH, C=100nF. What is the approximate natural resonant frequency f0?',
    options: [
      '≈ 5.03 kHz',
      '≈ 50 Hz',
      '≈ 500 kHz',
      '≈ 1 MHz'
    ],
    correctAnswer: '≈ 5.03 kHz',
    explanation: 'f0 = 1/(2π√(LC)) = 1/(2π√(10e-3·100e-9)) ≈ 5.03 kHz.',
    relatedLesson: 'electronics-applications',
    tags: ['rlc', 'filter', 'resonance']
  },
  {
    id: 'exam-hard-27',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'A transmission line of length l has per-unit propagation delay td, modeled as 10·td one-way. For a rising edge launched at t=0, when does the far end first see the transition?',
    options: [
      '10·td',
      'td',
      '0',
      '20·td'
    ],
    correctAnswer: '10·td',
    explanation: 'The edge travels at finite speed, reaching the far end after the total one-way delay of 10·td.',
    relatedLesson: 'electronics-lab',
    tags: ['transmission-line', 'propagation-delay', 'signal-integrity']
  },
  {
    id: 'exam-hard-28',
    category: 'circuit-reasoning',
    difficulty: 'Hard',
    question: 'An op-amp in an inverting configuration has Rin=1kΩ and Rf=10kΩ. What are the closed-loop gain and input resistance seen by the source?',
    options: [
      'Gain -10, input resistance 1kΩ',
      'Gain +11, input resistance 10kΩ',
      'Gain -10, input resistance 11kΩ',
      'Gain +10, input resistance 1kΩ'
    ],
    correctAnswer: 'Gain -10, input resistance 1kΩ',
    explanation: 'Inverting gain is -Rf/Rin = -10, and the virtual ground holds input resistance at Rin = 1kΩ.',
    relatedLesson: 'component-encyclopedia',
    tags: ['op-amp', 'inverting', 'gain']
  },
  {
    id: 'exam-hard-29',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'You are building a battery sensor node sampling at 1 Hz. Is an RTOS justified over a simple super-loop?',
    options: [
      'No, a super-loop suffices and saves RAM/flash for such low complexity',
      'Yes, always use an RTOS for any embedded product',
      'Only an RTOS can sleep the MCU',
      'A super-loop cannot read an ADC'
    ],
    correctAnswer: 'No, a super-loop suffices and saves RAM/flash for such low complexity',
    explanation: 'With one slow periodic task and minimal concurrency, a super-loop avoids RTOS overhead and certification burden.',
    relatedLesson: 'electronics-applications',
    tags: ['rtos', 'super-loop', 'low-power']
  },
  {
    id: 'exam-hard-30',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'You must choose between INT8 and FP16 for an on-device detector on a 2 TOPS NPU. Which trade-off is correct?',
    options: [
      'INT8 doubles throughput and halves memory versus FP16 at some accuracy cost',
      'FP16 always gives higher accuracy with no penalty',
      'INT8 requires more memory than FP16',
      'FP16 runs slower but uses less power'
    ],
    correctAnswer: 'INT8 doubles throughput and halves memory versus FP16 at some accuracy cost',
    explanation: 'INT8 uses 8 bits versus 16, halving bandwidth and typically enabling ~2x MAC throughput, with modest accuracy loss needing calibration.',
    relatedLesson: 'ai-tools',
    tags: ['quantization', 'edge-ai', 'int8']
  },
  {
    id: 'exam-hard-31',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'Comparing a Zynq SoC (FPGA + ARM) versus discrete MCU + FPGA for a low-volume controller, which factor most favors the SoC?',
    options: [
      'Tighter integration reduces board area, BOM, and inter-chip latency',
      'The SoC always has more deterministic timing',
      'Discrete parts are cheaper at any volume',
      'The SoC cannot share memory with the processor'
    ],
    correctAnswer: 'Tighter integration reduces board area, BOM, and inter-chip latency',
    explanation: 'Integrated programmable logic and hard processor share on-chip memory and buses, cutting cost and latency versus two chips.',
    relatedLesson: 'electronics-applications',
    tags: ['soc', 'fpga', 'system-design']
  },
  {
    id: 'exam-hard-32',
    category: 'engineering-decisions',
    difficulty: 'Hard',
    question: 'For a high-volume low-cost IoT chip, what is the primary reason to choose 28nm over 5nm?',
    options: [
      'Mature 28nm has far lower mask and wafer cost at volume',
      '5nm is always cheaper per transistor',
      '28nm cannot integrate analog',
      '5nm has better leakage for always-on devices'
    ],
    correctAnswer: 'Mature 28nm has far lower mask and wafer cost at volume',
    explanation: 'Older nodes amortize NRE and offer cheaper wafers; leading nodes cost vastly more per mask set for simple designs.',
    relatedLesson: 'electronics-applications',
    tags: ['process-node', 'cost', 'iot']
  },
  {
    id: 'exam-hard-33',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'An autonomous drone runs a camera pipeline at 60 fps with 200 ms perception latency. At 10 m/s, how far does it travel before reacting to fresh obstacles?',
    options: [
      '2 meters',
      '0.2 meters',
      '60 meters',
      '12 meters'
    ],
    correctAnswer: '2 meters',
    explanation: 'Distance = speed × latency = 10 m/s × 0.2 s = 2 m of travel before reacting to new frames.',
    relatedLesson: 'ai-tools',
    tags: ['latency', 'robotics', 'perception']
  },
  {
    id: 'exam-hard-34',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A data center serves a 70B-parameter LLM at batch 1. Which action most directly shrinks the KV-cache to fit 80GB GPU RAM?',
    options: [
      'Reduce context length or use grouped-query attention',
      'Increase the number of layers',
      'Raise the embedding dimension',
      'Use higher-precision weights'
    ],
    correctAnswer: 'Reduce context length or use grouped-query attention',
    explanation: 'KV-cache grows with context length and K/V head count; GQA and shorter contexts cut it linearly.',
    relatedLesson: 'llms',
    tags: ['kv-cache', 'llm-serving', 'attention']
  },
  {
    id: 'exam-hard-35',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A 12V automotive CAN bus shows intermittent errors at high RPM, with the harness routed next to the ignition coil. What is the likely culprit?',
    options: [
      'EMI induction onto the CAN pair from the ignition system',
      'Incorrect CAN baud rate',
      'Missing termination at one node',
      'Wrong CAN controller chip'
    ],
    correctAnswer: 'EMI induction onto the CAN pair from the ignition system',
    explanation: 'High dV/dt from ignition coils couples noise into unshielded CAN wiring, causing bit errors that worsen with RPM.',
    relatedLesson: 'electronics-applications',
    tags: ['emi', 'can-bus', 'automotive']
  },
  {
    id: 'exam-hard-36',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A medical wearable must log 24h of ECG at 250 Hz, 12-bit, on 4MB flash. Is raw capacity sufficient without compression?',
    options: [
      'No, it needs ≈ 27 MB, exceeding 4 MB',
      'Yes, it fits within 1 MB',
      'Yes, exactly 4 MB',
      'No, it needs 500 MB'
    ],
    correctAnswer: 'No, it needs ≈ 27 MB, exceeding 4 MB',
    explanation: '250 Hz × 86400 s × 2 bytes = 43.2 MB raw; even packed it far exceeds 4 MB, so compression or offload is required.',
    relatedLesson: 'electronics-applications',
    tags: ['data-logging', 'flash', 'wearable']
  },
  {
    id: 'exam-hard-37',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A factory predictive-maintenance model trained on clean lab vibration data fails in the plant. What is the most probable distribution shift?',
    options: [
      'Different machine load, temperature, and sensor mounting versus lab',
      'The model used too few layers',
      'The accelerometer was too accurate',
      'The sampling rate was exactly 1 kHz'
    ],
    correctAnswer: 'Different machine load, temperature, and sensor mounting versus lab',
    explanation: 'Real operating conditions, environmental noise, and mounting differ from clean lab capture, causing covariate shift.',
    relatedLesson: 'machine-learning',
    tags: ['domain-shift', 'predictive-maintenance', 'mlops']
  },
  {
    id: 'exam-hard-38',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A satellite carries an SRAM-based FPGA; cosmic particles cause single-event upsets in configuration memory. What mitigates this in flight?',
    options: [
      'Periodic scrubbing with an external watchdog reloading the bitstream',
      'Increasing the clock frequency',
      'Disabling ECC',
      'Using a smaller process node'
    ],
    correctAnswer: 'Periodic scrubbing with an external watchdog reloading the bitstream',
    explanation: 'Radiation-induced bit flips in config memory are corrected by continuously reading back and rewriting (scrubbing) the bitstream.',
    relatedLesson: 'electronics-applications',
    tags: ['radiation', 'scrubbing', 'fpga']
  },
  {
    id: 'exam-hard-39',
    category: 'real-world-situations',
    difficulty: 'Hard',
    question: 'A voice assistant must respond within 300 ms end-to-end on a phone; profiling shows on-CPU ASR takes 250 ms. What is the safest change to meet the budget?',
    options: [
      'Offload ASR to the NPU where it runs in ~40 ms',
      'Increase the model size for accuracy',
      'Disable network calls entirely',
      'Raise the audio sample rate to 96 kHz'
    ],
    correctAnswer: 'Offload ASR to the NPU where it runs in ~40 ms',
    explanation: 'Moving the dominant 250 ms stage to dedicated NPU inference frees the CPU and comfortably meets the 300 ms budget.',
    relatedLesson: 'ai-tools',
    tags: ['edge-ai', 'latency', 'npu']
  },
  {
    id: 'exam-hard-40',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'Explain why vanishing gradients occur in deep sigmoid networks and how an LSTM cell addresses them.',
    options: [
      'Sigmoid derivatives <1 multiply across layers; LSTM gating provides an additive near-constant error path',
      'ReLU causes vanishing; LSTM removes all non-linearity',
      'Vanishing is caused only by too high a learning rate',
      'LSTM uses deeper sigmoid stacks to amplify gradients'
    ],
    correctAnswer: 'Sigmoid derivatives <1 multiply across layers; LSTM gating provides an additive near-constant error path',
    explanation: 'Products of small sigmoid gradients shrink exponentially; the LSTM cell state is a linear highway so errors flow with little attenuation.',
    relatedLesson: 'deep-learning',
    tags: ['vanishing-gradient', 'lstm', 'rnn']
  },
  {
    id: 'exam-hard-41',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'In a system with two clock domains, why is a two-flip-flop synchronizer insufficient for a multi-bit bus, and what is the fix?',
    options: [
      'Bits can settle on different cycles causing skew; use a CDC FIFO or gray-code handshake',
      'Two flops always suffice for any bus width',
      'A single flop is better for buses',
      'Clock gating solves it'
    ],
    correctAnswer: 'Bits can settle on different cycles causing skew; use a CDC FIFO or gray-code handshake',
    explanation: 'Per-bit synchronizers let bits change on different edges, corrupting the value; a CDC FIFO or gray-coded pointer preserves coherence.',
    relatedLesson: 'electronics-applications',
    tags: ['cdc', 'synchronizer', 'metastability']
  },
  {
    id: 'exam-hard-42',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'What is the key difference between training and inference when deploying INT8 models on edge hardware?',
    options: [
      'Training needs FP32 gradients while inference runs INT8; QAT bridges the gap',
      'Both must use INT8 end-to-end',
      'Inference needs gradients; training does not',
      'Training is always done on the edge device'
    ],
    correctAnswer: 'Training needs FP32 gradients while inference runs INT8; QAT bridges the gap',
    explanation: 'Backprop requires precise gradients in FP32/FP16; only the forward pass is quantized, so QAT minimizes the accuracy gap.',
    relatedLesson: 'ai-tools',
    tags: ['quantization', 'qat', 'edge-ai']
  },
  {
    id: 'exam-hard-43',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'Why does a deeper transformer not improve accuracy linearly, and what scaling law governs the trade-off?',
    options: [
      'Returns diminish and cost rises; compute-optimal scaling balances params, data, and compute',
      'Deeper is always strictly better with no cost',
      'Only width matters; depth is irrelevant',
      'Scaling laws prove depth should grow without limit'
    ],
    correctAnswer: 'Returns diminish and cost rises; compute-optimal scaling balances params, data, and compute',
    explanation: 'Beyond a point extra layers add marginal gain while raising cost and risk; Chinchilla-style scaling shows the optimal balance.',
    relatedLesson: 'llms',
    tags: ['scaling-laws', 'transformer', 'overfitting']
  },
  {
    id: 'exam-hard-44',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'A candidate claims priority ceiling protocol is identical to priority inheritance. What is the precise distinction?',
    options: [
      'Ceiling raises the task to the max ceiling of held resources upfront, preventing chained blocking',
      'They are exactly the same mechanism',
      'Inheritance is faster in all cases',
      'Ceiling only applies to interrupts'
    ],
    correctAnswer: 'Ceiling raises the task to the max ceiling of held resources upfront, preventing chained blocking',
    explanation: 'Priority ceiling boosts a task to the highest ceiling among its locks immediately, avoiding the deadlock and chained-blocking risks of pure inheritance.',
    relatedLesson: 'electronics-applications',
    tags: ['rtos', 'priority-ceiling', 'mutex']
  },
  {
    id: 'exam-hard-45',
    category: 'interview-style',
    difficulty: 'Hard',
    question: 'Why is self-attention asymptotically more expensive than a recurrent step as sequence length grows?',
    options: [
      'It forms an n×n score matrix, costing O(n²·d) versus RNN O(n·d)',
      'It has no matrix multiplication',
      'It processes tokens independently with O(1)',
      'It requires O(n³) for a single token'
    ],
    correctAnswer: 'It forms an n×n score matrix, costing O(n²·d) versus RNN O(n·d)',
    explanation: 'Attention compares every query to every key, producing an n×n matrix, whereas an RNN updates a fixed-size state per step.',
    relatedLesson: 'llms',
    tags: ['attention', 'complexity', 'transformer']
  },
  {
    id: 'exam-hard-46',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'ISO 26262 defines Automotive Safety Integrity Levels. What determines the ASIL assigned to a function?',
    options: [
      'Severity, exposure, and controllability of its failure',
      'The number of lines of code',
      'The MCU clock speed',
      'Whether it uses an RTOS'
    ],
    correctAnswer: 'Severity, exposure, and controllability of its failure',
    explanation: 'ASIL is derived from how severe, how often, and how controllable a hazardous failure is.',
    relatedLesson: 'electronics-applications',
    tags: ['iso-26262', 'asil', 'functional-safety']
  },
  {
    id: 'exam-hard-47',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'A fab moves a design from 14nm to 7nm. Which cost dynamic most affects a startup’s decision?',
    options: [
      'Mask set and wafer costs rise sharply, raising the NRE breakeven volume',
      'Per-die cost becomes zero',
      'Yield always improves to 100%',
      'Design effort decreases to near zero'
    ],
    correctAnswer: 'Mask set and wafer costs rise sharply, raising the NRE breakeven volume',
    explanation: 'Advanced nodes multiply mask and process costs, so only very high volumes justify the NRE for a small company.',
    relatedLesson: 'electronics-applications',
    tags: ['process-node', 'nre', 'semiconductor']
  },
  {
    id: 'exam-hard-48',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'In automotive SPICE, what maturity level indicates a quantitatively managed, continuously improving process?',
    options: [
      'Level 4–5 (quantitatively managed / optimizing)',
      'Level 1 (initial, ad hoc)',
      'Level 0 (none)',
      'Level 2 only'
    ],
    correctAnswer: 'Level 4–5 (quantitatively managed / optimizing)',
    explanation: 'Higher ASPICE levels add statistical process control and continuous improvement beyond the managed Level 2–3 baseline.',
    relatedLesson: 'career-roadmap',
    tags: ['automotive-spice', 'process', 'maturity']
  },
  {
    id: 'exam-hard-49',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'For a high-risk LLM assistant under emerging EU AI Act rules, what is required for deployment?',
    options: [
      'Documented risk management, human oversight, and clear user disclosure of AI use',
      'Keep model weights fully secret with no logging',
      'Disable all logging to protect privacy',
      'Only deploy on-premises with no documentation'
    ],
    correctAnswer: 'Documented risk management, human oversight, and clear user disclosure of AI use',
    explanation: 'High-risk AI under the Act mandates risk assessment, oversight controls, and transparent disclosure to users.',
    relatedLesson: 'future-trends',
    tags: ['ai-act', 'regulation', 'compliance']
  },
  {
    id: 'exam-hard-50',
    category: 'industry-oriented',
    difficulty: 'Hard',
    question: 'For safety-certified medical firmware, why is a formally verified static analyzer preferred alongside testing?',
    options: [
      'It can exhaustively prove absence of certain runtime errors across all paths',
      'Manual review is illegal for medical devices',
      'Static analysis replaces all testing',
      'It runs faster than compilation'
    ],
    correctAnswer: 'It can exhaustively prove absence of certain runtime errors across all paths',
    explanation: 'Sound static analysis can mathematically guarantee no overflow/null-deref on all paths, complementing required testing.',
    relatedLesson: 'electronics-applications',
    tags: ['formal-methods', 'medical', 'verification']
  }
];
