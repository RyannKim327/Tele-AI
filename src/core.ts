import TelegramBot, { Message } from "node-telegram-bot-api";
import auto from "./script/auto";

export default function core(api: TelegramBot, event: Message, regex: RegExpExecArray | null) {
  if (regex) {
    const body = regex[0]
    if (body.startsWith("/start")) {
      api.sendMessage(event.chat.id, "Hello")
    } else {
      auto(api, event, body)
    }
  }
}
