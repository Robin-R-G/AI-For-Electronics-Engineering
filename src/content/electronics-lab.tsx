'use client';

import React, { useState } from 'react';

const labBreadboards = [
  {
    id: 'led-blink',
    title: 'LED Blink Circuit',
    difficulty: 'Beginner',
    components: ['Arduino Uno', 'LED', '220Ω Resistor', 'Breadboard', 'Jumper Wires'],
    connections: [
      'Arduino D13 → 220Ω Resistor → LED Anode (+)',
      'LED Cathode (-) → GND',
      'Power LED from 3.3V pin for constant-on test'
    ],
    code: `// Blink an LED on pin 13
void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
    tips: [
      'Always use a current-limiting resistor with LEDs',
      '220Ω gives ~15mA at 5V — safe for most LEDs',
      'Longer leg = anode (+), shorter leg = cathode (-)'
    ]
  },
  {
    id: 'potentiometer',
    title: 'Potentiometer + ADC Reading',
    difficulty: 'Beginner',
    components: ['Arduino Uno', '10kΩ Potentiometer', 'Breadboard', 'Jumper Wires'],
    connections: [
      'Pot Left Pin → 5V',
      'Pot Right Pin → GND',
      'Pot Middle Pin → A0',
      'Serial Monitor at 9600 baud'
    ],
    code: `// Read potentiometer value
void setup() {
  Serial.begin(9600);
}
void loop() {
  int val = analogRead(A0);
  float voltage = val * 5.0 / 1023.0;
  Serial.print("Raw: ");
  Serial.print(val);
  Serial.print(" Voltage: ");
  Serial.println(voltage);
  delay(100);
}`,
    tips: [
      'analogRead() returns 0-1023 (10-bit ADC)',
      'Map to voltage: val × 5.0 / 1023.0',
      'Add a 100nF cap between A0 and GND to reduce noise'
    ]
  },
  {
    id: 'i2c-oled',
    title: 'I2C OLED Display (SSD1306)',
    difficulty: 'Intermediate',
    components: ['Arduino Uno', 'SSD1306 0.96" OLED', '4.7kΩ Resistors ×2', 'Breadboard', 'Jumper Wires'],
    connections: [
      'OLED VCC → 3.3V',
      'OLED GND → GND',
      'OLED SDA → A4 (+ 4.7kΩ pull-up to 3.3V)',
      'OLED SCL → A5 (+ 4.7kΩ pull-up to 3.3V)'
    ],
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0,0);
  display.println("Hello, EE!");
  display.display();
}
void loop() {}`,
    tips: [
      'Default I2C address is 0x3C (some modules use 0x3D)',
      'Pull-up resistors are essential — without them, communication fails',
      'Install Adafruit_SSD1306 and Adafruit_GFX libraries'
    ]
  },
  {
    id: 'mpu6050-motion',
    title: 'MPU6050 Accelerometer + Gyroscope',
    difficulty: 'Intermediate',
    components: ['Arduino Uno', 'MPU6050 Module', '4.7kΩ Resistors ×2', 'Breadboard', 'Jumper Wires'],
    connections: [
      'MPU6050 VCC → 3.3V',
      'MPU6050 GND → GND',
      'MPU6050 SDA → A4 (+ 4.7kΩ pull-up to 3.3V)',
      'MPU6050 SCL → A5 (+ 4.7kΩ pull-up to 3.3V)',
      'MPU6050 AD0 → GND (address = 0x68)'
    ],
    code: `#include <Wire.h>
const int MPU_ADDR = 0x68;
int16_t ax, ay, az, gx, gy, gz;

void setup() {
  Wire.begin();
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B); // PWR_MGMT_1
  Wire.write(0);    // Wake up
  Wire.endTransmission(true);
  Serial.begin(115200);
}

void loop() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); // ACCEL_XOUT_H
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 14, true);
  
  ax = Wire.read() << 8 | Wire.read();
  ay = Wire.read() << 8 | Wire.read();
  az = Wire.read() << 8 | Wire.read();
  gx = Wire.read() << 8 | Wire.read();
  gy = Wire.read() << 8 | Wire.read();
  gz = Wire.read() << 8 | Wire.read();
  
  Serial.print("AX:"); Serial.print(ax);
  Serial.print(" AY:"); Serial.print(ay);
  Serial.print(" AZ:"); Serial.println(az);
  delay(50);
}`,
    tips: [
      'Wait 100ms after power-up before first I2C communication',
      'AD0 pin selects address: LOW=0x68, HIGH=0x69',
      'Raw values are 16-bit signed integers (±32768)'
    ]
  },
  {
    id: 'esp32-wifi',
    title: 'ESP32 Wi-Fi Sensor Station',
    difficulty: 'Advanced',
    components: ['ESP32 DevKit', 'DHT22 Sensor', '10kΩ Resistor', 'Breadboard', 'Jumper Wires'],
    connections: [
      'DHT22 VCC → 3.3V',
      'DHT22 GND → GND',
      'DHT22 DATA → GPIO4 (+ 10kΩ pull-up to 3.3V)',
      'ESP32 USB → PC for serial monitor'
    ],
    code: `#include <WiFi.h>
#include <DHT.h>

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASS";
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected: " + WiFi.localIP().toString());
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  if (!isnan(temp)) {
    Serial.printf("Temp: %.1f°C  Hum: %.1f%%\\n", temp, hum);
  }
  delay(2000);
}`,
    tips: [
      'ESP32 needs a dedicated 3.3V supply (not from Arduino)',
      'Peak Wi-Fi current: 240mA — ensure power supply can handle it',
      'Use `WiFi.disconnect(true)` before deep sleep for clean shutdown'
    ]
  },
];

