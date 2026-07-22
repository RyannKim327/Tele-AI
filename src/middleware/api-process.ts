/*
 * INFO: API-Process.ts
 * This file serves the main API architecture, a connection to create
 * and call the AI responses through the EDITING message or through
 * SENDING message form the users. This will help the AI to know what might do next
 * This file also includes the call for CRON activities
 */

import { EventInterface } from "@/interface";
import TelegramBot, { EventMetadata } from "node-telegram-bot-api";
import core from "./core";
import mainCron from "@/cron";

export default function APIProcess(api: TelegramBot) {
  mainCron(api)

  api.on("edited_message", (event: EventInterface) => {
    if (event.caption) {
      event.text = event.caption
    }

    core(api, event, event.text ?? "")
  })

  // TODO: Messaging
  api.on("message", (event: EventInterface, metadata: EventMetadata) => {
    // TODO: To include the metadata in the event for single fetch
    event['metadata'] = metadata

    // TODO: To filter message with non actions
    const metatypes = [
      "text", "animation", "audio", "document", "photo", "video"
    ]

    if (event.forum_topic_closed) {
      console.log("Topic Closed Event Detected:", event);
    }
    if ((event as any).forum_topic_deleted) {
      console.log("Topic Deleted Event Detected:", event);
    }

    if (event.caption) {
      event.text = event.caption
    }

    if (metatypes.includes(metadata.type ?? "")) {
      core(api, event, event.text ?? "")
    }
  })
}

