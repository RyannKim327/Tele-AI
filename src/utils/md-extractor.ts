/*
 * INFO: Markdown Extractor.ts
 * The main purpose of this script is to parse the response
 * into JSON format from the AI's response. This will lessen
 * the multiple hard coded formatting.
 */

export default function mdExtractor(content: string) {
  const enclose = /(?:```json\s*)?(\{[\s\S]*?\})(?:\s*```)?$/i
  if (enclose.test(content)) {
    const body = content.match(enclose)?.[1]
    return JSON.parse(body as string)
  }
  try {
    return JSON.parse(content)
  } catch (e) {
    return {
      message: content,
      command: "",
      parameters: ""
    }
  }
}
