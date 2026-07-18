export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const controlRoboticsQuestions: LessonQuestion[] = [
  {
    id: "control-1",
    question: "What does the integral term in a PID controller do?",
    options: [
      "Reduces rise time by predicting future error",
      "Eliminates steady-state error by accumulating past errors",
      "Dampens oscillations by reacting to rate of change",
      "Sets the initial output value at startup"
    ],
    correctAnswer: "Eliminates steady-state error by accumulating past errors",
    explanation: "The integral term sums error over time, driving the output until the error reaches zero. Without it, proportional-only control leaves a residual steady-state offset."
  },
  {
    id: "control-2",
    question: "In the Ziegler-Nichols tuning method, what is the ultimate gain Ku?",
    options: [
      "The gain at which the system responds fastest",
      "The proportional gain at which the system oscillates with constant amplitude",
      "The maximum safe gain for the actuator",
      "The gain that produces zero steady-state error"
    ],
    correctAnswer: "The proportional gain at which the system oscillates with constant amplitude",
    explanation: "Ku is found by increasing Kp until the system reaches sustained oscillation. The oscillation period Tu is then used with Ku to calculate PID gains using Ziegler-Nichols formulas."
  },
  {
    id: "control-3",
    question: "What distinguishes a closed-loop control system from an open-loop system?",
    options: [
      "Closed-loop systems are always faster",
      "Closed-loop systems use sensor feedback to adjust the output based on actual performance",
      "Closed-loop systems cannot use digital controllers",
      "Open-loop systems require more complex hardware"
    ],
    correctAnswer: "Closed-loop systems use sensor feedback to adjust the output based on actual performance",
    explanation: "Closed-loop systems measure the output and compare it to the desired setpoint, adjusting the control input accordingly. This enables disturbance rejection and reduced sensitivity to parameter variations."
  },
  {
    id: "control-4",
    question: "What does gain margin measure on a Bode plot?",
    options: [
      "The phase shift at the gain crossover frequency",
      "How much the system gain can increase before the system becomes unstable",
      "The bandwidth of the closed-loop system",
      "The steady-state error of the system"
    ],
    correctAnswer: "How much the system gain can increase before the system becomes unstable",
    explanation: "Gain margin is the additional gain (in dB) needed to bring the system to the instability boundary at the phase crossover frequency. A positive gain margin indicates stability."
  },
  {
    id: "control-5",
    question: "What is the typical role of the derivative term in a PID controller?",
    options: [
      "Eliminate steady-state error",
      "Reduce overshoot by dampening the response to rapid error changes",
      "Increase the system gain",
      "Convert the system from open-loop to closed-loop"
    ],
    correctAnswer: "Reduce overshoot by dampening the response to rapid error changes",
    explanation: "The derivative term acts on the rate of change of error, providing a damping effect that reduces overshoot and settling time. It is sensitive to noise, so it is often filtered."
  },
  {
    id: "control-6",
    question: "What is phase margin on a Bode plot?",
    options: [
      "The amount of additional phase lag needed at the gain crossover frequency to reach -180 degrees",
      "The gain at the phase crossover frequency",
      "The difference between input and output phase at DC",
      "The phase shift introduced by the controller alone"
    ],
    correctAnswer: "The amount of additional phase lag needed at the gain crossover frequency to reach -180 degrees",
    explanation: "Phase margin measures how far the system is from the instability boundary at the gain crossover frequency. A phase margin of 45-60 degrees is typically desired for good damping."
  },
  {
    id: "control-7",
    question: "What is the main advantage of state-space representation over transfer functions?",
    options: [
      "State-space is limited to SISO systems",
      "State-space can represent MIMO systems and internal state variables",
      "State-space does not require a mathematical model",
      "State-space always produces lower-order models"
    ],
    correctAnswer: "State-space can represent MIMO systems and internal state variables",
    explanation: "State-space representation uses first-order differential equations in matrix form, naturally handling multiple inputs/outputs and exposing internal states that transfer functions hide."
  },
  {
    id: "control-8",
    question: "What is the key difference between robot kinematics and dynamics?",
    options: [
      "Kinematics deals with forces, dynamics deals with positions",
      "Kinematics describes motion geometry without forces; dynamics includes forces and torques",
      "Kinematics requires a computer, dynamics does not",
      "They are two names for the same concept"
    ],
    correctAnswer: "Kinematics describes motion geometry without forces; dynamics includes forces and torques",
    explanation: "Kinematics maps joint angles to end-effector positions/orientations. Dynamics extends this by incorporating masses, inertias, and applied forces to determine motion."
  },
  {
    id: "control-9",
    question: "What is the main advantage of a stepper motor over a DC motor for positioning?",
    options: [
      "Higher efficiency at all speeds",
      "Precise open-loop position control through discrete step increments",
      "Lower cost for all applications",
      "Higher continuous torque at low speeds"
    ],
    correctAnswer: "Precise open-loop position control through discrete step increments",
    explanation: "Stepper motors move in fixed angular steps, allowing precise positioning without feedback. This eliminates the need for encoders in many applications, reducing cost and complexity."
  },
  {
    id: "control-10",
    question: "What is the difference between an incremental and absolute encoder?",
    options: [
      "Incremental encoders output absolute position at power-up; absolute encoders do not",
      "Incremental encoders produce pulse trains indicating relative motion; absolute encoders output the exact position",
      "Absolute encoders are always cheaper",
      "Incremental encoders have higher resolution"
    ],
    correctAnswer: "Incremental encoders produce pulse trains indicating relative motion; absolute encoders output the exact position",
    explanation: "Incremental encoders generate A/B quadrature pulses and require a reference mark for homing. Absolute encoders use Gray code or other schemes to provide the exact position immediately at power-up."
  },
  {
    id: "control-11",
    question: "What is the primary purpose of ROS (Robot Operating System)?",
    options: [
      "To replace the robot's real-time operating system",
      "To provide a middleware framework for robot software development with standardized communication",
      "To control robot hardware directly without an OS",
      "To simulate robots without physical hardware"
    ],
    correctAnswer: "To provide a middleware framework for robot software development with standardized communication",
    explanation: "ROS provides a publish-subscribe messaging framework, tools for visualization (RViz), simulation (Gazebo), and a large ecosystem of reusable packages, though it is not a real-time OS itself."
  },
  {
    id: "control-12",
    question: "What happens when a PID controller's proportional gain is set too high?",
    options: [
      "The system response becomes sluggish",
      "The system oscillates and may become unstable",
      "The steady-state error increases",
      "The integral windup increases"
    ],
    correctAnswer: "The system oscillates and may become unstable",
    explanation: "Excessive proportional gain amplifies errors aggressively, causing overshoot and oscillation. Beyond a critical gain, the system becomes unstable with growing oscillations."
  },
  {
    id: "control-13",
    question: "What is a servo motor typically used for in robotics?",
    options: [
      "Continuous high-speed rotation like a conveyor belt",
      "Precise angular position control with built-in feedback and drive electronics",
      "Generating electrical power from mechanical motion",
      "Vibration isolation in sensitive equipment"
    ],
    correctAnswer: "Precise angular position control with built-in feedback and drive electronics",
    explanation: "Servo motors integrate a motor, position sensor (potentiometer or encoder), and control circuit in one package. They accept a position command and internally close the loop to reach the target angle."
  },
  {
    id: "control-14",
    question: "What does a Bode plot show?",
    options: [
      "Time-domain step response of a system",
      "Magnitude and phase of a system's frequency response versus frequency",
      "Root locations of the characteristic equation",
      "The state-space matrix eigenvalues"
    ],
    correctAnswer: "Magnitude and phase of a system's frequency response versus frequency",
    explanation: "A Bode plot consists of two graphs: magnitude (in dB) and phase (in degrees) versus frequency on a logarithmic scale. It is used to assess stability margins and frequency-domain behavior."
  },
  {
    id: "control-15",
    question: "What is integral windup in a PID controller?",
    options: [
      "When the derivative term causes excessive oscillation",
      "When the integral term accumulates large error during saturation, causing overshoot after recovery",
      "When the proportional gain is too low",
      "When the sensor feedback is noisy"
    ],
    correctAnswer: "When the integral term accumulates large error during saturation, causing overshoot after recovery",
    explanation: "If the actuator saturates, the integrator keeps accumulating error. When the system returns to the linear range, the large accumulated integral causes significant overshoot. Anti-windup techniques reset or limit the integrator."
  }
];
