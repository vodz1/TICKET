import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "src/common/interfaces/user.model";


export class RegisterDto {
@IsEmail() email: string;
@IsString() @MinLength(6) password: string;
@IsOptional() @IsString() displayName?: string;
@IsOptional() @IsEnum(UserRole) role?: UserRole; // allow seeding admins
}