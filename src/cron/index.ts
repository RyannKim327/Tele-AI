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

export default async function mainCron(api: TelegramBot) {
  const lists: number[] = await gist(USERS)

  // TODO: Reminder to drink water
  nodeCron.schedule("0 7,8,10,12,14,16,18,20 * * *", () => {
    lists.map(userId => {
      drinkWater(api, userId)
    })
  }, {
    noOverlap: true,
    timezone: "Asia/Manila"
  })

  // TODO: Bible verse every 7:30 in the morning
  nodeCron.schedule("30 7 * * *", () => {
    lists.map(userId => {
      bibleVerse(api, userId)
    })
  }, {
    noOverlap: true,
    timezone: "Asia/Manila"
  })
}
