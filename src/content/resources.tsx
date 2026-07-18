'use client';

import React from 'react';
import { useSyncExternalStore } from 'react';
import Callout from '@/components/course/Callout';
import MiniQuiz from '@/components/course/MiniQuiz';
import KeyTakeaways from '@/components/course/KeyTakeaways';
import { getResources, subscribeResources } from '@/lib/resources';

const ResourcesContent = () => {
  return (
    <>
      <p>
        A curated, opinionated list of resources to go deeper. Everything here is free or has a
        strong free tier, and each item was chosen because it is genuinely useful for an
        electronics engineer crossing into AI — not just generic ML theory.
      </p>

      <h2>Books &amp; Long Reads</h2>
      <ul>
        <li><strong>&ldquo;TinyML&rdquo;</strong> — Pete Warden &amp; Daniel Situnayake. The canonical intro to ML on microcontrollers.</li>
        <li><strong>&ldquo;Deep Learning&rdquo;</strong> — Goodfellow, Bengio, Courville. The free online reference for the math.</li>
        <li><strong>&ldquo;The Hundred-Page Machine Learning Book&rdquo;</strong> — Andriy Burkov. Dense, practical, short.</li>
        <li><strong>ST &amp; Edge Impulse guides</strong> — vendor docs on deploying models to real MCUs.</li>
      </ul>

      <h2>Courses &amp; Video</h2>
      <ul>
        <li><strong>CS231n</strong> (Stanford) — Convolutional networks for vision; lectures are public.</li>
        <li><strong>fast.ai</strong> — Top-down, code-first deep learning.</li>
        <li><strong>3Blue1Brown &ldquo;Neural Networks&rdquo;</strong> — The best visual intuition for backprop.</li>
        <li><strong>TensorFlow Lite for Microcontrollers</strong> codelabs — hands-on deploy labs.</li>
      </ul>

      <Callout type="example" title="A 30-Day Starter Path">
        Week 1: Python + NumPy + one sklearn classifier on a sensor dataset. Week 2: a 1-D CNN in
        PyTorch. Week 3: quantize and run it on a dev board (Arduino Nano 33 BLE Sense or an
        STM32). Week 4: build one end-to-end anomaly detector and document it. That single
        project beats any number of finished courses.
      </Callout>

      <h2>Tools &amp; Libraries</h2>
      <ul>
        <li><strong>PyTorch / TensorFlow</strong> — model training.</li>
        <li><strong>scikit-learn</strong> — classical ML and baselines.</li>
        <li><strong>TensorFlow Lite Micro / Edge Impulse</strong> — on-device deployment.</li>
        <li><strong>Ollama / llama.cpp</strong> — run LLMs locally and privately.</li>
        <li><strong>Wokwi / PlatformIO</strong> — simulate and build firmware fast.</li>
      </ul>

      <h2>Datasets for Practice</h2>
      <ul>
        <li><strong>UCI Machine Learning Repository</strong> — classic sensor and signal datasets.</li>
        <li><strong>MIT-BIH</strong> — ECG/heart signals for time-series practice.</li>
        <li><strong>NASA C-MAPSS</strong> — turbine degradation for predictive-maintenance ML.</li>
        <li><strong>Your own bench</strong> — capture signals with an oscilloscope/ logic analyzer and label them yourself.</li>
      </ul>

      <Callout type="important" title="The Best Dataset Is Yours">
        Public datasets teach technique, but the fastest way to real skill is to instrument
        something in your lab — a motor, a power supply, an IMU — and solve a problem you actually
        care about. Owned data beats borrowed data every time.
      </Callout>

      <h2>Communities</h2>
      <ul>
        <li><strong>Edge Impulse Forum</strong> — practitioners deploying ML to hardware.</li>
        <li><strong>r/MachineLearning &amp; r/embedded</strong> — broad Q&amp;A.</li>
        <li><strong>Hackster.io</strong> — project write-ups you can replicate.</li>
        <li><strong>Local IEEE / hackathon groups</strong> — hands-on, in person.</li>
      </ul>

      <h2>Downloadable Resources</h2>
      <p>Materials published by the instructor appear here and can be downloaded directly.</p>
      <ResourceGallery />

      <MiniQuiz
        question="What is the recommended fastest path to real edge-AI skill?"
        options={[
          { id: 'a', text: 'Watch every ML course before touching hardware.' },
          { id: 'b', text: 'Build one end-to-end project on data you collect yourself.' },
          { id: 'c', text: 'Only use large public datasets you did not collect.' },
          { id: 'd', text: 'Wait for a vendor to ship a finished model.' }
        ]}
        correctAnswerId="b"
        explanation="One complete project — collect, train, quantize, deploy, validate — teaches more than passive course-watching. Owned data keeps the problem concrete and motivating."
      />

      <KeyTakeaways
        points={[
          "Prefer code-first, EE-relevant resources (TinyML, CS231n, fast.ai).",
          "Build one end-to-end project on your own data for the fastest learning.",
          "Keep local LLM tooling for private, sensitive hardware work.",
          "Communities (Edge Impulse, embedded forums) turn stuck into shipped."
        ]}
      />
    </>
  );
};

function ResourceGallery() {
  const resources = useSyncExternalStore(subscribeResources, getResources, () => []);
  const publicResources = resources.filter(r => r.visibility === 'public');

  if (publicResources.length === 0) {
    return (
      <p style={{ opacity: 0.7, fontStyle: 'italic' }}>
        No downloadable resources published yet.
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        margin: '1rem 0',
      }}
    >
      {publicResources.map(r => (
        <div
          key={r.id}
          style={{
            border: '1px solid var(--border, #2a2f45)',
            borderRadius: 12,
            padding: '1rem',
            background: 'var(--card, #11142a)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.7, textTransform: 'uppercase' }}>
              {r.category}
            </span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              {r.fileType} · {r.fileSize}
            </span>
          </div>
          <h3 style={{ margin: '0 0 .4rem' }}>{r.title}</h3>
          <p style={{ fontSize: 14, opacity: 0.85, margin: '0 0 .8rem' }}>
            {r.description}
          </p>
          <a
            href={r.fileData}
            download={r.fileName}
            style={{
              display: 'inline-block',
              padding: '.5rem .9rem',
              borderRadius: 8,
              background: 'var(--color-electric-blue, #2f6bff)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            ⬇ Download
          </a>
        </div>
      ))}
    </div>
  );
}

export default ResourcesContent;
