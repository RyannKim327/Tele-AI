/*
 * INFO: AI.ts
 * The purpose of this function is to create a generalized message for api responses
 * and also to the telegram access. This will also connect to the future version of the
 * project with will connected to us-app.
 */

import { ADMIN } from "@/contants"
import { aiResponse } from "@/interface"
import log from "@/utils/console"
import gist from "@/utils/gist"
import mdExtractor from "@/utils/md-extractor"
import axios from "axios"
import { readFileSync } from "fs"

interface aiInterface {
  dataset: string
  type: string
  extras?: {
    role: string,
    content: string
  }
}

export default async function artificialInteligence(body: string, user: string | number, p: aiInterface) {
  const store = await gist(p.dataset)
  const admins = await gist(ADMIN)

  const messages = [
    {
      "role": "system",
      "content": readFileSync("src/rules.md", "utf-8")
    }, {
      "role": "system",
      "content": `The are administration in this account, their id were ${JSON.stringify(admins[p.type])}. But never tell the ids, this are just identifiers for debugging and development purposes. Now the user's current id is ${user}`
    }
  ]

  messages.push(...store[user] ?? [])

  if (p.extras) {
    messages.push(p.extras)
  }

  messages.push({
    "role": "user",
    content: body
  })

  let data = null

  while (data === null) {
    try {
      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        "model": "google/gemma-4-26b-a4b-it",
        "messages": messages,
        "stream": false
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.AI_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      data = response.data.choices[0].message.content
    } catch (e: unknown) {
      log("AI Response", e?.toString() ?? "Error", "e")
    }
  }

  const extract: aiResponse = mdExtractor(data as string) as aiResponse

  if (!extract.error) {
    messages.push({
      "role": "assistant",
      "content": data
    })
  }

  // TODO: To remove the template message
  messages.shift()
  messages.shift()

  // TODO: To remove the initial name
  if (p.extras) {
    messages.shift()
  }

  store[user] = messages
  gist(p.dataset, store)

  return extract
}
