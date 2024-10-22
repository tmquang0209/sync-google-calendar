import { Controller, Get, Query, Res } from "@nestjs/common";
import { GoogleCalendarService } from "./google-calendar.service";

@Controller("google-calendar")
export class GoogleCalendarController {
    constructor(
        private readonly googleCalendarService: GoogleCalendarService,
    ) {}

    @Get("events")
    async listEvents() {
        return this.googleCalendarService.listEvents();
    }

    @Get("oauth2callback")
    async oauth2callback(@Query("code") code: string, @Res() res: any) {
        // Exchange the authorization code for tokens
        await this.googleCalendarService.handleOAuth2Callback(code);

        // res.json({ message: "Authentication successful" });

        // Redirect to events page after successful authentication
        return res.redirect("http://localhost:3002/google-calendar/events");
    }

    @Get("add-event")
    async createEvent() {
        return this.googleCalendarService.createEvent();
    }
}
