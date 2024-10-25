import { Module } from "@nestjs/common";
import { GoogleCalendarController } from "./google-calendar.controller";
import { GoogleCalendarService } from "./google-calendar.service";

@Module({
    providers: [GoogleCalendarService],
    controllers: [GoogleCalendarController],
    exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
