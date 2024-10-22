import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Algorithm } from "jsonwebtoken";

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<any, true>) => {
                return {
                    isGlobal: true,
                    secret: configService.get<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn:
                            configService.get<string>("JWT_ACCESS_EXPIRY"),
                        algorithm: "HS256" as Algorithm,
                    },
                };
            },
        }),
    ],
    exports: [JwtModule],
})
export class NestJwtModule {}
