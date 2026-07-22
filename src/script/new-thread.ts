/*
 * INFO: Clear-Chat.ts
 * This script is one of the feature of the AI, where it can be
 * automatically execute by asking to create a new thread. It will
 * also automatically execute once the AI recognize the topic is
 * off or by the user changing the topic. This will remain the topic
 * in the line and it prevent the confusion of the AI to do something
 * annoying.
 */

import { aiResponse, EventInterface } from "@/interface";
import TelegramBot from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  const nt = await api.createForumTopic(event.chat.id, body.title ?? "New Thread")

  api.sendMessage(event.chat.id, body.message, {
    message_thread_id: nt.message_thread_id,
  })

  return {
    text: body.message
  }
}
