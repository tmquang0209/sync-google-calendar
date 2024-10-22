import { Test, TestingModule } from "@nestjs/testing";
import { GoogleCalendarService } from "../../src/modules/google-calendar/google-calendar.service";

describe("GoogleCalendarService", () => {
    let service: GoogleCalendarService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GoogleCalendarService],
        }).compile();

        service = module.get<GoogleCalendarService>(GoogleCalendarService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
