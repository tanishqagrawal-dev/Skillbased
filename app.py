import json
import PyPDF2
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__, template_folder='.')
CORS(app)

# YOUR FINAL API KEY
genai.configure(api_key="AIzaSyDfgce8f7NAAWHAdAX2k--JXoLV7NOB5fE")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        file = request.files['resume']
        jd_text = request.form.get('jd', 'Software Professional')
        
        # Deep PDF Text Extraction
        pdf_reader = PyPDF2.PdfReader(file)
        resume_text = "".join([page.extract_text() for page in pdf_reader.pages])

        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        Role: {jd_text} | Resume: {resume_text}
        Task: Provide a high-accuracy career audit in JSON format.
        Structure:
        {{
          "score": 0-100,
          "radar": [80, 70, 90, 60, 85],
          "ratios": {{"FAANG": 40, "Startups": 85, "MNC": 60}},
          "gaps": ["Skill A", "Skill B"],
          "roadmap": ["Action 1", "Action 2"],
          "accuracy": "99.2%"
        }}
        """
        response = model.generate_content(prompt)
        res_text = response.text.replace('```json', '').replace('```', '').strip()
        return jsonify(json.loads(res_text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
