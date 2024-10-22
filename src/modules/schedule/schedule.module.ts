import { Module } from "@nestjs/common";
import { FirebaseAdminService } from "src/common/database/firebase.service";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";

@Module({
    imports: [],
    controllers: [ScheduleController],
    providers: [ScheduleService, FirebaseAdminService],
    exports: [ScheduleService],
})
export class ScheduleModule {}
