import { aiResponse, EventInterface } from "@/interface";
import TelegramBot from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  const nt = await api.createForumTopic(event.chat.id, body.title ?? "New Thread")

  api.sendMessage(event.chat.id, body.message, {
    message_thread_id: nt.message_thread_id,
  })

  api.sendMessage(event.chat.id, body.message, {
    message_thread_id: event.reply_to_message?.message_thread_id
  })
}
