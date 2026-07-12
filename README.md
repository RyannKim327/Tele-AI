# TeleAI — Compassionate AI Telegram Companion (Krysanne)

[![License: ECL-2.0](https://img.shields.io/badge/License-ECL--2.0-blue.svg)](https://opensource.org/licenses/ECL-2.0)
[![Platform: Node.js](https://img.shields.io/badge/Platform-Node.js-green.svg)](https://nodejs.org/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![wakatime](https://wakatime.com/badge/github/RyannKim327/Tele-AI.svg)](https://wakatime.com/badge/github/RyannKim327/Tele-AI)

> **"What I aim is to give people a friend, to prevent suicide cases. To call someone who listen to them."**
> — *TeleAI Mission Statement*

**TeleAI** is an empathetic, always-on AI assistant hosted on Telegram. Named **Krysanne**, this chatbot acts as a companion designed to listen, converse, and offer a supportive presence for individuals who may feel isolated, distressed, or simply need a safe space to share their thoughts. Powered by **OpenRouter AI** models, TeleAI aims to provide comfort and human-like warmth to prevent loneliness and mental health crises.

---

## 🌟 Key Features

*   **Empathetic Listening:** Engineered to act as a supportive companion, offering active listening and a compassionate outlet for users.
*   **Continuous Chat Memory:** Stores conversational context securely per Telegram `chat.id` in a local dataset to enable fluid, context-aware dialogues.
*   **Intelligent Built-in Commands:** Seamlessly parses commands embedded in AI JSON responses:
    *   `clear-chat`: Resets/clears the conversational history for a fresh start.
    *   `verse`: Scrapes and retrieves motivational Bible verses based on user request/state.
    *   `guitar`: Searches and fetches song lyrics and guitar chords when users want to play music.
*   **Flexible Setup:** Supports both production-ready **Webhooks** (using Express) and rapid-development **Long Polling**.
*   **OpenRouter Integration:** Leverages any free or premium LLMs available through OpenRouter (defaults to `tencent/hy3:free`).

---

## 🛠️ Technology Stack

*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed for reliability)
*   **Runtime:** [Node.js](https://nodejs.org/) with `tsx` for high-performance direct execution
*   **Telegram Integration:** [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
*   **Web Framework:** [Express 5](https://expressjs.com/) (for webhook setup)
*   **API Client:** [Axios](https://github.com/axios/axios) (to communicate with OpenRouter)
*   **Bible Scraping:** [biblegateway-scrape](https://www.npmjs.com/package/biblegateway-scrape) (to extract verses on demand)
*   **Guitar Chords:** [ultimate-guitar](https://www.npmjs.com/package/ultimate-guitar) (to retrieve songs and chords)

---

## 🤖 JSON-Driven Command Routing

Krysanne communicates in a structured JSON format to coordinate conversation and perform actions. Every response is parsed by a Markdown/JSON extractor to route command execution:

```json
{
  "message": "A human-readable explanation or chat response.",
  "command": "clear-chat | verse | guitar | (empty)",
  "parameter": "Arguments or search query for the command"
}
```

This allows the bot to dynamically trigger backend scripts based on AI determination.

---

## 🚀 Quick Start

### 1. Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [npm](https://www.npmjs.com/)

You will also need:
*   A **Telegram Bot Token** from [@BotFather](https://t.me/BotFather).
*   An **OpenRouter API Key** from [OpenRouter](https://openrouter.ai/).

---

### 2. Installation

Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/RyannKim327/Tele-AI
cd TeleAI
```

Install the dependencies:

```bash
npm install
```

---

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Telegram Bot Configuration
TELEGRAM_TOKEN=your_telegram_bot_token_here

# OpenRouter AI API Configuration
AI_TOKEN=your_openrouter_api_key_here

# Optional: Webhook Configuration (Leave empty to use polling mode)
# WEBHOOK_URL=https://your-domain.com
# PORT=3000
```

---

### 4. Running the Bot

To start the bot in development or production mode, run:

```bash
npm start
```

If `WEBHOOK_URL` is omitted, the bot will fall back automatically to **long polling** mode and log the status to the console.

---

## 📂 Project Structure

```
TeleAI/
├── data/               # Persistent conversational datasets (git-ignored)
├── src/
│   ├── index.ts        # Bot initialization & polling/webhook routing
│   ├── core.ts         # Event router and start action handler
│   ├── interface.ts    # TypeScript definitions for AI responses
│   ├── prompt.md       # Core identity & system prompt for Krysanne
│   ├── script/
│   │   ├── auto.ts         # AI integration & dataset store update logic
│   │   ├── clear-chat.ts   # Handler for resetting conversation state
│   │   ├── guitar.ts       # Ultimate Guitar chords retrieval
│   │   └── verse.ts        # Bible Gateway verse scraping
│   └── utils/
│       ├── console.ts      # Stylized terminal logger
│       └── md-extractor.ts # Utility for parsing commands from AI markdown
├── LICENSE.md          # ECL-2.0 Licensing details
└── package.json        # Project scripts and dependencies
```

---

## 🛡️ License

This project is licensed under the **Educational Community License, Version 2.0 (ECL-2.0)**. See the [LICENSE.md](LICENSE.md) file for more information.

---

## ❤️ Contributing

We welcome contributions of all kinds to make **TeleAI** more supportive, secure, and accessible. Please see [CONTRIBUTORS.md](CONTRIBUTORS.md) for contribution guidelines and to meet our team.
