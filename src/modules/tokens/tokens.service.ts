import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class TokensService {
    private readonly BASE_OPTIONS: JwtSignOptions = {
        issuer: "tmq",
        audience: "tmq",
    };

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {}

    async generateAccessToken(userId: string): Promise<string> {
        const options: JwtSignOptions = {
            ...this.BASE_OPTIONS,
            subject: userId,
        };

        // get user from database
        const user = await this.usersService.findOne(userId);

        return this.jwt.sign({ ...user }, options);
    }

    generateRefreshToken(userId: string): string {
        const options: JwtSignOptions = {
            ...this.BASE_OPTIONS,
            subject: userId,
            jwtid: String(Math.random()),
        };

        return this.jwt.sign({}, options);
    }

    verifyAccessToken(token: string) {
        return this.jwt.verify(token, {
            ...this.BASE_OPTIONS,
        });
    }

    verifyRefreshToken(token: string) {
        return this.jwt.verify(token, {
            ...this.BASE_OPTIONS,
        });
    }
}
