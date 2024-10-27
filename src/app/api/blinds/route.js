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
            range: "Estructura!A2:C"
        })

        const blindsStructure = response.data.values.map((level) => ({   
            level: level[0], 
            smallBlind: level[1], 
            bigBlind: level[2],
        }));

        return new Response(JSON.stringify(blindsStructure), { status: 200 })
           

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 })
    }
}