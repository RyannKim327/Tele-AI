/*
 * INFO: Verse.ts
 * This file will serve as the bible verse generator
 * This will execute whether the user ask for it
 * or the AI recognized that user needs it.
 */

import { aiResponse, EventInterface } from "@/interface";
import { verse } from "biblegateway-scrape";
import TelegramBot from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  const response = await verse(body.parameter)

  return {
    text: `${body.message}\n\n${response.book}\n${response.verses}`,
  }
}
