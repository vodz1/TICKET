import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}


findByEmail(email: string) {
return this.userModel.findOne({ email });
}


create(data: Partial<User>) {
return this.userModel.create(data);
}


findById(id: string) {
return this.userModel.findById(id);
}
}
