from flask import Flask, request, jsonify
from transformers import pipeline
from textblob import TextBlob

app = Flask(__name__)

def is_prompt_ok(prompt : str) -> bool:
    ALLOWED_TOPICS = ("clothes", "fashion", "shopping", "general questions", "thanks")
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    
    result = classifier(prompt, ALLOWED_TOPICS, multi_label=True)
    return any(score > 0.5 for score in result["scores"])

def is_sentiment_ok(prompt : str) -> bool:
    blob = TextBlob(prompt)
    return all(sentence.sentiment.polarity > -0.05 for sentence in blob.sentences)

@app.route("/", methods=["GET"])
def index():
    return "Filtr uruchomiony"

@app.route('/', methods=['POST'])
def filter_prompt():
    data = request.get_json()
    prompt = data.get('prompt')

    topic = is_prompt_ok(prompt)
    sentiment = is_sentiment_ok(prompt)
    if topic and sentiment:
        return jsonify({'allowed' : True})
    elif not topic:
        return jsonify({'allowed' : False, 'reason' : "Prompt not related to clothes"})
    else:
        return jsonify({'allowed' : False, 'reason' : "Prompt not positive as required"})

if __name__ == '__main__':
    app.run(port=5000)
