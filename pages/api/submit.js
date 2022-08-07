import { google } from 'googleapis'

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString()
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const body = req.body

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({
      auth,
      version: 'v4'
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `lista!B${body.row}:C${body.row}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[body.choice]]
      }
    })

    return res.status(201).json({
      data: response.data
    })
  } catch (e) {
    return res.status(e.code).send({ message: e.message })
  }
}
