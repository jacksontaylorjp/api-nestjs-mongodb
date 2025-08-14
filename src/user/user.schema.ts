import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        unique: true,
        lowercase: true,
        index: true
    })
    email: string;

    @Prop({
        required: true
    })
    passwordHash: string;

    @Prop({
        type: [String],
        default: ['user']
    })
    roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);