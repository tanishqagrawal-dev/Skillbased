from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2, google.generativeai as genai

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyB-NmKF4ouTaHg-KrndRUwb1Qh6ioqYQD8")

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['resume']
    pdf = PyPDF2.PdfReader(file)
    text = "".join([page.extract_text() for page in pdf.pages])

    model = genai.GenerativeModel('gemini-pro')
    prompt = f"Analyze this resume: {text}. Output JSON with: 'score' (0-100), 'gaps' (list of missing technical skills), 'courses' (list of 3 recommended topics)."
    
    response = model.generate_content(prompt)
    return response.text

if __name__ == '__main__':
    app.run(port=5000)
