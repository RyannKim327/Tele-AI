import { aiResponse } from "@/interface";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default function newThread(api: TelegramBot, event: Message, body: aiResponse) {
  api.createForumTopic(event.chat.id, "New Thread")

  api.sendMessage(event.chat.id, body.message, {
    message_thread_id: event.reply_to_message?.message_thread_id
  })
}
