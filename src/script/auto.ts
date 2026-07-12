import mdExtractor from "@/utils/md-extractor";
import axios from "axios";
import * as dotenv from "dotenv"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import TelegramBot, { Message } from "node-telegram-bot-api";
import clearChat from "./clear-chat";
import bible from "./verse";
import { aiResponse } from "@/interface";

dotenv.config()

export default async function auto(api: TelegramBot, event: Message, body: string) {

  // TODO: To check the existence of the file to prevent errors
  if (!existsSync("data")) {
    mkdirSync("data")
  }
  if (!existsSync("data/dataset.json")) {
    writeFileSync("data/dataset.json", "{}", "utf-8")
  }

  const store = JSON.parse(readFileSync("data/dataset.json", "utf-8"))
  const messages = [
    {
      "role": "system",
      "content": readFileSync("src/prompt.md", "utf-8")
    },
    ...store[event.chat.id] ?? []
  ]

  messages.push({
    "role": "user",
    content: body
  })

  const { data } = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    "model": "tencent/hy3:free",
    "messages": messages,
    "stream": false
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.AI_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  const extract: aiResponse = mdExtractor(data.choices[0].message.content as string) as aiResponse

  messages.push({
    "role": "assistant",
    "content": data.choices[0].message.content
  })

  messages.shift()

  store[event.chat.id] = messages

  writeFileSync("data/dataset.json", JSON.stringify(store, null, 2), "utf-8")

  console.log(data.choices[0].message.content)
  console.log(extract)

  if (extract.command === "clear-chat") {
    clearChat(api, event, extract)
  } else if (extract.command === "verse") {
    bible(api, event, extract)
  } else {
    api.sendMessage(event.chat.id, extract.message)
  }
}

