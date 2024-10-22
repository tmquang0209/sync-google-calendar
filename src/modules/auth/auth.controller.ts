import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";
import { SignupDTO } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async signIn(@Body() signInDto: SignInDto): Promise<any> {
        return await this.authService.signIn(
            signInDto.email,
            signInDto.password,
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    async signUp(@Body() signUpDto: SignupDTO): Promise<any> {
        const user: CreateUserDto = {
            email: signUpDto.email,
            fullName: signUpDto.fullName,
            password: signUpDto.password,
            birthDate: signUpDto.birthDate || new Date("2000-01-01"),
            phoneNumber: signUpDto.phoneNumber,
        };
        return await this.authService.signUp(user);
    }
}
