import { IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsString({
        message: "Title must be a string",
    })
    @IsNotEmpty({
        message: "Title is required",
    })
    title: string;

    @IsString({
        message: "Description must be a string",
    })
    description: string;

    start: Date;

    end: Date;
    allDay: boolean;
    location: string;
    attendees: string[];
    reminders: string[];
    calendarId: string;
}
