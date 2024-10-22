import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
} from "@nestjs/common";
import { Response } from "express";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const errorResponse = exception.getResponse();

        response.status(status).json({
            success: false,
            message: errorResponse["message"],
            data: null,
        });
    }
}
