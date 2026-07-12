import { aiResponse } from "@/interface";
import { verse } from "biblegateway-scrape";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default async function bible(api: TelegramBot, event: Message, body: aiResponse) {
  const response = await verse(body.parameter)
  api.sendMessage(event.chat.id, `${body.message}\n\n${response.book}\n${response.verses}`)
}
