import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import { RegisterDto } from './DTO/register.dto';

@Controller('auth')
export class AuthController {
constructor(private auth: AuthService) {}


@Post('register')
register(@Body() dto: RegisterDto) {
return this.auth.register(dto);
}


@Post('login')
login(@Body() dto: LoginDto) {
return this.auth.login(dto.email, dto.password);
}
}
