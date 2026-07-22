/*
 * INFO: Gist.ts
 * The main purpose of this file is to make a file access to
 * store information gathered form user to use as continuous
 * conversation. The script will automatically encrypt the data
 * based on the key given by the developer. The purpose is to
 * remain the privacy and protect the data of the user.
 */

import * as dotenv from "dotenv"
import axios from "axios";
import { jsonInterface } from "@/interface";
import { decrypt, encrypt } from "json-enc-dec";

dotenv.config()

export default async function gist(filename: string, processData?: jsonInterface | jsonInterface[]) {
  // TODO: API Setup configuration
  const URL = `https://api.github.com/gists/${process.env.GIST_ID}`
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  }

  try {
    if (processData) {
      // TODO: Update Data
      let pd = processData

      if (filename.endsWith(".x")) {
        pd = encrypt(pd, process.env.BOT_CODE)
      }

      const { data } = await axios.patch(URL, {
        files: {
          [filename]: {
            content: pd
          }
        }
      },
        {
          headers
        }
      )
      if (data.status >= 300 || data.status < 200) {
        throw new Error(data.message)
      }
      return JSON.parse(data.files[filename].content)

    } else {
      // TODO: Fetch Data
      const { data } = await axios.get(URL, {
        headers
      })
      if (!data.files[filename]) {
        throw new Error(`The file ${filename} is not existed in the gist data`)
      }

      if (filename.endsWith(".x")) {
        const d = decrypt(data.files[filename].content, process.env.BOT_CODE)
        return d
      }

      return JSON.parse(data.files[filename].content)
    }
  } catch (e) {
    return {
      error: e?.toString()
    }
  }
}
