
# AI-Powered Wikipedia Quiz Generator 🧠✨

A modern web application that automatically generates interactive quizzes from any Wikipedia article URL using advanced AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![TiDB](https://img.shields.io/badge/Database-TiDB-4479A1)

## 🚀 Features

*   **Instant Quiz Generation**: Paste a Wikipedia link and get a quiz in seconds.
*   **AI Intelligence**: Uses Google Gemini Pro to understand content and generate relevant questions.
*   **Interactive UI**: Premium glassmorphism design with responsiveness.
*   **Quiz History**: Automatically saves your quizzes to a database (TiDB/MySQL) so you can review them later.
*   **Score Tracking**: Real-time scoring and feedback on answers.
*   **History Management**: View past quizzes in a table view and clear history as needed.

## 🛠️ Tech Stack

*   **Frontend**: React.js, React Router, CSS3 (Glassmorphism UI)
*   **Backend**: Python FastAPI, SQLAlchemy, Google Generative AI
*   **Database**: TiDB Cloud (MySQL Compatible)
*   **Deployment**: Vercel Ready

## 📦 Setup & Installation

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/yourusername/quiz-generator.git
    cd quiz-generator
    ```

2.  **Backend Setup**:
    ```bash
    cd Backend
    pip install -r requirements.txt
    # Create .env file with GEMINI_API_KEY and DATABASE_URL
    uvicorn main:app --reload
    ```

3.  **Frontend Setup**:
    ```bash

    cd frontend
    npm install
    npm start
    ```

## ☁️ Deployment

This project is configured for **Vercel**. Simply import the repo and set the environment variables!

<img width="1920" height="1020" alt="Screenshot 2026-01-28 102443" src="https://github.com/user-attachments/assets/450909c3-20d0-4c6a-8737-d7506306746e" />
<img width="1905" height="898" alt="Screenshot 2026-01-28 102633" src="https://github.com/user-attachments/assets/7a6cf141-7d72-4998-8951-2f116e9fa443" />
