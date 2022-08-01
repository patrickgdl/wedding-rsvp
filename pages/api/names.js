import { google } from "googleapis";

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);

export default function handler(req, res) {
  try {
    const client = new google.auth.JWT(
      credential.client_email,
      null,
      credential.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: true }));
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      const opt = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "lista!A2:B79",
      };

      let data = await gsapi.spreadsheets.values.get(opt);
      return res
        .status(400)
        .send(JSON.stringify({ error: false, data: data.data.values }));
    });
  } catch (e) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
