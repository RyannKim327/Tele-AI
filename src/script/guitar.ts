/*
 * INFO: Guitar.ts
 * This file serves as the guitar command that AI will
 * execute once it notice that the user wants to have a
 * guitar chords for a certain song
 */

import { aiResponse, EventInterface } from "@/interface";
import TelegramBot from "node-telegram-bot-api";
import { category, guitar } from "ultimate-guitar";

export default async function script(api: TelegramBot, event: EventInterface, body: aiResponse) {
  const ug = guitar()
  const search = await ug.search(body.parameter, "", category.CHORDS)
  const chords = await ug.fetch(search.responses[0])

  return {
    text: chords.response
  }
}
