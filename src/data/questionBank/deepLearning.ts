export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const deepLearningQuestions: LessonQuestion[] = [
  {
    id: "dl-1",
    question: "What is the primary purpose of an activation function in a neural network?",
    options: [
      "To initialize weights",
      "To introduce non-linearity",
      "To reduce overfitting",
      "To normalize inputs"
    ],
    correctAnswer: "To introduce non-linearity",
    explanation: "Activation functions introduce non-linearity, allowing the network to learn complex patterns beyond simple linear mappings."
  },
  {
    id: "dl-2",
    question: "Which activation function is most commonly used in hidden layers due to its computational efficiency and reduced vanishing gradient problem?",
    options: [
      "Sigmoid",
      "Tanh",
      "ReLU",
      "Softmax"
    ],
    correctAnswer: "ReLU",
    explanation: "ReLU is computationally simple (max(0, x)) and avoids saturation in the positive domain, reducing vanishing gradients compared to sigmoid/tanh."
  },
  {
    id: "dl-3",
    question: "In a convolutional neural network, what does a 3x3 kernel with stride 1 and padding 'same' produce?",
    options: [
      "Output smaller than input",
      "Output same spatial size as input",
      "Output twice the input size",
      "Output depends on number of filters"
    ],
    correctAnswer: "Output same spatial size as input",
    explanation: "Same padding adds zeros around the input so that the output spatial dimensions match the input when using stride 1."
  },
  {
    id: "dl-4",
    question: "What is the vanishing gradient problem?",
    options: [
      "Gradients become too large, causing divergence",
      "Gradients shrink exponentially through deep layers, slowing learning",
      "Gradients oscillate and never converge",
      "Gradients are zero everywhere in the network"
    ],
    correctAnswer: "Gradients shrink exponentially through deep layers, slowing learning",
    explanation: "In deep networks with saturating activations like sigmoid, gradients are multiplied by values < 1 at each layer, causing them to vanish."
  },
  {
    id: "dl-5",
    question: "What does max pooling do in a CNN?",
    options: [
      "Averages values in each pooling window",
      "Takes the maximum value in each pooling window",
      "Convolves with a learnable filter",
      "Applies dropout to the feature map"
    ],
    correctAnswer: "Takes the maximum value in each pooling window",
    explanation: "Max pooling downsamples by taking the maximum value in each local region, providing translation invariance and reducing computation."
  },
  {
    id: "dl-6",
    question: "Which loss function is appropriate for a multi-class classification problem with mutually exclusive classes?",
    options: [
      "Mean Squared Error",
      "Binary Cross-Entropy",
      "Categorical Cross-Entropy",
      "Huber Loss"
    ],
    correctAnswer: "Categorical Cross-Entropy",
    explanation: "Categorical cross-entropy measures the distance between predicted probability distributions and true one-hot labels for mutually exclusive classes."
  },
  {
    id: "dl-7",
    question: "What is the purpose of batch normalization?",
    options: [
      "To increase model parameters",
      "To normalize layer inputs to stabilize and accelerate training",
      "To prevent overfitting by adding noise",
      "To reduce the learning rate automatically"
    ],
    correctAnswer: "To normalize layer inputs to stabilize and accelerate training",
    explanation: "Batch normalization normalizes activations across the batch, reducing internal covariate shift and enabling higher learning rates."
  },
  {
    id: "dl-8",
    question: "In backpropagation, what does the chain rule compute?",
    options: [
      "The forward pass output",
      "The gradient of the loss with respect to each weight by composing partial derivatives",
      "The optimal learning rate",
      "The number of layers in the network"
    ],
    correctAnswer: "The gradient of the loss with respect to each weight by composing partial derivatives",
    explanation: "The chain rule allows efficient computation of gradients by decomposing the derivative of a composite function into a product of local derivatives."
  },
  {
    id: "dl-9",
    question: "What is dropout regularization?",
    options: [
      "Removing neurons permanently after training",
      "Randomly zeroing a fraction of activations during training",
      "Reducing the learning rate to zero",
      "Removing the last layer of the network"
    ],
    correctAnswer: "Randomly zeroing a fraction of activations during training",
    explanation: "Dropout randomly deactivates neurons during each training step, forcing the network to learn redundant representations and reducing co-adaptation."
  },
  {
    id: "dl-10",
    question: "Which CNN architecture introduced the concept of skip (residual) connections?",
    options: [
      "AlexNet",
      "VGGNet",
      "ResNet",
      "LeNet"
    ],
    correctAnswer: "ResNet",
    explanation: "ResNet introduced residual connections that allow gradients to bypass layers, enabling training of networks with hundreds of layers."
  },
  {
    id: "dl-11",
    question: "What is the key difference between an RNN and an LSTM?",
    options: [
      "LSTMs cannot process sequences",
      "LSTMs have gating mechanisms (forget, input, output gates) to control information flow",
      "RNNs have no hidden state",
      "LSTMs are feedforward networks"
    ],
    correctAnswer: "LSTMs have gating mechanisms (forget, input, output gates) to control information flow",
    explanation: "LSTMs use gates to selectively remember or forget information, solving the long-term dependency problem that vanilla RNNs struggle with."
  },
  {
    id: "dl-12",
    question: "What is a GRU (Gated Recurrent Unit)?",
    options: [
      "A type of convolutional layer",
      "A simplified recurrent unit with reset and update gates",
      "A pooling mechanism",
      "An attention module"
    ],
    correctAnswer: "A simplified recurrent unit with reset and update gates",
    explanation: "GRU combines the forget and input gates into a single update gate, offering similar performance to LSTM with fewer parameters."
  },
  {
    id: "dl-13",
    question: "What is transfer learning?",
    options: [
      "Training a model from scratch on new data",
      "Using a pre-trained model as a starting point for a different task",
      "Transferring weights between GPUs",
      "Moving data between CPU and GPU memory"
    ],
    correctAnswer: "Using a pre-trained model as a starting point for a different task",
    explanation: "Transfer learning leverages knowledge from a pre-trained model, reducing training time and data requirements for related tasks."
  },
  {
    id: "dl-14",
    question: "In fine-tuning, what does freezing a layer mean?",
    options: [
      "Deleting the layer from the model",
      "Setting layer weights to zero",
      "Keeping layer weights fixed during training (no gradient updates)",
      "Saving the layer to disk"
    ],
    correctAnswer: "Keeping layer weights fixed during training (no gradient updates)",
    explanation: "Freezing prevents gradient updates to a layer, preserving learned features while training only the remaining unfrozen layers."
  },
  {
    id: "dl-15",
    question: "Which data augmentation technique randomly erases a rectangular region of an input image?",
    options: [
      "Random horizontal flip",
      "Cutout",
      "Gaussian blur",
      "Color jitter"
    ],
    correctAnswer: "Cutout",
    explanation: "Cutout randomly masks out square regions of the input during training, forcing the model to learn from less complete information."
  },
  {
    id: "dl-16",
    question: "What is the purpose of a learning rate warmup?",
    options: [
      "To increase the learning rate to maximum immediately",
      "To gradually increase the learning rate from a small value at the start of training",
      "To decrease the learning rate to zero",
      "To keep the learning rate constant"
    ],
    correctAnswer: "To gradually increase the learning rate from a small value at the start of training",
    explanation: "Warmup prevents large gradient updates early in training when parameters are random, stabilizing the optimization process."
  },
  {
    id: "dl-17",
    question: "Which optimizer adapts learning rates individually for each parameter using first and second moment estimates?",
    options: [
      "SGD",
      "Adam",
      "Adagrad",
      "RMSProp"
    ],
    correctAnswer: "Adam",
    explanation: "Adam combines momentum (first moment) and RMSProp (second moment) to adapt learning rates per parameter with bias correction."
  },
  {
    id: "dl-18",
    question: "What is the key architectural difference between LeNet and AlexNet?",
    options: [
      "LeNet uses more layers than AlexNet",
      "AlexNet is much deeper, uses ReLU, dropout, and GPU training",
      "AlexNet uses only fully connected layers",
      "LeNet uses convolutional layers while AlexNet does not"
    ],
    correctAnswer: "AlexNet is much deeper, uses ReLU, dropout, and GPU training",
    explanation: "AlexNet scaled up LeNet's concept with 8 layers, ReLU activations, dropout regularization, and GPU-accelerated training for ImageNet."
  },
  {
    id: "dl-19",
    question: "What is the core innovation of VGGNet?",
    options: [
      "Using only 1x1 convolutions",
      "Using very small (3x3) convolution filters throughout the entire network",
      "Introducing skip connections",
      "Using depthwise separable convolutions"
    ],
    correctAnswer: "Using very small (3x3) convolution filters throughout the entire network",
    explanation: "VGGNet showed that stacking small 3x3 filters with small stride achieves the same receptive field as larger filters with fewer parameters."
  },
  {
    id: "dl-20",
    question: "What is a depthwise separable convolution?",
    options: [
      "A convolution applied to each input channel independently followed by a pointwise convolution",
      "A convolution with a 1x1 kernel only",
      "A convolution that only works on depth images",
      "A convolution with a kernel larger than the input"
    ],
    correctAnswer: "A convolution applied to each input channel independently followed by a pointwise convolution",
    explanation: "Depthwise separable convolutions factorize a standard convolution into depthwise (per-channel) and pointwise (1x1) steps, drastically reducing computation."
  },
  {
    id: "dl-21",
    question: "What is the main advantage of MobileNet over VGG-16?",
    options: [
      "Higher accuracy on all benchmarks",
      "Much lower computational cost and model size suitable for mobile deployment",
      "More training data required",
      "Deeper network with more parameters"
    ],
    correctAnswer: "Much lower computational cost and model size suitable for mobile deployment",
    explanation: "MobileNet uses depthwise separable convolutions to achieve comparable accuracy with ~30x fewer parameters and computations than VGG-16."
  },
  {
    id: "dl-22",
    question: "In YOLO (You Only Look Once), how does object detection differ from R-CNN?",
    options: [
      "YOLO uses region proposals while R-CNN does not",
      "YOLO treats detection as a single regression problem over the entire image",
      "R-CNN is faster than YOLO",
      "YOLO cannot detect multiple objects"
    ],
    correctAnswer: "YOLO treats detection as a single regression problem over the entire image",
    explanation: "YOLO divides the image into a grid and predicts bounding boxes and class probabilities in one pass, enabling real-time detection speeds."
  },
  {
    id: "dl-23",
    question: "What is semantic segmentation?",
    options: [
      "Classifying an entire image into one category",
      "Assigning a class label to every pixel in an image",
      "Detecting objects and drawing bounding boxes",
      "Generating captions for images"
    ],
    correctAnswer: "Assigning a class label to every pixel in an image",
    explanation: "Semantic segmentation provides pixel-level classification, identifying which class each pixel belongs to without distinguishing individual instances."
  },
  {
    id: "dl-24",
    question: "What is an autoencoder?",
    options: [
      "A supervised classifier",
      "A neural network that learns to reconstruct its input through a bottleneck (encoder-decoder)",
      "A type of recurrent network",
      "A generative adversarial network"
    ],
    correctAnswer: "A neural network that learns to reconstruct its input through a bottleneck (encoder-decoder)",
    explanation: "Autoencoders compress input into a lower-dimensional latent representation and reconstruct it, useful for dimensionality reduction and denoising."
  },
  {
    id: "dl-25",
    question: "What distinguishes a variational autoencoder (VAE) from a standard autoencoder?",
    options: [
      "VAEs use convolutional layers",
      "VAEs encode input as a probability distribution in latent space, enabling generation",
      "VAEs are always deeper",
      "VAEs do not use a decoder"
    ],
    correctAnswer: "VAEs encode input as a probability distribution in latent space, enabling generation",
    explanation: "VAEs learn a distribution (mean and variance) in latent space and use the reparameterization trick to sample, enabling smooth interpolation and generation."
  },
  {
    id: "dl-26",
    question: "What is the reparameterization trick used in VAEs?",
    options: [
      "Removing the encoder from the network",
      "Sampling noise from a Gaussian and passing it through the learned distribution parameters to maintain differentiability",
      "Using reinforcement learning to optimize the latent space",
      "Discretizing the latent space into binary codes"
    ],
    correctAnswer: "Sampling noise from a Gaussian and passing it through the learned distribution parameters to maintain differentiability",
    explanation: "The reparameterization trick factors out the stochastic sampling as z = mu + sigma * epsilon, making the sampling operation differentiable for backpropagation."
  },
  {
    id: "dl-27",
    question: "What does the attention mechanism allow a neural network to do?",
    options: [
      "Reduce the number of layers",
      "Dynamically focus on different parts of the input when producing each part of the output",
      "Eliminate the need for training data",
      "Increase the learning rate automatically"
    ],
    correctAnswer: "Dynamically focus on different parts of the input when producing each part of the output",
    explanation: "Attention computes weighted importance scores over input elements, allowing the model to selectively focus on relevant information for each output."
  },
  {
    id: "dl-28",
    question: "Why is GPU training preferred over CPU training for deep learning?",
    options: [
      "GPUs have more RAM than CPUs",
      "GPUs can perform many parallel matrix operations simultaneously, accelerating training",
      "CPUs cannot run neural networks",
      "GPUs use less power than CPUs"
    ],
    correctAnswer: "GPUs can perform many parallel matrix operations simultaneously, accelerating training",
    explanation: "GPUs have thousands of cores optimized for parallel matrix math, making them orders of magnitude faster than CPUs for the tensor operations in deep learning."
  },
  {
    id: "dl-29",
    question: "What is mixed precision training?",
    options: [
      "Training with different model architectures",
      "Using a combination of float16 and float32 arithmetic to speed up training while maintaining accuracy",
      "Training on mixed datasets",
      "Using different learning rates for different layers"
    ],
    correctAnswer: "Using a combination of float16 and float32 arithmetic to speed up training while maintaining accuracy",
    explanation: "Mixed precision uses float16 for most computations (faster, less memory) with float32 for critical accumulations, preserving numerical stability."
  },
  {
    id: "dl-30",
    question: "What is model checkpointing?",
    options: [
      "Deleting the model after training",
      "Saving model weights at intervals during training for recovery or best-model selection",
      "Measuring model accuracy",
      "Freezing model layers"
    ],
    correctAnswer: "Saving model weights at intervals during training for recovery or best-model selection",
    explanation: "Checkpointing periodically saves model parameters so training can resume from the last save point or the best-performing epoch can be selected."
  },
  {
    id: "dl-31",
    question: "What is exploding gradient problem?",
    options: [
      "Gradients become too small to update weights",
      "Gradients grow exponentially large, causing unstable weight updates",
      "Gradients are zero everywhere",
      "Gradients oscillate between positive and negative"
    ],
    correctAnswer: "Gradients grow exponentially large, causing unstable weight updates",
    explanation: "Exploding gradients occur when gradients accumulate large values through deep layers, causing weights to update so aggressively that training diverges."
  },
  {
    id: "dl-32",
    question: "What is gradient clipping?",
    options: [
      "Removing gradients from certain layers",
      "Capping gradient values at a threshold to prevent exploding gradients",
      "Clipping the loss function",
      "Reducing batch size"
    ],
    correctAnswer: "Capping gradient values at a threshold to prevent exploding gradients",
    explanation: "Gradient clipping scales down gradients if their norm exceeds a threshold, preventing large updates that could destabilize training."
  },
  {
    id: "dl-33",
    question: "In CNNs, what is the receptive field?",
    options: [
      "The number of output channels",
      "The region in the input image that a particular feature neuron is connected to",
      "The size of the pooling window",
      "The learning rate of the network"
    ],
    correctAnswer: "The region in the input image that a particular feature neuron is connected to",
    explanation: "The receptive field is the area of the original input that influences a given neuron, growing deeper in the network through stacked convolutions."
  },
  {
    id: "dl-34",
    question: "What is layer normalization?",
    options: [
      "Normalizing across the batch dimension",
      "Normalizing across the feature dimension for each individual sample",
      "Normalizing the loss function",
      "Normalizing the learning rate"
    ],
    correctAnswer: "Normalizing across the feature dimension for each individual sample",
    explanation: "Layer normalization normalizes across features within each sample, making it independent of batch size and ideal for recurrent and transformer architectures."
  },
  {
    id: "dl-35",
    question: "What is the purpose of a global average pooling layer?",
    options: [
      "To increase spatial dimensions",
      "To reduce each feature map to a single value by averaging, replacing fully connected layers",
      "To add more parameters",
      "To apply dropout"
    ],
    correctAnswer: "To reduce each feature map to a single value by averaging, replacing fully connected layers",
    explanation: "Global average pooling takes the mean of each entire feature map, dramatically reducing parameters and acting as a structural regularizer."
  },
  {
    id: "dl-36",
    question: "What is data augmentation primarily used for?",
    options: [
      "Increasing test accuracy",
      "Artificially expanding training dataset size to improve generalization",
      "Reducing model size",
      "Speeding up inference"
    ],
    correctAnswer: "Artificially expanding training dataset size to improve generalization",
    explanation: "Augmentation applies transformations (flip, rotate, crop) to existing data, creating diverse variations that help the model generalize better."
  },
  {
    id: "dl-37",
    question: "Which of these is a common technique for deploying a trained CNN on an embedded device?",
    options: [
      "Increasing the number of layers",
      "Model quantization to reduce precision from float32 to int8",
      "Adding more training data",
      "Using a larger batch size"
    ],
    correctAnswer: "Model quantization to reduce precision from float32 to int8",
    explanation: "Quantization reduces model size and computation by using lower-precision arithmetic, making it feasible to run on resource-constrained embedded hardware."
  },
  {
    id: "dl-38",
    question: "What is the difference between object detection and image classification?",
    options: [
      "They are the same task",
      "Classification assigns one label to the whole image; detection identifies and locates multiple objects with bounding boxes",
      "Detection is faster than classification",
      "Classification works only on grayscale images"
    ],
    correctAnswer: "Classification assigns one label to the whole image; detection identifies and locates multiple objects with bounding boxes",
    explanation: "Image classification predicts a single label for the entire image, while object detection outputs bounding boxes and class labels for each detected object."
  },
  {
    id: "dl-39",
    question: "What is the role of the discriminator in a GAN?",
    options: [
      "To generate synthetic data samples",
      "To classify whether input data is real or generated (fake)",
      "To reduce the learning rate",
      "To normalize the latent space"
    ],
    correctAnswer: "To classify whether input data is real or generated (fake)",
    explanation: "The discriminator acts as a binary classifier, distinguishing real training data from fake data produced by the generator, driving both networks to improve."
  },
  {
    id: "dl-40",
    question: "In deep learning for signal processing, what is a common advantage of using 1D CNNs over traditional FFT-based methods?",
    options: [
      "1D CNNs are always faster than FFT",
      "1D CNNs can learn task-specific features directly from raw signals without manual feature engineering",
      "FFT cannot handle time-series data",
      "1D CNNs require no training data"
    ],
    correctAnswer: "1D CNNs can learn task-specific features directly from raw signals without manual feature engineering",
    explanation: "1D CNNs automatically extract relevant patterns from raw signal data, whereas FFT-based methods require domain expertise to design handcrafted features."
  }
];
