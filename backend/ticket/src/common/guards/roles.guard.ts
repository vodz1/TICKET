import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../interfaces/decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}


canActivate(ctx: ExecutionContext): boolean {
const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
ctx.getHandler(),
ctx.getClass(),
]);
if (!required) return true;
const req = ctx.switchToHttp().getRequest();
const user = req.user;
console.log('RolesGuard: ', user);
return required.includes(user?.role);
}
}