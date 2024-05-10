import torch
from transformers import AutoTokenizer

model_path = r'C:\Users\leann\Documents\aim-labs-2024\final_model\bert_model.pth'
model = torch.load(model_path)
model.eval()  

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')  

def sneaker_sentiment(text):
    
    inputs = tokenizer(text, padding=True, truncation=True, max_length=512, return_tensors='pt')

    with torch.no_grad():  
        outputs = model(**inputs)
        logits = outputs.logits
        predictions = torch.argmax(logits, dim=-1)
    
    return predictions.item()
