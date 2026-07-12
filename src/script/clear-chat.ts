import { aiResponse } from "@/interface";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default function clearChat(api: TelegramBot, event: Message, body: aiResponse) {

  let user = event.from?.id.toString() || event.chat.id.toString()

  if (event.reply_to_message?.message_thread_id) {
    user += `_${event.reply_to_message?.message_thread_id}`
  }

  // TODO: To check the existence of the file to prevent errors
  if (!existsSync("data")) {
    mkdirSync("data")
  }

  if (!existsSync("data/dataset.json")) {
    writeFileSync("data/dataset.json", "{}", "utf-8")
  }

  const store = JSON.parse(readFileSync("data/dataset.json", "utf-8"))
  delete store[user]

  writeFileSync("data/dataset.json", JSON.stringify(store, null, 2), "utf-8")
  api.deleteForumTopic(event.chat.id, event.message_thread_id as number)
  api.sendMessage(event.chat.id, body.message)
}
