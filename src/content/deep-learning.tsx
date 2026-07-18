import React from 'react';
import Callout from '@/components/course/Callout';
import CodeBlock from '@/components/course/CodeBlock';
import InteractiveDiagram from '@/components/course/InteractiveDiagram';
import MiniQuiz from '@/components/course/MiniQuiz';
import KeyTakeaways from '@/components/course/KeyTakeaways';
import CommonMistakes from '@/components/course/CommonMistakes';
import EngineeringChallenge from '@/components/course/EngineeringChallenge';
import AIChallenge from '@/components/course/AIChallenge';
import References from '@/components/course/References';
import FlashCard from '@/components/course/FlashCard';
import ExpandableCard from '@/components/course/ExpandableCard';
import HandsOnActivity from '@/components/course/HandsOnActivity';
import ThinkLikeAnEngineer from '@/components/course/ThinkLikeAnEngineer';

const flashCards = [
  { front: 'What is a neural network?', back: 'A layered collection of simple units (neurons) that apply weighted sums + non-linear activation to approximate complex functions.' },
  { front: 'What is backpropagation?', back: 'The algorithm that computes gradients of the loss with respect to every weight by applying the chain rule layer by layer, enabling gradient descent training.' },
  { front: 'What does ReLU do?', back: 'Rectified Linear Unit: max(0, x). It introduces non-linearity so deep networks can learn non-linear mappings.' },
  { front: 'What is a CNN?', back: 'Convolutional Neural Network — uses learnable kernels that slide over input to detect local patterns, sharing weights across spatial positions.' },
  { front: 'Why start with a small network on MCU?', back: 'MCU memory is limited (256KB SRAM typical). A smaller model fits, quantizes better, and infers faster.' },
];

