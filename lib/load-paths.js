import { google } from 'googleapis'

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString()
)

export async function loadPaths() {
  try {
    const client = new google.auth.JWT(
      credential.client_email,
      null,
      credential.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    await client.authorize()

    const gsapi = google.sheets({ version: 'v4', auth: client })

    const opt = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'lista!B2:B59'
    }

    const response = await gsapi.spreadsheets.values.get(opt)

    return response.data.values
  } catch (e) {
    throw Error(JSON.stringify({ error: true, message: e.message }))
  }
}
