export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const signalProcessingQuestions: LessonQuestion[] = [
  {
    id: "dsp-1",
    question: "What does the Nyquist theorem state about sampling frequency?",
    options: [
      "Sampling frequency must equal the highest frequency component",
      "Sampling frequency must be at least twice the highest frequency component",
      "Sampling frequency must be half the signal bandwidth",
      "Sampling frequency must be four times the signal frequency"
    ],
    correctAnswer: "Sampling frequency must be at least twice the highest frequency component",
    explanation: "The Nyquist-Shannon theorem states fs >= 2*fmax to avoid aliasing. Sampling below this rate causes frequency folding that cannot be reversed."
  },
  {
    id: "dsp-2",
    question: "What is the primary advantage of FFT over DFT?",
    options: [
      "FFT provides higher frequency resolution",
      "FFT computes the same result with O(N log N) complexity instead of O(N^2)",
      "FFT only works on real-valued signals",
      "FFT eliminates the need for windowing"
    ],
    correctAnswer: "FFT computes the same result with O(N log N) complexity instead of O(N^2)",
    explanation: "The Cooley-Tukey FFT algorithm reduces DFT computation from N^2 to N log N multiplications by exploiting twiddle factor symmetry and decomposition into smaller DFTs."
  },
  {
    id: "dsp-3",
    question: "What is aliasing in digital signal processing?",
    options: [
      "Amplitude distortion due to amplifier nonlinearity",
      "High-frequency components appearing as lower frequencies after sampling",
      "Phase shift introduced by digital filters",
      "Quantization noise from ADC conversion"
    ],
    correctAnswer: "High-frequency components appearing as lower frequencies after sampling",
    explanation: "When a signal contains frequencies above fs/2, these fold back into the baseband spectrum, creating false low-frequency components indistinguishable from real ones."
  },
  {
    id: "dsp-4",
    question: "Which type of filter has a linear phase response in the passband?",
    options: [
      "IIR Butterworth filter",
      "IIR Chebyshev Type I filter",
      "FIR filter with symmetric coefficients",
      "IIR elliptic filter"
    ],
    correctAnswer: "FIR filter with symmetric coefficients",
    explanation: "Symmetric FIR filters have linear phase, meaning all frequency components experience the same group delay. IIR filters inherently have nonlinear phase."
  },
  {
    id: "dsp-5",
    question: "What is the main disadvantage of IIR filters compared to FIR filters?",
    options: [
      "Higher computational cost per sample",
      "Inability to implement low-pass responses",
      "Potential for instability due to feedback poles outside the unit circle",
      "Requires more memory for filter state"
    ],
    correctAnswer: "Potential for instability due to feedback poles outside the unit circle",
    explanation: "IIR filters use feedback, and if coefficient quantization or round-off errors push poles outside the unit circle, the filter becomes unstable. FIR filters are inherently stable."
  },
  {
    id: "dsp-6",
    question: "What is the purpose of an anti-aliasing filter?",
    options: [
      "Boost high-frequency components before sampling",
      "Remove frequency components above fs/2 before digitization",
      "Increase the sampling rate of a digital signal",
      "Reduce quantization noise in the ADC output"
    ],
    correctAnswer: "Remove frequency components above fs/2 before digitization",
    explanation: "An anti-aliasing filter is an analog low-pass filter placed before the ADC to ensure no frequencies above the Nyquist limit enter the sampler, preventing aliasing."
  },
  {
    id: "dsp-7",
    question: "Which windowing function provides the best side-lobe attenuation?",
    options: [
      "Rectangular window",
      "Hamming window",
      "Hanning window",
      "Blackman window"
    ],
    correctAnswer: "Blackman window",
    explanation: "The Blackman window achieves approximately -58 dB side-lobe level, better than Hamming (-43 dB) and Hanning (-31 dB), at the cost of a wider main lobe."
  },
  {
    id: "dsp-8",
    question: "What does convolution represent in signal processing?",
    options: [
      "Multiplication of two signals in the time domain",
      "The output of a linear time-invariant system for a given input",
      "The frequency spectrum of a signal",
      "The autocorrelation of a signal"
    ],
    correctAnswer: "The output of a linear time-invariant system for a given input",
    explanation: "Convolution of input x[n] with impulse response h[n] gives y[n] = x[n] * h[n], which is the complete output of an LTI system. It is equivalent to multiplication in the frequency domain."
  },
  {
    id: "dsp-9",
    question: "In the Z-transform, what does a pole outside the unit circle indicate?",
    options: [
      "The system is causal and stable",
      "The system is unstable",
      "The system has linear phase",
      "The system is FIR"
    ],
    correctAnswer: "The system is unstable",
    explanation: "For a causal LTI system to be stable, all poles of its transfer function H(z) must lie inside the unit circle. A pole outside means the impulse response grows unbounded."
  },
  {
    id: "dsp-10",
    question: "What is the sampling rate used for CD-quality audio?",
    options: [
      "8 kHz",
      "16 kHz",
      "44.1 kHz",
      "48 kHz"
    ],
    correctAnswer: "44.1 kHz",
    explanation: "CD audio uses 44.1 kHz sampling rate, chosen to cover the human hearing range up to ~20 kHz with margin. The 44.1 kHz rate historically came from video recorder storage constraints."
  },
  {
    id: "dsp-11",
    question: "What is the key difference between fixed-point and floating-point DSP?",
    options: [
      "Floating-point DSP cannot process audio signals",
      "Fixed-point uses integer arithmetic with limited dynamic range, floating-point uses exponent-based representation",
      "Fixed-point is always faster than floating-point",
      "Floating-point cannot be used on microcontrollers"
    ],
    correctAnswer: "Fixed-point uses integer arithmetic with limited dynamic range, floating-point uses exponent-based representation",
    explanation: "Fixed-point arithmetic uses fixed binary point positions, requiring careful scaling to avoid overflow. Floating-point provides wider dynamic range but costs more silicon area and power."
  },
  {
    id: "dsp-12",
    question: "What does a band-stop filter do?",
    options: [
      "Passes only frequencies between two cutoff frequencies",
      "Attenuates frequencies below a cutoff frequency",
      "Attenuates frequencies above a cutoff frequency",
      "Attenuates frequencies within a specific range while passing others"
    ],
    correctAnswer: "Attenuates frequencies within a specific range while passing others",
    explanation: "A band-stop (notch) filter removes a specific frequency band while passing frequencies above and below. It is commonly used to remove power-line hum at 50/60 Hz."
  },
  {
    id: "dsp-13",
    question: "What is the primary use of the Hamming window in spectral analysis?",
    options: [
      "Increasing signal amplitude",
      "Reducing spectral leakage when computing the DFT of a finite-length signal",
      "Eliminating quantization noise",
      "Converting analog signals to digital"
    ],
    correctAnswer: "Reducing spectral leakage when computing the DFT of a finite-length signal",
    explanation: "Windowing tapers the signal edges to zero, reducing discontinuities at the DFT frame boundaries. The Hamming window offers a good trade-off between main-lobe width and side-lobe suppression."
  },
  {
    id: "dsp-14",
    question: "In MATLAB, what does the `fftshift` function do?",
    options: [
      "Reverses the input signal in time",
      "Shifts the zero-frequency component to the center of the spectrum",
      "Applies a high-pass filter to the signal",
      "Converts a real signal to analytic form"
    ],
    correctAnswer: "Shifts the zero-frequency component to the center of the spectrum",
    explanation: "fftshift rearranges the FFT output so that DC is centered, swapping the left and right halves. This makes the spectrum easier to visualize in a symmetric frequency range."
  },
  {
    id: "dsp-15",
    question: "What bit depth corresponds to a theoretical dynamic range of approximately 96 dB?",
    options: [
      "8-bit",
      "12-bit",
      "16-bit",
      "24-bit"
    ],
    correctAnswer: "16-bit",
    explanation: "Dynamic range for PCM audio is approximately 6.02*N dB, where N is bit depth. For 16-bit audio: 6.02 * 16 = 96.3 dB, which is why CD audio uses 16-bit quantization."
  }
];
