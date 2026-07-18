export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const aiFundamentalsQuestions: LessonQuestion[] = [
  {
    id: 'ai-fundamentals-1',
    question: 'What is Artificial Intelligence (AI)?',
    options: [
      'A programming language for hardware design',
      'A system that can perform tasks requiring human-like intelligence',
      'A type of microcontroller for edge computing',
      'A database management system for sensor data'
    ],
    correctAnswer: 'A system that can perform tasks requiring human-like intelligence',
    explanation: 'AI refers to systems that can perform tasks typically requiring human intelligence, such as perception, reasoning, learning, and decision-making.'
  },
  {
    id: 'ai-fundamentals-2',
    question: 'How does Machine Learning (ML) differ from traditional programming?',
    options: [
      'ML requires no data to operate',
      'In ML, rules are explicitly coded by the developer',
      'In ML, the system learns patterns from data rather than following hand-written rules',
      'ML only works with text data'
    ],
    correctAnswer: 'In ML, the system learns patterns from data rather than following hand-written rules',
    explanation: 'Traditional programming relies on explicit rules; ML algorithms learn patterns and relationships directly from data to make predictions or decisions.'
  },
  {
    id: 'ai-fundamentals-3',
    question: 'What is the key difference between Machine Learning and Deep Learning?',
    options: [
      'Deep Learning uses simple linear models while ML uses neural networks',
      'Deep Learning is a subset of ML that uses multi-layered neural networks',
      'ML and Deep Learning are identical terms',
      'Deep Learning requires no training data'
    ],
    correctAnswer: 'Deep Learning is a subset of ML that uses multi-layered neural networks',
    explanation: 'Deep Learning is a specialized subset of ML that leverages deep neural networks with multiple hidden layers to automatically learn hierarchical feature representations.'
  },
  {
    id: 'ai-fundamentals-4',
    question: 'When should you choose traditional ML over Deep Learning?',
    options: [
      'When you have millions of images to classify',
      'When you need to learn complex patterns from raw pixel data',
      'When you have small, structured datasets and need interpretable models',
      'When computational resources are unlimited'
    ],
    correctAnswer: 'When you have small, structured datasets and need interpretable models',
    explanation: 'Traditional ML algorithms often outperform deep learning on small, structured datasets and provide better interpretability, which is critical in engineering applications.'
  },
  {
    id: 'ai-fundamentals-5',
    question: 'In supervised learning, what does the training data consist of?',
    options: [
      'Only input features with no labels',
      'Input-output pairs where the correct output is provided',
      'Data collected from unsupervised sensors',
      'Randomly generated synthetic data'
    ],
    correctAnswer: 'Input-output pairs where the correct output is provided',
    explanation: 'Supervised learning uses labeled data — each training example includes both the input features and the corresponding correct output (label or target).'
  },
  {
    id: 'ai-fundamentals-6',
    question: 'Which learning paradigm is best suited for discovering hidden structures in unlabeled data?',
    options: [
      'Supervised learning',
      'Reinforcement learning',
      'Unsupervised learning',
      'Transfer learning'
    ],
    correctAnswer: 'Unsupervised learning',
    explanation: 'Unsupervised learning identifies patterns, clusters, or structures in data without requiring labeled outputs, making it ideal for exploratory data analysis.'
  },
  {
    id: 'ai-fundamentals-7',
    question: 'What is reinforcement learning?',
    options: [
      'Learning from labeled examples provided by a human',
      'An agent learning to make decisions by receiving rewards or penalties from its environment',
      'A method for reducing the number of features in a dataset',
      'Training a model on multiple tasks simultaneously'
    ],
    correctAnswer: 'An agent learning to make decisions by receiving rewards or penalties from its environment',
    explanation: 'Reinforcement learning involves an agent that learns optimal actions through trial-and-error interaction with an environment, guided by reward signals.'
  },
  {
    id: 'ai-fundamentals-8',
    question: 'Why is it important to split data into training, validation, and test sets?',
    options: [
      'To reduce the total amount of data needed',
      'To train the model faster on smaller batches',
      'To evaluate model performance on unseen data and prevent overfitting',
      'To increase the model\'s accuracy during training'
    ],
    correctAnswer: 'To evaluate model performance on unseen data and prevent overfitting',
    explanation: 'Separating data ensures the model is evaluated on data it has never seen during training, providing an honest measure of generalization performance.'
  },
  {
    id: 'ai-fundamentals-9',
    question: 'What is overfitting in a machine learning model?',
    options: [
      'The model performs poorly on both training and test data',
      'The model captures noise in training data and fails to generalize to new data',
      'The model is too simple to capture the underlying pattern',
      'The model trains too slowly to be practical'
    ],
    correctAnswer: 'The model captures noise in training data and fails to generalize to new data',
    explanation: 'Overfitting occurs when a model learns noise and spurious patterns in training data, leading to excellent training performance but poor generalization to unseen data.'
  },
  {
    id: 'ai-fundamentals-10',
    question: 'What is underfitting?',
    options: [
      'The model memorizes training data perfectly',
      'The model is too complex for the available data',
      'The model is too simple to capture the underlying relationship in the data',
      'The model overflows during gradient computation'
    ],
    correctAnswer: 'The model is too simple to capture the underlying relationship in the data',
    explanation: 'Underfitting happens when a model lacks the complexity to represent the true underlying pattern, resulting in poor performance on both training and test data.'
  },
  {
    id: 'ai-fundamentals-11',
    question: 'What does the bias-variance tradeoff describe?',
    options: [
      'The tradeoff between training speed and accuracy',
      'The balance between model simplicity (bias) and model complexity (variance)',
      'The relationship between dataset size and model size',
      'The tradeoff between CPU and GPU usage'
    ],
    correctAnswer: 'The balance between model simplicity (bias) and model complexity (variance)',
    explanation: 'High bias models underfit (too simple), high variance models overfit (too complex). The optimal model balances both to minimize total prediction error.'
  },
  {
    id: 'ai-fundamentals-12',
    question: 'A model has high bias and low variance. What is the likely issue?',
    options: [
      'The model is overfitting the training data',
      'The model is underfitting and too simple for the problem',
      'The model has too many parameters',
      'The training data is too noisy'
    ],
    correctAnswer: 'The model is underfitting and too simple for the problem',
    explanation: 'High bias indicates the model makes strong assumptions and cannot capture the data\'s complexity, resulting in underfitting. Low variance means it is stable but consistently wrong.'
  },
  {
    id: 'ai-fundamentals-13',
    question: 'Which technique helps reduce overfitting?',
    options: [
      'Increasing the model complexity',
      'Adding more features without regularization',
      'Using regularization (L1/L2) or dropout',
      'Training for more epochs without early stopping'
    ],
    correctAnswer: 'Using regularization (L1/L2) or dropout',
    explanation: 'Regularization penalizes large weights and dropout randomly deactivates neurons during training, both constraining model complexity to improve generalization.'
  },
  {
    id: 'ai-fundamentals-14',
    question: 'What is feature engineering?',
    options: [
      'Building neural network architectures from scratch',
      'Selecting, transforming, and creating input variables to improve model performance',
      'Deploying models to production servers',
      'Collecting raw data from sensors'
    ],
    correctAnswer: 'Selecting, transforming, and creating input variables to improve model performance',
    explanation: 'Feature engineering involves creating meaningful input representations from raw data, which is often the most impactful step in building effective ML models.'
  },
  {
    id: 'ai-fundamentals-15',
    question: 'Why is feature scaling important for many ML algorithms?',
    options: [
      'It makes the dataset larger for better training',
      'It ensures features with larger numeric ranges do not dominate the learning process',
      'It is required by all operating systems',
      'It reduces the number of features automatically'
    ],
    correctAnswer: 'It ensures features with larger numeric ranges do not dominate the learning process',
    explanation: 'Algorithms sensitive to feature magnitudes (e.g., gradient descent, SVM, KNN) perform better when features are on comparable scales through normalization or standardization.'
  },
  {
    id: 'ai-fundamentals-16',
    question: 'What is a perceptron in the context of neural networks?',
    options: [
      'A type of loss function',
      'A single-layer neural network that computes a weighted sum of inputs and applies an activation',
      'A data preprocessing technique',
      'A method for hyperparameter tuning'
    ],
    correctAnswer: 'A single-layer neural network that computes a weighted sum of inputs and applies an activation',
    explanation: 'A perceptron is the simplest neural network unit: it takes inputs, multiplies each by a learned weight, sums them, adds a bias, and passes the result through an activation function.'
  },
  {
    id: 'ai-fundamentals-17',
    question: 'What is the role of an activation function in a neural network?',
    options: [
      'To initialize the weights of the network',
      'To introduce non-linearity so the network can learn complex patterns',
      'To reduce the number of layers in the network',
      'To store the training data in memory'
    ],
    correctAnswer: 'To introduce non-linearity so the network can learn complex patterns',
    explanation: 'Without activation functions, a neural network would be equivalent to a linear model. Non-linear activations like ReLU, sigmoid, and tanh enable learning of complex mappings.'
  },
  {
    id: 'ai-fundamentals-18',
    question: 'Which activation function is most commonly used in modern hidden layers?',
    options: [
      'Sigmoid',
      'Tanh',
      'ReLU (Rectified Linear Unit)',
      'Linear activation'
    ],
    correctAnswer: 'ReLU (Rectified Linear Unit)',
    explanation: 'ReLU is the most popular hidden layer activation because it computes quickly, avoids vanishing gradients for positive inputs, and promotes sparse representations.'
  },
  {
    id: 'ai-fundamentals-19',
    question: 'Why is the sigmoid function rarely used in hidden layers today?',
    options: [
      'It outputs values outside the range [0, 1]',
      'It suffers from the vanishing gradient problem for very large or small inputs',
      'It is too computationally expensive',
      'It only works with binary classification'
    ],
    correctAnswer: 'It suffers from the vanishing gradient problem for very large or small inputs',
    explanation: 'Sigmoid squashes outputs to a narrow range, causing gradients to approach zero for extreme inputs, which slows or stalls learning in deep networks.'
  },
  {
    id: 'ai-fundamentals-20',
    question: 'What is the purpose of a loss function?',
    options: [
      'To determine when to stop the training loop',
      'To quantify how far the model\'s predictions are from the true targets',
      'To select the best features from the dataset',
      'To initialize network weights'
    ],
    correctAnswer: 'To quantify how far the model\'s predictions are from the true targets',
    explanation: 'The loss function measures prediction error. Training minimizes this value so the model\'s outputs increasingly match the desired targets.'
  },
  {
    id: 'ai-fundamentals-21',
    question: 'Which loss function is standard for regression problems?',
    options: [
      'Binary cross-entropy',
      'Mean Squared Error (MSE)',
      'Categorical cross-entropy',
      'Hinge loss'
    ],
    correctAnswer: 'Mean Squared Error (MSE)',
    explanation: 'MSE averages the squared differences between predicted and actual continuous values, penalizing larger errors more heavily, which is ideal for regression tasks.'
  },
  {
    id: 'ai-fundamentals-22',
    question: 'Which loss function is appropriate for multi-class classification?',
    options: [
      'Mean Absolute Error',
      'Categorical cross-entropy',
      'Mean Squared Error',
      'Huber loss'
    ],
    correctAnswer: 'Categorical cross-entropy',
    explanation: 'Categorical cross-entropy measures the divergence between predicted class probabilities and true one-hot labels, making it the standard loss for multi-class classification.'
  },
  {
    id: 'ai-fundamentals-23',
    question: 'What is Stochastic Gradient Descent (SGD)?',
    options: [
      'An optimization method that computes gradients using the entire dataset each step',
      'An optimization method that updates weights using one sample or a small mini-batch at a time',
      'A method for selecting the best hyperparameters',
      'A technique for freezing model layers during training'
    ],
    correctAnswer: 'An optimization method that updates weights using one sample or a small mini-batch at a time',
    explanation: 'SGD updates model parameters using gradients computed on small subsets of data, making it memory-efficient and often enabling faster convergence than full-batch gradient descent.'
  },
  {
    id: 'ai-fundamentals-24',
    question: 'What advantage does the Adam optimizer have over vanilla SGD?',
    options: [
      'Adam requires no learning rate',
      'Adam adapts learning rates individually for each parameter using momentum and adaptive estimates',
      'Adam uses second-order derivatives exclusively',
      'Adam works only for convolutional networks'
    ],
    correctAnswer: 'Adam adapts learning rates individually for each parameter using momentum and adaptive estimates',
    explanation: 'Adam combines momentum (like SGD with momentum) with adaptive per-parameter learning rates, often converging faster and requiring less learning rate tuning.'
  },
  {
    id: 'ai-fundamentals-25',
    question: 'What is a learning rate in gradient descent?',
    options: [
      'The number of layers in a neural network',
      'The step size that controls how much model parameters are updated during each iteration',
      'The percentage of data used for validation',
      'The speed of the GPU during training'
    ],
    correctAnswer: 'The step size that controls how much model parameters are updated during each iteration',
    explanation: 'The learning rate determines the magnitude of parameter updates. Too high causes divergence; too low leads to slow convergence or getting stuck in local minima.'
  },
  {
    id: 'ai-fundamentals-26',
    question: 'What is Cloud AI?',
    options: [
      'AI models that run exclusively on local microcontrollers',
      'AI inference and training performed on remote servers accessed via the internet',
      'A type of neural network architecture',
      'AI that only processes weather data'
    ],
    correctAnswer: 'AI inference and training performed on remote servers accessed via the internet',
    explanation: 'Cloud AI leverages remote data centers with powerful GPUs/TPUs, offering scalable compute resources but requiring network connectivity and introducing latency.'
  },
  {
    id: 'ai-fundamentals-27',
    question: 'What is the main advantage of Edge AI over Cloud AI?',
    options: [
      'Edge AI always has more computational power',
      'Edge AI provides lower latency and works without internet connectivity',
      'Edge AI requires no model training',
      'Edge AI can only process images'
    ],
    correctAnswer: 'Edge AI provides lower latency and works without internet connectivity',
    explanation: 'Edge AI runs inference locally on devices, eliminating network round-trips for real-time response and enabling operation in offline or bandwidth-constrained environments.'
  },
  {
    id: 'ai-fundamentals-28',
    question: 'What is a key limitation of Edge AI compared to Cloud AI?',
    options: [
      'Edge AI cannot process any data types',
      'Edge devices have constrained memory, compute, and energy budgets',
      'Edge AI always requires cloud connectivity',
      'Edge AI models are always larger than cloud models'
    ],
    correctAnswer: 'Edge devices have constrained memory, compute, and energy budgets',
    explanation: 'Edge devices like microcontrollers and mobile SoCs have far fewer resources than cloud servers, requiring smaller, optimized models and careful power management.'
  },
  {
    id: 'ai-fundamentals-29',
    question: 'What is a GPU and why is it used for AI training?',
    options: [
      'A general-purpose processor optimized for sequential tasks',
      'A processor with thousands of cores optimized for parallel matrix operations',
      'A type of sensor for image recognition',
      'A storage device for training datasets'
    ],
    correctAnswer: 'A processor with thousands of cores optimized for parallel matrix operations',
    explanation: 'GPUs have massively parallel architectures ideal for the matrix multiplications and convolutions that dominate neural network training, providing orders-of-magnitude speedup over CPUs.'
  },
  {
    id: 'ai-fundamentals-30',
    question: 'What is a TPU (Tensor Processing Unit)?',
    options: [
      'A traditional CPU designed for graphics rendering',
      'A Google-designed ASIC specifically optimized for tensor operations in deep learning',
      'A type of edge device for IoT applications',
      'A data storage format for neural network weights'
    ],
    correctAnswer: 'A Google-designed ASIC specifically optimized for tensor operations in deep learning',
    explanation: 'TPUs are custom ASICs designed by Google for high-throughput, low-precision matrix math, making them extremely efficient for large-scale deep learning training and inference.'
  },
  {
    id: 'ai-fundamentals-31',
    question: 'What does NPU stand for and what is its role?',
    options: [
      'Network Processing Unit — handles network routing',
      'Neural Processing Unit — accelerates AI inference on edge devices',
      'Numeric Precision Unit — converts data types',
      'Node Processing Unit — manages distributed systems'
    ],
    correctAnswer: 'Neural Processing Unit — accelerates AI inference on edge devices',
    explanation: 'NPUs are dedicated AI accelerators integrated into mobile and embedded processors, designed for efficient neural network inference with low power consumption.'
  },
  {
    id: 'ai-fundamentals-32',
    question: 'What is model quantization?',
    options: [
      'Increasing the precision of model weights to float64',
      'Reducing the precision of model weights and activations (e.g., from FP32 to INT8)',
      'Adding more layers to a model',
      'Removing entire layers from a trained model'
    ],
    correctAnswer: 'Reducing the precision of model weights and activations (e.g., from FP32 to INT8)',
    explanation: 'Quantization compresses models by using lower-bit representations, reducing memory footprint and computation time with minimal accuracy loss, which is critical for edge deployment.'
  },
  {
    id: 'ai-fundamentals-33',
    question: 'What is model pruning?',
    options: [
      'Increasing the number of neurons in each layer',
      'Removing redundant or least important weights and neurons from a trained model',
      'Training a model from scratch on a new dataset',
      'Converting a model to a different framework'
    ],
    correctAnswer: 'Removing redundant or least important weights and neurons from a trained model',
    explanation: 'Pruning eliminates connections or neurons with small contributions, reducing model size and compute requirements while maintaining most of the original accuracy.'
  },
  {
    id: 'ai-fundamentals-34',
    question: 'What is knowledge distillation?',
    options: [
      'Transferring knowledge between different hardware platforms',
      'Training a smaller student model to mimic the output of a larger teacher model',
      'Distributing training across multiple machines',
      'Extracting features from raw sensor data'
    ],
    correctAnswer: 'Training a smaller student model to mimic the output of a larger teacher model',
    explanation: 'Knowledge distillation transfers learned representations from a large, accurate model to a compact one, achieving competitive accuracy with a fraction of the parameters.'
  },
  {
    id: 'ai-fundamentals-35',
    question: 'What is inference latency?',
    options: [
      'The time it takes to train a model from scratch',
      'The time between receiving an input and producing a prediction',
      'The delay in downloading a model from the cloud',
      'The time required to collect training data'
    ],
    correctAnswer: 'The time between receiving an input and producing a prediction',
    explanation: 'Inference latency measures how quickly a deployed model can process an input and return a result, which is critical for real-time applications like control systems.'
  },
  {
    id: 'ai-fundamentals-36',
    question: 'Why is energy efficiency important for edge AI inference?',
    options: [
      'It is not important — edge devices have unlimited power',
      'Edge devices often run on batteries, so low power extends operational time',
      'Energy efficiency only matters for cloud servers',
      'Lower energy means higher accuracy'
    ],
    correctAnswer: 'Edge devices often run on batteries, so low power extends operational time',
    explanation: 'Battery-powered and embedded devices have strict power budgets; energy-efficient inference enables longer deployment without recharging or replacing power sources.'
  },
  {
    id: 'ai-fundamentals-37',
    question: 'What is throughput in the context of AI inference?',
    options: [
      'The number of parameters in the model',
      'The number of inferences the system can process per unit of time',
      'The training speed of the model',
      'The size of the model in megabytes'
    ],
    correctAnswer: 'The number of inferences the system can process per unit of time',
    explanation: 'Throughput measures system capacity — how many predictions can be served per second — which is essential for high-volume applications like production line inspection.'
  },
  {
    id: 'ai-fundamentals-38',
    question: 'What is AI bias?',
    options: [
      'A hardware defect in AI accelerators',
      'Systematic errors in model predictions due to biased training data or flawed assumptions',
      'The tendency of neural networks to overfit',
      'The preference for using GPU over CPU'
    ],
    correctAnswer: 'Systematic errors in model predictions due to biased training data or flawed assumptions',
    explanation: 'AI bias produces unfair or inaccurate outcomes for certain groups or conditions, often stemming from unrepresentative training data or algorithmic design choices.'
  },
  {
    id: 'ai-fundamentals-39',
    question: 'What is explainability (XAI) in AI?',
    options: [
      'The speed at which a model makes predictions',
      'The ability to understand and interpret why a model made a specific decision',
      'The process of labeling training data',
      'A method for compressing neural networks'
    ],
    correctAnswer: 'The ability to understand and interpret why a model made a specific decision',
    explanation: 'Explainability provides transparency into model behavior, which is essential for debugging, regulatory compliance, and building trust in safety-critical electronics applications.'
  },
  {
    id: 'ai-fundamentals-40',
    question: 'Which is a valid use of AI in electronics engineering?',
    options: [
      'Replacing all oscilloscopes with neural networks',
      'Automated PCB defect detection from visual inspection images',
      'Eliminating the need for electromagnetic compatibility testing',
      'Designing circuits that violate Kirchhoff\'s laws'
    ],
    correctAnswer: 'Automated PCB defect detection from visual inspection images',
    explanation: 'AI excels at visual pattern recognition for quality inspection, enabling automated detection of solder defects, trace shorts, and component misplacement on PCBs.'
  },
  {
    id: 'ai-fundamentals-41',
    question: 'What is a key limitation of AI when applied to electronics design?',
    options: [
      'AI can never be used in electronics',
      'AI models may not respect physical laws unless explicitly constrained',
      'AI always produces optimal circuit designs on the first attempt',
      'AI cannot process numerical data'
    ],
    correctAnswer: 'AI models may not respect physical laws unless explicitly constrained',
    explanation: 'AI models learn statistical patterns from data but do not inherently understand physics; domain constraints must be enforced to ensure designs satisfy electrical laws and specifications.'
  },
  {
    id: 'ai-fundamentals-42',
    question: 'What is a hidden layer in a neural network?',
    options: [
      'The input layer where raw data enters',
      'A layer between input and output that learns intermediate representations',
      'The final layer that produces the prediction',
      'A layer that stores training data'
    ],
    correctAnswer: 'A layer between input and output that learns intermediate representations',
    explanation: 'Hidden layers transform inputs through learned weight matrices and activations, enabling the network to capture hierarchical features from simple to complex.'
  },
  {
    id: 'ai-fundamentals-43',
    question: 'What is the vanishing gradient problem?',
    options: [
      'Gradients become too large and cause training instability',
      'Gradients shrink exponentially in deep networks, making early layers learn very slowly',
      'The gradient descent algorithm runs out of memory',
      'The loss function cannot compute gradients'
    ],
    correctAnswer: 'Gradients shrink exponentially in deep networks, making early layers learn very slowly',
    explanation: 'In deep networks with saturating activations (like sigmoid), gradients can diminish exponentially during backpropagation, effectively stalling learning in early layers.'
  },
  {
    id: 'ai-fundamentals-44',
    question: 'What is a convolutional neural network (CNN) primarily used for?',
    options: [
      'Text generation',
      'Processing grid-structured data like images and spatial signals',
      'Managing databases',
      'Controlling robotic arms without sensors'
    ],
    correctAnswer: 'Processing grid-structured data like images and spatial signals',
    explanation: 'CNNs use convolutional filters to detect spatial patterns (edges, textures, shapes), making them the standard architecture for image classification, detection, and signal processing.'
  },
  {
    id: 'ai-fundamentals-45',
    question: 'What is the softmax function used for?',
    options: [
      'Normalizing input features before training',
      'Converting raw logits into a probability distribution over classes',
      'Initializing neural network weights',
      'Reducing the learning rate during training'
    ],
    correctAnswer: 'Converting raw logits into a probability distribution over classes',
    explanation: 'Softmax exponentiates each class logit and normalizes by the sum, producing output probabilities that sum to 1, which is ideal for multi-class classification.'
  },
  {
    id: 'ai-fundamentals-46',
    question: 'What is transfer learning?',
    options: [
      'Moving a physical model from one lab to another',
      'Using a pre-trained model on a new but related task with limited data',
      'Transferring data between cloud and edge devices',
      'A technique for parallelizing model training'
    ],
    correctAnswer: 'Using a pre-trained model on a new but related task with limited data',
    explanation: 'Transfer learning leverages knowledge from a model trained on a large dataset, fine-tuning it for a new task, dramatically reducing data and training requirements.'
  },
  {
    id: 'ai-fundamentals-47',
    question: 'What is the purpose of a validation set?',
    options: [
      'To provide the final measure of model performance',
      'To tune hyperparameters and make model selection decisions during training',
      'To augment the training data',
      'To store the model\'s learned weights'
    ],
    correctAnswer: 'To tune hyperparameters and make model selection decisions during training',
    explanation: 'The validation set provides unbiased feedback during training for selecting the best model configuration without contaminating the final test set evaluation.'
  },
  {
    id: 'ai-fundamentals-48',
    question: 'What is data augmentation?',
    options: [
      'Collecting more raw data from external sources',
      'Applying transformations to existing data to increase training set diversity',
      'Removing outliers from the dataset',
      'Merging multiple datasets into one'
    ],
    correctAnswer: 'Applying transformations to existing data to increase training set diversity',
    explanation: 'Data augmentation artificially expands training data through transformations (rotation, noise, flipping), helping models generalize better without collecting new samples.'
  },
  {
    id: 'ai-fundamentals-49',
    question: 'What is the difference between batch gradient descent and mini-batch gradient descent?',
    options: [
      'Batch uses one sample per update; mini-batch uses all samples',
      'Batch uses all training samples per update; mini-batch uses a small subset',
      'There is no difference between them',
      'Batch is faster than mini-batch on all hardware'
    ],
    correctAnswer: 'Batch uses all training samples per update; mini-batch uses a small subset',
    explanation: 'Batch gradient descent computes gradients over the entire dataset per step (stable but slow); mini-batch uses small subsets, balancing speed and stability.'
  },
  {
    id: 'ai-fundamentals-50',
    question: 'Which of the following is NOT a valid reason to deploy AI at the edge?',
    options: [
      'Reducing inference latency for real-time applications',
      'Operating in environments without reliable internet',
      'Training extremely large models with billions of parameters',
      'Protecting data privacy by keeping data on-device'
    ],
    correctAnswer: 'Training extremely large models with billions of parameters',
    explanation: 'Edge devices lack the compute and memory for large-scale model training; edge deployment focuses on inference, while training typically happens in the cloud or on powerful workstations.'
  }
];
