export class CreateEventDto {
    summary: string;
    location?: string;
    description?: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    attendees?: { email: string }[];
}
