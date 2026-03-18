# Explain My Codebase

An AI-powered codebase analysis tool that explains GitHub repositories and visualizes their dependencies.

## Features
- **Repository Import**: Paste a GitHub URL to analyze its structure.
- **Recursive File Tree**: Navigate the codebase with a familiar folder-file UI.
- **AI Folder Explanations**: Click any folder to get an AI-generated explanation of its purpose (powered by Gemini).
- **Architecture Overview**: Get a high-level summary of the project type and main modules.
- **Performance**: Uses GitHub API Tree endpoints to analyze repos without full clones.

## Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS, React Flow, Lucide-React.
- **Backend**: Node.js, Express, MongoDB/Mongoose, Octokit (GitHub API).
- **AI**: Google Gemini API.

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- GitHub Personal Access Token
- Gemini API Key

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env from .env.example and fill in your keys
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/explain-my-codebase
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
