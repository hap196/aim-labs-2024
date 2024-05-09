from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model('/Users/haileypan/Documents/GitHub/aim-labs-2024/final_model/sneaker_salesPrice_prediction.h5')

# Load the pre-fitted transformers
with open('/Users/haileypan/Documents/GitHub/aim-labs-2024/final_model/one_hot_encoder.pkl', 'rb') as f:
    one_hot_encoder = pickle.load(f)

with open('/Users/haileypan/Documents/GitHub/aim-labs-2024/final_model/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    
    # transform data using the loaded transformers
    categorical_features = ["Brand", "Sneaker Name", "Brand1", "Brand2", "Color", "Color2"]
    numerical_features = ["RetailPrice", "Size", "DaysFromRelease"]

    encoded_features = one_hot_encoder.transform(df[categorical_features])
    scaled_features = scaler.transform(df[numerical_features])

    X = np.hstack([scaled_features, encoded_features])

    # predict
    predictions = model.predict(X)
    rounded_prediction = "{:.2f}".format(predictions[0][0])

    return jsonify({'prediction': rounded_prediction})
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
