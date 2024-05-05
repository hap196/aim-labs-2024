import pandas as pd
import os

# Load data
average_predicted_sales_price = pd.read_csv(r"C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\AveragePredictedSalesPrice.csv")
predicted_sales_price = pd.read_csv(r"C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\PredictedSalesPrices.csv")

unique_sneaker_names = average_predicted_sales_price["SneakerName"].unique()

os.makedirs("eachshoedata", exist_ok=True)


for sneaker_name in unique_sneaker_names:
    sneaker_data = predicted_sales_price[predicted_sales_price["SneakerName"] == sneaker_name]
    
    sneaker_data = sneaker_data[["OrderDate", "SalesPrice"]]
    
    sneaker_data.to_csv(f"{sneaker_name.replace(' ', '-')}.csv", index=False)