import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsString({
        message: "Email must be a string",
    })
    @IsEmail({
        allow_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true,
        ignore_max_length: false,
    })
    email: string;

    @IsString({
        message: "Password must be a string",
    })
    password: string;
}
