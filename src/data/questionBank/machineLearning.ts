export interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const machineLearningQuestions: LessonQuestion[] = [
  {
    id: "ml-1",
    question: "In simple linear regression y = w·x + b fit by ordinary least squares, what quantity is minimized?",
    options: [
      "The sum of absolute residuals",
      "The sum of squared residuals",
      "The maximum residual",
      "The cross-entropy loss"
    ],
    correctAnswer: "The sum of squared residuals",
    explanation: "OLS minimizes the sum of squared differences between observed and predicted values, which yields a closed-form solution via the normal equations."
  },
  {
    id: "ml-2",
    question: "What problem does polynomial regression solve that simple linear regression cannot?",
    options: [
      "It guarantees a lower training error than any linear model",
      "It can model nonlinear relationships by using powers of the input features",
      "It removes the need for feature scaling",
      "It always reduces overfitting compared to linear regression"
    ],
    correctAnswer: "It can model nonlinear relationships by using powers of the input features",
    explanation: "Polynomial regression adds x², x³, etc. as features, letting a linear model fit curved relationships while remaining linear in its weights."
  },
  {
    id: "ml-3",
    question: "L1 (Lasso) regularization differs from L2 (Ridge) primarily in that it:",
    options: [
      "Produces smoother coefficient values",
      "Can drive some coefficients exactly to zero, enabling feature selection",
      "Always yields a unique solution",
      "Is differentiable everywhere"
    ],
    correctAnswer: "Can drive some coefficients exactly to zero, enabling feature selection",
    explanation: "The L1 penalty's diamond-shaped constraint intersects axes, forcing sparse solutions where many coefficients become exactly zero."
  },
  {
    id: "ml-4",
    question: "Which penalty term corresponds to L2 (Ridge) regularization in the loss function?",
    options: [
      "λ·Σ|wᵢ|",
      "λ·Σwᵢ²",
      "λ·max|wᵢ|",
      "λ·Σ√|wᵢ|"
    ],
    correctAnswer: "λ·Σwᵢ²",
    explanation: "Ridge adds the squared L2 norm of the weights, shrinking them toward zero without eliminating features entirely."
  },
  {
    id: "ml-5",
    question: "Elastic Net regularization combines which two penalties?",
    options: [
      "L0 and L1",
      "L1 and L2",
      "L2 and L∞",
      "L1 and entropy"
    ],
    correctAnswer: "L1 and L2",
    explanation: "Elastic Net linearly blends Lasso and Ridge penalties, giving sparsity while handling correlated features better than L1 alone."
  },
  {
    id: "ml-6",
    question: "The sigmoid (logistic) function maps any real input to which range?",
    options: [
      "[-1, 1]",
      "(0, 1)",
      "[0, 1]",
      "(-∞, ∞)"
    ],
    correctAnswer: "(0, 1)",
    explanation: "The logistic sigmoid σ(z)=1/(1+e^-z) outputs values strictly between 0 and 1, interpretable as a probability for binary classification."
  },
  {
    id: "ml-7",
    question: "In logistic regression, what does the model actually learn?",
    options: [
      "The decision boundary directly as a tree",
      "Weights that maximize the log-likelihood of the observed class labels",
      "A non-parametric density estimate",
      "The optimal number of clusters"
    ],
    correctAnswer: "Weights that maximize the log-likelihood of the observed class labels",
    explanation: "Logistic regression fits weights via maximum likelihood estimation, using the sigmoid to convert a linear score into a class probability."
  },
  {
    id: "ml-8",
    question: "The softmax function is used for multi-class classification because it:",
    options: [
      "Outputs a single probability between 0 and 1",
      "Produces a probability distribution over all classes that sums to 1",
      "Eliminates the need for a loss function",
      "Guarantees zero training error"
    ],
    correctAnswer: "Produces a probability distribution over all classes that sums to 1",
    explanation: "Softmax exponentiates and normalizes scores across classes, giving mutually exclusive class probabilities that sum to one."
  },
  {
    id: "ml-9",
    question: "For binary classification, applying softmax to two classes is mathematically equivalent to:",
    options: [
      "A single sigmoid output",
      "A decision tree",
      "K-means clustering",
      "Principal component analysis"
    ],
    correctAnswer: "A single sigmoid output",
    explanation: "With two classes, softmax reduces to the logistic sigmoid, so both formulations give identical binary probabilities."
  },
  {
    id: "ml-10",
    question: "A decision tree splits nodes by choosing the feature and threshold that:",
    options: [
      "Maximize the Gini impurity or information gain",
      "Minimize the training accuracy",
      "Maximize tree depth",
      "Randomly partition the data"
    ],
    correctAnswer: "Maximize the Gini impurity or information gain",
    explanation: "Trees greedily pick splits that most reduce impurity (Gini) or maximize information gain (entropy reduction) at each node."
  },
  {
    id: "ml-11",
    question: "Random forests improve on a single decision tree primarily by:",
    options: [
      "Using a single deep tree on all data",
      "Bagging many decorrelated trees and averaging their predictions",
      "Applying gradient descent to tree leaves",
      "Removing the need for feature scaling"
    ],
    correctAnswer: "Bagging many decorrelated trees and averaging their predictions",
    explanation: "Random forests train many trees on bootstrap samples with random feature subsets, reducing variance through bagging and aggregation."
  },
  {
    id: "ml-12",
    question: "Gradient boosting (e.g., XGBoost) builds an ensemble by:",
    options: [
      "Training all trees in parallel on bootstrap samples",
      "Sequentially adding trees that correct the residual errors of the previous ensemble",
      "Averaging the predictions of independent trees",
      "Clustering the training data first"
    ],
    correctAnswer: "Sequentially adding trees that correct the residual errors of the previous ensemble",
    explanation: "Boosting fits each new weak learner to the gradient of the loss with respect to current predictions, reducing bias step by step."
  },
  {
    id: "ml-13",
    question: "A key hyperparameter of XGBoost that controls overfitting by limiting tree complexity is:",
    options: [
      "Learning rate only",
      "max_depth (maximum tree depth)",
      "Number of classes",
      "Batch normalization"
    ],
    correctAnswer: "max_depth (maximum tree depth)",
    explanation: "max_depth caps tree depth; smaller values increase bias and reduce variance, helping control overfitting in gradient-boosted trees."
  },
  {
    id: "ml-14",
    question: "In a support vector machine, the 'margin' refers to:",
    options: [
      "The distance between the closest points of different classes and the decision boundary",
      "The number of support vectors",
      "The kernel bandwidth",
      "The learning rate"
    ],
    correctAnswer: "The distance between the closest points of different classes and the decision boundary",
    explanation: "SVMs maximize the margin, the gap between the separating hyperplane and the nearest data points of each class."
  },
  {
    id: "ml-15",
    question: "Support vectors are the training points that:",
    options: [
      "Are correctly classified with large margin",
      "Lie on or within the margin boundary and define the hyperplane",
      "Have the highest feature values",
      "Are removed during training"
    ],
    correctAnswer: "Lie on or within the margin boundary and define the hyperplane",
    explanation: "Only support vectors (those on/inside the margin) influence the final model; others have zero Lagrange multipliers."
  },
  {
    id: "ml-16",
    question: "A kernel trick in SVM is useful because it:",
    options: [
      "Reduces the number of training samples",
      "Computes dot products in a high-dimensional feature space without explicit mapping",
      "Eliminates the need for labeled data",
      "Always improves accuracy over linear kernels"
    ],
    correctAnswer: "Computes dot products in a high-dimensional feature space without explicit mapping",
    explanation: "Kernels implicitly project data into a higher-dimensional space where it may be linearly separable, avoiding explicit computation of the mapping."
  },
  {
    id: "ml-17",
    question: "In K-nearest neighbors, classification is performed by:",
    options: [
      "Fitting a hyperplane to all data",
      "Taking a majority vote of the K closest training examples",
      "Computing a probability density",
      "Solving a quadratic program"
    ],
    correctAnswer: "Taking a majority vote of the K closest training examples",
    explanation: "KNN is instance-based: a query's label is the majority class (or average value) among its K nearest neighbors by distance."
  },
  {
    id: "ml-18",
    question: "The 'curse of dimensionality' refers to the problem that as feature dimension grows:",
    options: [
      "Data becomes easier to separate",
      "Distances between points become less meaningful and data grows sparse",
      "Training is always faster",
      "The number of classes increases"
    ],
    correctAnswer: "Distances between points become less meaningful and data grows sparse",
    explanation: "In high dimensions, pairwise distances converge and volume becomes empty, degrading distance-based methods and requiring exponentially more data."
  },
  {
    id: "ml-19",
    question: "Naive Bayes classifiers rely on the assumption of:",
    options: [
      "Features being highly correlated",
      "Conditional independence of features given the class",
      "Equal class priors",
      "A linear decision boundary in all cases"
    ],
    correctAnswer: "Conditional independence of features given the class",
    explanation: "Naive Bayes applies Bayes' theorem assuming features are independent given the class, which keeps computation tractable despite being often unrealistic."
  },
  {
    id: "ml-20",
    question: "Bayes' theorem expresses the posterior P(class|data) as:",
    options: [
      "P(data) / P(class)",
      "P(data|class)·P(class) / P(data)",
      "P(class)·P(data)",
      "P(data|class) - P(class)"
    ],
    correctAnswer: "P(data|class)·P(class) / P(data)",
    explanation: "Bayes' theorem combines likelihood, prior, and evidence to update belief about the class after observing the data."
  },
  {
    id: "ml-21",
    question: "In K-means clustering, the algorithm iteratively:",
    options: [
      "Assigns points to nearest centroid then recomputes centroids",
      "Builds a dendrogram",
      "Computes a density reachability graph",
      "Maximizes the silhouette score directly"
    ],
    correctAnswer: "Assigns points to nearest centroid then recomputes centroids",
    explanation: "K-means alternates between assigning points to the closest centroid and updating centroids to the mean of assigned points until convergence."
  },
  {
    id: "ml-22",
    question: "DBSCAN is advantageous over K-means because it:",
    options: [
      "Requires specifying the number of clusters",
      "Can find arbitrarily shaped clusters and detect noise points",
      "Always runs faster",
      "Needs labeled data"
    ],
    correctAnswer: "Can find arbitrarily shaped clusters and detect noise points",
    explanation: "DBSCAN groups points by density and marks sparse regions as noise, so it handles non-spherical clusters and outliers without a fixed k."
  },
  {
    id: "ml-23",
    question: "Hierarchical clustering produces a:",
    options: [
      "Flat set of fixed clusters",
      "Dendrogram representing nested cluster structure",
      "Single decision tree",
      "Probability distribution"
    ],
    correctAnswer: "Dendrogram representing nested cluster structure",
    explanation: "Agglomerative hierarchical clustering merges nearest clusters recursively, visualized as a dendrogram from which cuts yield clusterings."
  },
  {
    id: "ml-24",
    question: "The silhouette score measures clustering quality by comparing:",
    options: [
      "Within-cluster distance to between-cluster distance",
      "The number of clusters to the number of features",
      "Precision to recall",
      "Training loss to test loss"
    ],
    correctAnswer: "Within-cluster distance to between-cluster distance",
    explanation: "Silhouette ranges from -1 to 1; high values mean points are close to their own cluster and far from others, indicating good separation."
  },
  {
    id: "ml-25",
    question: "Principal Component Analysis (PCA) finds directions that:",
    options: [
      "Maximize the variance of the projected data",
      "Minimize the variance of the projected data",
      "Separate classes linearly",
      "Cluster similar points"
    ],
    correctAnswer: "Maximize the variance of the projected data",
    explanation: "PCA computes eigenvectors of the covariance matrix (principal components) that capture the most variance in descending order."
  },
  {
    id: "ml-26",
    question: "t-SNE is primarily used for:",
    options: [
      "Linear dimensionality reduction preserving global variance",
      "Nonlinear visualization of high-dimensional data preserving local neighborhoods",
      "Supervised classification",
      "Feature selection by importance"
    ],
    correctAnswer: "Nonlinear visualization of high-dimensional data preserving local neighborhoods",
    explanation: "t-SNE models pairwise similarities to place similar points near each other in 2D/3D, great for visualization but not for downstream training."
  },
  {
    id: "ml-27",
    question: "A key limitation of UMAP and t-SNE compared to PCA is that they:",
    options: [
      "Are deterministic and fast",
      "Are stochastic and less suitable for preserving global structure or transforming new points",
      "Require a linear kernel",
      "Cannot handle more than two dimensions"
    ],
    correctAnswer: "Are stochastic and less suitable for preserving global structure or transforming new points",
    explanation: "Both are nonlinear and stochastic; they excel at local structure but distort global distances and lack a simple transform for unseen data."
  },
  {
    id: "ml-28",
    question: "In k-fold cross-validation, the dataset is split into k subsets so that:",
    options: [
      "Each model is trained once on all data",
      "The model is trained k times, each time validated on a different held-out fold",
      "Only one fold is ever used for testing",
      "Data is clustered first"
    ],
    correctAnswer: "The model is trained k times, each time validated on a different held-out fold",
    explanation: "Each fold serves once as the validation set while the rest train the model, giving k performance estimates that are averaged."
  },
  {
    id: "ml-29",
    question: "Stratified k-fold cross-validation is preferred over regular k-fold when:",
    options: [
      "Features are continuous",
      "The class distribution is imbalanced, to preserve class proportions per fold",
      "Data is already shuffled",
      "Training time is unlimited"
    ],
    correctAnswer: "The class distribution is imbalanced, to preserve class proportions per fold",
    explanation: "Stratification ensures each fold has roughly the same class ratios as the full dataset, yielding less biased validation estimates."
  },
  {
    id: "ml-30",
    question: "In a confusion matrix, precision is defined as:",
    options: [
      "TP / (TP + FN)",
      "TP / (TP + FP)",
      "(TP + TN) / total",
      "FP / (FP + TN)"
    ],
    correctAnswer: "TP / (TP + FP)",
    explanation: "Precision is the fraction of predicted positives that are truly positive, emphasizing how many flagged alarms were correct."
  },
  {
    id: "ml-31",
    question: "Recall (sensitivity) is defined as:",
    options: [
      "TP / (TP + FP)",
      "TP / (TP + FN)",
      "TN / (TN + FP)",
      "(TP + FP) / total"
    ],
    correctAnswer: "TP / (TP + FN)",
    explanation: "Recall measures the fraction of actual positives correctly identified, important when missing a positive case is costly."
  },
  {
    id: "ml-32",
    question: "The F1 score is the:",
    options: [
      "Arithmetic mean of precision and recall",
      "Harmonic mean of precision and recall",
      "Maximum of precision and recall",
      "Product of precision and recall"
    ],
    correctAnswer: "Harmonic mean of precision and recall",
    explanation: "F1 = 2·(precision·recall)/(precision+recall) balances both metrics and penalizes extreme imbalance between them."
  },
  {
    id: "ml-33",
    question: "ROC-AUC measures a classifier's ability to:",
    options: [
      "Minimize training loss",
      "Rank positive instances higher than negative ones across all thresholds",
      "Cluster data points",
      "Reduce feature dimensionality"
    ],
    correctAnswer: "Rank positive instances higher than negative ones across all thresholds",
    explanation: "AUC is the area under the ROC curve of TPR vs FPR; 1.0 means perfect ranking, 0.5 is random. It is threshold-independent."
  },
  {
    id: "ml-34",
    question: "Filter methods for feature selection evaluate features based on:",
    options: [
      "Model performance in a wrapper loop",
      "Intrinsic statistical properties (e.g., correlation, mutual information) independent of the model",
      "Lasso coefficient magnitudes only",
      "Gradient boosting importance only"
    ],
    correctAnswer: "Intrinsic statistical properties (e.g., correlation, mutual information) independent of the model",
    explanation: "Filter methods rank features using statistics before modeling, making them fast and model-agnostic but ignoring model interactions."
  },
  {
    id: "ml-35",
    question: "Embedded feature selection methods perform selection:",
    options: [
      "Before any model is trained",
      "As part of the model training process (e.g., Lasso, tree importance)",
      "By exhaustively searching all subsets",
      "Only using mutual information"
    ],
    correctAnswer: "As part of the model training process (e.g., Lasso, tree importance)",
    explanation: "Embedded methods like L1 regularization or tree-based importance select features during training, balancing efficiency and model awareness."
  },
  {
    id: "ml-36",
    question: "Bagging reduces model variance by:",
    options: [
      "Training models sequentially on residuals",
      "Averaging predictions of models trained on bootstrap samples",
      "Stacking heterogeneous models",
      "Increasing the learning rate"
    ],
    correctAnswer: "Averaging predictions of models trained on bootstrap samples",
    explanation: "Bootstrap aggregation averages many independent models, canceling out their individual fluctuations and lowering variance."
  },
  {
    id: "ml-37",
    question: "In stacking ensembles, the meta-model is trained on:",
    options: [
      "The raw input features directly",
      "The predictions of the base models as inputs",
      "A single decision tree",
      "The class labels only"
    ],
    correctAnswer: "The predictions of the base models as inputs",
    explanation: "Stacking learns how to best combine base learners by training a meta-learner on their out-of-fold predictions."
  },
  {
    id: "ml-38",
    question: "A soft voting classifier combines base models by:",
    options: [
      "Taking the majority of hard predicted labels",
      "Averaging their predicted class probabilities",
      "Selecting the model with highest accuracy",
      "Concatenating their feature maps"
    ],
    correctAnswer: "Averaging their predicted class probabilities",
    explanation: "Soft voting averages predicted probabilities across models, often outperforming hard voting which only counts predicted labels."
  },
  {
    id: "ml-39",
    question: "ARIMA models time series using which three components in its notation (p,d,q)?",
    options: [
      "AutoRegression, Integration (differencing), Moving Average",
      "Accuracy, Iteration, Momentum",
      "Amplitude, Drift, Mean",
      "Aggregation, Interpolation, Mapping"
    ],
    correctAnswer: "AutoRegression, Integration (differencing), Moving Average",
    explanation: "ARIMA(p,d,q) combines autoregressive terms, d differences to achieve stationarity, and a moving-average error term."
  },
  {
    id: "ml-40",
    question: "Exponential smoothing forecasts by:",
    options: [
      "Weighting all past observations equally",
      "Applying exponentially decreasing weights to past observations",
      "Fitting a decision tree",
      "Clustering the series"
    ],
    correctAnswer: "Applying exponentially decreasing weights to past observations",
    explanation: "Exponential smoothing gives recent observations more weight via a smoothing factor, capturing level (and trend/seasonality in extensions)."
  },
  {
    id: "ml-41",
    question: "Isolation Forest detects anomalies by:",
    options: [
      "Clustering normal points tightly",
      "Building random trees that isolate points quickly; anomalies need fewer splits",
      "Computing class probabilities",
      "Applying PCA reconstruction"
    ],
    correctAnswer: "Building random trees that isolate points quickly; anomalies need fewer splits",
    explanation: "Anomalous points are easier to separate, so their shorter average path length in random trees flags them as outliers."
  },
  {
    id: "ml-42",
    question: "One-class SVM for anomaly detection learns:",
    options: [
      "A boundary around the normal data in feature space",
      "A classifier between two known classes",
      "A clustering of all points",
      "A regression line"
    ],
    correctAnswer: "A boundary around the normal data in feature space",
    explanation: "One-class SVM finds a hypersphere or hyperplane enclosing normal data; points outside are flagged as anomalies."
  },
  {
    id: "ml-43",
    question: "For ML on sensor data, a common first step is to engineer features from raw signals such as:",
    options: [
      "Only the raw timestamp",
      "Statistical descriptors like mean, RMS, and spectral features",
      "Random labels",
      "The device serial number only"
    ],
    correctAnswer: "Statistical descriptors like mean, RMS, and spectral features",
    explanation: "Hand-crafted time- and frequency-domain features (RMS, peak, FFT bins) capture physically meaningful signal content for ML."
  },
  {
    id: "ml-44",
    question: "Predictive maintenance uses ML to:",
    options: [
      "Replace all sensors with cameras",
      "Predict equipment failures before they occur, using sensor trends",
      "Eliminate the need for historical data",
      "Always run models in the cloud only"
    ],
    correctAnswer: "Predict equipment failures before they occur, using sensor trends",
    explanation: "Models learn degradation patterns from vibration, temperature, and current signals to forecast remaining useful life and schedule maintenance."
  },
  {
    id: "ml-45",
    question: "In a scikit-learn Pipeline, the correct order of operations on training data is:",
    options: [
      "predict → fit → transform",
      "fit → transform on training, then transform → predict on test",
      "transform → predict → fit",
      "fit only, transform is optional"
    ],
    correctAnswer: "fit → transform on training, then transform → predict on test",
    explanation: "Pipelines fit and transform on training data, then reuse the same transformers (no refitting) to transform test data before predicting."
  },
  {
    id: "ml-46",
    question: "SMOTE addresses class imbalance by:",
    options: [
      "Removing majority-class samples",
      "Synthesizing new minority-class samples by interpolating between neighbors",
      "Increasing the learning rate",
      "Reducing feature count"
    ],
    correctAnswer: "Synthesizing new minority-class samples by interpolating between neighbors",
    explanation: "SMOTE creates synthetic minority examples along line segments between existing ones, balancing classes without duplicating data."
  },
  {
    id: "ml-47",
    question: "Grid search for hyperparameter tuning:",
    options: [
      "Randomly samples the search space",
      "Exhaustively evaluates every combination on a defined grid",
      "Uses a probabilistic surrogate model",
      "Trains a single model"
    ],
    correctAnswer: "Exhaustively evaluates every combination on a defined grid",
    explanation: "Grid search tries all specified hyperparameter combinations via cross-validation, guaranteeing the grid optimum but scaling poorly with dimensions."
  },
  {
    id: "ml-48",
    question: "Bayesian optimization improves over grid/random search by:",
    options: [
      "Evaluating every point exhaustively",
      "Building a surrogate model of the objective and choosing informative next points",
      "Using only the default parameters",
      "Disabling cross-validation"
    ],
    correctAnswer: "Building a surrogate model of the objective and choosing informative next points",
    explanation: "It models the loss with a Gaussian process and uses an acquisition function to sample promising regions, needing fewer evaluations."
  },
  {
    id: "ml-49",
    question: "Class weights in a classifier help with imbalance by:",
    options: [
      "Duplicating minority samples",
      "Penalizing mistakes on minority classes more heavily during training",
      "Removing features",
      "Reducing model capacity"
    ],
    correctAnswer: "Penalizing mistakes on minority classes more heavily during training",
    explanation: "Higher weight on the minority class increases its loss contribution, pushing the decision boundary to better recall it."
  },
  {
    id: "ml-50",
    question: "Random search is often preferred over grid search for hyperparameter tuning because:",
    options: [
      "It always finds the global optimum",
      "It explores the space more efficiently when only a few hyperparameters matter",
      "It requires no cross-validation",
      "It evaluates fewer total combinations by definition"
    ],
    correctAnswer: "It explores the space more efficiently when only a few hyperparameters matter",
    explanation: "Random search samples independently across dimensions, finding good values faster than a dense grid when most params have little effect."
  }
];
