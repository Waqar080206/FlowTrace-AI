import os
import joblib
from sklearn.ensemble import IsolationForest
import pandas as pd
import numpy as np

def train_model():
    # Synthetic mock for training
    df = pd.DataFrame({
        'amount': np.random.lognormal(mean=10, sigma=1, size=100),
        'hour': np.random.randint(0, 24, 100),
        'velocity_1h': np.random.randint(1, 10, 100),
        'channel_encoded': np.random.randint(0, 4, 100)
    })
    model = IsolationForest(contamination=0.08, random_state=42)
    model.fit(df)
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/isolation_forest.pkl')
    return model

def load_model():
    if os.path.exists('models/isolation_forest.pkl'):
        return joblib.load('models/isolation_forest.pkl')
    return train_model()

def score_transaction(model, txn_dict):
    df = pd.DataFrame([txn_dict])
    return float(model.decision_function(df)[0])

def score_account(model, account_id):
    return {
        "score": 85,
        "breakdown": {"graph_cycle": 30, "isolation_forest": 25, "rule_engine": 20, "velocity": 10},
        "flags": ["High velocity", "Circular transaction"]
    }