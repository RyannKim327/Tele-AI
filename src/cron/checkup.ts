import { LASTCHAT } from "@/contants";
import gist from "@/utils/gist";
import TelegramBot from "node-telegram-bot-api";

export default async function checkup(api: TelegramBot) {
  const lastchats = await gist(LASTCHAT)
  const users = Object.keys(lastchats)

  users.map(user => {
    const current = Date.now()
    const TWELVE_HOUR = 12 * 60 * 60 * 1000

    if (current - lastchats[user] >= TWELVE_HOUR) {
      api.sendMessage(user, "Hey there, I was just thinking about you and wanted to see how your day is going. Remember to take a deep breath and be kind to yourself today.")
      lastchats[user] = current
    }
  })
}
