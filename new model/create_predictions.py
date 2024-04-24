import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split

model_path = (
    "sneaker_salesPrice_prediction.h5"
)
data_path = (
    "Stock-Data-Correction-new.csv"
)

model = tf.keras.models.load_model(model_path)
df = pd.read_csv(data_path)

categorical_features = [
    "Brand",
    "Sneaker Name",
    "Brand1",
    "Brand2",
    "ProductId",
    "Color",
    "Color2",
]
numerical_features = ["PriceRatio", "RetailPrice", "Size", "DaysFromRelease"]

one_hot_encoder = OneHotEncoder(sparse=False)
encoded_features = one_hot_encoder.fit_transform(df[categorical_features])

scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[numerical_features])

X = np.hstack([scaled_features, encoded_features])

predictions = model.predict(X)

df["PredictedSalesPrice"] = predictions

output_path = (
    "PredictedSalesPrices.csv"
)
df.to_csv(output_path, index=False)

print(f"Predictions saved to {output_path}")
