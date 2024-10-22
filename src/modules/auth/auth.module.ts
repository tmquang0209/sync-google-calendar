import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppModule } from "src/app.module";
import { TokensService } from "../tokens/tokens.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        forwardRef(() => AppModule),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "30m",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokensService],
    exports: [AuthService, TokensService],
})
export class AuthModule {}
