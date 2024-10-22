import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class TokensService {
    private readonly BASE_OPTIONS: JwtSignOptions = {
        issuer: "tmq",
        audience: "tmq",
    };

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
    ) {}

    generateAccessToken(userId: string): string {
        const options: JwtSignOptions = {
            ...this.BASE_OPTIONS,
            subject: userId,
        };

        return this.jwt.sign({}, options);
    }

    generateRefreshToken(userId: string): string {
        const options: JwtSignOptions = {
            ...this.BASE_OPTIONS,
            subject: userId,
            jwtid: String(Math.random()),
        };

        return this.jwt.sign({}, options);
    }
}
