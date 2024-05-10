from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
import pickle
from bert_predict import sneaker_sentiment

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model(r'C:\Users\leann\Documents\aim-labs-2024\final_model\Sneaker Sales Price Prediction Model.h5')

with open(r'C:\Users\leann\Documents\aim-labs-2024\final_model\One Hot Encoder.pkl', 'rb') as f:
    one_hot_encoder = pickle.load(f)

with open(r'C:\Users\leann\Documents\aim-labs-2024\final_model\scaler.pkl', 'rb') as f:
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