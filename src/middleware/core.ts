import TelegramBot from "node-telegram-bot-api";
import auto from "@/middleware/auto";
import { EventInterface } from "../interface";

export default function core(api: TelegramBot, event: EventInterface, body: string) {
  if (body.startsWith("/start")) {
    api.deleteMessage(event.chat.id, event.message_id)
    api.sendMessage(event.chat.id, "My name is Krysanne, your AI companion designed to listen, converse, and offer a supportive presence for individuals who may feel isolated, distressed, or simply need a safe space to share their thoughts.")
  } else {
    auto(api, event, body)
  }
}
