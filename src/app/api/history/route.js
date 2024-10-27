import { google } from "googleapis";
import {JWT} from 'google-auth-library'

export async function GET() {
    try {
        console.log("process.env.GOOGLE_CLIENT_EMAIL",process.env.GOOGLE_CLIENT_EMAIL);
        const auth = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({
            auth,
            version: "v4"
        }) 

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Historial!A2:I"
        })

        const history = response.data.values.map((row) => ({
            date: row[0],
            strartTime: row[1],
            endTime: row[2],
            position: row[3],
            player: row[4],
            reEntry: row[5],
            eliminatedTime: row[6],
            inGameTime: row[7],
            prize: row[8],
        }));        

        return new Response(JSON.stringify(history), { status: 200 })
           

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 })
    }
}