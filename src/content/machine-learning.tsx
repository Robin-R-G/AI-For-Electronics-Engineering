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
  { front: 'What is supervised learning?', back: 'Training a model on labeled data — input/output pairs where the correct answer is known.' },
  { front: 'What is overfitting?', back: 'When a model memorizes training data noise instead of learning the true pattern, performing well on training but poorly on new data.' },
  { front: 'What is feature engineering?', back: 'The process of transforming raw sensor data into meaningful numerical features (RMS, FFT peaks, zero-crossings) that ML models can learn from.' },
  { front: 'What is the difference between classification and regression?', back: 'Classification predicts a category (healthy/faulty). Regression predicts a continuous number (remaining battery life).' },
  { front: 'What is a validation set?', back: 'A subset of data held out from training to evaluate how well the model generalizes to unseen data.' },
];

const MachineLearningContent = () => {
  return (
    <>
      <p>
        Machine learning (ML) is the discipline of building models that improve at a task by
        learning patterns from data, rather than by following explicit instructions. For an
        electronics engineer, the data is almost always <strong>signals</strong>: voltages,
        currents, temperatures, accelerometer traces, microphone samples, or images from a camera.
      </p>

      <Callout type="important" title="Learning Objectives">
        After this module, you will be able to:
        <br /><br />
        <strong>1.</strong> Explain the difference between supervised and unsupervised learning.
        <br /><strong>2.</strong> Extract meaningful features from raw sensor data using DSP techniques.
        <br /><strong>3.</strong> Train a classifier and evaluate it properly with train/test splits.
        <br /><strong>4.</strong> Identify and prevent overfitting in ML models.
        <br /><strong>5.</strong> Apply ML to real sensor data for classification or regression tasks.
      </Callout>

      <h2>Supervised vs. Unsupervised Learning</h2>
      <p>
        In <strong>supervised learning</strong> you provide labelled examples — e.g., 10,000
        vibration recordings, each tagged &ldquo;healthy&rdquo; or &ldquo;faulty&rdquo;. The model
        learns a mapping from input to label. In <strong>unsupervised learning</strong> there are
        no labels; the model finds structure on its own, such as clustering normal behavior so it
        can flag anything unusual (anomaly detection).
      </p>

      <Callout type="note" title="Two Core Problems">
        Most engineering ML is either <strong>classification</strong> (which class? healthy vs.
        faulty) or <strong>regression</strong> (predict a number, e.g., remaining battery life in
        minutes). Know which one you are solving before you collect data.
      </Callout>

      <InteractiveDiagram
        title="A Classic ML Pipeline for Sensor Data"
        nodes={[
          { id: 'collect', label: 'Collect & Label', description: 'Capture raw signals and, for supervised tasks, attach ground-truth labels.' },
          { id: 'features', label: 'Feature Extraction', description: 'Derive meaningful numbers (RMS, peak frequency, zero-crossings) from the raw waveform.' },
          { id: 'train', label: 'Train & Validate', description: 'Fit the model on training data; measure error on held-out validation data.' },
          { id: 'deploy', label: 'Deploy & Monitor', description: 'Run inference on-device and watch for drift in real conditions.' }
        ]}
      />

      <ExpandableCard title="Advantages of ML for Electronics Engineers" icon="&#9650;" variant="tip">
        <ul>
          <li><strong>Handles noisy real-world data</strong> — ML models learn from imperfect sensor readings that would break hand-coded rules</li>
          <li><strong>Adapts to new patterns</strong> — retrain with new data instead of rewriting firmware</li>
          <li><strong>Reduces BOM cost</strong> — software intelligence can replace dedicated analog circuits</li>
          <li><strong>Enables new product classes</strong> — predictive maintenance, anomaly detection, voice control</li>
          <li><strong>Works with simple hardware</strong> — even an Arduino can run a trained classifier</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="Limitations to Consider" icon="&#9660;" variant="warning">
        <ul>
          <li><strong>Garbage in, garbage out</strong> — poor data quality means poor model performance, no matter the algorithm</li>
          <li><strong>Training requires a PC/cloud</strong> — MCUs run inference, not training</li>
          <li><strong>Feature engineering is manual</strong> — you must understand the signal domain to extract good features</li>
          <li><strong>Overfitting risk</strong> — small datasets lead to models that memorize instead of generalize</li>
          <li><strong>Model drift</strong> — sensor characteristics change over time, requiring periodic retraining</li>
        </ul>
      </ExpandableCard>

      <h2>Feature Engineering: Where EE Meets ML</h2>
      <p>
        A raw 1-second audio buffer is 16,000 numbers — too noisy and too large to learn from
        directly. You first compress it into <strong>features</strong> using the DSP you already
        know. Good features make simple models work remarkably well.
      </p>

      <CodeBlock
        filename="features.py"
        language="python"
        code={`import numpy as np

def extract_features(signal: np.ndarray, fs: int = 16000) -> dict:
    """Turn a 1-D sensor buffer into a compact feature vector."""
    rms = np.sqrt(np.mean(signal ** 2))                 # overall energy
    peak = np.max(np.abs(signal))                       # crest level
    zero_cross = np.sum(np.diff(np.sign(signal)) != 0)  # noisiness

    spectrum = np.abs(np.fft.rfft(signal * np.hanning(len(signal))))
    dominant_freq = np.argmax(spectrum) * fs / len(signal)

    return {
        "rms": float(rms),
        "peak": float(peak),
        "zero_crossings": int(zero_cross),
        "dominant_freq_hz": float(dominant_freq),
    }`}
      />

      <Callout type="warning">
        Garbage in, garbage out. If your training data was collected in a quiet lab but your
        product ships into a noisy factory, the model will fail. Match your data collection
        environment to the deployment environment as closely as possible.
      </Callout>

      <h2>Training, Validation, and Overfitting</h2>
      <p>
        You split data into <strong>train</strong> (used to fit the model) and
        <strong>validation/test</strong> (used to measure real performance). A model that scores
        100% on training data but 60% on test data is <strong>overfit</strong>: it memorized
        noise instead of learning the underlying pattern. Regularization, more data, and simpler
        models all fight overfitting.
      </p>

      <CodeBlock
        filename="train_model.py"
        language="python"
        code={`from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

X_train, X_test, y_train, y_test = train_test_split(
    features, labels, test_size=0.25, stratify=labels, random_state=42
)

clf = RandomForestClassifier(n_estimators=120, max_depth=10)
clf.fit(X_train, y_train)

print(classification_report(y_test, clf.predict(X_test)))`}
      />

      <FlashCard
        cards={flashCards}
        title="Machine Learning — Flash Cards"
      />

      <HandsOnActivity
        title="Build a Vibration Classifier"
        difficulty="Intermediate"
        estimatedTime="45 minutes"
        objectives={[
          'Capture accelerometer data from a vibrating motor',
          'Extract time-domain and frequency-domain features',
          'Train a RandomForest classifier in Python',
          'Evaluate accuracy, precision, and recall'
        ]}
        materials={[
          'Arduino with MPU6050 accelerometer',
          'Small DC motor with fan (for vibration)',
          'Python 3.10+ with scikit-learn, numpy',
          'Jupyter notebook or VS Code'
        ]}
        steps={[
          { instruction: 'Record 30 seconds of vibration data from a motor at idle speed.', codeSnippet: `# Arduino: read MPU6050 at 1kHz\n#include <Wire.h>\nconst int MPU = 0x68;\nvoid setup() { Wire.begin(); Serial.begin(115200); }\nvoid loop() {\n  Wire.beginTransmission(MPU);\n  Wire.write(0x3B);\n  Wire.endTransmission(false);\n  Wire.requestFrom(MPU, 6, true);\n  int ax = Wire.read()<<8 | Wire.read();\n  int ay = Wire.read()<<8 | Wire.read();\n  int az = Wire.read()<<8 | Wire.read();\n  Serial.println(ax); // save to CSV\n  delay(1); // 1kHz\n}`, expectedResult: 'CSV file with ~30,000 acceleration samples.' },
          { instruction: 'Segment the data into 1-second windows with 50% overlap.' },
          { instruction: 'Extract features: RMS, peak-to-peak, zero-crossing rate, dominant frequency.' },
          { instruction: 'Train a RandomForest classifier with 80/20 train/test split.' },
          { instruction: 'Print the classification report and confusion matrix.' }
        ]}
        verification="Achieve >85% accuracy distinguishing idle vs. loaded motor states."
      />

      <ThinkLikeAnEngineer
        problem="Your vibration sensor model achieves 98% accuracy in the lab but only 72% in the factory. The factory has additional electromagnetic interference, ambient vibrations from nearby machines, and temperature variations of ±20°C. How do you close this gap?"
        context="Constraint: you cannot add shielding to the sensor. You have access to 1 hour of factory-recorded data but no labels."
        hints={[
          'The lab data distribution differs from factory data — this is domain shift',
          'You could use the factory data for unsupervised anomaly detection',
          'Collect a small amount of labeled factory data for fine-tuning',
          'Data augmentation can simulate factory noise in your training set'
        ]}
        explanation="The core issue is domain shift — the training distribution doesn't match the deployment distribution. Three-pronged approach: (1) Data augmentation: add realistic noise profiles (EMI, vibration, temperature drift) to your lab data during training. (2) Semi-supervised learning: use the unlabeled factory data to train an autoencoder or anomaly detector that learns the factory 'normal' distribution. (3) Transfer learning: label just 50 factory samples and fine-tune the last layer of your model. This typically recovers 15-20% of the accuracy gap. Long-term: establish a data pipeline that periodically collects and labels factory data for continuous model improvement."
        aiPrompt="Act as a Senior AI Engineer specializing in Edge AI and domain adaptation. I have a vibration classification model trained on lab data (98% accuracy) that drops to 72% in a factory environment due to EMI, ambient vibration, and temperature variation. I have 1 hour of unlabeled factory data. Design a domain adaptation strategy including: data augmentation techniques, semi-supervised learning approach, minimal labeling strategy, and deployment pipeline for continuous model improvement."
      />

      <MiniQuiz
        question="What is overfitting?"
        options={[
          { id: 'a', text: 'When the model is too small to learn anything.' },
          { id: 'b', text: 'When the model memorizes training noise and fails on new data.' },
          { id: 'c', text: 'When there is not enough training data collected.' },
          { id: 'd', text: 'When features are extracted correctly.' }
        ]}
        correctAnswerId="b"
        explanation="Overfitting means the model fits the training set almost perfectly but generalizes poorly to unseen data, because it learned noise rather than the true signal."
      />

      <CommonMistakes
        mistakes={[
          {
            mistake: 'Collecting training data in a lab and deploying in a factory',
            why: 'The noise profile, temperature range, and vibration patterns differ dramatically between environments.',
            fix: 'Collect training data in the actual deployment environment, or augment with realistic noise.',
          },
          {
            mistake: 'Using raw sensor samples as features without DSP',
            why: 'Raw waveforms are high-dimensional and noisy. Models struggle to learn from them directly.',
            fix: 'Extract domain features (RMS, peak frequency, zero-crossings) before feeding into the model.',
          },
          {
            mistake: 'Reporting training accuracy as real-world performance',
            why: 'Overfitting inflates training scores. A model with 99% training accuracy may have 60% test accuracy.',
            fix: 'Always report validation/test accuracy, and use cross-validation for small datasets.',
          },
          {
            mistake: 'Ignoring class imbalance',
            why: 'If 95% of data is "healthy" and 5% is "faulty", the model learns to always predict "healthy" and gets 95% accuracy.',
            fix: 'Use SMOTE, class weights, or oversampling for the minority class.',
          },
        ]}
      />

      <EngineeringChallenge
        title="Build a Vibration Classifier from Scratch"
        description="Apply feature engineering and supervised learning to classify healthy vs. faulty motor vibrations."
        difficulty="Intermediate"
        steps={[
          { step: 'Record 60 seconds of vibration data from a small DC motor using an accelerometer (MPU6050 or similar).', hint: 'Sample at 1kHz minimum. Save as CSV.' },
          { step: 'Simulate a fault by attaching an unbalanced weight to the motor shaft.', hint: 'A small piece of tape with a coin works as a quick unbalance.' },
          { step: 'Segment the data into 1-second windows with 50% overlap.', hint: 'Use numpy sliding_window_view or a simple loop.' },
          { step: 'Extract features: RMS, peak-to-peak, zero-crossing rate, dominant frequency via FFT.', hint: 'Use the extract_features function from the code example.' },
          { step: 'Train a RandomForest classifier on 70% of the data, test on 30%.', hint: 'Use sklearn.model_selection.train_test_split with stratify.' },
          { step: 'Report precision, recall, and F1-score for both classes.', hint: 'Use sklearn.metrics.classification_report.' },
        ]}
        expectedOutcome="A trained classifier that distinguishes healthy from faulty motor vibration with >90% F1-score on held-out test data."
      />

      <AIChallenge
        title="Feature Selection for Sensor Data"
        role="Act as a Senior AI Engineer specializing in Edge AI and sensor signal processing."
        objective="Help me identify the most informative features from a 3-axis accelerometer signal for motor fault detection."
        background="I have a dataset of 1-second vibration windows sampled at 1kHz from a DC motor. Each window is labeled healthy or faulty. I need to reduce the feature space for deployment on an STM32 with limited SRAM."
        requirements={[
          'List the top 10 most discriminative time-domain and frequency-domain features for vibration classification',
          'Explain why each feature is relevant to motor fault detection',
          'Provide Python code to extract each feature using only numpy and scipy',
          'Suggest a feature selection method (e.g., mutual information, PCA) to reduce dimensionality',
          'Recommend the minimum number of features needed for >90% accuracy on this task',
        ]}
        expectedOutput="A ranked list of features with justification, complete Python extraction code, and a dimensionality reduction recommendation."
        bestPractices={[
          'Always normalize features before feeding them into a model.',
          'Time-domain features (RMS, kurtosis) are cheap to compute on MCU — prefer them for edge deployment.',
          'Frequency-domain features are powerful but require FFT, which costs more cycles.',
        ]}
        furtherImprovements={[
          'Try a sliding-window FFT approach for real-time feature extraction on the MCU.',
          'Experiment with t-SNE or UMAP to visualize class separability in 2D.',
        ]}
      />

      <References
        references={[
          { title: 'Pattern Recognition and Machine Learning — Christopher Bishop', type: 'book', description: 'The theoretical foundation for understanding ML algorithms.' },
          { title: 'scikit-learn Documentation', type: 'documentation', url: 'https://scikit-learn.org/stable/', description: 'Official docs for the most widely used Python ML library.' },
          { title: 'Feature Engineering for Machine Learning — Zheng & Casari', type: 'book', description: 'Deep dive into feature extraction and selection techniques.' },
          { title: 'fast.ai Practical Deep Learning', type: 'tutorial', url: 'https://course.fast.ai/', description: 'Top-down, code-first approach to deep learning.' },
          { title: 'UCI Machine Learning Repository', type: 'tool', url: 'https://archive.ics.uci.edu/ml', description: 'Classic sensor and signal datasets for practice.' },
        ]}
      />

      <KeyTakeaways
        points={[
          "ML learns patterns from data; supervised needs labels, unsupervised finds structure.",
          "Classification predicts a class; regression predicts a number.",
          "Feature engineering with DSP is the highest-leverage EE skill in ML.",
          "Always evaluate on held-out data to catch overfitting before you deploy.",
          "Match your training environment to the deployment environment to avoid domain shift."
        ]}
      />
    </>
  );
};

export default MachineLearningContent;
