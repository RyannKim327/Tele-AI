/*
 * INFO: Cron Index.ts
 * This script will set all the cron activities for the user.
 */

import { USERS } from "@/contants";
import gist from "@/utils/gist";
import nodeCron from "node-cron";
import TelegramBot from "node-telegram-bot-api";
import drinkWater from "./drink-water";
import bibleVerse from "./verse";
import checkup from "./checkup";

export default async function mainCron(api: TelegramBot) {
  const lists = await gist(USERS)
  const users = Object.keys(lists)

  // TODO: Reminder to drink water
  nodeCron.schedule("0 7,8,10,12,14,16,18,20 * * *", () => {
    users.map(userId => {
      drinkWater(api, parseInt(userId), lists[userId])
    })
  }, {
    noOverlap: true,
    timezone: "Asia/Manila"
  })

  // TODO: Bible verse every 7:30 in the morning
  nodeCron.schedule("30 7 * * *", () => {
    users.map(userId => {
      bibleVerse(api, parseInt(userId), lists[userId])
    })
  }, {
    noOverlap: true,
    timezone: "Asia/Manila"
  })

  // TODO: To check the user every last 12 hours from the last chats
  nodeCron.schedule("0 * * * *", () => {
    checkup(api)
  }, {
    noOverlap: true,
    timezone: "Asia/Manila"
  })
}
