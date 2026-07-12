export default function mdExtractor(content: string) {
  const enclose = /```(.*?)```/gi

  if (enclose.test(content)) {
    const body = content.match(enclose)?.[1]
    return JSON.parse(body as string)
  }
  try {
    return JSON.parse(content)
  } catch (e) {
    return content
  }
}
