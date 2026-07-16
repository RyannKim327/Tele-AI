import TelegramBot, { EventMetadata } from "node-telegram-bot-api";
import * as dotenv from "dotenv"
import log from "./utils/console";
import express, { Express, Request, Response } from "express"
import core from "./core";
import { EventInterface } from "./interface";
import fs from "fs";
import path from "path";

function main() {
  dotenv.config()

  const token = process.env.TELEGRAM_TOKEN
  const url = process.env.WEBHOOK_URL

  if (!token) {
    return log("Index", "Token is missing", "e")
  }

  log(
    "Starter",
    `
        ╭―――――――――――――――――――――――――――――――――――――――――╮
        │                                         │
        │      Welcome to Telegram Music Bot      │
        │     Developed by Ryann Kim Sesgundo     │
        │                                         │
        ╰―――――――――――――――――――――――――――――――――――――――――╯`,
  );

  try {
    const app: Express = express()
    app.use(express.json())

    // Serving styles, images and pages
    app.get("/style.css", (req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "template", "style.css"))
    })

    app.get("/krysanne_banner.jpg", (req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), "template", "krysanne_banner.jpg"))
    })

    const renderPage = (pageName: string, res: Response) => {
      try {
        const layoutPath = path.join(process.cwd(), "template", "index.html")
        const contentPath = path.join(process.cwd(), "template", `${pageName}.html`)
        if (!fs.existsSync(layoutPath) || !fs.existsSync(contentPath)) {
          return res.status(404).send("Page not found")
        }
        let layout = fs.readFileSync(layoutPath, "utf-8")
        const content = fs.readFileSync(contentPath, "utf-8")
        layout = layout.replace("{{CONTENT}}", content)
        res.setHeader("Content-Type", "text/html")
        res.send(layout)
      } catch (err: any) {
        res.status(500).send("Internal Server Error")
      }
    }

    app.get("/", (req: Request, res: Response) => {
      renderPage("home", res)
    })

    app.get("/privacy", (req: Request, res: Response) => {
      renderPage("privacy", res)
    })

    app.get("/readme", (req: Request, res: Response) => {
      renderPage("readme", res)
    })

    app.get("/contributors", (req: Request, res: Response) => {
      renderPage("contributors", res)
    })

    app.get("/license", (req: Request, res: Response) => {
      renderPage("license", res)
    })

    let api: TelegramBot | null = null

    if (url) {
      // TODO: Webhook setup
      api = new TelegramBot(token)
      api.setWebhook(`${url}/bot${token}`)

      app.post(`/bot${token}`, (req: Request, res: Response) => {
        api?.processUpdate(req.body)
        res.sendStatus(200)
      })

      log("Server Initiator", "Telegram configured using Webhook")
    } else {
      // TODO: Polling Setup
      api = new TelegramBot(token, {
        polling: true
      })
      log("Server Initiator", "Telegram configured using polling")
    }

    app.listen(process.env.PORT || 3000, () => {
      log("Server Initiator", `Web server listening on port ${process.env.PORT || 3000}`)
      log("Server Initiator", "Developed by MPOP Reverse II")
    })

    log("Welcome", "Server Loaded and Running")

    api.on("message", (message: EventInterface, metadata: EventMetadata) => {
      // TODO: To include the metadata in the event for single fetch
      message['metadata'] = metadata

      // TODO: To filter message with non actions
      const metatypes = [
        "text", "animation", "audio", "document", "photo", "video"
      ]

      if (message.caption) {
        message.text = message.caption
      }

      if (metatypes.includes(metadata.type ?? "")) {
        core(api, message, message.text ?? "")
      }
    })

    // api.onText(/([\w\W]+)/gi, (message: Message, regex: RegExpExecArray | null) => {
    //   core(api, message, regex)
    // })

  } catch (e: any) {
    log("Main Catch", e.toString(), "e")
  }

}

main()
