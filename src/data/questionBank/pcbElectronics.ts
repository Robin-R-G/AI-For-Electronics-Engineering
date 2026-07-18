export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const pcbElectronicsQuestions: LessonQuestion[] = [
  {
    id: "pcb-1",
    question: "What is the minimum number of layers required for a PCB to have a dedicated ground plane?",
    options: ["1 layer", "2 layers", "4 layers", "8 layers"],
    correctAnswer: "2 layers",
    explanation: "A 2-layer PCB can dedicate one entire side as a ground plane, though 4-layer stackups provide better signal integrity with dedicated ground and power planes."
  },
  {
    id: "pcb-2",
    question: "What is the primary purpose of a PCB stackup?",
    options: [
      "To determine the board's physical thickness",
      "To define the arrangement of copper and dielectric layers for impedance control and EMI reduction",
      "To specify the solder mask color",
      "To calculate the board's weight"
    ],
    correctAnswer: "To define the arrangement of copper and dielectric layers for impedance control and EMI reduction",
    explanation: "The stackup defines layer ordering, copper weights, and dielectric thicknesses, which directly affect impedance, crosstalk, and electromagnetic emissions."
  },
  {
    id: "pcb-3",
    question: "For a 1 oz copper PCB, what does '1 oz' refer to?",
    options: [
      "The weight of the finished board",
      "The thickness of copper on one square foot of copper foil (~35 µm)",
      "The current capacity of the widest trace",
      "The amount of solder paste per pad"
    ],
    correctAnswer: "The thickness of copper on one square foot of copper foil (~35 µm)",
    explanation: "1 oz copper means one ounce of copper spread over one square foot, yielding approximately 35 µm (1.4 mil) thickness. This is the standard copper weight for most PCBs."
  },
  {
    id: "pcb-4",
    question: "What is the key difference between schematic capture and PCB layout?",
    options: [
      "Schematic capture defines physical trace routing; layout defines connections",
      "Schematic capture defines electrical connectivity and netlist; layout defines physical geometry and placement",
      "They are the same process in different EDA tools",
      "Schematic capture handles power; layout handles signals"
    ],
    correctAnswer: "Schematic capture defines electrical connectivity and netlist; layout defines physical geometry and placement",
    explanation: "Schematic capture captures the logical design (connections, component values), while PCB layout translates that netlist into physical copper traces, component placement, and manufacturing data."
  },
  {
    id: "pcb-5",
    question: "What is a component footprint (land pattern)?",
    options: [
      "The 3D model of a component body",
      "The schematic symbol used in the design",
      "The pattern of copper pads on the PCB where a component is soldered",
      "The component's thermal resistance rating"
    ],
    correctAnswer: "The pattern of copper pads on the PCB where a component is soldered",
    explanation: "A footprint (or land pattern) defines the pad size, shape, spacing, and courtyard for soldering a component to the PCB. It must match the physical component package."
  },
  {
    id: "pcb-6",
    question: "Why are decoupling capacitors placed as close as possible to IC power pins?",
    options: [
      "To reduce the total BOM cost",
      "To minimize parasitic inductance in the current path, providing fast transient current",
      "To increase the board's total capacitance",
      "To improve thermal dissipation"
    ],
    correctAnswer: "To minimize parasitic inductance in the current path, providing fast transient current",
    explanation: "Decoupling caps supply instantaneous current during IC switching. The trace and via inductance between the cap and the IC pin creates a voltage drop, so shorter paths reduce this parasitic inductance."
  },
  {
    id: "pcb-7",
    question: "Which capacitor value is most commonly used for high-frequency decoupling near digital ICs?",
    options: ["100 µF", "10 µF", "100 nF (0.1 µF)", "1 pF"],
    correctAnswer: "100 nF (0.1 µF)",
    explanation: "100 nF ceramic capacitors offer a good balance of low impedance at typical digital switching frequencies (1–100 MHz) and reasonable cost. Smaller values like 1 nF handle even higher frequencies."
  },
  {
    id: "pcb-8",
    question: "What is the purpose of a ground plane on a PCB?",
    options: [
      "To increase the board's structural rigidity",
      "To provide a low-impedance return path for signals and reduce EMI",
      "To act as a heat spreader only",
      "To carry the main power supply current"
    ],
    correctAnswer: "To provide a low-impedance return path for signals and reduce EMI",
    explanation: "A ground plane provides a low-inductance return path for high-frequency currents, which reduces loop area and radiated emissions. It also helps with impedance control for controlled-impedance traces."
  },
  {
    id: "pcb-9",
    question: "What happens to return current when a high-speed signal trace crosses a gap in the ground plane?",
    options: [
      "Nothing significant occurs",
      "The return current flows around the gap, increasing loop area and causing EMI and signal integrity issues",
      "The return current stops entirely",
      "The signal is attenuated to zero"
    ],
    correctAnswer: "The return current flows around the gap, increasing loop area and causing EMI and signal integrity issues",
    explanation: "A gap in the ground plane forces the return current to detour, increasing the loop area. This increases inductance, causes ground bounce, radiates EMI, and can create timing violations."
  },
  {
    id: "pcb-10",
    question: "What is microstrip transmission line geometry?",
    options: [
      "A trace sandwiched between two ground planes",
      "A trace on the outer layer with a ground plane beneath it, separated by dielectric",
      "A trace routed through the board interior",
      "A coaxial cable embedded in the PCB"
    ],
    correctAnswer: "A trace on the outer layer with a ground plane beneath it, separated by dielectric",
    explanation: "Microstrip is a trace on an outer copper layer referenced to an adjacent ground or power plane. The dielectric between trace and reference plane, along with trace width, determines characteristic impedance."
  },
  {
    id: "pcb-11",
    question: "How does stripline differ from microstrip?",
    options: [
      "Stripline is only used for power distribution",
      "Stripline has the trace embedded between two reference planes, providing better EMI shielding",
      "Stripline requires no reference plane",
      "Stripline is only for analog signals"
    ],
    correctAnswer: "Stripline has the trace embedded between two reference planes, providing better EMI shielding",
    explanation: "Stripline places the signal trace between two ground (or power) planes inside the PCB stackup. This shields the trace, reducing radiation, but increases dielectric loss and manufacturing complexity."
  },
  {
    id: "pcb-12",
    question: "For USB 2.0 differential pair routing, what is the typical target differential impedance?",
    options: ["50 Ω single-ended", "75 Ω single-ended", "90 Ω differential", "100 Ω differential"],
    correctAnswer: "90 Ω differential",
    explanation: "USB 2.0 specifies a 90 Ω differential impedance (±15%). Ethernet uses 100 Ω differential. Matching the cable and connector impedance prevents reflections."
  },
  {
    id: "pcb-13",
    question: "When routing differential pairs, what must be maintained along the trace length?",
    options: [
      "Maximum possible trace separation",
      "Constant spacing between the pair and matched trace lengths (intra-pair skew minimization)",
      "Identical trace widths for power and ground",
      "Maximum trace width"
    ],
    correctAnswer: "Constant spacing between the pair and matched trace lengths (intra-pair skew minimization)",
    explanation: "Differential pairs rely on tight coupling and equal delay. Intra-pair skew (length mismatch) converts differential signal to common-mode, degrading signal quality and increasing EMI."
  },
  {
    id: "pcb-14",
    question: "What is the primary function of thermal vias under a QFN or BGA pad?",
    options: [
      "To route signals under the pad",
      "To conduct heat from the component to inner copper planes or the opposite board side",
      "To reduce solder paste volume",
      "To provide mechanical support"
    ],
    correctAnswer: "To conduct heat from the component to inner copper planes or the opposite board side",
    explanation: "Thermal vias create a low-thermal-resistance path from the exposed pad of a package to internal ground/power planes that act as heat sinks, improving thermal performance."
  },
  {
    id: "pcb-15",
    question: "What does a DRC (Design Rule Check) verify?",
    options: [
      "Whether the schematic netlist is correct",
      "Whether the PCB layout meets manufacturing constraints (trace width, spacing, drill sizes, clearances)",
      "Whether the firmware compiles correctly",
      "Whether the BOM matches supplier inventory"
    ],
    correctAnswer: "Whether the PCB layout meets manufacturing constraints (trace width, spacing, drill sizes, clearances)",
    explanation: "DRC checks the physical layout against rules from the fabricator (minimum trace width, clearance, annular ring, drill size, etc.) to ensure the board can be manufactured."
  },
  {
    id: "pcb-16",
    question: "What does an ERC (Electrical Rule Check) verify in schematic design?",
    options: [
      "Trace widths on the PCB",
      "Unconnected pins, conflicting drivers, and invalid electrical connections in the schematic",
      "Thermal pad connections",
      "Component placement on the board"
    ],
    correctAnswer: "Unconnected pins, conflicting drivers, and invalid electrical connections in the schematic",
    explanation: "ERC flags issues like unconnected inputs, multiple outputs driving the same net, floating pins, and power-to-ground shorts before the design moves to layout."
  },
  {
    id: "pcb-17",
    question: "What files are included in a standard Gerber manufacturing package?",
    options: [
      "Only the top copper layer",
      "Copper layers (top, bottom, inner), solder mask, silkscreen, drill files, and board outline",
      "Only the schematic PDF",
      "Source code and firmware binaries"
    ],
    correctAnswer: "Copper layers (top, bottom, inner), solder mask, silkscreen, drill files, and board outline",
    explanation: "A complete Gerber package includes all fabrication layers (copper, mask, silk, paste), NC drill files (.drl), and board outline (GKO/GM1) for the manufacturer to fabricate and assemble the board."
  },
  {
    id: "pcb-18",
    question: "What is the primary difference between SMD and through-hole components?",
    options: [
      "SMD components are always cheaper",
      "SMD components are soldered to surface pads; through-hole components have leads that pass through drilled holes",
      "Through-hole components are smaller",
      "SMD components cannot handle power"
    ],
    correctAnswer: "SMD components are soldered to surface pads; through-hole components have leads that pass through drilled holes",
    explanation: "SMD (surface-mount) components sit on the board surface and are reflow-soldered, enabling higher density. Through-hole components use drilled pads and are common for connectors, large capacitors, and high-reliability applications."
  },
  {
    id: "pcb-19",
    question: "Why is analog ground often separated from digital ground on a mixed-signal PCB?",
    options: [
      "To reduce board cost",
      "To prevent high-frequency digital switching noise from coupling into sensitive analog circuits through the shared ground impedance",
      "Because they require different voltage levels",
      "To simplify the schematic"
    ],
    correctAnswer: "To prevent high-frequency digital switching noise from coupling into sensitive analog circuits through the shared ground impedance",
    explanation: "Digital circuits generate ground bounce and return current noise. A star-ground or split-plane topology isolates this noise from analog references, then ties grounds at a single point to avoid ground loops."
  },
  {
    id: "pcb-20",
    question: "What is the main advantage of a switching regulator over an LDO?",
    options: [
      "Lower output noise",
      "Higher efficiency, especially with large voltage drops, due to energy storage in an inductor",
      "Simpler design with no external components",
      "Faster transient response"
    ],
    correctAnswer: "Higher efficiency, especially with large voltage drops, due to energy storage in an inductor",
    explanation: "Switching regulators (buck, boost) use inductors and capacitors to transfer energy with low losses, achieving 85–95% efficiency. LDOs dissipate the voltage difference as heat, which is inefficient for large drops."
  },
  {
    id: "pcb-21",
    question: "What is the role of an anti-aliasing filter before an ADC?",
    options: [
      "To amplify the input signal",
      "To remove frequency components above the Nyquist frequency, preventing aliasing artifacts",
      "To convert digital signals to analog",
      "To increase the ADC's resolution"
    ],
    correctAnswer: "To remove frequency components above the Nyquist frequency, preventing aliasing artifacts",
    explanation: "According to the Nyquist theorem, signals above half the sampling frequency alias into the baseband. An anti-aliasing filter (typically a low-pass RC or active filter) attenuates these before sampling."
  },
  {
    id: "pcb-22",
    question: "What does the slew rate of an op-amp specify?",
    options: [
      "The maximum input voltage",
      "The maximum rate of change of the output voltage (V/µs)",
      "The input bias current",
      "The open-loop gain"
    ],
    correctAnswer: "The maximum rate of change of the output voltage (V/µs)",
    explanation: "S slew rate limits how fast the output can change. If a signal demands a faster rate, the output distorts. It determines the maximum undistorted output frequency for a given amplitude."
  },
  {
    id: "pcb-23",
    question: "What is the function of a pull-up resistor on an open-drain output?",
    options: [
      "To limit the maximum current",
      "To pull the output to a defined high logic level when the open-drain transistor is off",
      "To increase the switching speed",
      "To protect against ESD"
    ],
    correctAnswer: "To pull the output to a defined high logic level when the open-drain transistor is off",
    explanation: "Open-drain outputs can only pull low actively. A pull-up resistor defines the high state voltage level and provides the current source for the high state."
  },
  {
    id: "pcb-24",
    question: "What is the cutoff frequency formula for a first-order RC low-pass filter?",
    options: [
      "f_c = R × C",
      "f_c = 1 / (2π × R × C)",
      "f_c = 2π / (R × C)",
      "f_c = R / (2π × C)"
    ],
    correctAnswer: "f_c = 1 / (2π × R × C)",
    explanation: "The -3dB cutoff frequency is where the output power drops to half. At this frequency, the capacitive reactance equals the resistance (X_C = R)."
  },
  {
    id: "pcb-25",
    question: "What is the main purpose of a copper pour (copper fill) on a PCB?",
    options: [
      "To make the board heavier",
      "To improve signal routing density",
      "To reduce ground impedance, improve thermal dissipation, and reduce EMI",
      "To replace the solder mask"
    ],
    correctAnswer: "To reduce ground impedance, improve thermal dissipation, and reduce EMI",
    explanation: "Copper pours connected to ground or power reduce impedance, provide shielding, improve heat spreading, and reduce manufacturing defects from etching large empty copper areas."
  }
];
