import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { UserRole } from "src/common/interfaces/user.model";

@Schema({ timestamps: true })
export class User extends Document{
@Prop({ required: true, unique: true })
email: string;


@Prop({ required: true })
password: string; // hashed


@Prop({ enum: UserRole, default: UserRole.USER })
role: UserRole;


@Prop()
displayName?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);