/*
 * INFO: Verse.ts
 * This file will serve as the bible chapter generator through the audio
 * This will execute whether the user ask for it
 * or the AI recognized that user needs it.
 */

import { aiResponse, EventInterface } from "@/interface";
import { audio, audio_version } from "biblegateway-scrape";
import TelegramBot from "node-telegram-bot-api";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  const response = await audio(body.parameter, audio_version.NIV_DRAMATIZED)

  let copyright = ""

  if (response.copyright) {
    copyright = `Audio Copyright: ${response.copyright}`
  }

  return {
    text: copyright,
    audio: response.mp3
  }
}
