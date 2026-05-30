import networkx as nx

def build_graph(transactions_df):
    G = nx.DiGraph()
    for _, row in transactions_df.iterrows():
        G.add_edge(row['from_acct'], row['to_acct'], amount=row['amount'], channel=row['channel'])
    return G

def detect_cycles(G):
    return list(nx.simple_cycles(G))

def get_graph_data(case_id):
    return {
        "nodes": [
            {"id": "SB-3311", "label": "Rajan Mehta", "risk": 94, "x": 200, "y": 150},
            {"id": "SB-7821", "label": "Priya Sharma", "risk": 87, "x": 450, "y": 100},
            {"id": "SB-4490", "label": "Amit Patel", "risk": 82, "x": 550, "y": 300},
            {"id": "SB-2156", "label": "Deepak Kumar", "risk": 75, "x": 350, "y": 400},
            {"id": "SB-5603", "label": "Neha Singh", "risk": 68, "x": 100, "y": 350},
            {"id": "SB-8834", "label": "Rajesh Verma", "risk": 79, "x": 650, "y": 200},
            {"id": "SB-1122", "label": "Sanjay Gupta", "risk": 71, "x": 400, "y": 250},
            {"id": "SB-9999", "label": "Corporate", "risk": 45, "x": 450, "y": 50}
        ],
        "edges": [
            {"source": "SB-3311", "target": "SB-7821", "amount": 80000},
            {"source": "SB-7821", "target": "SB-4490", "amount": 78000},
            {"source": "SB-4490", "target": "SB-2156", "amount": 76000},
            {"source": "SB-2156", "target": "SB-5603", "amount": 74000},
            {"source": "SB-5603", "target": "SB-7821", "amount": 72000},
            {"source": "SB-7821", "target": "SB-3311", "amount": 70000}
        ]
    }

def compute_centrality(G):
    return {"pagerank": nx.pagerank(G), "betweenness": nx.betweenness_centrality(G)}