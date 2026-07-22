import { EditMessageCaptionParams, EditMessageTextParams, EventMetadata, Message } from "node-telegram-bot-api"

export type jsonInterface = Record<string, unknown>

export interface aiResponse {
  message: string
  command: string
  parameter: string
  title?: string
  error?: string
}

export interface EventInterface extends Message {
  metadata: EventMetadata
}

export interface EditInterface extends EditMessageTextParams, EditMessageCaptionParams { }

export interface ScriptInterface {
  text?: string,
  audio?: string,
  image?: string,
  video?: string
}
