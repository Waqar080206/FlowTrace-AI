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
            {"id": "n1", "label": "SB-3311", "x": 100, "y": 100, "risk": 85, "color": "#E24B4A"},
            {"id": "n2", "label": "CA-8821", "x": 200, "y": 150, "risk": 40, "color": "#1D9E75"}
        ],
        "edges": [
            {"source": "n1", "target": "n2", "amount": 49000, "channel": "RTGS"}
        ]
    }

def compute_centrality(G):
    return {"pagerank": nx.pagerank(G), "betweenness": nx.betweenness_centrality(G)}