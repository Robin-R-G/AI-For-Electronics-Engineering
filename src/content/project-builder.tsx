'use client';

import React, { useState } from 'react';

const domains = [
  {
    id: 'iot',
    title: 'IoT & Smart Home',
    icon: '📡',
    projects: [
      {
        name: 'Weather Station with Cloud Dashboard',
        difficulty: 'Beginner',
        components: ['ESP32', 'BME280 (Temp/Humidity/Pressure)', 'OLED Display', 'Solar Panel + Battery'],
        architecture: 'ESP32 reads BME280 via I2C → displays on OLED → sends data via MQTT to cloud dashboard (ThingSpeak/HomeAssistant)',
        aiIntegration: 'Use a simple linear regression model on the ESP32 to predict next-hour temperature from current readings. Quantize to int8 for on-device inference.',
        prompts: ['Act as a Senior IoT Solutions Architect. Design a solar-powered weather station using ESP32 and BME280 that sends data to a cloud dashboard every 5 minutes. Include power budget analysis, sleep current calculations, and MQTT topic structure.'],
      },
      {
        name: 'Voice-Controlled Smart Switch',
        difficulty: 'Intermediate',
        components: ['ESP32', 'INMP441 Microphone', 'Relay Module', 'Power Supply'],
        architecture: 'INMP441 captures audio → ESP32 runs keyword detection (Picovoice/Porcupine) → triggers relay → controls appliance',
        aiIntegration: 'Deploy a keyword spotting model (TinyML) on ESP32. Use Edge Impulse for training. Model size: ~20KB int8. Inference time: ~15ms.',
        prompts: ['Act as a Senior Firmware Engineer. I need to implement keyword detection on ESP32 using INMP441 I2S microphone. The device should detect "Hey Home" and toggle a relay. Provide the complete firmware architecture including I2S configuration, audio buffer management, and model inference pipeline.'],
      },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Motion',
    icon: '🤖',
    projects: [
      {
        name: 'Line Follower with PID Control',
        difficulty: 'Beginner',
        components: ['Arduino Uno', 'TCRT5000 Sensor Array (5-channel)', 'L298N Motor Driver', 'DC Motors', 'Chassis'],
        architecture: '5-channel IR sensor array reads line position → PID algorithm calculates correction → L298N drives motors differentially',
        aiIntegration: 'Replace PID with a tiny neural network (10-5-2) trained on sensor readings and motor commands. Deploy quantized model to Arduino.',
        prompts: ['Act as a Senior Robotics Engineer. Design a PID-controlled line following robot using Arduino Uno and a 5-channel TCRT5000 sensor array. Provide the complete code with PID tuning methodology, sensor calibration procedure, and motor driver interface.'],
      },
      {
        name: 'Robotic Arm with Inverse Kinematics',
        difficulty: 'Advanced',
        components: ['STM32F103', '4× SG90 Servos', 'PCA9685 Servo Driver', 'PS2 Controller'],
        architecture: 'PS2 controller inputs joint angles → STM32 computes inverse kinematics → PCA9685 drives 4 servos → end effector reaches target position',
        aiIntegration: 'Train a small MLP (8-16-8-4) to map (x,y,z) target position to (θ1,θ2,θ3,θ4) joint angles. Quantize and deploy to STM32.',
        prompts: ['Act as a Senior Digital Design Engineer. Design a 4-DOF robotic arm control system using STM32F103 and PCA9685. Implement forward and inverse kinematics in C. Include servo calibration, joint limit enforcement, and smooth trajectory interpolation.'],
      },
    ],
  },
  {
    id: 'power',
    title: 'Power Electronics',
    icon: '⚡',
    projects: [
      {
        name: 'Solar MPPT Charge Controller',
        difficulty: 'Intermediate',
        components: ['Arduino Mega', 'MOSFET (IRFZ44N)', 'Current Sensor (ACS712)', 'Voltage Divider', 'Inductor'],
        architecture: 'Voltage divider reads panel voltage → ACS712 reads current → Arduino runs Perturb & Observe MPPT algorithm → PWM drives MOSFET buck converter',
        aiIntegration: 'Use a lightweight RL agent to optimize MPPT tracking speed. Train in simulation, deploy quantized policy network to Arduino.',
        prompts: ['Act as a Senior Power Electronics Engineer. Design a solar MPPT charge controller using Arduino Mega, IRFZ44N MOSFET, and ACS712 current sensor. Implement Perturb & Observe algorithm. Provide the complete schematic, PCB layout guidelines, and firmware with power calculations.'],
      },
    ],
  },
  {
    id: 'healthcare',
    title: 'Wearable Healthcare',
    icon: '❤️',
    projects: [
      {
        name: 'ECG Monitor with Anomaly Detection',
        difficulty: 'Advanced',
        components: ['ESP32', 'AD8232 ECG Module', 'OLED Display', 'Bluetooth Module'],
        architecture: 'AD8232 captures ECG signal → ESP32 samples at 250Hz → bandpass filter → QRS detection → anomaly classification → Bluetooth to phone app',
        aiIntegration: 'Deploy a 1D-CNN (quantized) for arrhythmia detection. Model trained on MIT-BIH dataset. Accuracy: 95%+ on test set. Inference: ~8ms per heartbeat.',
        prompts: ['Act as a Senior Biomedical Engineer. Design a wearable ECG monitor using ESP32 and AD8232 that detects heart arrhythmias in real-time. Include the complete signal processing pipeline (filtering, R-peak detection), a quantized 1D-CNN for classification, and BLE transmission to a mobile app.'],
      },
    ],
  },
];

const ProjectBuilderContent = () => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedProject, setSelectedProject] = useState(domains[0].projects[0]);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const handleCopyPrompt = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedPrompt(index);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <>
      <p>
        Choose a domain, explore project ideas with suggested components, system architecture,
        AI integration strategies, and ready-to-use prompts to get started immediately.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {domains.map(d => (
          <button
            key={d.id}
            onClick={() => { setSelectedDomain(d); setSelectedProject(d.projects[0]); }}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              border: `1px solid ${selectedDomain.id === d.id ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedDomain.id === d.id ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedDomain.id === d.id ? '#00e5ff' : 'rgba(200,210,235,0.75)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>{d.icon}</span> {d.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1.5rem' }}>
        {/* Project list sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {selectedDomain.projects.map((proj, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(proj)}
              style={{
                padding: '0.75rem 1rem',
                background: selectedProject.name === proj.name ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selectedProject.name === proj.name ? 'rgba(0,229,255,0.3)' : 'var(--color-border)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {proj.name}
              </p>
              <span style={{
                fontSize: '0.7rem',
                color: proj.difficulty === 'Beginner' ? '#00ffa3' :
                  proj.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
              }}>
                {proj.difficulty}
              </span>
            </div>
          ))}
        </div>

        {/* Project detail */}
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{selectedProject.name}</h3>
          <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: selectedProject.difficulty === 'Beginner' ? 'rgba(0,255,163,0.15)' :
              selectedProject.difficulty === 'Intermediate' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
            color: selectedProject.difficulty === 'Beginner' ? '#00ffa3' :
              selectedProject.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
            marginBottom: '1.5rem',
          }}>
            {selectedProject.difficulty}
          </span>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>
            Components Needed
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {selectedProject.components.map(comp => (
              <span key={comp} style={{
                padding: '0.3rem 0.75rem',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                color: '#7c3aed',
              }}>
                {comp}
              </span>
            ))}
          </div>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>
            System Architecture
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {selectedProject.architecture}
          </p>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>
            AI Integration Strategy
          </h4>
          <div style={{
            padding: '1rem',
            background: 'rgba(0,229,255,0.03)',
            borderRadius: '12px',
            borderLeft: '3px solid var(--color-cyan)',
            marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              {selectedProject.aiIntegration}
            </p>
          </div>

          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>
            AI Prompts to Get Started
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedProject.prompts.map((prompt, i) => (
              <div key={i} style={{
                padding: '0.75rem 1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <code style={{ flex: 1, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {prompt}
                </code>
                <button
                  onClick={() => handleCopyPrompt(prompt, i)}
                  style={{
                    padding: '0.3rem 0.8rem',
                    background: copiedPrompt === i ? 'rgba(0,255,163,0.15)' : 'rgba(0,229,255,0.1)',
                    border: `1px solid ${copiedPrompt === i ? 'rgba(0,255,163,0.3)' : 'rgba(0,229,255,0.3)'}`,
                    borderRadius: '9999px',
                    color: copiedPrompt === i ? '#00ffa3' : '#00e5ff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copiedPrompt === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectBuilderContent;
