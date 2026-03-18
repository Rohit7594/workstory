# Rohit Saroj — Portfolio Website & AI Assistant

Welcome to the repository for my personal portfolio website! This project showcases my experience, skills, projects, and features a unique **custom AI Assistant named Vanya**, powered by state-of-the-art Generative AI. 

🌐 **Live Demo:** [Portfolio Website](https://rohit7594.github.io/workstory/)

---

## 🚀 Features

*   **Modern, Responsive UI:** A clean, glassmorphism-inspired design with smooth animations and dynamic gradients.
*   **Professional Timeline:** Highlights over 8 years of my experience in Data Science, AI/ML, and Analytics across various industries.
*   **Vanya AI Assistant:** A truly interactive, empathetic AI integrated directly into the UI, capable of answering questions about my background, hobbies, and contact info in real-time.
*   **Dynamic Backgrounds:** Aesthetic, animated background styles that create an engaging user experience.

---

## 🤖 Vanya: The Portfolio AI Assistant

Instead of a generic "Contact Me" form or simple rule-based chatbot, this portfolio features **Vanya**, an AI agent designed to converse with visitors like a human colleague.

### Chatbot Architecture

The chat feature is split into two secure layers to protect API keys while remaining serverless and highly performant:

1.  **Frontend (GitHub Pages):** 
    *   Vanilla JavaScript (`script.js`) handles the UI state, typing indicators, and parses **Server-Sent Events (SSE)**.
    *   Tokens are streamed into the chat bubble in real-time with a blinking CSS cursor.
2.  **Backend Proxy (Cloudflare Workers):**
    *   A secure serverless proxy located in the `chat-proxy` folder intercepts frontend requests.
    *   It securely injects my strict **System Prompt** (which dictates Vanya's warm, spiritual personality and my full CV facts).
    *   It authenticates with the **NVIDIA NIM API** using encrypted Cloudflare Secrets.
    *   It routes the request to the `qwen/qwen3.5-122b-a10b` model (configurable via CLI).
3.  **Conversation Logging (Google Apps Script):**
    *   Conversations are securely sent via a webhook to a private Google Sheet.

---

## 🛠️ Built With

**Frontend:**
*   HTML5 / CSS3 (Vanilla, CSS Variables, Glassmorphism techniques)
*   JavaScript (ES6+, Fetch API, Event Streams)
*   DiceBear API (Dynamic Avatars)
*   FontAwesome (Icons)

**Backend / AI:**
*   **Cloudflare Workers** (Serverless Proxy Backend)
*   **NVIDIA NIM API** (LLM Inference hosting `Qwen-122b`)
*   **Google Apps Script** (Webhook Data ingestion)

---

## 👨‍💻 About Me (Rohit Saroj)

I am a Senior Data Scientist based in Gurgaon, India, currently working at Teamlease (Deloitte USI). I specialize in Generative AI, LangChain, LangGraph, Python, AWS, and designing human-in-the-loop workflows. 

When I'm not coding or building AI agents, you'll find me:
*   Playing Cricket or Video Games 🏏🎮
*   Exploring Occult Sciences & Astrology 🔮
*   Practicing Photography 📷
*   Building side projects like [Inspire the Souls](https://inspirethesouls.onrender.com/)

[Connect with me on LinkedIn](https://linkedin.com/in/rohitsaroj/) | [Follow me on Medium](https://medium.com/@yash7)

---

## 📜 Repository Structure

```text
├── index.html           # Main portfolio HTML structure
├── styles.css           # UI styling and animations
├── script.js            # Frontend logic and chat streaming implementation
└── chat-proxy/          # (Separate deployment) Cloudflare Worker proxy code
```

## ⚙️ Local Development Quickstart

1. Clone the repository:
   ```bash
   git clone https://github.com/Rohit7594/workstory.git
   ```
2. Navigate to the project directory:
   ```bash
   cd workstory
   ```
3. Open `index.html` in your browser, or use VS Code's "Live Server" extension for hot reloading.

*(Note: The AI Chat feature requires the Cloudflare Worker proxy to be running/accessible).*
