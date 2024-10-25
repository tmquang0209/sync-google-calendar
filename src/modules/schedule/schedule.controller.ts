import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
} from "@nestjs/common";
import { ApiResponse } from "src/common/dto";
import { GoogleCalendarService } from "../google-calendar/google-calendar.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { ScheduleService } from "./schedule.service";

@Controller("schedule")
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly googleCalendarService: GoogleCalendarService,
    ) {}

    @Post()
    async create(
        @Body() createScheduleDto: CreateScheduleDto,
        @Req() req: any,
    ): Promise<ApiResponse<any>> {
        const userId = req.user.sub;
        console.log("🚀 ~ ScheduleController ~ req.user:", req.user);
        try {
            const created = await this.scheduleService.create(
                createScheduleDto,
                userId,
            );

            if (!created) {
                throw new Error("Failed to create schedule");
            }

            return {
                message: "Successfully created schedule",
                success: true,
                data: created,
            };
        } catch (error) {
            return {
                message: error.message,
                success: false,
                data: null,
            };
        }
    }

    @Get()
    findAll() {
        return this.scheduleService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Req() req: any) {
        console.log(req.user);

        return this.scheduleService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ) {
        return this.scheduleService.update(id, updateScheduleDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<ApiResponse<any>> {
        try {
            const details = await this.scheduleService.findOne(id);
            if (!details) {
                throw new NotFoundException("Schedule not found");
            }

            await this.googleCalendarService.deleteEventByKeyword(id);
            this.scheduleService.remove(id);

            return {
                message: "Successfully deleted schedule",
                success: true,
                data: null,
            };
        } catch (error) {
            return {
                message: error.message,
                success: false,
                data: null,
            };
        }
    }
}
