export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const fpgaVerilogQuestions: LessonQuestion[] = [
  {
    id: "fpga-1",
    question: "What is a CLB (Configurable Logic Block) in an FPGA?",
    options: [
      "A hardwired CPU core embedded in the FPGA",
      "A block containing LUTs, flip-flops, and multiplexers that implement combinational and sequential logic",
      "A memory block for storing configuration bitstream",
      "An I/O pad for external connections"
    ],
    correctAnswer: "A block containing LUTs, flip-flops, and multiplexers that implement combinational and sequential logic",
    explanation: "CLBs are the fundamental building blocks of FPGAs. Each CLB contains multiple LUTs for combinational logic, flip-flops for sequential logic, and routing muxes for internal connectivity."
  },
  {
    id: "fpga-2",
    question: "How does a 4-input LUT (Look-Up Table) implement combinational logic?",
    options: [
      "By cascading AND and OR gates internally",
      "By storing a 16-bit truth table in SRAM cells, where the 4 inputs select one bit as output",
      "By using a priority encoder",
      "By sampling the clock edge"
    ],
    correctAnswer: "By storing a 16-bit truth table in SRAM cells, where the 4 inputs select one bit as output",
    explanation: "A 4-input LUT has 16 SRAM cells (2^4). The four inputs act as an address to select one cell, which becomes the output. Any 4-input Boolean function can be programmed into the 16 bits."
  },
  {
    id: "fpga-3",
    question: "What is the key advantage of an FPGA over an ASIC for prototyping?",
    options: [
      "FPGAs have higher performance",
      "FPGAs are reconfigurable and have no NRE (non-recurring engineering) costs",
      "FPGAs consume less power",
      "FPGAs support higher transistor counts"
    ],
    correctAnswer: "FPGAs are reconfigurable and have no NRE (non-recurring engineering) costs",
    explanation: "FPGAs can be reprogrammed instantly, enabling fast iteration. ASICs require expensive mask sets ($100K–$10M+), making them viable only at high volume. FPGAs trade performance and power for flexibility and low upfront cost."
  },
  {
    id: "fpga-4",
    question: "How does an FPGA differ from a microcontroller?",
    options: [
      "An FPGA executes software instructions sequentially; a microcontroller implements parallel hardware",
      "An FPGA implements parallel hardware logic; a microcontroller executes sequential instructions in software",
      "They are architecturally identical",
      "Microcontrollers have more I/O pins"
    ],
    correctAnswer: "An FPGA implements parallel hardware logic; a microcontroller executes sequential instructions in software",
    explanation: "FPGAs create custom hardware that operates in parallel across all configured logic. Microcontrollers run sequential software on a fixed CPU. FPGAs excel at parallelism; microcontrollers at control flow and ease of development."
  },
  {
    id: "fpga-5",
    question: "In Verilog, what is the difference between `wire` and `reg`?",
    options: [
      "`wire` stores values; `reg` is for continuous connections",
      "`wire` is for combinational signal connections; `reg` holds values assigned in procedural blocks (always/initial)",
      "`reg` is faster than `wire`",
      "`wire` requires a clock; `reg` does not"
    ],
    correctAnswer: "`wire` is for combinational signal connections; `reg` holds values assigned in procedural blocks (always/initial)",
    explanation: "`wire` represents a physical connection between components (driven by assign or module ports). `reg` is a variable assigned inside always or initial blocks — it doesn't necessarily infer a hardware register."
  },
  {
    id: "fpga-6",
    question: "What does the `assign` keyword do in Verilog?",
    options: [
      "Declares a new module",
      "Creates a continuous combinational assignment that updates whenever the RHS changes",
      "Defines a clock edge",
      "Instantiates a flip-flop"
    ],
    correctAnswer: "Creates a continuous combinational assignment that updates whenever the RHS changes",
    explanation: "`assign` implements combinational logic. The output updates immediately whenever any input on the right-hand side changes, similar to a wire connection in a schematic."
  },
  {
    id: "fpga-7",
    question: "What is the difference between combinational and sequential logic?",
    options: [
      "Combinational logic uses clocks; sequential logic does not",
      "Combinational logic output depends only on current inputs; sequential logic depends on current inputs and previous state",
      "Sequential logic is faster",
      "Combinational logic requires flip-flops"
    ],
    correctAnswer: "Combinational logic output depends only on current inputs; sequential logic depends on current inputs and previous state",
    explanation: "Combinational logic (adders, muxes, decoders) has outputs determined solely by current inputs. Sequential logic (counters, FSMs, registers) has memory elements that store state, making output depend on history."
  },
  {
    id: "fpga-8",
    question: "What is the purpose of `posedge clk` in an always block?",
    options: [
      "The block evaluates whenever any signal changes",
      "The block evaluates only on the rising edge of the clock signal",
      "The block evaluates on both clock edges",
      "The block is combinational"
    ],
    correctAnswer: "The block evaluates only on the rising edge of the clock signal",
    explanation: "`posedge clk` makes the always block synchronous to the rising edge of clk. This is the standard pattern for inferring flip-flops and registers in synthesis."
  },
  {
    id: "fpga-9",
    question: "What happens if an always block has an incomplete sensitivity list in simulation?",
    options: [
      "The synthesis tool ignores it",
      "The block may not simulate correctly (simulation mismatch) but synthesizes fine",
      "The synthesis tool adds the missing signals automatically",
      "Nothing changes"
    ],
    correctAnswer: "The block may not simulate correctly (simulation mismatch) but synthesizes fine",
    explanation: "In simulation, a missing signal in the sensitivity list means the block won't re-evaluate when that signal changes, causing incorrect behavior. Synthesis tools ignore sensitivity lists and infer logic from the block body. Use `always @(*)` for combinational logic."
  },
  {
    id: "fpga-10",
    question: "What is the conditional (ternary) operator in Verilog?",
    options: [
      "condition ? if_true : if_false",
      "if (condition) then if_true else if_false",
      "case condition of",
      "condition => if_true"
    ],
    correctAnswer: "condition ? if_true : if_false",
    explanation: "The ternary operator `? :` evaluates a condition and returns one of two expressions. It synthesizes to a multiplexer and is commonly used in assign statements for concise combinational logic."
  },
  {
    id: "fpga-11",
    question: "In VHDL, what is the equivalent of a Verilog `always` block?",
    options: [
      "A signal assignment",
      "A process block with a sensitivity list",
      "An entity declaration",
      "A component instantiation"
    ],
    correctAnswer: "A process block with a sensitivity list",
    explanation: "VHDL `process` blocks contain sequential statements triggered by signals in their sensitivity list, equivalent to Verilog `always` blocks. Both synthesize to combinational or sequential logic."
  },
  {
    id: "fpga-12",
    question: "What is the key syntactic difference between Verilog and VHDL?",
    options: [
      "Verilog uses Ada-like syntax; VHilog uses C-like syntax",
      "Verilog uses concise C-like syntax; VHDL uses verbose Ada-like syntax with explicit type declarations",
      "They share identical syntax",
      "VHDL has no type system"
    ],
    correctAnswer: "Verilog uses concise C-like syntax; VHDL uses verbose Ada-like syntax with explicit type declarations",
    explanation: "Verilog is more concise and C-like, making it quicker to write. VHDL is more verbose but strongly typed, catching more errors at compile time. Both are equally capable for RTL design."
  },
  {
    id: "fpga-13",
    question: "What is the difference between HDL simulation and synthesis?",
    options: [
      "They are the same process",
      "Simulation executes the HDL on a computer to verify behavior; synthesis converts HDL into a gate-level netlist for the target FPGA/ASIC",
      "Simulation requires a target device; synthesis does not",
      "Synthesis only works with VHDL"
    ],
    correctAnswer: "Simulation executes the HDL on a computer to verify behavior; synthesis converts HDL into a gate-level netlist for the target FPGA/ASIC",
    explanation: "Simulation tests functional and timing behavior using software models. Synthesis maps the HDL to physical primitives (LUTs, FFs, BRAMs) on the target device. Both are essential steps in the FPGA flow."
  },
  {
    id: "fpga-14",
    question: "What is a Verilog testbench?",
    options: [
      "A physical board used for testing",
      "An HDL module that instantiates the design under test (DUT), generates stimulus, and monitors outputs for verification",
      "A synthesis optimization script",
      "A约束 file for timing"
    ],
    correctAnswer: "An HDL module that instantiates the design under test (DUT), generates stimulus, and monitors outputs for verification",
    explanation: "A testbench is an unwritten Verilog/VHDL module that drives inputs and checks outputs of the DUT. It's used in simulation only (not synthesized) to verify functional correctness before hardware testing."
  },
  {
    id: "fpga-15",
    question: "What is clock domain crossing (CDC) and why is it dangerous?",
    options: [
      "Using the same clock for all logic",
      "Signals passing between flip-flops driven by different clocks, risking metastability and data corruption",
      "Routing the clock signal on a PCB",
      "Using a PLL to multiply the clock frequency"
    ],
    correctAnswer: "Signals passing between flip-flops driven by different clocks, risking metastability and data corruption",
    explanation: "When a signal crosses from one clock domain to another, the receiving flip-flop may sample during a setup/hold violation, causing metastability (indeterminate output). Synchronizer circuits (2-FF synchronizers) mitigate this risk."
  },
  {
    id: "fpga-16",
    question: "How does a 2-flip-flop synchronizer reduce metastability?",
    options: [
      "It eliminates metastability entirely",
      "It gives the first flip-flop's metastable output one full clock period to settle before sampling by the second flip-flop",
      "It uses a faster clock",
      "It adds a delay buffer"
    ],
    correctAnswer: "It gives the first flip-flop's metastable output one full clock period to settle before sampling by the second flip-flop",
    explanation: "The first FF may go metastable, but with a full clock period to resolve, the probability of the second FF also going metastable is extremely low. MTBF (mean time between failures) increases exponentially with the clock period."
  },
  {
    id: "fpga-17",
    question: "What is the typical structure of a 3-state FSM (Moore) in Verilog?",
    options: [
      "One always block handles both state register and next-state logic",
      "Two always blocks: one sequential block for the state register, one combinational block for next-state and output logic",
      "Three always blocks for each state",
      "A single assign statement"
    ],
    correctAnswer: "Two always blocks: one sequential block for the state register, one combinational block for next-state and output logic",
    explanation: "The standard FSM coding style uses one always @(posedge clk) block for the state register (sequential) and one always @(*) block for next-state and output logic (combinational). This cleanly separates concerns."
  },
  {
    id: "fpga-18",
    question: "What is Block RAM (BRAM) in an FPGA?",
    options: [
      "RAM made from flip-flops distributed across the logic fabric",
      "Dedicated embedded memory blocks (typically 18Kb or 36Kb) with synchronous read/write",
      "External DRAM connected via the FPGA's memory controller",
      "A configuration memory cell"
    ],
    correctAnswer: "Dedicated embedded memory blocks (typically 18Kb or 36Kb) with synchronous read/write",
    explanation: "BRAMs are dedicated memory resources embedded in the FPGA fabric. They are more efficient than distributed RAM (made from LUTs) for larger memories, offering synchronous read/write with minimal resource usage."
  },
  {
    id: "fpga-19",
    question: "What is setup time in the context of FPGA timing?",
    options: [
      "The time after the clock edge when data must remain stable",
      "The minimum time the data input must be stable BEFORE the active clock edge",
      "The clock propagation delay",
      "The time for a signal to propagate through combinational logic"
    ],
    correctAnswer: "The minimum time the data input must be stable BEFORE the active clock edge",
    explanation: "Setup time is the minimum data stability window before the clock edge. If data changes within this window, the flip-flop may not capture the correct value, causing a setup time violation."
  },
  {
    id: "fpga-20",
    question: "What is hold time?",
    options: [
      "The time data must be stable before the clock edge",
      "The minimum time the data input must remain stable AFTER the active clock edge",
      "The maximum clock frequency",
      "The time to load the bitstream"
    ],
    correctAnswer: "The minimum time the data input must remain stable AFTER the active clock edge",
    explanation: "Hold time ensures the flip-flop has captured the current data before it can change. A hold time violation means the new data overwrites the captured value too quickly. Hold violations are typically fixed by the synthesis/P&R tool."
  },
  {
    id: "fpga-21",
    question: "What is clock-to-Q delay?",
    options: [
      "The time from data input change to output change",
      "The propagation delay from the active clock edge to the flip-flop output becoming valid",
      "The combinational logic delay",
      "The I/O pad delay"
    ],
    correctAnswer: "The propagation delay from the active clock edge to the flip-flop output becoming valid",
    explanation: "Clock-to-Q (Tco) is the delay between the clock edge and the registered output. It contributes to the critical path: Tco + Tlogic + Trouting must fit within one clock period minus setup time."
  },
  {
    id: "fpga-22",
    question: "What is the purpose of XDC (Xilinx Design Constraints) or SDC (Synopsys Design Constraints) files?",
    options: [
      "They define the FPGA pinout and board layout",
      "They specify timing constraints (clock frequency, I/O delays), placement constraints, and physical rules for the synthesis and implementation tools",
      "They contain the Verilog source code",
      "They define the testbench waveforms"
    ],
    correctAnswer: "They specify timing constraints (clock frequency, I/O delays), placement constraints, and physical rules for the synthesis and implementation tools",
    explanation: "Constraint files tell the tools the target clock frequency, input/output timing requirements, and physical placement rules. Without proper constraints, the tools cannot optimize for your timing goals."
  },
  {
    id: "fpga-23",
    question: "What is High-Level Synthesis (HLS)?",
    options: [
      "Writing VHDL at a higher level of abstraction",
      "A tool that converts C/C++/SystemC/Python code into RTL (Verilog/VHDL) for FPGA implementation",
      "A simulation technique for large designs",
      "A method of manual gate-level design"
    ],
    correctAnswer: "A tool that converts C/C++/SystemC/Python code into RTL (Verilog/VHDL) for FPGA implementation",
    explanation: "HLS tools (Vitis HLS, Intel HLS, Catapult HLS) take algorithmic descriptions in C-like languages and synthesize them into RTL, dramatically reducing development time for dataflow-heavy applications."
  },
  {
    id: "fpga-24",
    question: "Why are FPGAs well-suited for CNN inference acceleration?",
    options: [
      "FPGAs have built-in neural network IP",
      "FPGAs can exploit massive parallelism in matrix multiplications and convolutions with custom dataflow pipelines",
      "FPGAs run Python natively",
      "FPGAs have higher clock speeds than GPUs"
    ],
    correctAnswer: "FPGAs can exploit massive parallelism in matrix multiplications and convolutions with custom dataflow pipelines",
    explanation: "CNNs are inherently parallel — thousands of multiply-accumulate operations can execute simultaneously. FPGAs allow custom datapath designs with pipelined MAC units, achieving high throughput at lower power than GPUs for inference."
  },
  {
    id: "fpga-25",
    question: "What are Yosys and nextpnr?",
    options: [
      "Commercial FPGA tools from Xilinx",
      "Open-source synthesis (Yosys) and place-and-route (nextpnr) tools for FPGA development",
      "Simulation waveform viewers",
      "Verilog linters only"
    ],
    correctAnswer: "Open-source synthesis (Yosys) and place-and-route (nextpnr) tools for FPGA development",
    explanation: "Yosys performs Verilog synthesis to a generic netlist, and nextpnr performs technology mapping, placement, and routing. They support Lattice ECP5, iCE40, and other FPGAs, enabling open-source FPGA flows."
  },
  {
    id: "fpga-26",
    question: "Which Lattice FPGA family is most commonly used with open-source tools?",
    options: [
      "Lattice MachXO3",
      "Lattice ECP5",
      "Lattice Nexus",
      "Lattice iCE40 UltraPlus"
    ],
    correctAnswer: "Lattice ECP5",
    explanation: "The Lattice ECP5 is the most capable FPGA fully supported by open-source tools (Yosys + nextpnr + Project Trellis). It offers DSP blocks, SERDES, and enough logic for significant designs, making it the community favorite."
  },
  {
    id: "fpga-27",
    question: "What is partial reconfiguration in an FPGA?",
    options: [
      "Rewriting the entire bitstream while the FPGA is powered",
      "Dynamically modifying a portion of the FPGA logic while the rest continues operating unchanged",
      "Reconfiguring only the I/O pins",
      "Updating the FPGA firmware via JTAG"
    ],
    correctAnswer: "Dynamically modifying a portion of the FPGA logic while the rest continues operating unchanged",
    explanation: "Partial reconfiguration allows swapping a region of the FPGA (a 'partition') at runtime without disrupting other regions. This enables time-multiplexed hardware, adaptive accelerators, and fault recovery."
  },
  {
    id: "fpga-28",
    question: "What is the role of a DSP slice in an FPGA?",
    options: [
      "To generate clock signals",
      "To provide dedicated hardware for multiply-accumulate operations, essential for DSP and machine learning workloads",
      "To interface with external DRAM",
      "To perform serial-to-parallel conversion"
    ],
    correctAnswer: "To provide dedicated hardware for multiply-accumulate operations, essential for DSP and machine learning workloads",
    explanation: "DSP slices (e.g., Xilinx DSP48, Intel DSP Blocks) contain pre-built multiplier-accumulator units that are faster and more power-efficient than implementing MAC in LUTs. They're critical for FIR filters, FFTs, and neural network inference."
  },
  {
    id: "fpga-29",
    question: "What is the typical FPGA development flow order?",
    options: [
      "Synthesis → Simulation → Implementation → Bitstream",
      "RTL Design → Functional Simulation → Synthesis → Place & Route → Timing Verification → Bitstream Generation",
      "Bitstream → Synthesis → Testing → Deployment",
      "Schematic → Layout → Manufacturing"
    ],
    correctAnswer: "RTL Design → Functional Simulation → Synthesis → Place & Route → Timing Verification → Bitstream Generation",
    explanation: "The standard flow: write RTL, verify in simulation, synthesize to gates, place and route on the target device, verify timing meets constraints, then generate the bitstream for programming the FPGA."
  },
  {
    id: "fpga-30",
    question: "What happens if timing constraints are not met after place-and-route?",
    options: [
      "The FPGA automatically corrects the timing",
      "The design may fail to operate correctly at the target clock frequency; the designer must optimize RTL, add pipelining, or relax constraints",
      "The bitstream is still generated but the FPGA will not program",
      "Nothing, timing violations are acceptable"
    ],
    correctAnswer: "The design may fail to operate correctly at the target clock frequency; the designer must optimize RTL, add pipelining, or relax constraints",
    explanation: "Unmet timing (setup violations) means the logic path is too long for the clock period. Solutions include: adding pipeline stages, optimizing critical paths, increasing clock period in constraints, or using faster FPGA speed grades."
  }
];
