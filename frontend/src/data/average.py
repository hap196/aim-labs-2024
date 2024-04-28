import pandas as pd

# Read the CSV file
df = pd.read_csv(r'C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\PredictedSalesPrices.csv')

# Group by 'SneakerName' and calculate the average of 'PredictedSalesPrice'
df['PredictedSalesPrice'] = df.groupby('SneakerName')['PredictedSalesPrice'].transform('mean')

# Drop duplicate rows
df = df.drop_duplicates(subset='SneakerName')

# Select the required columns
df = df[['Brand', 'SneakerName', 'RetailPrice', 'ReleaseDate', 'Brand1', 'Brand2', 'ProductId', 'Color', 'PredictedSalesPrice']]

# Write the result to a new CSV file
df.to_csv('./AveragePredictedSalesPrice.csv', index=False)