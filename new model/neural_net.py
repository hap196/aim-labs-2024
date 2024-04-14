import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Dropout, BatchNormalization
# from keras.utils import to_categorical
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import pandas as pd
import numpy as np

################## IMPORT DATA ##################
df = pd.read_csv("Stock-Data-Correction-new.csv")

categorical_features = [
    "Brand",
    "Sneaker Name",
    "Brand1",
    "Brand2",
    "ProductId",
    "Color",
    "Color2",
]

# converts categorical featuers into numerical ones
one_hot_encoder = OneHotEncoder(sparse=False)
encoded_features = one_hot_encoder.fit_transform(df[categorical_features])

# scale numerical features
numerical_features = ["SalesPrice", "RetailPrice", "Size", "DaysFromRelease"]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[numerical_features])

# combine scaled and encoded features
X = np.hstack([scaled_features, encoded_features])

# variable we want to predict
y = df["PriceRatio"].values

# split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

################## NEURAL NETWORK MODEL ##################
model = Sequential(
    [
        Dense(128, input_shape=(X_train.shape[1],), activation="relu"),
        BatchNormalization(),
        Dropout(0.5),
        Dense(64, activation="relu"),
        BatchNormalization(),
        Dropout(0.5),
        Dense(32, activation="relu"),
        BatchNormalization(),
        Dense(1),
    ]
)

model.compile(optimizer="adam", loss="mean_squared_error", metrics=["mae"])

history = model.fit(X_train, y_train, epochs=100, validation_split=0.2, batch_size=32)
loss, mae = model.evaluate(X_test, y_test)
print(f"test loss: {loss}, test mean squared error: {mae}")
