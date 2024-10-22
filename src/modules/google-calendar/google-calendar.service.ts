/* eslint-disable @typescript-eslint/no-unused-vars */
import { authenticate } from "@google-cloud/local-auth";
import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs/promises";
import { google } from "googleapis";
import * as path from "path";
import * as process from "process";

@Injectable()
export class GoogleCalendarService {
    private readonly logger = new Logger(GoogleCalendarService.name);
    private readonly SCOPES = ["https://www.googleapis.com/auth/calendar"];
    private readonly TOKEN_PATH = path.join(process.cwd(), "token.json");
    private readonly CREDENTIALS_PATH = path.join(
        process.cwd(),
        "credentials.json",
    );

    /**
     * Reads previously authorized credentials from the save file.
     */
    private async loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(this.TOKEN_PATH);
            const credentials = JSON.parse(content.toString());
            return google.auth.fromJSON(credentials);
        } catch (err) {
            this.logger.error("No saved credentials found.");
            return null;
        }
    }

    /**
     * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
     */
    private async saveCredentials(client) {
        const content = await fs.readFile(this.CREDENTIALS_PATH);
        const keys = JSON.parse(content.toString());
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(this.TOKEN_PATH, payload);
    }

    /**
     * Load or request authorization to call APIs.
     */
    public async authorize() {
        let client = (await this.loadSavedCredentialsIfExist()) as any;
        if (client) {
            return client;
        }

        client = await authenticate({
            scopes: this.SCOPES,
            keyfilePath: this.CREDENTIALS_PATH,
        });

        if ((client as any).credentials) {
            await this.saveCredentials(client);
        }
        return client;
    }

    public async handleOAuth2Callback(code: string) {
        const content = await fs.readFile(this.CREDENTIALS_PATH);
        const credentials = JSON.parse(content.toString());
        const { client_id, client_secret, redirect_uris } =
            credentials.installed || credentials.web;

        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0],
        );

        // Exchange authorization code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Save the credentials
        await this.saveCredentials(oAuth2Client);
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     */
    public async listEvents() {
        const auth = await this.authorize();
        const calendar = google.calendar({ version: "v3", auth: auth as any });

        const res = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = res.data.items;
        if (!events || events.length === 0) {
            this.logger.log("No upcoming events found.");
            return;
        }

        this.logger.log("Upcoming 10 events:");
        events.map((event) => {
            const start = event.start.dateTime || event.start.date;
            this.logger.log(`${start} - ${event.summary}`);
        });
    }

    public async createEvent() {
        const auth = await this.authorize();
        const calendar = google.calendar({ version: "v3", auth: auth as any });

        const event = {
            summary: "Google I/O 2024",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
                "A chance to hear more about Google's developer products.",
            start: {
                dateTime: "2024-10-28T09:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: "2024-10-28T17:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [{ email: "minhquang4a@gmail.com" }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        };

        const result = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
        });

        this.logger.log(`Event created: ${result.data.htmlLink}`);
    }
}
