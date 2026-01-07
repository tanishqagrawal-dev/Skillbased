from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from sentence_transformers import SentenceTransformer, util

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Load semantic model (Advanced: compares meaning, not just words)
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route("/analyze", methods=["POST"])
async def analyze_skills(resume: UploadFile = File(...), jd: str = Form(...)):
    # 1. Extract Text
    pdf_reader = PyPDF2.PdfReader(resume.file)
    resume_text = ""
    for page in pdf_reader.pages:
        resume_text += page.extract_text()

    # 2. Semantic Analysis
    embeddings = model.encode([resume_text, jd])
    cos_sim = util.cos_sim(embeddings[0], embeddings[1])
    score = int(cos_sim.item() * 100)

    # 3. Predict Gaps (Advanced logic would use an LLM like Gemini here)
    # This is a placeholder for the logic discussed in Step 4 of your prompt
    return {
        "score": score,
        "gaps": ["Docker", "CI/CD", "Prometheus"], # Mocked logic
        "salary_est": "12L - 15L"
    }
