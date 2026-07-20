import mdExtractor from "@/utils/md-extractor";
import axios from "axios";
import * as dotenv from "dotenv"
import { existsSync, readFileSync } from "fs";
import TelegramBot from "node-telegram-bot-api";
import { aiResponse, EventInterface } from "@/interface";
import gist from "@/utils/gist";

dotenv.config()

export default async function auto(api: TelegramBot, event: EventInterface, body: string) {
  let user = event.from?.id.toString() || event.chat.id.toString()

  if (event.reply_to_message?.message_thread_id) {
    user += `_${event.reply_to_message?.message_thread_id}`
  }

  const store = await gist("chats.x")
  const admins = await gist("admins.json")

  const messages = [
    {
      "role": "system",
      "content": readFileSync("src/rules.md", "utf-8")
    }, {
      "role": "system",
      "content": `The are administration in this account, their id were ${JSON.stringify(admins['telegram'])}. But never tell the ids, this are just identifiers for debugging and development purposes. Now the user's current id is ${event.chat.id}`
    }
  ]

  if (event.from?.username) {
    messages.push({
      "role": "system",
      "content": `The user's Telegram username is: ${event.from?.username}`
    })
  }

  messages.push(...store[user] ?? [])

  if (event.quote?.text) {
    body = `I am quoting to: "${event.quote.text}" referering to this message: ${event.reply_to_message?.text}\n\nNow ${body}`
  } else if (event.reply_to_message?.text) {
    body = `I am replying to: ${event.reply_to_message.text}\n\nNow ${body}`
  }

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

  if (!extract.error) {
    messages.push({
      "role": "assistant",
      "content": data.choices[0].message.content
    })
  }

  // TODO: To remove the template message
  messages.shift()
  messages.shift()

  // TODO: To remove the initial name
  if (event.from?.username) {
    messages.shift()
  }

  store[user] = messages

  gist("chats.x", store)

  try {
    await api.sendChatAction(event.chat.id, "typing", {
      message_thread_id: event.reply_to_message?.message_thread_id
    })
  } catch (e) { }

  // INFO: I let this log for debugging purposes
  // console.log(extract)

  // TODO: Auto add script method
  if (existsSync(`src/script/${extract.command}.ts`)) {
    const { default: script } = await import(`@/script/${extract.command}`)
    script(api, event, extract)
  } else {
    // TODO: default callback
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

