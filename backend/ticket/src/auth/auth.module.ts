import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
imports: [UsersModule, JwtModule.register({})],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
})
export class AuthModule {}
