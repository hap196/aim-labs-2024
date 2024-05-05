import pandas as pd

df = pd.read_csv(r'C:\Users\leann\Documents\aim-labs-2024\frontend\src\data\PredictedSalesPrices.csv')

df['PredictedSalesPrice'] = df.groupby('SneakerName')['PredictedSalesPrice'].transform('mean')

df = df.drop_duplicates(subset='SneakerName')

df = df[['Brand', 'SneakerName', 'RetailPrice', 'ReleaseDate', 'Brand1', 'Brand2', 'ProductId', 'Color', 'PredictedSalesPrice']]

df.to_csv('./AveragePredictedSalesPrice.csv', index=False)