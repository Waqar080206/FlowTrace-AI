import pandas as pd
import numpy as np
import random
import os

def generate_data():
    size = 10000
    df = pd.DataFrame({
        'txn_id': [f"TXN-{i}" for i in range(size)],
        'from_acct': [f"ACT-{random.randint(100, 600)}" for _ in range(size)],
        'to_acct': [f"ACT-{random.randint(100, 600)}" for _ in range(size)],
        'amount': np.random.lognormal(mean=10, sigma=1.5, size=size),
        'channel': np.random.choice(['UPI', 'NEFT', 'RTGS', 'IMPS'], size=size, p=[0.4, 0.3, 0.15, 0.15]),
        'is_fraud': [0]*size
    })
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/synthetic_transactions.csv', index=False)

if __name__ == "__main__":
    generate_data()