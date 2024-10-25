import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from "@nestjs/common";
import { TokensService } from "src/modules/tokens/tokens.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly tokenService: TokensService) {}
    use(req: any, res: any, next: (error?: Error | any) => void) {
        const { authorization } = req.headers;
        try {
            if (!authorization) {
                throw new UnauthorizedException("Unauthorized");
            }

            const user = this.tokenService.verifyAccessToken(authorization);
            if (!user) {
                throw new UnauthorizedException("Unauthorized");
            }

            req.user = user;

            next();
        } catch (err) {
            // if (err.message.includes("jwt expired")) {
            //     throw new UnauthorizedException("Token expired");
            // } else if (err.message.includes("jwt malformed")) {
            //     throw new UnauthorizedException("Token malformed");
            // } else if (err.message.includes("invalid")) {
            //     throw new UnauthorizedException("Token invalid");
            // }
            // throw new UnauthorizedException("Unauthorized");
            return res.status(401).json({
                success: false,
                message: err.message,
                data: null,
            });
        }
    }
}
