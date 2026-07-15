import mdExtractor from "@/utils/md-extractor";
import axios from "axios";
import * as dotenv from "dotenv"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import TelegramBot, { Message } from "node-telegram-bot-api";
import clearChat from "./clear-chat";
import bible from "./verse";
import { aiResponse } from "@/interface";
import ultiguitar from "./guitar";
import newThread from "./new-thread";
import { decrypt, encrypt } from "json-enc-dec";
import imageGenerator from "./imgen";

dotenv.config()

export default async function auto(api: TelegramBot, event: Message, body: string) {

  let code = process.env.BOT_CODE ?? "default"

  let user = event.from?.id.toString() || event.chat.id.toString()

  if (event.reply_to_message?.message_thread_id) {
    user += `_${event.reply_to_message?.message_thread_id}`
  }

  // TODO: To check the existence of the file to prevent errors
  if (!existsSync("data")) {
    mkdirSync("data")
  }

  if (!existsSync("data/dataset.json")) {
    encrypt({}, code, {
      saveTo: "data/dataset.json"
    })
  }

  const store = decrypt("data/dataset.json", code)

  const messages = [
    {
      "role": "system",
      "content": readFileSync("src/prompt.md", "utf-8")
    }
  ]

  if (event.from?.username) {
    messages.push({
      "role": "system",
      "content": `Call the user ${event.from?.username} as the username of the user, but tell them that he may able to change it based on what they want. Inform then that you them based on their username fetch by the system.`
    })
  }

  messages.push(...store[user] ?? [])

  messages.push({
    "role": "user",
    content: body
  })

  const { data } = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    "model": "tencent/hy3:free",
    "messages": messages,
    "stream": false
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.AI_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  const extract: aiResponse = mdExtractor(data.choices[0].message.content as string) as aiResponse

  messages.push({
    "role": "assistant",
    "content": data.choices[0].message.content
  })

  messages.shift()

  // TODO: To remove the initial name
  if (event.from?.username) {
    messages.shift()
  }
  store[user] = messages

  encrypt(store, code, {
    saveTo: "data/dataset.json"
  })

  api.sendChatAction(event.chat.id, "typing", {
    message_thread_id: event.reply_to_message?.message_thread_id
  })

  // INFO: I let this log for debugging purposes
  // console.log(extract)

  // TODO: This is just temporary, I will create a better algorithm for this part
  if (extract.command === "clear-chat") {
    clearChat(api, event, extract)
  } else if (extract.command === "verse") {
    bible(api, event, extract)
  } else if (extract.command === "guitar") {
    ultiguitar(api, event, extract)
  } else if (extract.command === "imgen") {
    imageGenerator(api, event, extract)
  } else if (extract.command === "new-thread") {
    newThread(api, event, extract)
  } else {
    api.sendMessage(event.chat.id, extract.message, {
      message_thread_id: event.reply_to_message?.message_thread_id
    })
  }

  if (extract.title && extract.command !== "new-thread") {
    api.editForumTopic(event.chat.id, event.reply_to_message?.message_thread_id ?? 0, {
      name: extract.title
    })
  }
}

