import logging
import time
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from joblib import dump

# Configure logging
logging.basicConfig(level=logging.INFO)  # Set the logging level to INFO

# Load the Sentiment140 dataset
logging.info("Loading the dataset...")
df = pd.read_csv('sentiment140.csv', encoding='latin-1', header=None)
df.columns = ['sentiment', 'id', 'date', 'query', 'user', 'text']

# Split the dataset into training and testing sets using only 20% of the data
logging.info("Splitting the dataset...")
df_train, df_test = train_test_split(df, test_size=0.8, random_state=42)

# Preprocess the training data
logging.info("Preprocessing the training data...")
df_train['text'] = df_train['text'].str.lower()  # Convert text to lowercase

# Perform advanced feature engineering using TF-IDF on the training data
logging.info("Performing TF-IDF feature engineering on the training data...")
vectorizer = TfidfVectorizer()
X_train = vectorizer.fit_transform(df_train['text'])
y_train = df_train['sentiment']

# Train a Random Forest classifier
logging.info("Training the Random Forest classifier...")
model = RandomForestClassifier(n_estimators=100)
start_time = time.time()  # Record the start time
model.fit(X_train, y_train)
elapsed_time = time.time() - start_time
logging.info("Training Time: %.2f seconds", elapsed_time)

# Preprocess the testing data
logging.info("Preprocessing the testing data...")
df_test['text'] = df_test['text'].str.lower()  # Convert text to lowercase

# Perform TF-IDF feature engineering on the testing data
logging.info("Performing TF-IDF feature engineering on the testing data...")
X_test = vectorizer.transform(df_test['text'])
y_test = df_test['sentiment']

# Make predictions using the trained model
logging.info("Making predictions...")
y_pred = model.predict(X_test)

# Evaluate the model's accuracy
logging.info("Evaluating the model's accuracy...")
accuracy = accuracy_score(y_test, y_pred)
logging.info("Accuracy: %f", accuracy)

# Save the model and vectorizer
dump(model, 'random_forest_model.joblib')
dump(vectorizer, 'vectorizer.joblib')

