from flask import Flask, jsonify, request, Response, stream_with_context
from flask_cors import CORS
from graph_engine import get_graph_data
from ml_model import load_model, score_account
from fraud_patterns import get_all_alerts
from genai_engine import generate_story_stream
from fiu_report import build_str_report

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
model = load_model()

@app.route('/api/metrics')
def metrics():
    return jsonify({"alerts": 7, "txns_analysed": 14832, "avg_risk": 71, "accounts_flagged": 23})

@app.route('/api/alerts')
def alerts():
    return jsonify(get_all_alerts())

@app.route('/api/graph')
def graph():
    case_id = request.args.get('case_id', 'CR-0847')
    return jsonify(get_graph_data(case_id))

@app.route('/api/risk-score')
def risk_score():
    account_id = request.args.get('account_id', 'SB-3311')
    return jsonify(score_account(model, account_id))

@app.route('/api/generate-story', methods=['POST'])
def generate_story():
    data = request.json
    return Response(stream_with_context(generate_story_stream(data)), content_type='text/plain')

@app.route('/api/fiu-report', methods=['POST'])
def fiu_report():
    data = request.json
    return jsonify(build_str_report(data))

if __name__ == '__main__':
    app.run(debug=True, port=5000)