const DeepLearningContent = () => {
  return (
    <>
      <p>
        Deep learning is machine learning with <strong>neural networks</strong> — layered
        collections of simple units (&ldquo;neurons&rdquo;) that, together, can approximate
        extraordinarily complex functions. Where classical ML needs you to hand-craft features,
        deep networks learn the features themselves, directly from raw signals or images.
      </p>

      <Callout type="important" title="Learning Objectives">
        After this module, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain how neurons, layers, and activation functions compose into a neural network.
        <br /><strong>2.</strong> Describe backpropagation and gradient descent training.
        <br /><strong>3.</strong> Build a 1D-CNN in PyTorch for signal classification.
        <br /><strong>4.</strong> Choose between MLP, CNN, and RNN architectures for different problems.
        <br /><strong>5.</strong> Quantize a deep model for MCU deployment.
      </Callout>

      <h2>The Neuron and Activation</h2>
      <p>
        A single neuron computes a weighted sum of its inputs, adds a bias, and passes the result
        through a non-linear <strong>activation function</strong>. Without that non-linearity,
        stacking layers would collapse into one linear layer and learn nothing interesting.
      </p>

      <CodeBlock
        filename="neuron.py"
        language="python"
        code={`import numpy as np

def neuron(x: np.ndarray, w: np.ndarray, b: float) -> float:
    z = np.dot(w, x) + b          # weighted sum + bias
    return np.maximum(0, z)       # ReLU activation: max(0, z)

# ReLU (rectified linear unit) is the workhorse activation in modern networks.
print(neuron(np.array([0.5, -1.2, 0.3]), np.array([0.8, 0.4, -0.6]), 0.1))`}
      />

      <Callout type="note" title="Why Layers?">
        Early layers learn edges and simple patterns; deeper layers combine them into shapes,
        then objects, then full concepts. Depth is what makes &ldquo;deep&rdquo; learning powerful
        — but it also demands more data and compute.
      </Callout>

      <InteractiveDiagram
        title="How a Signal Flows Through a Network"
        nodes={[
          { id: 'input', label: 'Input Layer', description: 'Raw features: a windowed sensor buffer or image pixels.' },
          { id: 'hidden', label: 'Hidden Layers', description: 'Stacked neurons with ReLU apply increasingly abstract transforms.' },
          { id: 'output', label: 'Output Layer', description: 'Softmax for classification, or a single value for regression.' },
          { id: 'loss', label: 'Loss & Backprop', description: 'Compare output to target; propagate error backward to update weights.' }
        ]}
      />

      <h2>Training: Backpropagation</h2>
      <p>
        Training minimizes a <strong>loss function</strong> (how wrong the predictions are) using
        gradient descent. <strong>Backpropagation</strong> efficiently computes the gradient of the
        loss with respect to every weight by applying the chain rule layer by layer. This is the
        engine behind every deep network.
      </p>

      <h2>Architectures You Will Actually Use</h2>
      <ul>
        <li><strong>MLP (Multilayer Perceptron)</strong> — tabular/feature data; the baseline.</li>
        <li><strong>CNN (Convolutional Neural Network)</strong> — images and 1-D signals; shares weights via kernels.</li>
        <li><strong>RNN / LSTM / GRU</strong> — time-series and sequences; remember past samples. Transformers are increasingly replacing these.</li>
      </ul>

      <CodeBlock
        filename="cnn_1d.py"
        language="python"
        code={`import torch
import torch.nn as nn

class VibrationCNN(nn.Module):
    def __init__(self, n_classes=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv1d(1, 16, kernel_size=7, stride=2),   # learn local waveform patterns
            nn.ReLU(),
            nn.MaxPool1d(2),
            nn.Conv1d(16, 32, kernel_size=5),
            nn.ReLU(),
            nn.AdaptiveAvgPool1d(1),
            nn.Flatten(),
            nn.Linear(32, n_classes),
        )

    def forward(self, x):
        return self.net(x)

model = VibrationCNN()
print(model(torch.randn(1, 1, 1024)).shape)   # (batch, classes)`}
      />

      <Callout type="warning">
        A 1-D CNN on a vibration signal and a 2-D CNN on a camera image are the same idea — local
        kernels that detect patterns. Start with a tiny network; deeper is not automatically
        better, especially on an MCU with kilobytes of RAM.
      </Callout>

      <MiniQuiz
        question="What does the activation function (e.g., ReLU) provide to a neural network?"
        options={[
          { id: 'a', text: 'It makes the network train faster by skipping layers.' },
          { id: 'b', text: 'It introduces non-linearity so stacked layers can learn complex functions.' },
          { id: 'c', text: 'It converts the output into text.' },
          { id: 'd', text: 'It removes the need for weights.' }
        ]}
        correctAnswerId="b"
        explanation="Without a non-linear activation, any stack of layers would compose into a single linear function. ReLU and friends let deep networks approximate highly non-linear mappings."
      />

      <ExpandableCard title="Advantages of Deep Learning" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Automatic feature learning</strong> — no manual DSP feature engineering needed</li>
          <li><strong>State-of-the-art accuracy</strong> — CNNs dominate image and signal tasks</li>
          <li><strong>Transfer learning</strong> — pre-trained models can be fine-tuned with small datasets</li>
          <li><strong>Scalability</strong> — performance improves with more data and compute</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Limitations for MCU Deployment" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Memory hungry</strong> — even small CNNs need 100KB+ of weights</li>
          <li><strong>Training requires GPU</strong> — MCUs cannot train, only run inference</li>
          <li><strong>Data hungry</strong> — deep models need thousands of labeled samples</li>
          <li><strong>Black box</strong> — harder to debug than a simple RandomForest</li>
        </ul>
      </ExpandableCard>

      <FlashCard cards={flashCards} title="Deep Learning — Flash Cards" />

      <HandsOnActivity
        title="Build a 1D-CNN for Vibration Classification"
        difficulty="Advanced"
        estimatedTime="60 minutes"
        objectives={[
          'Design a Conv1d architecture in PyTorch',
          'Train on pre-collected vibration data',
          'Evaluate with confusion matrix',
          'Quantize the model to int8 for MCU deployment'
        ]}
        materials={[
          'Python 3.10+ with PyTorch, scikit-learn',
          'Vibration dataset (CSV with accelerometer readings)',
          'Arduino Nano 33 BLE Sense (for deployment)'
        ]}
        steps={[
          { instruction: 'Load the vibration dataset and split into train/test sets.' },
          { instruction: 'Build a VibrationCNN with 2 Conv1d layers, MaxPool, and a linear output.' },
          { instruction: 'Train for 20 epochs with Adam optimizer and cross-entropy loss.' },
          { instruction: 'Evaluate: print confusion matrix and classification report.' },
          { instruction: 'Export to ONNX, then convert to TFLite int8 quantized model.' }
        ]}
        verification="Model achieves >88% accuracy on test set and quantized model size is <50KB."
      />

      <ThinkLikeAnEngineer
        problem="You have a trained CNN that classifies motor vibration with 94% accuracy on your PC. The client wants it running on an ESP32 with only 520KB SRAM. The model has 200K float32 parameters (800KB). How do you make it fit?"
        context="The ESP32 has dual-core Xtensa at 240MHz with 520KB SRAM. The model must infer in under 50ms for a 20Hz sensor pipeline."
        hints={[
          'Quantization from float32 to int8 reduces size by 4x',
          'Knowledge distillation can create a smaller student model',
          'Depthwise separable convolutions reduce parameters dramatically',
          'Consider reducing input resolution or window size'
        ]}
        explanation="Three complementary strategies: (1) Int8 quantization: 800KB → 200KB, fits easily. Accuracy drop: typically 1-2%. (2) Replace standard Conv2d with depthwise separable convolutions: reduces parameters by 8-9x with minimal accuracy loss. (3) Knowledge distillation: train a smaller 'student' network (e.g., 50K parameters) to mimic the larger model's softmax output. Combined approach: distill to 50K params (200KB float32), then quantize to int8 (50KB). Inference time on ESP32: ~15ms with CMSIS-NN optimized kernels."
        aiPrompt="Act as a Senior Embedded Systems Engineer specializing in TinyML. I have a 200K-parameter CNN (800KB float32) that achieves 94% accuracy on motor vibration classification. I need to deploy it on ESP32 (520KB SRAM, 240MHz dual-core). Design the compression pipeline including: quantization strategy, architecture optimization (depthwise separable convolutions), knowledge distillation approach, and inference optimization for ESP32. Provide specific numbers for model size, accuracy expectation, and inference time."
      />

      <KeyTakeaways
        points={[
          "Neurons apply weighted sums + non-linear activation; depth enables abstraction.",
          "Backpropagation trains networks by minimizing a loss via gradient descent.",
          "CNNs excel at images and 1-D signals; RNNs/LSTMs handle sequences.",
          "Start small: MCU memory forces compact, efficient architectures."
        ]}
      />

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Building a deep network when a shallow one suffices',
            why: 'More layers means more parameters, more data needed, and more memory on MCU.',
            fix: 'Start with the simplest architecture that works. Only add depth when the shallow model plateaus.',
          },
          {
            mistake: 'Forgetting to normalize input data',
            why: 'Neural networks are sensitive to input scale. Raw ADC values (0–4095) cause unstable training.',
            fix: 'Normalize inputs to [0, 1] or standardize to zero mean and unit variance before training.',
          },
          {
            mistake: 'Using softmax output for binary classification',
            why: 'Softmax with 2 outputs is redundant and wastes memory. Binary cross-entropy with a single sigmoid is more efficient.',
            fix: 'For 2-class problems, use nn.Linear(32, 1) + nn.Sigmoid() with BCELoss.',
          },
          {
            mistake: 'Deploying a float32 model to an MCU without quantization',
            why: 'A 100KB float32 model becomes 25KB when quantized to int8. Without quantization, you may run out of SRAM.',
            fix: 'Always quantize using TFLite or ONNX Runtime before flashing to hardware.',
          },
        ]}
      />

      <EngineeringChallenge
        title="Design a 1D-CNN for Audio Event Detection"
        description="Build a convolutional neural network that classifies environmental sounds from a microphone."
        difficulty="Advanced"
        steps={[
          { step: 'Collect 3 classes of audio: clapping, snapping, and silence. Record 30 samples of each at 16kHz.', hint: 'Use your phone or a USB microphone with Python sounddevice library.' },
          { step: 'Convert each recording to a mel-spectrogram using librosa.', hint: 'Use librosa.feature.melspectrogram with n_mels=64.' },
          { step: 'Design a CNN with 2-3 Conv1d layers, max pooling, and a dense output.', hint: 'Keep total parameters under 50K for MCU feasibility.' },
          { step: 'Train for 20 epochs with Adam optimizer and cross-entropy loss.', hint: 'Use 80/20 train/test split with stratification.' },
          { step: 'Evaluate: print the confusion matrix and identify which classes are confused.', hint: 'Use sklearn.metrics.confusion_matrix.' },
        ]}
        expectedOutcome="A trained 1D-CNN achieving >85% accuracy on 3-class audio classification, with under 50K parameters."
      />

      <AIChallenge
        title="Model Compression for MCU Deployment"
        role="Act as a Senior Embedded Systems Engineer specializing in TinyML deployment."
        objective="Help me compress a PyTorch CNN model to fit on an STM32F4 with 192KB SRAM while maintaining >90% accuracy."
        background="My model has 500K parameters in float32 (2MB). I need it under 128KB in int8 for deployment on STM32F407. Current accuracy is 93% on the validation set."
        requirements={[
          'Explain the quantization workflow from PyTorch to TFLite int8',
          'Provide code for post-training quantization using TFLite converter',
          'Suggest pruning strategies to reduce parameter count before quantization',
          'Estimate the expected accuracy loss after quantization and pruning',
          'Provide a deployment checklist for flashing the quantized model to STM32',
        ]}
        expectedOutput="A step-by-step compression pipeline with code, expected model size reduction, and deployment instructions."
        bestPractices={[
          'Quantize before pruning — quantization-aware training gives better results than post-training quantization.',
          'Test on real hardware immediately after quantization — simulator results may differ.',
          'Keep a float32 reference model for comparison during debugging.',
        ]}
      />

      <References
        references={[
          { title: 'Deep Learning — Goodfellow, Bengio, Courville', type: 'book', url: 'https://www.deeplearningbook.org/', description: 'The canonical reference for deep learning theory. Free online.' },
          { title: 'PyTorch Documentation', type: 'documentation', url: 'https://pytorch.org/docs/stable/', description: 'Official PyTorch docs with tutorials and API reference.' },
          { title: '3Blue1Brown — Neural Networks', type: 'video', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', description: 'The best visual intuition for backpropagation.' },
          { title: 'CS231n — Stanford', type: 'tutorial', url: 'https://cs231n.stanford.edu/', description: 'Convolutional networks for visual recognition.' },
          { title: 'TensorFlow Lite for Microcontrollers', type: 'documentation', url: 'https://www.tensorflow.org/lite/microcontrollers', description: 'Official guide for deploying quantized models to MCUs.' },
        ]}
      />
    </>
  );
};

export default DeepLearningContent;
