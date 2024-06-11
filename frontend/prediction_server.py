from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
import pickle
from bert_predict import sneaker_sentiment
import os

app = Flask(__name__)
CORS(app)
model_path = os.path.join(os.path.dirname(__file__), 'final_model', 'Sneaker Sales Price Prediction Model.h5')
one_hot_encoder_path = os.path.join(os.path.dirname(__file__), 'final_model', 'One Hot Encoder.pkl')
scaler_path = os.path.join(os.path.dirname(__file__), 'final_model', 'scaler.pkl')

model = tf.keras.models.load_model(model_path)

with open(one_hot_encoder_path, 'rb') as f:
    one_hot_encoder = pickle.load(f)

with open(scaler_path, 'rb') as f:
    scaler = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    
    # get sentiment score from BERT model prediction
    sneaker_name = df['SneakerNamePred'].iloc[0]
    sneaker_score = sneaker_sentiment(sneaker_name)
    
    df['SneakerNamePred'] = sneaker_score

    # transform data using the loaded transformers
    categorical_features = ["Brand1", "Brand2", "Color", "Color2"]
    numerical_features = ['SneakerNamePred', "RetailPrice", "Size", "DaysFromRelease"]

    encoded_features = one_hot_encoder.transform(df[categorical_features])
    scaled_features = scaler.transform(df[numerical_features])

    X = np.hstack([scaled_features, encoded_features])

    # predict
    predictions = model.predict(X) / 79
    rounded_prediction = "{:.2f}".format(predictions[0][0])

    return jsonify({'prediction': rounded_prediction})
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)