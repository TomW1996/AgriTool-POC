from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API Key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def process_query(query: str):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4-turbo",
        "messages": [{"role": "system", "content": "You are an AI assistant that provides funding and regulation insights."},
                     {"role": "user", "content": query}],
        "temperature": 0.7
    }
    
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
    
    if response.status_code == 200:
        ai_response = response.json()["choices"][0]["message"]["content"]
        return {
            "category": "Funding Opportunity",
            "description": ai_response,
            "link": "https://europa.eu/funding-opportunity"
        }
    else:
        return {"error": "Failed to fetch AI response"}

@app.get("/api/search")
def search(query: str = Query(..., title="Search Query", description="Enter a query about regulations or funding.")):
    result = process_query(query)
    return {"results": [result]}

@app.get("/")
def root():
    return {"message": "AgriTool Backend is Running!"}
