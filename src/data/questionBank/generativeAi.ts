export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const generativeAiQuestions: LessonQuestion[] = [
  {
    id: "genai-1",
    question: "What is the key difference between generative and discriminative models?",
    options: [
      "Generative models are always faster",
      "Generative models learn the data distribution P(X); discriminative models learn P(Y|X)",
      "Discriminative models generate new data",
      "There is no difference"
    ],
    correctAnswer: "Generative models learn the data distribution P(X); discriminative models learn P(Y|X)",
    explanation: "Generative models model how data is produced P(X) or joint P(X,Y), while discriminative models learn the decision boundary between classes P(Y|X)."
  },
  {
    id: "genai-2",
    question: "In a GAN, what happens during the training loop?",
    options: [
      "Only the generator is trained",
      "The generator and discriminator are trained alternately in a minimax game",
      "The discriminator is frozen permanently",
      "Both networks share weights"
    ],
    correctAnswer: "The generator and discriminator are trained alternately in a minimax game",
    explanation: "The generator tries to fool the discriminator while the discriminator tries to detect fakes; they improve each other through this adversarial process."
  },
  {
    id: "genai-3",
    question: "What is mode collapse in GANs?",
    options: [
      "The generator produces only one or very few types of output",
      "The discriminator collapses to random guessing",
      "The learning rate drops to zero",
      "The loss function becomes undefined"
    ],
    correctAnswer: "The generator produces only one or very few types of output",
    explanation: "Mode collapse occurs when the generator finds a few outputs that fool the discriminator and stops producing diverse samples, reducing output variety."
  },
  {
    id: "genai-4",
    question: "What is the latent space in a VAE?",
    options: [
      "The output layer of the network",
      "A compressed, continuous representation space where input data is encoded as probability distributions",
      "The training dataset",
      "The loss function landscape"
    ],
    correctAnswer: "A compressed, continuous representation space where input data is encoded as probability distributions",
    explanation: "The latent space is a lower-dimensional manifold where inputs are mapped as distributions, enabling smooth interpolation and generation of new samples."
  },
  {
    id: "genai-5",
    question: "What is the forward process in a diffusion model?",
    options: [
      "Generating images from noise",
      "Gradually adding Gaussian noise to data over many steps until it becomes pure noise",
      "Training the discriminator",
      "Encoding data into a latent space"
    ],
    correctAnswer: "Gradually adding Gaussian noise to data over many steps until it becomes pure noise",
    explanation: "The forward process systematically corrupts data with noise over a schedule, defining a tractable Markov chain from data to pure noise."
  },
  {
    id: "genai-6",
    question: "What does the reverse process in a diffusion model do?",
    options: [
      "Adds noise to images",
      "Learns to gradually denoise from pure noise back to clean data",
      "Classifies noisy images",
      "Compresses images into latent space"
    ],
    correctAnswer: "Learns to gradually denoise from pure noise back to clean data",
    explanation: "The reverse process trains a neural network to predict and remove noise at each step, reconstructing data from Gaussian noise during generation."
  },
  {
    id: "genai-7",
    question: "In text generation, what does autoregressive generation mean?",
    options: [
      "Generating all tokens simultaneously",
      "Generating one token at a time, conditioned on all previously generated tokens",
      "Generating text from the end to the beginning",
      "Generating random tokens without conditioning"
    ],
    correctAnswer: "Generating one token at a time, conditioned on all previously generated tokens",
    explanation: "Autoregressive models produce each token based on the sequence so far, allowing coherent long-form text by conditioning on prior context."
  },
  {
    id: "genai-8",
    question: "What is the temperature parameter in text generation sampling?",
    options: [
      "The physical temperature of the GPU",
      "A value that controls the randomness of output by scaling logits before softmax",
      "The number of tokens generated",
      "The learning rate during fine-tuning"
    ],
    correctAnswer: "A value that controls the randomness of output by scaling logits before softmax",
    explanation: "Lower temperature makes output more deterministic (peakier distribution); higher temperature increases randomness and diversity in token selection."
  },
  {
    id: "genai-9",
    question: "What is zero-shot prompting?",
    options: [
      "Providing no input to the model",
      "Asking the model to perform a task without providing any examples",
      "Training the model on zero data",
      "Generating zero output tokens"
    ],
    correctAnswer: "Asking the model to perform a task without providing any examples",
    explanation: "Zero-shot prompting relies entirely on the model's pre-trained knowledge to perform a task based only on the instruction, with no demonstrations."
  },
  {
    id: "genai-10",
    question: "What is chain-of-thought (CoT) prompting?",
    options: [
      "Asking the model to generate multiple unrelated answers",
      "Encouraging the model to show step-by-step reasoning before giving a final answer",
      "Breaking the model's output into chains of sentences",
      "Using multiple models in a chain"
    ],
    correctAnswer: "Encouraging the model to show step-by-step reasoning before giving a final answer",
    explanation: "CoT prompting elicits intermediate reasoning steps, which improves accuracy on complex tasks like math, logic, and multi-step problems."
  },
  {
    id: "genai-11",
    question: "What is tokenization in large language models?",
    options: [
      "Converting images to vectors",
      "Breaking text into subword or word units (tokens) that the model processes",
      "Encrypting model weights",
      "Reducing the number of model layers"
    ],
    correctAnswer: "Breaking text into subword or word units (tokens) that the model processes",
    explanation: "Tokenizers like BPE split text into manageable tokens, balancing vocabulary size with sequence length for efficient model processing."
  },
  {
    id: "genai-12",
    question: "What is a context window in an LLM?",
    options: [
      "The amount of GPU memory used",
      "The maximum number of tokens the model can process in a single forward pass",
      "The number of output tokens generated",
      "The size of the training dataset"
    ],
    correctAnswer: "The maximum number of tokens the model can process in a single forward pass",
    explanation: "The context window defines the total input+output token limit; anything beyond it is unseen by the model, affecting long-document handling."
  },
  {
    id: "genai-13",
    question: "What is hallucination in generative AI?",
    options: [
      "The model crashing or producing errors",
      "The model generating plausible-sounding but factually incorrect or fabricated information",
      "The model producing output in a different language",
      "The model running out of memory"
    ],
    correctAnswer: "The model generating plausible-sounding but factually incorrect or fabricated information",
    explanation: "Hallucination occurs when the model produces confident-sounding but false or ungrounded outputs, a key safety concern in deployed systems."
  },
  {
    id: "genai-14",
    question: "What is RAG (Retrieval-Augmented Generation)?",
    options: [
      "A type of GAN architecture",
      "A technique that retrieves relevant documents from an external knowledge base to ground the LLM's generation",
      "A method for compressing model weights",
      "A type of data augmentation for images"
    ],
    correctAnswer: "A technique that retrieves relevant documents from an external knowledge base to ground the LLM's generation",
    explanation: "RAG combines retrieval of relevant external information with generation, reducing hallucination and enabling up-to-date knowledge without retraining."
  },
  {
    id: "genai-15",
    question: "What is the main tradeoff between fine-tuning and prompting?",
    options: [
      "They produce identical results",
      "Fine-tuning adapts the model permanently but requires data and compute; prompting is flexible but limited by model capacity",
      "Prompting always requires more data",
      "Fine-tuning is always faster"
    ],
    correctAnswer: "Fine-tuning adapts the model permanently but requires data and compute; prompting is flexible but limited by model capacity",
    explanation: "Fine-tuning modifies weights for specialized performance but costs compute and data; prompting works without retraining but may not reach the same accuracy."
  },
  {
    id: "genai-16",
    question: "What is few-shot prompting?",
    options: [
      "Training the model on very few examples",
      "Providing a small number of input-output examples in the prompt to guide the model's behavior",
      "Generating only a few tokens of output",
      "Using only a few layers of the model"
    ],
    correctAnswer: "Providing a small number of input-output examples in the prompt to guide the model's behavior",
    explanation: "Few-shot prompting includes demonstrations in the context window, allowing the model to infer the desired task pattern without weight updates."
  },
  {
    id: "genai-17",
    question: "What is a system prompt?",
    options: [
      "A prompt that crashes the model",
      "An initial instruction that sets the model's behavior, role, and constraints for the conversation",
      "A prompt sent by the operating system",
      "A hardware configuration file"
    ],
    correctAnswer: "An initial instruction that sets the model's behavior, role, and constraints for the conversation",
    explanation: "System prompts define the model's persona, boundaries, and operating rules, applied before user messages to steer overall behavior."
  },
  {
    id: "genai-18",
    question: "What is a multi-modal model?",
    options: [
      "A model that runs on multiple GPUs",
      "A model that can process and generate across multiple data types (text, images, audio)",
      "A model with multiple output heads",
      "A model that uses multiple programming languages"
    ],
    correctAnswer: "A model that can process and generate across multiple data types (text, images, audio)",
    explanation: "Multi-modal models handle different input/output modalities (e.g., vision-language models that understand images and generate text) in a unified framework."
  },
  {
    id: "genai-19",
    question: "In generative AI for hardware design, what is RTL generation?",
    options: [
      "Generating random test vectors",
      "Using AI to automatically produce Register-Transfer Level code from natural language specifications",
      "Routing traces on a PCB",
      "Simulating analog circuits"
    ],
    correctAnswer: "Using AI to automatically produce Register-Transfer Level code from natural language specifications",
    explanation: "RTL generation uses LLMs to convert design specifications into Verilog/VHDL, accelerating digital design by automating routine coding tasks."
  },
  {
    id: "genai-20",
    question: "What is a key ethical concern when using generative AI in engineering?",
    options: [
      "Models are too slow",
      "Generated designs may have hidden biases, IP infringement issues, or hallucinated specifications that lead to hardware failures",
      "Models use too little memory",
      "Generative AI cannot be used in engineering"
    ],
    correctAnswer: "Generated designs may have hidden biases, IP infringement issues, or hallucinated specifications that lead to hardware failures",
    explanation: "Engineers must validate AI outputs for correctness, safety, and IP concerns, as hallucinated specifications could cause real-world hardware failures."
  }
];
