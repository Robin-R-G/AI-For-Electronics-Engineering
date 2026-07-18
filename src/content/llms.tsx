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
  { front: 'What is self-attention?', back: 'The mechanism that lets transformers weigh the relevance of every token relative to every other token in a sequence, capturing long-range dependencies.' },
  { front: 'What is RAG?', back: 'Retrieval-Augmented Generation — grounding LLM answers in your own documents (datasheets, HAL docs) to prevent hallucination.' },
  { front: 'What are tokens?', back: 'Sub-word chunks that LLMs process. A 2KB firmware snippet might be a few hundred tokens.' },
  { front: 'What temperature setting should you use for code generation?', back: 'Low temperature (0.1-0.3) for precise, deterministic code. High temperature for creative brainstorming.' },
  { front: 'Why use local LLMs for hardware work?', back: 'Proprietary schematics and firmware should not be sent to cloud APIs. Local models (Ollama, llama.cpp) keep data private.' },
];

const LLMsContent = () => {
  return (
    <>
      <p>
        Large Language Models (LLMs) are transformer-based models trained on enormous text
        corpora. For an electronics engineer they are two things at once: a tool you use (to write
        and review firmware, datasheets, and tests) and a system you can deploy (for on-device
        voice commands or natural-language debugging).
      </p>

      <Callout type="important" title="Learning Objectives">
        After this module, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain how transformers and self-attention work.
        <br /><strong>2.</strong> Use RAG to ground LLM answers in your own datasheets.
        <br /><strong>3.</strong> Write production-quality prompts for firmware review and generation.
        <br /><strong>4.</strong> Run local LLMs for private, sensitive hardware work.
        <br /><strong>5.</strong> Identify when to use cloud vs. local models for embedded projects.
      </Callout>

      <h2>The Transformer: Attention Is All You Need</h2>
      <p>
        The breakthrough is <strong>self-attention</strong>: instead of processing a sequence one
        step at a time, the model looks at every token relative to every other token, weighting
        the important ones. This captures long-range dependencies — essential for code, where a
        variable used at the top matters hundreds of lines later.
      </p>

      <InteractiveDiagram
        title="Inside a Transformer Block"
        nodes={[
          { id: 'embed', label: 'Token + Position', description: 'Text is split into tokens and given positional information.' },
          { id: 'attn', label: 'Self-Attention', description: 'Each token attends to all others, learning what is relevant.' },
          { id: 'ffn', label: 'Feed-Forward', description: 'A small per-token network refines the representation.' },
          { id: 'stack', label: 'Stacked Layers', description: 'Dozens of these blocks stacked form the deep model.' }
        ]}
      />

      <Callout type="note" title="Tokens, Not Words">
        Models see <strong>tokens</strong> — sub-word chunks — not whole words. A 2 KB firmware
        snippet might be a few hundred tokens. Context windows (e.g., 8K–128K tokens) limit how
        much you can feed at once, so paste the relevant files, not your whole repo.
      </Callout>

      <h2>Using an LLM in Your Workflow</h2>
      <p>
        The most reliable pattern is <strong>Retrieval-Augmented Generation (RAG)</strong>: ground
        the model in your own docs (datasheets, HAL reference) so it does not hallucinate register
        addresses. Here is a minimal inference call:
      </p>

      <CodeBlock
        filename="llm_infer.py"
        language="python"
        code={`from openai import OpenAI

client = OpenAI()   # or a local server such as llama.cpp / Ollama

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content":
         "You are an embedded C expert for STM32. Reply with concise, correct code."},
        {"role": "user", "content":
         "Write a HAL function to read the internal temperature sensor and return Celsius."},
    ],
    temperature=0.2,
)
print(response.choices[0].message.content)`}
      />

      <Callout type="warning">
        Never paste secrets, API keys, or proprietary schematics into a cloud LLM without
        approval. For sensitive work, run a <strong>local</strong> model (e.g., via Ollama or
        llama.cpp) entirely on your machine or an air-gapped PC.
      </Callout>

      <h2>On-Device LLMs (TinyLLM)</h2>
      <p>
        Quantized models such as 1–3B parameter variants now run on capable edge hardware
        (e.g., a Raspberry Pi 5 or an NPU-equipped SoC). They enable offline voice assistants and
        natural-language control without a cloud connection — a growing niche for electronics
        engineers.
      </p>

      <MiniQuiz
        question="What is the core mechanism that lets a transformer relate any token to any other token?"
        options={[
          { id: 'a', text: 'Recurrent loops processing one word at a time.' },
          { id: 'b', text: 'Self-attention, weighting relevant tokens across the whole sequence.' },
          { id: 'c', text: 'A fixed lookup table of synonyms.' },
          { id: 'd', text: 'Compiling the text to assembly.' }
        ]}
        correctAnswerId="b"
        explanation="Self-attention computes a weighted relationship between every token and every other token in parallel, capturing long-range dependencies that RNNs struggle with."
      />

      <ExpandableCard title="Advantages of LLMs for Electronics Engineers" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Accelerate firmware development</strong> — generate boilerplate HAL code, register configurations, and test harnesses</li>
          <li><strong>Code review at scale</strong> — catch bugs, race conditions, and memory issues in minutes</li>
          <li><strong>Instant datasheet lookup</strong> — RAG systems answer questions from component datasheets</li>
          <li><strong>Natural-language debugging</strong> — describe symptoms, get diagnostic steps</li>
          <li><strong>Documentation generation</strong> — auto-generate API docs, README files, and design notes</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Limitations" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Hallucination</strong> — LLMs invent register addresses, bit fields, and API calls that don&apos;t exist</li>
          <li><strong>Context window limits</strong> — can&apos;t paste your entire repo; must select relevant files</li>
          <li><strong>No real-time awareness</strong> — LLMs don&apos;t know your specific hardware configuration</li>
          <li><strong>Privacy risk</strong> — proprietary schematics sent to cloud APIs may be logged or used for training</li>
          <li><strong>Requires verification</strong> — every LLM-generated code snippet must be reviewed against the datasheet</li>
        </ul>
      </ExpandableCard>

      <FlashCard cards={flashCards} title="LLMs — Flash Cards" />

      <HandsOnActivity
        title="Set Up a Local LLM for Firmware Work"
        difficulty="Intermediate"
        estimatedTime="20 minutes"
        objectives={[
          'Install Ollama on your development machine',
          'Pull a code-capable model (codellama or deepseek-coder)',
          'Test it with an embedded C code generation prompt',
          'Compare output quality with cloud API'
        ]}
        materials={[
          'PC with 16GB+ RAM (8GB minimum for smaller models)',
          'Ollama (https://ollama.com)',
          'Internet connection for initial download'
        ]}
        steps={[
          { instruction: 'Download and install Ollama from ollama.com.' },
          { instruction: 'Pull a code model: `ollama pull codellama:7b`', codeSnippet: `# In terminal:\nollama pull codellama:7b\n# Or for a larger, more capable model:\nollama pull deepseek-coder:6.7b` },
          { instruction: 'Test with a firmware prompt:', codeSnippet: `ollama run codellama:7b\n> Write a HAL function for STM32F4 that reads the internal temperature sensor using ADC1, applies a 10-sample moving average, and returns temperature in Celsius. Include proper HAL initialization and error handling.` },
          { instruction: 'Compare the output with the same prompt on ChatGPT or Claude.' }
        ]}
        verification="Ollama runs locally, generates plausible STM32 HAL code, and responds in under 10 seconds."
      />

      <ThinkLikeAnEngineer
        problem="Your team maintains a legacy firmware codebase (50K lines of C for an STM32F103). A new engineer needs to understand the RTOS task structure, but the documentation is outdated. How do you use an LLM to accelerate onboarding without risking proprietary code leakage?"
        context="The codebase uses FreeRTOS with 12 tasks, 3 ISR handlers, and custom HAL drivers. No updated documentation exists. The company policy prohibits sending source code to cloud services."
        hints={[
          'Run a local LLM (Ollama with codellama) on an air-gapped or internal machine',
          'Use RAG with the codebase — embed source files and retrieve relevant chunks',
          'Generate documentation incrementally, task by task',
          'Have senior engineers validate LLM-generated documentation before publishing'
        ]}
        explanation="Three-phase approach: (1) Set up Ollama with codellama on an internal server (no internet required). (2) Build a lightweight RAG pipeline: embed all .c and .h files with sentence-transformers, store in a local FAISS index. When the new engineer asks 'What does Task3 do?', the RAG retrieves the relevant source chunks and feeds them as context to the local LLM. (3) Generate documentation iteratively: task descriptions, ISR flowcharts, data flow diagrams. Senior engineers review each output. Result: onboarding time drops from 2 weeks to 3 days, zero proprietary code leaves the internal network."
        aiPrompt="Act as a Senior Firmware Engineer designing a secure AI-assisted code documentation system. I have a 50K-line FreeRTOS codebase (STM32F103) with 12 tasks and no updated documentation. Company policy prohibits cloud code uploads. Design a local RAG + LLM pipeline for code comprehension including: local model selection, code embedding strategy, retrieval architecture, documentation generation workflow, and security measures."
      />

      <KeyTakeaways
        points={[
          "LLMs are transformer models built on self-attention over tokens.",
          "RAG grounds answers in your own datasheets to prevent hallucination.",
          "Use local models for proprietary or sensitive hardware work.",
          "Quantized small LLMs can run on-device for offline, private assistants."
        ]}
      />

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Pasting proprietary schematics into a cloud LLM',
            why: 'Cloud providers may use your input for training or logging. Sensitive hardware designs could leak.',
            fix: 'Use local models (Ollama, llama.cpp) for proprietary work, or get explicit approval for cloud usage.',
          },
          {
            mistake: 'Trusting LLM-generated register addresses without verification',
            why: 'LLMs hallucinate. They may invent register addresses, bit fields, or API calls that do not exist.',
            fix: 'Always cross-reference with the official datasheet or HAL documentation.',
          },
          {
            mistake: 'Feeding an entire repo into the context window',
            why: 'Context windows are limited (8K–128K tokens). Exceeding them truncates critical code.',
            fix: 'Paste only the relevant files. Use RAG or codebase-aware tools like Cursor for large projects.',
          },
          {
            mistake: 'Using high temperature for code generation',
            why: 'High temperature (0.8+) makes outputs creative but unreliable. Code needs precision.',
            fix: 'Use temperature=0.1–0.3 for code generation. Reserve high temperature for brainstorming.',
          },
        ]}
      />

      <EngineeringChallenge
        title="Build a RAG System for Datasheet Q&A"
        description="Create a retrieval-augmented generation system that answers questions from component datasheets."
        difficulty="Advanced"
        steps={[
          { step: 'Download 3 datasheets (ESP32, BME280, ADS1115) as PDFs.', hint: 'Use the manufacturer websites or Octopart.' },
          { step: 'Extract text from the PDFs using PyMuPDF or pdfplumber.', hint: 'Use fitz.open() from PyMuPDF to extract text per page.' },
          { step: 'Chunk the text into 500-token segments with 50-token overlap.', hint: 'Simple approach: split by paragraph, then merge small chunks.' },
          { step: 'Embed the chunks using sentence-transformers (all-MiniLM-L6-v2).', hint: 'Use SentenceTransformer("all-MiniLM-L6-v2").encode(chunks).' },
          { step: 'Store embeddings in a FAISS index for fast similarity search.', hint: 'Use faiss.IndexFlatIP for inner-product search.' },
          { step: 'Build a query pipeline: embed the question → retrieve top-5 chunks → feed to LLM with context.', hint: 'Use Ollama with a local model for privacy.' },
        ]}
        expectedOutcome="A working RAG pipeline that answers questions like 'What is the I2C address of the ADS1115?' using only the datasheet content."
      />

      <AIChallenge
        title="Firmware Code Review with LLM"
        role="Act as a Senior Firmware Engineer with 15 years of experience in bare-metal and RTOS embedded systems."
        objective="Review this STM32 HAL code for bugs, race conditions, and memory safety issues."
        background="I have a temperature monitoring system using an STM32F4, FreeRTOS, and HAL drivers. The code uses a timer interrupt to read an ADC, a queue to pass data to a task, and UART for output. I suspect there are concurrency issues."
        requirements={[
          'Identify all race conditions and shared-state issues',
          'Check for proper use of FreeRTOS API (task notification vs semaphore)',
          'Verify HAL callback safety (ISR context vs task context)',
          'Suggest memory-safe alternatives for any dangerous patterns',
          'Provide a corrected version of the most critical bug',
        ]}
        expectedOutput="A line-by-line review with severity ratings (critical/major/minor), explanation of each issue, and corrected code for critical problems."
        bestPractices={[
          'Always specify the exact MCU, HAL version, and RTOS version in the prompt.',
          'Include the linker script memory layout if memory safety is a concern.',
          'Ask for severity ratings so you can prioritize fixes.',
        ]}
      />

      <References
        references={[
          { title: 'Attention Is All You Need — Vaswani et al.', type: 'paper', url: 'https://arxiv.org/abs/1706.03762', description: 'The original transformer paper. Essential reading.' },
          { title: 'LangChain Documentation', type: 'documentation', url: 'https://python.langchain.com/', description: 'Framework for building RAG and LLM applications.' },
          { title: 'Ollama', type: 'tool', url: 'https://ollama.com/', description: 'Run LLMs locally with a single command.' },
          { title: 'llama.cpp', type: 'tool', url: 'https://github.com/ggerganov/llama.cpp', description: 'High-performance local LLM inference in C/C++.' },
          { title: 'OpenAI Cookbook', type: 'tutorial', url: 'https://cookbook.openai.com/', description: 'Practical guides for building with GPT models.' },
        ]}
      />
    </>
  );
};

export default LLMsContent;
