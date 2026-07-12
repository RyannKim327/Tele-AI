import { aiResponse } from "@/interface";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default function clearChat(api: TelegramBot, event: Message, body: aiResponse) {
  // TODO: To check the existence of the file to prevent errors
  if (!existsSync("data")) {
    mkdirSync("data")
  }
  if (!existsSync("data/dataset.json")) {
    writeFileSync("data/dataset.json", "{}", "utf-8")
  }

  const store = JSON.parse(readFileSync("data/dataset.json", "utf-8"))
  store[event.chat.id] = []

  writeFileSync("data/dataset.json", JSON.stringify(store, null, 2), "utf-8")
  api.sendMessage(event.chat.id, body.message)
}
