import os
import time

def generate_story_stream(case_dict):
    # Mocking stream since exact OpenAI interface might need API KEY
    narrative = f"Investigation for case {case_dict.get('case_id', 'Unknown')}: \n\n1) The account exhibited clear circular transactions.\n2) Suspicious due to structuring amounts just under 50k limit over 3 days.\n3) The investigator should freeze the account and submit an STR."
    for char in narrative:
        yield char
        time.sleep(0.01)