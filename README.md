# Krysanne — Compassionate AI Telegram Companion

[![License: ECL-2.0](https://img.shields.io/badge/License-ECL--2.0-blue.svg)](https://opensource.org/licenses/ECL-2.0)
[![Platform: Node.js](https://img.shields.io/badge/Platform-Node.js-green.svg)](https://nodejs.org/)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![wakatime](https://wakatime.com/badge/github/RyannKim327/krysanne.svg)](https://wakatime.com/badge/github/RyannKim327/krysanne)

![Krysanne Banner](assets/banner.jpg)

> **"What I aim is to give people a friend, to prevent suicide cases. To call someone who listen to them."**
> — *Krysanne Mission Statement*

**Krysanne** is an empathetic, always-on AI assistant hosted on Telegram. This chatbot acts as a companion designed to listen, converse, and offer a supportive presence for individuals who may feel isolated, distressed, or simply need a safe space to share their thoughts. Powered by **OpenRouter AI** models, Krysanne aims to provide comfort and human-like warmth to prevent loneliness and mental health crises.

> [!IMPORTANT]
> **Disclaimer:** Krysanne is an AI companion meant to lend a supportive ear and offer temporary comfort. It is **not** designed to replace physical human touch, real relationships, or professional help/counseling for emotional distress and mental health problems.
> 
> **Crisis Support Hotline (Philippines):** If you are experiencing thoughts of self-harm or suicide, please immediately contact **(02) 8804-4673** (Hopeline Philippines; Homepage: [findahelpline.com/organizations/hopeline](https://findahelpline.com/organizations/hopeline)) or visit [findahelpline.com/countries/ph](https://findahelpline.com/countries/ph) for more hotlines. If you are in the US or Canada, call or text **988**. Professional help is always available, and you are not alone.

---

## 🌟 Key Features

*   **Empathetic Listening:** Engineered to act as a supportive companion, offering active listening and a compassionate outlet for users.
*   **Persistent Chat Memory (GitHub Secret Gist):** Retains conversational context securely per Telegram `chat.id` using a secure, private GitHub Secret Gist. This keeps data private and ensures chat history persists across server restarts.
*   **Planned Data Encryption:** An encryptor layer (utilizing the `json-enc-dec` package and `BOT_CODE` key) is currently prepared and will be fully applied in future updates to encrypt conversational logs in the Gist store, ensuring maximum cryptographic privacy.
*   **Dynamic Command Routing:** Commands generated in structured AI JSON responses are dynamically matched, imported, and executed from modular scripts in the `src/script/` directory.
*   **Extensible Built-in Commands:**
    *   `clear-chat`: Resets/clears the conversational history for a fresh start.
    *   `verse`: Scrapes and retrieves motivational Bible verses based on user request/state.
    *   `guitar`: Searches and fetches song lyrics and guitar chords when users want to play music.
    *   `imgen`: Generates stunning images on the fly via the Lumenfall API.
    *   `new-thread`: Creates and manages new Telegram forum topics dynamically.
    *   `weather`: Fetches real-time weather reports for a given city or location via wttr.in.
*   **Flexible Setup:** Supports both production-ready **Webhooks** (using Express) and rapid-development **Long Polling**.
*   **OpenRouter Integration:** Leverages any free or premium LLMs available through OpenRouter (defaults to `openai/gpt-oss-20b`).

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

## 🎨 Web Design Philosophy

The companion platform frontend features a sleek, premium, and highly-focused design system that reflects Krysanne's comforting and gentle persona:

*   **Floating Capsule Navigation:** The header floats centered at the top of the page, adopting a Tailwind-style `rounded-full` layout. This ensures a clean, isolated, and floating web component aesthetic.
*   **Dynamic Color States:**
    *   **Muted Translucent State:** When resting at the top of the page, the header features a dark, semi-transparent backdrop blur (`rgba(10, 10, 10, 0.6)`) to stay unobtrusive and integrate with the dark-themed background.
    *   **Solid White State:** Upon scrolling the window down or opening the mobile drawer menu, the header transitions smoothly to solid white with dark navigation links and icons, offering high contrast and focused usability.
*   **Compassionate Visual Imagery:** The user interface features soft navy, violet, and starlight-white accents with cosmic/holographic glowing spheres to instill a sense of calm, technology, and support.

---

## 🤖 JSON-Driven Command Routing

Krysanne communicates in a structured JSON format to coordinate conversation and perform actions. Every response is parsed by a Markdown/JSON extractor to route command execution:

```json
{
  "message": "A human-readable explanation or chat response.",
  "command": "clear-chat | verse | guitar | imgen | new-thread | weather | (empty)",
  "parameter": "Arguments or search query for the command",
  "title": "Optional topic title (e.g., for creating or renaming forum topics)"
}
```

This design dynamically triggers scripts in `src/script/` corresponding to the command name (e.g., `imgen` will dynamically load and run `src/script/imgen.ts`).

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
git clone https://github.com/RyannKim327/krysanne
cd krysanne
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

# Bot Code (Secret key for hashing/encryption of conversational logs, reserved for future encryptor updates)
BOT_CODE=your_bot_secret_code_here

# Lumenfall AI API Key (Required for the `imgen` command)
LUMENFALL_API=your_lumenfall_api_key_here

# GitHub Secret Gist Data Store Configuration
GIST_ID=your_secret_gist_id_here
GITHUB_TOKEN=your_personal_access_token_here

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
krysanne/
├── data/               # Persistent conversational datasets (git-ignored)
├── src/
│   ├── index.ts        # Bot initialization & routing (Webhook/Polling)
│   ├── interface.ts    # TypeScript definitions for structures
│   ├── rules.md        # Core identity & system prompt rules for Krysanne
│   ├── middleware/
│   │   ├── api-process.ts # Handles and pre-filters incoming Telegram events
│   │   ├── core.ts     # Command-level event router (/start handler)
│   │   └── auto.ts     # AI model integration & dynamic routing logic
│   ├── script/         # Extensible command modules loaded dynamically on execution
│   │   ├── clear-chat.ts # Reset and clear conversational history
│   │   ├── guitar.ts   # Ultimate Guitar chords scraper
│   │   ├── imgen.ts    # Lumenfall API image generator
│   │   ├── new-thread.ts # Telegram forum topic creator
│   │   ├── verse.ts    # Bible Gateway verse scraper
│   │   └── weather.ts  # Real-time weather fetcher via wttr.in
│   └── utils/
│       ├── console.ts  # Stylized terminal logger
│       ├── gist.ts     # GitHub Secret Gist integration module
│       └── md-extractor.ts # Parsing commands from AI markdown/JSON
├── LICENSE.md          # ECL-2.0 Licensing details
└── package.json        # Project scripts and dependencies
```

---

## 🔒 Privacy & Safety

We take user privacy and emotional safety seriously. Krysanne is not a substitute for professional mental health support or physical human connection, but rather an AI companion to provide a temporary, listening hand during difficult moments. 

*   **Crisis Hotline:** If you are experiencing thoughts of self-harm or suicide, please call **(02) 8804-4673** (Hopeline Philippines; Homepage: [findahelpline.com/organizations/hopeline](https://findahelpline.com/organizations/hopeline)) or visit [findahelpline.com/countries/ph](https://findahelpline.com/countries/ph) for local hotlines.
*   **Privacy & Data Storage:** Conversational data is used strictly for continuous communication and is stored securely in a private GitHub Secret Gist. This prevents local storage exposure and ensures data persists across server restarts. To protect your data, an encryptor utilizing `json-enc-dec` is being integrated and will be applied in future updates to cryptographically encrypt all conversational logs.

For full details on data handling and mental health crisis disclaimers, please refer to our [PRIVACY.md](PRIVACY.md).

---

## 🛡️ License & Name Policy

This project is licensed under the **Educational Community License, Version 2.0 (ECL-2.0)**. See the [LICENSE.md](LICENSE.md) file for more information.

### 🌸 Krysanne Name Use Policy
Use of the name **Krysanne** is restricted:
1. **Association:** Must only be used in projects officially related to `Master Piece of Paper`, as it is a name deeply personal to the author/creator of this project (Ryann Kim M. Sesgundo).
2. **Prohibited Activities:** Must not be used in any kind of illegal activities, violence, nudity, or anything related to such activities.
3. **Core Purpose:** Must strictly pertain to promoting peace, love, and offering support to anyone who is in need.
4. **Reason:** To preserve trust in the name and ensure users feel safe and comfortable. While the creator does not claim exclusive ownership of the name itself, this policy is meant to prevent any doubt about its integrity and supportive purpose.

---

## ❤️ Contributing

We welcome contributions of all kinds to make **Krysanne** more supportive, secure, and accessible. Please see [CONTRIBUTORS.md](CONTRIBUTORS.md) for contribution guidelines and to meet our team.
