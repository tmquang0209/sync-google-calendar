import { Test, TestingModule } from "@nestjs/testing";
import { ScheduleController } from "../../src/modules/schedule/schedule.controller";
import { ScheduleService } from "../../src/modules/schedule/schedule.service";

describe("ScheduleController", () => {
    let controller: ScheduleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ScheduleController],
            providers: [ScheduleService],
        }).compile();

        controller = module.get<ScheduleController>(ScheduleController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
