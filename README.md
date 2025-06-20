
# ⚖️ NyayaAI – Legal Assistant for Common People

NyayaAI is a full-stack AI-powered legal assistant designed to help everyday citizens understand legal documents and get structured legal advice. It supports document uploads (FIRs, rent agreements, screenshots), Gemini-based summarization, and cross-questioning using Retrieval-Augmented Generation (RAG). 

## 🚀 Features

- 🧠 **AI Legal Chat** – Ask any legal question and get structured, simplified legal responses
- 📎 **Upload Documents** – Upload FIRs, agreements, screenshots, etc., and get summaries
- 🤖 **Cross-Question with RAG** – Ask follow-up questions based on uploaded documents
- 📁 **Case Folders** – Organize ongoing legal issues and documents in folders
- ✨ **Typing animation**, responsive design, and clean UI with React + CSS

---

## 🧑‍💻 Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | React, Pure CSS           |
| Backend      | Node.js, Express          |
| AI Model     | Gemini 2.0 via Google GenAI API |
| File Upload  | Multer (Express middleware) |
| Deployment   | Vercel (frontend), Render (backend) |

---

## 📂 Project Structure

```
nyayaai/
├── nyayaai-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── public/
├── nyayaai-backend/
│   ├── index.js
│   ├── uploads/
│   └── .env
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/nyayaai.git
cd nyayaai
```

### 2️⃣ Setup Backend

```bash
cd nyayaai-backend
npm install
touch .env
```

Add this to `.env`:

```
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the server:

```bash
node index.js
```

Server will run on: `http://localhost:5000`

---

### 3️⃣ Setup Frontend

```bash
cd ../nyayaai-frontend
npm install
npm run dev
```

Visit the UI at: `http://localhost:3000`

---

## 🌐 Deployment

- Frontend deployed on **Vercel**: [https://nyayaai.vercel.app](https://nyayaai.vercel.app/)
- Backend deployed on **Render**: [https://nyayaai-api.onrender.com](https://nyayaai-backend.onrender.com)

Ensure frontend uses:
```env
VITE_BACKEND_URL=https://nyayaai-api.onrender.com
```

---

## 📸 Screenshots

![Chat UI](./screenshots/chat-ui.png)
![Document Upload](./screenshots/upload-ui.png)
![Structured Summary](./screenshots/summary-ui.png)

---

## 🤝 Team & Contributions

This project was developed by Ayushman Singh and team for a hackathon to make legal help more accessible using Generative AI.

Contributions, suggestions, and forks are welcome!

---

## 📜 License

MIT License © 2025 Ayushman Singh
