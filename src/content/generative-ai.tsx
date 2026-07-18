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
  { front: 'What is a VAE?', back: 'Variational Autoencoder — learns a compressed latent space, useful for denoising, anomaly detection, and generating new data samples.' },
  { front: 'What is a GAN?', back: 'Generative Adversarial Network — a generator and discriminator compete: the generator creates fakes, the discriminator catches them, both improve.' },
  { front: 'What is a latent space?', back: 'A compact numeric representation where similar data points are close together, enabling interpolation and generation.' },
  { front: 'What is mode collapse?', back: 'When a GAN generator produces only a few "safe" outputs that fool the discriminator, losing diversity.' },
  { front: 'What are diffusion models?', back: 'Models that gradually add noise to data, then learn to reverse the process, generating new data by denoising random noise.' },
];

const GenerativeAIContent = () => {
  return (
    <>
      <p>
        Generative AI models do not just classify or predict — they <strong>create</strong> new
        data that resembles their training set: images, waveforms, text, or even circuit layouts.
        For electronics engineers this is exciting because it shortens the loop between idea and
        prototype.
      </p>

      <Callout type="important" title="Learning Objectives">
        After this module, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain the differences between VAEs, GANs, and diffusion models.
        <br /><strong>2.</strong> Describe how latent spaces encode and interpolate between designs.
        <br /><strong>3.</strong> Build a denoising autoencoder for cleaning sensor signals.
        <br /><strong>4.</strong> Identify EE applications: synthetic data, denoising, layout assistance.
        <br /><strong>5.</strong> Recognize the limitations and validation requirements of AI-generated hardware.
      </Callout>

      <h2>Three Families You Should Know</h2>
      <ul>
        <li><strong>VAEs (Variational Autoencoders)</strong> — learn a compressed latent space; great for denoising and anomaly detection.</li>
        <li><strong>GANs (Generative Adversarial Networks)</strong> — a generator and a discriminator compete, producing sharp, realistic outputs.</li>
        <li><strong>Diffusion models</strong> — gradually add then remove noise; the backbone of modern image generators.</li>
      </ul>

      <Callout type="note" title="Latent Space">
        A latent space is a compact numeric &ldquo;idea&rdquo; representation. Two similar PCB
        layouts sit close together; you can interpolate between points to morph one design into
        another. This is the secret behind generative design tools.
      </Callout>

      <InteractiveDiagram
        title="How a GAN Produces New Data"
        nodes={[
          { id: 'noise', label: 'Random Noise', description: 'A vector drawn from a simple distribution (the seed of creativity).' },
          { id: 'gen', label: 'Generator', description: 'A network that turns noise into a fake sample (e.g., a sensor trace).' },
          { id: 'disc', label: 'Discriminator', description: 'A network that judges: real or fake?' },
          { id: 'loop', label: 'Adversarial Loop', description: 'Generator improves to fool; discriminator improves to detect. Both get better.' }
        ]}
      />

      <h2>Generative AI in Electronics</h2>
      <p>
        The same machinery that generates cat photos can generate useful engineering artifacts:
      </p>
      <ul>
        <li><strong>Synthetic sensor data</strong> — augment small datasets when faults are rare.</li>
        <li><strong>Denoisers</strong> — clean up signals from cheap, noisy ADCs.</li>
        <li><strong>Layout assistance</strong> — propose component placements or trace routing candidates.</li>
        <li><strong>Test-pattern generation</strong> — create inputs that stress a design to find edge-case failures.</li>
      </ul>

      <CodeBlock
        filename="denoise_vae.py"
        language="python"
        code={`import torch
import torch.nn as nn

class DenoiseAE(nn.Module):
    """A simple autoencoder that compresses then reconstructs a signal."""
    def __init__(self, dim=256, latent=32):
        super().__init__()
        self.encoder = nn.Sequential(nn.Linear(dim, 128), nn.ReLU(),
                                     nn.Linear(128, latent))
        self.decoder = nn.Sequential(nn.Linear(latent, 128), nn.ReLU(),
                                     nn.Linear(128, dim))

    def forward(self, x):
        return self.decoder(self.encoder(x))

# Train it to output x given a noise-corrupted x_in:
# loss = mse(model(noisy_signal), clean_signal)
print(DenoiseAE()(torch.randn(1, 256)).shape)   # reconstructs (1, 256)`}
      />

      <Callout type="warning">
        Generated schematics and layouts must be <strong>validated</strong>, not trusted blindly.
        A model can produce a beautiful board that violates clearance rules or has floating nets.
        Always run DRC and review before fabrication.
      </Callout>

      <MiniQuiz
        question="In a GAN, what is the role of the discriminator?"
        options={[
          { id: 'a', text: 'It generates the fake samples.' },
          { id: 'b', text: 'It judges whether a sample is real or fake, pushing the generator to improve.' },
          { id: 'c', text: 'It stores the training data.' },
          { id: 'd', text: 'It compresses the data into a latent space.' }
        ]}
        correctAnswerId="b"
        explanation="The discriminator is the critic: it scores samples as real or fake. The generator trains to fool it, and the adversarial loop drives both to improve."
      />

      <ExpandableCard title="Advantages of Generative AI for EE" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Synthetic data generation</strong> — augment small datasets when real fault data is rare</li>
          <li><strong>Denoising</strong> — clean up signals from cheap, noisy ADCs without expensive hardware</li>
          <li><strong>Rapid prototyping</strong> — generate component placement candidates in seconds</li>
          <li><strong>Test coverage</strong> — create inputs that stress-test designs at edge cases</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Limitations" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Generated artifacts need validation</strong> — always run DRC on AI-generated schematics</li>
          <li><strong>GANs are unstable</strong> — training can diverge or suffer mode collapse</li>
          <li><strong>Data hungry</strong> — GANs need thousands of samples to train stably</li>
          <li><strong>No guarantees</strong> — generative models produce plausible outputs, not guaranteed-correct ones</li>
        </ul>
      </ExpandableCard>

      <FlashCard cards={flashCards} title="Generative AI — Flash Cards" />

      <HandsOnActivity
        title="Build a Denoising Autoencoder"
        difficulty="Intermediate"
        estimatedTime="40 minutes"
        objectives={[
          'Design an encoder-decoder architecture in PyTorch',
          'Train on clean vs. noisy sensor data pairs',
          'Measure SNR improvement',
          'Visualize before/after denoising'
        ]}
        materials={[
          'Python 3.10+ with PyTorch, numpy, matplotlib',
          'Clean sensor dataset (temperature or accelerometer)',
          'Jupyter notebook'
        ]}
        steps={[
          { instruction: 'Load clean sensor data and add Gaussian noise (σ = 0.1 × signal range).' },
          { instruction: 'Build autoencoder: encoder (256→64→32), decoder (32→64→256).' },
          { instruction: 'Train to minimize MSE between reconstructed and clean signal for 50 epochs.' },
          { instruction: 'Plot original, noisy, and denoised signals side by side.' },
          { instruction: 'Compute SNR before and after denoising.' }
        ]}
        verification="SNR improves by at least 6dB. Denoised signal is visibly smoother than input."
      />

      <ThinkLikeAnEngineer
        problem="Your team is designing a PCB for a medical wearable. The layout tool suggests component placements, but you want to use generative AI to explore alternative placements that minimize trace length while maintaining isolation between the analog sensor section and the digital Bluetooth section. How would you approach this?"
        context="Board: 4-layer, 25mm × 25mm. Components: ADS1292 (ECG), nRF52832 (BLE), LiPo charger, LDO regulator. Critical constraint: analog-digital isolation."
        hints={[
          'Represent the placement problem as a constrained optimization in latent space',
          'Define keep-out zones between analog and digital sections',
          'Use DRC rules as constraints in the generation process',
          'Always validate AI-generated layouts with signal integrity analysis'
        ]}
        explanation="Approach: (1) Define a placement cost function: minimize total trace length + maximize analog-digital separation. (2) Use a VAE to learn a latent space of valid placements from existing PCB designs. (3) Sample from the latent space and evaluate each candidate against the cost function. (4) Filter candidates that pass KiCad DRC. (5) Run signal integrity simulation on top candidates. The key insight: generative AI is a starting-point generator, not a final designer. It dramatically narrows the search space from thousands of manual iterations to a handful of AI-suggested candidates that you then validate rigorously."
        aiPrompt="Act as a Senior PCB Design Engineer with expertise in AI-assisted layout. I need to optimize component placement on a 25mm × 25mm 4-layer medical wearable PCB. Components: ADS1292 (analog ECG), nRF52832 (digital BLE), LiPo charger, LDO. Design a generative AI workflow for placement optimization including: how to encode placements as latent vectors, constraint definition (analog-digital isolation, thermal zones), DRC validation pipeline, and signal integrity checks."
      />

      <KeyTakeaways
        points={[
          "Generative models create new data: VAEs, GANs, and diffusion are the main families.",
          "A latent space encodes designs as numbers you can interpolate between.",
          "Useful EE applications: synthetic data, denoising, layout aid, test generation.",
          "Always validate AI-generated hardware artifacts with DRC and review."
        ]}
      />

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Trusting AI-generated schematics without DRC',
            why: 'A generative model can produce a visually correct schematic that violates clearance rules, has floating nets, or uses wrong component values.',
            fix: 'Always run Design Rule Check (DRC) and manual review before fabrication.',
          },
          {
            mistake: 'Using a GAN without enough training data',
            why: 'GANs need thousands of samples to learn a stable distribution. With fewer than 100 samples, training diverges.',
            fix: 'Start with a VAE for small datasets. Use data augmentation if needed.',
          },
          {
            mistake: 'Confusing denoising with denoising autoencoders',
            why: 'A denoising AE learns to reconstruct clean data from corrupted input. A diffusion model iteratively removes noise. They are different architectures.',
            fix: 'Understand the distinction: AE is one-shot, diffusion is iterative.',
          },
          {
            mistake: 'Ignoring mode collapse in GANs',
            why: 'The generator learns to produce only a few "safe" outputs that fool the discriminator, losing diversity.',
            fix: 'Monitor output diversity. Use techniques like minibatch discrimination or WGAN-GP.',
          },
        ]}
      />

      <EngineeringChallenge
        title="Build a Denoising Autoencoder for Sensor Signals"
        description="Create a VAE that cleans noisy ADC readings from a cheap temperature sensor."
        difficulty="Intermediate"
        steps={[
          { step: 'Record 1000 clean temperature readings from a calibrated sensor.', hint: 'Use a precision thermocouple or the STM32 internal sensor after calibration.' },
          { step: 'Add synthetic Gaussian noise (σ = 0.1 × signal range) to create noisy inputs.', hint: 'Use np.random.normal(0, noise_level, signal.shape).' },
          { step: 'Build a simple autoencoder: encoder (256→64→32), decoder (32→64→256).', hint: 'Use nn.Sequential with ReLU activations.' },
          { step: 'Train to minimize MSE between reconstructed and clean signal.', hint: 'Use nn.MSELoss() with Adam optimizer, lr=1e-3.' },
          { step: 'Evaluate: compute SNR improvement before and after denoising.', hint: 'SNR = 10 * log10(signal_power / noise_power).' },
        ]}
        expectedOutcome="An autoencoder that improves SNR by at least 6dB, with the denoised signal visibly smoother than the input."
      />

      <AIChallenge
        title="Generative Design for PCB Component Placement"
        role="Act as a Senior PCB Design Engineer with expertise in AI-assisted layout tools."
        objective="Help me use generative AI to propose optimal component placements for a compact IoT sensor board."
        background="I have a 4-layer, 30mm × 30mm PCB with an ESP32, BME280 sensor, LiPo charger IC, and voltage regulator. I need to minimize trace length while maintaining thermal isolation between the charger and sensor."
        requirements={[
          'Explain how to represent PCB placement as a latent space optimization problem',
          'Suggest constraints that must be encoded (keep-outs, thermal zones, decoupling)',
          'Provide a workflow using AI tools (ChatGPT/Claude) to generate placement candidates',
          'Describe how to validate generated placements in KiCad or EasyEDA',
          'List the DRC checks that must pass before considering a placement valid',
        ]}
        expectedOutput="A complete workflow from problem definition through AI-assisted placement generation to DRC validation."
        bestPractices={[
          'AI-generated placements are starting points, not final designs. Always validate with DRC.',
          'Thermal isolation between power ICs and sensors is more important than trace length optimization.',
          'Decoupling capacitors must be placed as close as possible to the IC power pins.',
        ]}
      />

      <References
        references={[
          { title: 'Generative Deep Learning — David Foster', type: 'book', description: 'Comprehensive guide to VAEs, GANs, and diffusion models.' },
          { title: 'Lil\'Log — Lilian Weng', type: 'tutorial', url: 'https://lilianweng.github.io/', description: 'Excellent blog posts on generative models and diffusion.' },
          { title: 'Diffusion Models — Hugging Face', type: 'documentation', url: 'https://huggingface.co/docs/diffusers/', description: 'Practical guide to diffusion models with code.' },
          { title: 'The Illustrated GAN — Jay Alammar', type: 'tutorial', url: 'https://jalammar.github.io/', description: 'Visual explanations of generative architectures.' },
        ]}
      />
    </>
  );
};

export default GenerativeAIContent;