const ElectronicsLabContent = () => {
  const [selectedLab, setSelectedLab] = useState(labBreadboards[0]);
  const [activeTab, setActiveTab] = useState<'wiring' | 'code' | 'tips'>('wiring');

  return (
    <>
      <p>
        A virtual electronics lab with breadboard layouts, pin connections, circuit guides, and
        working code. Each lab is designed to be built on real hardware — follow the wiring
        instructions and upload the code to your development board.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {labBreadboards.map(lab => (
          <button
            key={lab.id}
            onClick={() => { setSelectedLab(lab); setActiveTab('wiring'); }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: `1px solid ${selectedLab.id === lab.id ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedLab.id === lab.id ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedLab.id === lab.id ? '#00e5ff' : 'rgba(200,210,235,0.75)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            {lab.title}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedLab.title}</h3>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: selectedLab.difficulty === 'Beginner' ? 'rgba(0,255,163,0.15)' :
              selectedLab.difficulty === 'Intermediate' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
            color: selectedLab.difficulty === 'Beginner' ? '#00ffa3' :
              selectedLab.difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444',
          }}>
            {selectedLab.difficulty}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          {(['wiring', 'code', 'tips'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.4rem 1rem',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? '#00e5ff' : 'transparent'}`,
                color: activeTab === tab ? '#00e5ff' : 'rgba(160,175,210,0.5)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {tab === 'wiring' ? 'Wiring' : tab === 'code' ? 'Code' : 'Tips'}
            </button>
          ))}
        </div>

        {activeTab === 'wiring' && (
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text-tertiary)' }}>
              Components Needed
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {selectedLab.components.map(comp => (
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

            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text-tertiary)' }}>
              Wiring Connections
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedLab.connections.map((conn, i) => (
                <div key={i} style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(0,229,255,0.03)',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--color-cyan)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                }}>
                  {conn}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1.5rem',
            borderRadius: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            overflow: 'auto',
            lineHeight: 1.6,
          }}>
            {selectedLab.code}
          </pre>
        )}

        {activeTab === 'tips' && (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedLab.tips.map((tip, i) => (
              <li key={i} style={{
                padding: '0.75rem 1rem',
                background: 'rgba(0,255,163,0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--color-green)',
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}>
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ElectronicsLabContent;
