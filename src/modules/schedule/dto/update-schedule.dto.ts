import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { CreateScheduleDto } from "./create-schedule.dto";

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
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

    @IsDate({
        message: "Start date must be a valid date",
    })
    start: Date;

    @IsDate({
        message: "End date must be a valid date",
    })
    end: Date;
    allDay: boolean;
    location: string;
    attendees: string[];
    reminders: string[];
    calendarId: string;
}
