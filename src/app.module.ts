import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import firebaseConfig from "./common/database/firebase.config";
import { FirebaseModule } from "./common/lib/firebase.module";
import { NestJwtModule } from "./common/lib/jwt.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleCalendarController } from "./modules/google-calendar/google-calendar.controller";
import { GoogleCalendarService } from "./modules/google-calendar/google-calendar.service";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { TokensService } from "./modules/tokens/tokens.service";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [firebaseConfig],
            isGlobal: true,
        }),
        ScheduleModule,
        UsersModule,
        AuthModule,
        NestJwtModule,
        FirebaseModule,
    ],
    controllers: [AppController, GoogleCalendarController],
    providers: [
        NestJwtModule,
        GoogleCalendarService,
        AppService,
        TokensService,
    ],
    exports: [NestJwtModule],
})
export class AppModule {}
