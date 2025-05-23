from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

def is_prompt_ok(prompt : str) -> bool:
    ALLOWED_TOPICS = ("clothes", "fashion", "shopping", "general questions", "thanks")
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    result = classifier(prompt, ALLOWED_TOPICS, multi_label=True)
    print(result)

    return any(score > 0.5 for score in result["scores"])

@app.route("/", methods=["GET"])
def index():
    return "Filtr uruchomiony"
@app.route('/', methods=['POST'])
def filter_prompt():
    data = request.get_json()
    prompt = data.get('prompt')
    if is_prompt_ok(prompt):
        return jsonify({'allowed' : True})
    else:
        return jsonify({'allowed' : False, 'reason' : "Prompt not related to clothes"})

if __name__ == '__main__':
    app.run(port=5000)
