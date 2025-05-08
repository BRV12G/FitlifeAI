import os
import pandas as pd
import spacy
import nltk
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Load environment variables from .env file
load_dotenv()

# Download NLTK tokenizer if not already
nltk.download('punkt')

# Load NLP model
nlp = spacy.load('en_core_web_sm')

# Load dataset (optional if used in prompt)
# DATASET_PATH = os.path.join(os.path.dirname(__file__), 'fitness_recommendation_dataset.csv')
# df = pd.read_csv(DATASET_PATH)

# Hugging Face Inference Client setup
HF_TOKEN = os.getenv("HF_TOKEN")
client = InferenceClient(
    "mistralai/Mistral-Nemo-Instruct-2407",
    token=HF_TOKEN
)

def generate_fitness_plan(user_data):
    """
    Generates a personalized fitness plan using a Hugging Face LLM.
    :param user_data: dict with keys: age, weight, height, gender, injury, workout_preference, goal, weight_goal
    :return: String recommendation
    """
    prompt = f"""
    You are a fitness expert assistant. Using the dataset knowledge, create a customized exercise recommendation plan.

    User Profile:
    - Age: {user_data['age']}
    - Weight: {user_data['weight']} kg
    - Height: {user_data['height']} cm
    - Gender: {user_data['gender']}
    - Injury Info: {user_data['injury']}
    - Workout Preference: {user_data['workout_preference']}
    - Workout Goal: {user_data['goal']}
    - Weight Goal: {user_data['weight_goal']}

    Based on this, provide the following:
    1. Personalized Workout Plan
    2. Workout Frequency and Duration per Week
    3. Recommended Exercise Set (e.g., Full Body: 10 Pushups, 20 sec Plank, etc.)
    4. Sample Weekly Workout Schedule (e.g., Chest on Day 1, Shoulders on Day 2, etc.)
    5. Precautions or Modifications (if injuries exist)
    6. Predict the number of days or months required to reach the goal

    Use only relevant and simple terms.
    """

    try:
        response = client.chat_completion(
            messages=[
                {"role": "system", "content": "You are a fitness assistant that provides helpful, customized workout recommendations."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=700,
            stream=False
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating fitness plan: {str(e)}"
