import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignupDTO {
    @IsString({
        message: "Full name must be a string",
    })
    @IsNotEmpty({
        message: "Full name is required",
    })
    fullName: string;

    @IsNotEmpty({
        message: "Email is required",
    })
    email: string;

    @IsString({
        message: "Password must be a string",
    })
    @IsNotEmpty({
        message: "Password is required",
    })
    password: string;

    @IsString({
        message: "Confirm password must be a string",
    })
    @IsNotEmpty({
        message: "Confirm password is required",
    })
    confirmPassword: string;

    birthDate: Date;

    @MinLength(10, {
        message: "Phone number must be at least 10 characters",
    })
    @MaxLength(11, {
        message: "Phone number must be at most 11 characters",
    })
    @IsString({
        message: "Phone number must be a string",
    })
    phoneNumber: string;
}
