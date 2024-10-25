import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule as NestScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import firebaseConfig from "./common/database/firebase.config";
import { FirebaseModule } from "./common/lib/firebase.module";
import { NestJwtModule } from "./common/lib/jwt.module";
import { AuthMiddleware } from "./common/middlewares/auth.middleware";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleCalendarController } from "./modules/google-calendar/google-calendar.controller";
import { GoogleCalendarModule } from "./modules/google-calendar/google-calendar.module";
import { ScheduleController } from "./modules/schedule/schedule.controller";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { ScheduleService } from "./modules/schedule/schedule.service";
import { TaskService } from "./modules/task/task.service";
import { TokensService } from "./modules/tokens/tokens.service";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [firebaseConfig],
            isGlobal: true,
        }),
        NestScheduleModule.forRoot(),
        UsersModule,
        AuthModule,
        NestJwtModule,
        FirebaseModule,
        GoogleCalendarModule,
        ScheduleModule,
    ],
    controllers: [AppController, GoogleCalendarController, ScheduleController],
    providers: [
        NestJwtModule,
        AppService,
        TokensService,
        TaskService,
        ScheduleService,
    ],
    exports: [NestJwtModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({
                path: "*",
                method: RequestMethod.ALL,
            })
            .apply(AuthMiddleware)
            .forRoutes({
                path: "schedule",
                method: RequestMethod.ALL,
            });
    }
}
