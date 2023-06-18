from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# Load the sentiment joblib model
model = joblib.load("random_forest_model.joblib")

# Load the TF-IDF vectorizer
vectorizer = joblib.load("vectorizer.joblib")

# API endpoint for sentiment analysis
@app.route("/analyze_sentiment", methods=["POST"])
def analyze_sentiment():
    text = request.json.get("text")

    # Preprocess the text
    text = preprocess_text(text)

    # Vectorize the preprocessed text
    text_vector = vectorizer.transform([text])

    prediction = model.predict(text_vector)[0]

    # Convert the prediction to a regular Python integer
    prediction = int(prediction)

    # Return the sentiment prediction
    return jsonify({"sentiment": prediction})

def preprocess_text(text):
    # Implement your text preprocessing logic here
    # This can include steps like removing punctuation, converting to lowercase, etc.
    return text

if __name__ == "__main__":
    app.run()

