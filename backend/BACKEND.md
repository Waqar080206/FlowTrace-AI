# FlowTrace-AI Backend Documentation

This document provides an overview of the backend architecture, modules, and API endpoints for FlowTrace-AI.

## Technology Stack
- **Framework:** Flask (Python)
- **CORS:** `flask_cors` for cross-origin requests (configured for `http://localhost:3000`)
- **Machine Learning:** Custom Risk ML models
- **GenAI:** Generative AI engine for story generation and explanation
- **Data structures:** Graph processing for transaction flows

## Directory Structure

```text
backend/
├── app.py                  # Main Flask application and API routes
├── fiu_report.py           # Logic for generating Suspicious Activity Reports (STR/SAR) for FIUs
├── fraud_patterns.py       # Fraud pattern detection and alert retrieval
├── genai_engine.py         # AI-driven story generation and contextual explanation
├── graph_engine.py         # Graph processing for transaction network data
├── ml_model.py             # Machine learning model loading and risk scoring
├── requirements.txt        # Python dependency list
├── data/
│   └── generate_synthetic.py # Script for generating synthetic transaction/account data
└── models/                 # Stored machine learning models and artifacts
```

## Application Modules

### 1. Main Application (`app.py`)
The central entry point for the REST API. It initializes the Flask server, configures CORS for the frontend, loads the initial ML model (`load_model()`), and routes incoming HTTP requests to their respective backend processor functions.

### 2. Machine Learning (`ml_model.py`)
Handles loading serialized models and providing prediction functions, notably `score_account()` which computes the risk score for tracked accounts.

### 3. Graph Engine (`graph_engine.py`)
Manages the extraction and structuring of nodes and edges required for frontend graph visualization. Used for charting how funds flow between clustered or flagged accounts (`get_graph_data()`).

### 4. Fraud Patterns & Alerts (`fraud_patterns.py`)
Defines heuristic and pattern-based rules to detect specific typologies of fraud (e.g., structuring, smurfing). It surfaces alerts to the dashboard (`get_all_alerts()`).

### 5. Generative AI Engine (`genai_engine.py`)
Utilizes LLMs (Large Language Models) to stream narrative explanations of complex fraud rings (`generate_story_stream()`).

### 6. FIU Reporting (`fiu_report.py`)
Generates structured Suspicious Transaction Reports (STRs) for submission to Financial Intelligence Units (`build_str_report()`).

## API Endpoints Overview

- **`GET /api/metrics`**
  - Returns generalized metrics for the dashboard (e.g., active alerts, analyzed transactions, average risk scores, flagged accounts).

- **`GET /api/alerts`**
  - Retrieves all active fraud alerts using the logic from `fraud_patterns.py`.

*(Additional endpoints likely exist for generating stories, streaming chart data, requesting FIU reports, and querying graph/nodes based on the structure).*

## Getting Started

1. **Setup Python Environment** (Inside the `backend/` directory)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the Application**
   ```bash
   python app.py
   # Or alternatively: flask run
   ```
   The backend will start and listen for requests, usually on `http://127.0.0.1:5000`.