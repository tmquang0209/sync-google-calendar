import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [forwardRef(() => AppModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
