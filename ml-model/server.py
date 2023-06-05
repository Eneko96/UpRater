from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the sentiment joblib model
model = joblib.load("sentiment_model.joblib")

# API endpoint for sentiment analysis
@app.route("/analyze_sentiment", methods=["POST"])
def analyze_sentiment():
    text = request.json.get("text")
    
    # Preprocess the text if needed
    
    # Reshape the input data to match the model's expected shape
    text = np.array([text]).reshape(1, -1)

    prediction = model.predict(text)[0]

    # Return the sentiment prediction
    return jsonify({"sentiment": prediction})

if __name__ == "__main__":
    app.run()

