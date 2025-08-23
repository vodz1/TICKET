import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/interfaces/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private users: UsersService, private jwt: JwtService) {}


async register({ email, password, displayName, role }: any) {
const exists = await this.users.findByEmail(email);
if (exists) throw new UnauthorizedException('Email already exists');
const hashed = await bcrypt.hash(password, 10);
const user = await this.users.create({ email, password: hashed, displayName, role });
return this.sign(user.id, user.email, user.role);
}


async login(email: string, password: string) {
const user = await this.users.findByEmail(email);
if (!user) throw new UnauthorizedException('Invalid credentials');
const ok = await bcrypt.compare(password, user.password);
if (!ok) throw new UnauthorizedException('Invalid credentials');
return this.sign(user.id, user.email, user.role);
}


private sign(sub: string, email: string, role: UserRole) {
const payload = { sub, email, role };
return {
access_token: this.jwt.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES || '7d' }),
};
}
}
