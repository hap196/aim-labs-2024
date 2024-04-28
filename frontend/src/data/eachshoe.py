import pandas as pd
import os

# Load the data
average_predicted_sales_price = pd.read_csv(r"C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\AveragePredictedSalesPrice.csv")
predicted_sales_price = pd.read_csv(r"C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\PredictedSalesPrices.csv")

# Get the unique sneaker names
unique_sneaker_names = average_predicted_sales_price["SneakerName"].unique()

# Create the directory for the new CSV files
os.makedirs("eachshoedata", exist_ok=True)

# For each unique sneaker name, create a new CSV file
for sneaker_name in unique_sneaker_names:
    # Filter the data for the current sneaker
    sneaker_data = predicted_sales_price[predicted_sales_price["SneakerName"] == sneaker_name]
    
    # Select the OrderDate and SalesPrice columns
    sneaker_data = sneaker_data[["OrderDate", "SalesPrice"]]
    
    # Save the data to a new CSV file
    sneaker_data.to_csv(f"{sneaker_name.replace(' ', '-')}.csv", index=False)