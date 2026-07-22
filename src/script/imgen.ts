/*
 * INFO: Imgen.ts
 * This script serves as the image generator, since the AI uses the
 * text generator only, we need to use a 3rd party image generator for
 * this feature.
 */

import * as dotenv from "dotenv"
import { aiResponse, EventInterface } from "@/interface";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

dotenv.config()


export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {

  api.sendMessage(event.chat.id, body.message, {
    message_thread_id: event.reply_to_message?.message_thread_id
  })

  const { data } = await axios.post("https://api.lumenfall.ai/openai/v1/images/generations", {
    "model": "gemini-3.1-flash-lite-image",
    "prompt": body.parameter,
    "size": "1024x1024"
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.LUMENFALL_API}`,
      "Content-Type": "application/json"
    }
  })

  return {
    image: data.data[0].url
  }
}

