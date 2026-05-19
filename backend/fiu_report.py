def build_str_report(case_dict):
    return {
        "report_ref": "STR-" + case_dict.get("case_id", "0001"),
        "reporting_entity": "Union Bank of India",
        "branch_ifsc": "UBIN0531211",
        "date_of_report": "2026-05-19",
        "transaction_period": "2026-05-01 to 2026-05-18",
        "total_amount": 450000,
        "num_transactions": 12,
        "primary_account": case_dict.get("account_id", "SB-3311"),
        "suspicion_type": "Structuring and Layering",
        "detection_method": "Hybrid AI Models",
        "grounds_for_suspicion": "Account showed rapid movement of funds bypassing 50k reporting thresholds."
    }