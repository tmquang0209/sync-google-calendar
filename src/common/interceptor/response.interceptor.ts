import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../dto";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((response: Partial<ApiResponse<any>>) => {
                return {
                    success: response.success || false,
                    message: response.message || "",
                    data: response.data || null,
                };
            }),
        );
    }
}
