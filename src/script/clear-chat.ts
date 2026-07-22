/*
 * INFO: Clear-Chat.ts
 * This script is one of the feature of the AI, where it can be
 * automatically execute by asking to clear the chat. The purpose
 * of this is to maintain the user's privacy by letting user
 * to ask the AI to clear the messages for them.
 */

import { TELEGRAM } from "@/contants";
import { aiResponse, EventInterface } from "@/interface";
import gist from "@/utils/gist";
import TelegramBot from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  let user = event.from?.id.toString() || event.chat.id.toString()

  const message = await api.sendMessage(event.chat.id, body.message)

  if (event.reply_to_message?.message_thread_id) {
    user += `_${event.reply_to_message?.message_thread_id}`
  }

  const store = await gist(TELEGRAM)
  delete store[user]
  gist(TELEGRAM, store)

  api.deleteForumTopic(event.chat.id, event.message_thread_id as number)

  await api.editMessageText(`The thread ${event.reply_to_message?.forum_topic_created?.name} is now deleted`, {
    chat_id: message.chat.id,
    message_id: message.message_id
  })

  setTimeout(() => {
    api.deleteMessage(message.chat.id, message.message_id)
  }, 5000)

  return {}
}

