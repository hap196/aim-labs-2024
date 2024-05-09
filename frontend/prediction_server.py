from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model('/Users/haileypan/Documents/GitHub/aim-labs-2024/final_model/sneaker_salesPrice_prediction.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    print(df)

    
    categorical_features = [
        "Brand", "Sneaker Name", "Brand1", "Brand2", "Color", "Color2",
    ]
    numerical_features = ["RetailPrice", "Size", "DaysFromRelease"]

    
    one_hot_encoder = OneHotEncoder(sparse_output=False)
    encoded_features = one_hot_encoder.fit_transform(df[categorical_features])

    # fix
    num_features = 128 - encoded_features.shape[1] - 4  
    zeros_to_append = np.zeros((encoded_features.shape[0], num_features))  
    encoded_features = np.hstack([encoded_features, zeros_to_append])  

    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df[numerical_features])

    X = np.hstack([scaled_features, encoded_features])
    print("x", X)
    predictions = model.predict(X)

    return jsonify({'prediction': predictions.tolist()})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
