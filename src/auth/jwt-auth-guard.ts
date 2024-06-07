import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthguard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = (req.headers.authorization).split(' ');
            const token = authHeader[1];
            if (authHeader[0] != 'Bearer' || !token) throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            req.user = this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
        return true;
    }
}