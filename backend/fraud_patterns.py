import pandas as pd

def detect_circular(df): return []
def detect_structuring(df): return []
def detect_dormant(df): return []
def detect_layering(df): return []

def get_all_alerts():
    return [
        {"id": "ALT-001", "type": "Circular transaction", "accounts": "SB-3311, CA-4412", "score": 92, "time": "10:23 AM", "level": "high"},
        {"id": "ALT-002", "type": "Structuring", "accounts": "SB-8822, CA-1102", "score": 75, "time": "09:12 AM", "level": "medium"}
    ]