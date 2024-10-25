import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ApiResponse } from "src/common/dto";
import { HelperService } from "src/common/helpers";
import { TokensService } from "../tokens/tokens.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokensService: TokensService,
    ) {}

    async signIn(email: string, pass: string): Promise<ApiResponse<any>> {
        try {
            const user = await this.usersService.findByEmail(email);
            if (user) {
                const userData = user.data();
                const verifyPassword = await HelperService.verifyHash(
                    pass,
                    userData.password,
                );
                if (!verifyPassword) {
                    throw new UnauthorizedException({
                        message: "Invalid email or password",
                    });
                }
            } else {
                throw new UnauthorizedException({
                    message: "User not found",
                });
            }

            return {
                success: true,
                message: "Login successfully",
                data: {
                    ...user.data(),
                    accessToken: await this.tokensService.generateAccessToken(
                        user.id,
                    ),
                    refreshToken: this.tokensService.generateRefreshToken(
                        user.id,
                    ),
                },
            };
        } catch (err) {
            return {
                success: false,
                message: err.message,
                data: null,
            };
        }
    }

    async signUp(data: CreateUserDto): Promise<ApiResponse<any>> {
        try {
            await this.usersService.create(data);
            return {
                success: true,
                message: "User created successfully",
                data: {},
            };
        } catch (err) {
            return {
                success: false,
                message: err.message,
                data: {},
            };
        }
    }
}
