import * as bcrypt from "bcrypt";

export const HelperService = {
    hashString(str: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(str, saltRounds);
    },

    verifyHash(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    },

    formatDateWithTimezone(date: Date, timeZone: string): string {
        // Get the formatted date string with the timezone offset
        const options: Intl.DateTimeFormatOptions = {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };

        // Format date with timezone and extract the parts
        const localeString = new Intl.DateTimeFormat(
            "en-US",
            options,
        ).formatToParts(date);

        // Extract date and time components
        const year = localeString.find((part) => part.type === "year")?.value;
        const month = localeString.find((part) => part.type === "month")?.value;
        const day = localeString.find((part) => part.type === "day")?.value;
        const hour = localeString.find((part) => part.type === "hour")?.value;
        const minute = localeString.find(
            (part) => part.type === "minute",
        )?.value;
        const second = localeString.find(
            (part) => part.type === "second",
        )?.value;

        // Get the timezone offset in the format ±HH:MM
        const offsetMinutes = date.getTimezoneOffset();
        const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
        const offsetSign = offsetMinutes > 0 ? "-" : "+";
        const offsetFormatted = `${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(Math.abs(offsetMinutes) % 60).padStart(2, "0")}`;

        // Return formatted string in the desired format
        return `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetFormatted}`;
    },
};
