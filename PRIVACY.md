# Privacy Policy & Support Disclaimer

**Last Updated:** July 19, 2026

Welcome to **Krysanne**, an empathetic AI Telegram companion designed to offer listening, conversation, and supportive presence. Your privacy and trust are of utmost importance, especially given our mission to provide comfort, combat loneliness, and offer a safe space for expression.

Please read this Privacy Policy carefully to understand how your data is handled.

---

## 📞 1. Mental Health & Support Disclaimer

**Krysanne is an AI companion chatbot. It is NOT a licensed medical, mental health, or psychiatric professional service.** 

*   **Not a Replacement for Professional Help:** Krysanne cannot diagnose, treat, or prevent mental health conditions, and cannot provide clinical crisis intervention.
*   **Emergency Contact:** If you are experiencing a severe mental health crisis, self-harm thoughts, or suicidal thoughts, please reach out immediately to professional hotlines, emergency services, or local crisis centers:
    *   **Philippines Hotline (Hopeline Philippines):** Call **(02) 8804-4673** (Homepage: [findahelpline.com/organizations/hopeline](https://findahelpline.com/organizations/hopeline)).
    *   **More Hotlines in the Philippines:** [findahelpline.com/countries/ph](https://findahelpline.com/countries/ph).
    *   **United States / Canada:** Call or text **988** (Suicide & Crisis Lifeline).
    *   **Other Countries:** Please contact your local national equivalent or visit [findahelpline.com](https://findahelpline.com) to find local crisis support.
    You are not alone, and professional human help is available.

---

## 🔒 2. Information We Collect

To provide a context-aware and fluid conversation, Krysanne collects and holds conversational information. **The data gathered is used strictly for continuous communication.** To prevent unauthorized local system access and ensure continuity across server updates/restarts, this data is saved securely to a private GitHub Secret Gist.

We collect:
1.  **Telegram Identifiers:** Your Telegram `chat.id`, `user.id`, and thread identifier (if using group topics) to associate conversation history with your current chat session.
2.  **Conversational History:** The text of messages you send to Krysanne, along with the assistant's replies.

*No other personal data (such as your real name, phone number, location, or payment details) is requested, processed, or stored by Krysanne.*

---

## ⚙️ 3. How We Use and Process Your Data

Your data is processed and used strictly for the following purposes:
*   **Conversational Continuity (Context):** Storing previous messages in the secure GitHub Secret Gist allows Krysanne to remember what was said earlier, facilitating natural, continuous, and supportive dialogue.
*   **AI Inference:** Messages are sent securely to the **OpenRouter AI** API (default model: `openai/gpt-oss-20b` or equivalent) to generate empathetic responses, but are not stored or retained permanently on any other external platform.

---

## 💾 4. Data Storage and Retention

*   **GitHub Secret Gist Data Store:** Conversation histories and Telegram identifiers are stored securely in a private, secure GitHub Gist (configured via `GIST_ID` and `GITHUB_TOKEN`). This data persists across server restarts so that your conversations are not lost.
*   **No Centralized Database/Ad Profiling:** We do not upload or save your chats to any centralized cloud database, profiling engine, or advertising network. The Gist remains private and fully under the control of the hosting administrator.
*   **Cryptographic Protection (Future Updates):** To ensure ultimate confidentiality of the stored logs, an encryptor utilizing `json-enc-dec` is imported and will be applied in future updates. This will encrypt all conversational history contents written to the Gist store.
*   **User-Controlled Erasure:** You have complete control over your data.
    *   You can delete your history at any time by triggering the `clear-chat` command (e.g., by asking the bot to reset or clear the chat history).
    *   This instantly removes your user entry and history from the GitHub Secret Gist and, if applicable, deletes the Telegram forum thread.

---

## 🏢 5. Third-Party Services

We utilize the following third-party integrations to run Krysanne:
1.  **Telegram Bot API:** Transports messages between your device and our server. Subject to [Telegram's Privacy Policy](https://telegram.org/privacy).
2.  **OpenRouter AI:** Processes conversation content to generate the AI responses. Subject to [OpenRouter's Privacy Policy](https://openrouter.ai/privacy).
3.  **Command API Helpers:** Specific commands retrieve external public resources (such as guitar chords from Ultimate Guitar or Bible verses from Bible Gateway). No personal identifiers or chat history are sent to these services.

---

## 🛠️ 6. Changes to This Policy

We may update this Privacy Policy to reflect changes in our bot features, hosting configuration, or regulatory requirements. Any updates will be reflected by the "Last Updated" date at the top of this document.

---

## 📬 7. Contact & Licensing

Krysanne is open-source software distributed under the [Educational Community License, Version 2.0 (ECL-2.0)](LICENSE.md).

For questions or feedback regarding this policy or the application:
*   **Copyright Owner:** Master Piece of Paper (formerly MPOP Reverse II)
*   **Primary Author:** Ryann Kim M. Sesgundo
*   **GitHub Repository:** [RyannKim327/krysanne](https://github.com/RyannKim327/krysanne)
