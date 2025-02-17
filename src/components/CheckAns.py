from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from IPython.display import Markdown

# Initialize Flask app
app = Flask(__name__)

# Configure your Gemini API key
genai.configure(api_key="AIzaSyBQJ8Xd8JE1DwlH6Z4Kmrxrflgb24AgsjQ")
gemini = genai.GenerativeModel(model_name='gemini-2.0-flash-exp')
@app.route('/generate', methods=['POST'])
def generate_response():
    try:
        # Parse request JSON
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Generate text using Gemini
       
        response = gemini.generate_content( prompt)

        # Return the generated response
        return Markdown(response.text)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

