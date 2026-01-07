import os
from app import app

if __name__ == "__main__":
    print("--- SKILLGAP AI PRO INITIALIZED ---")
    print("Connecting to Gemini 1.5 Flash...")
    # This starts the Flask server on Port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
