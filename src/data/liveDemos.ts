export interface LiveDemo {
  id: string;
  title: string;
  problemStatement: string;
  hardwareNeeded: string[];
  estimatedTime: string;
  prompt: string;
  expectedResponse: string;
  commonMistakes: string[];
  instructorNotes: string;
  studentActivity: string;
  downloadUrl?: string;
}

export const liveDemosData: LiveDemo[] = [
  {
    id: 'demo-1',
    title: 'Debugging an I2C Sensor Conflict',
    problemStatement: 'You have wired an MPU6050 accelerometer and an OLED display to the same I2C bus on an ESP32. Neither device is initializing, and the serial monitor is stuck. How do you use AI to diagnose and fix this hardware/software integration issue?',
    hardwareNeeded: ['ESP32 Development Board', 'MPU6050 Breakout', 'SSD1306 OLED (I2C)'],
    estimatedTime: '15 Minutes',
    prompt: 'I have an MPU6050 and an SSD1306 connected to GPIO 21 (SDA) and GPIO 22 (SCL) on my ESP32 using the Arduino IDE. When I call Wire.begin(), the ESP32 hangs. Write an I2C scanner sketch to help me find the addresses, and explain what pull-up resistor values I might be missing.',
    expectedResponse: 'The AI will generate a standard I2C scanner sketch that iterates from address 1 to 127. It will correctly identify that both modules might have 10k internal pull-ups, resulting in an equivalent resistance of 5k, which is usually fine. However, it will highlight that a hang on Wire.begin() typically indicates the SDA/SCL lines are shorted to GND or missing pull-ups entirely.',
    commonMistakes: [
      'Forgetting to mention which specific pins you are using (ESP32 allows remapping I2C).',
      'Not specifying the framework (Arduino vs ESP-IDF).'
    ],
    instructorNotes: 'Run the I2C scanner live on the projector. Intentionally remove the 3.3V power wire from the OLED to show the scanner failing to find address 0x3C, demonstrating how the software output correlates to the hardware fault.',
    studentActivity: 'Wire up the provided components on your breadboard. Upload the scanner sketch and verify both 0x68 (MPU) and 0x3C (OLED) appear on the serial monitor.',
    downloadUrl: '#'
  },
  {
    id: 'demo-2',
    title: 'Generating a PID Controller',
    problemStatement: 'Writing a PID (Proportional, Integral, Derivative) controller from scratch in C++ for motor control can be mathematically tedious and error-prone. We will use Claude to generate a robust, object-oriented PID class.',
    hardwareNeeded: ['STM32 Nucleo Board', 'DC Motor with Encoder', 'L298N Motor Driver'],
    estimatedTime: '20 Minutes',
    prompt: 'Write a C++ class for a PID controller suitable for an STM32 running bare-metal. Include variables for Kp, Ki, Kd, and an anti-windup mechanism for the integral term. Provide a short main() loop demonstrating how to call the compute() function at a fixed 10ms interval.',
    expectedResponse: 'Claude will generate a clean header and cpp file. It will include the `compute(float setpoint, float measured_value)` function, keeping track of the previous error. Crucially, it will add constraints to the integral sum to prevent windup, a detail beginners often miss.',
    commonMistakes: [
      'Not asking for anti-windup, resulting in the motor spinning out of control during large setpoint changes.',
      'Failing to ask for fixed-point math if the target MCU lacks an FPU (Floating Point Unit).'
    ],
    instructorNotes: 'Emphasize why anti-windup is critical in physical systems. Show what happens to the integral term when the motor is physically stalled.',
    studentActivity: 'Take the generated C++ class and implement it into the provided motor control template. Tune the Kp, Ki, and Kd values via the serial monitor until the motor stabilizes.',
    downloadUrl: '#'
  },
  {
    id: 'demo-3',
    title: 'Optimizing ESP32 Deep Sleep',
    problemStatement: 'Your battery-powered environmental sensor is draining its LiPo battery in 3 days. We need to use AI to refactor the code to utilize the ESP32\'s ULP (Ultra Low Power) co-processor and deep sleep modes.',
    hardwareNeeded: ['ESP32 Development Board', 'BME280 Sensor', 'Multimeter (for current profiling)'],
    estimatedTime: '25 Minutes',
    prompt: 'Refactor this Arduino code [paste code] to use ESP32 Deep Sleep. The device should wake up every 15 minutes, read the BME280 temperature over I2C, and go back to sleep. Also, disable the ADC and Wi-Fi radio before sleeping to ensure maximum power savings.',
    expectedResponse: 'The AI will wrap the initialization and reading logic into `setup()`, and use `esp_sleep_enable_timer_wakeup()` followed by `esp_deep_sleep_start()`. It will include calls to explicitly turn off the Wi-Fi radio (`WiFi.mode(WIFI_OFF)`).',
    commonMistakes: [
      'Putting logic in the `loop()` function (deep sleep resets the ESP32, so it always starts from `setup()`).',
      'Forgetting to isolate the GPIO pins, leading to parasitic current draw through the sensor.'
    ],
    instructorNotes: 'Use the multimeter in series with the battery live on camera. Show the 50mA active draw drop to ~15uA when the deep sleep code activates.',
    studentActivity: 'Review the generated code and identify the exact line that triggers the sleep mode. Measure the current draw on your own boards using the provided multi-meters.',
    downloadUrl: '#'
  }
];
