import { aiResponse } from "@/interface";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { decrypt, encrypt } from "json-enc-dec";
import TelegramBot, { Message } from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: Message, body: aiResponse) {
  let user = event.from?.id.toString() || event.chat.id.toString()
  let code = process.env.BOT_CODE ?? "default"

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

  // const store = JSON.parse(readFileSync("data/dataset.json", "utf-8"))
  const store = decrypt("data/dataset.json", code)

  delete store[user]

  // encrypt(store, code, {
  //   saveTo: "data/dataset.json"
  // })

  writeFileSync("data/dataset.json", JSON.stringify(store, null, 2), "utf-8")
  api.deleteForumTopic(event.chat.id, event.message_thread_id as number)

  const message = await api.sendMessage(event.chat.id, `The thread ${event.reply_to_message?.forum_topic_created?.name} is now deleted`)

  setTimeout(() => {
    api.deleteMessage(message.chat.id, message.message_id)
  }, 5000)
}

