import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { GoogleCalendarService } from "../google-calendar/google-calendar.service";
import { ScheduleService } from "../schedule/schedule.service";

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly googleCalendarService: GoogleCalendarService,
    ) {}

    @Cron("*/10 * * * * *")
    async handleSyncToCalendar() {
        // sync schedules to Google Calendar
        this.logger.log("Synced schedules to Google Calendar");

        const schedules = await this.scheduleService.findAll();

        await this.googleCalendarService.syncEvents(schedules);
    }

    async handleDeleteEvent(scheduleId: string) {
        // delete event from Google Calendar
        this.logger.log(
            `Deleted event with ID ${scheduleId} from Google Calendar`,
        );

        await this.googleCalendarService.deleteEventByKeyword(scheduleId);
    }
}
