import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(user: CreateUserDto): Promise<Partial<User>> {
        const exists = await this.userModel.findOne({ email: user.email })
        if (exists) {
            throw new ConflictException('E-mail já cadastrado');
        }
        const passwordHash = await bcrypt.hash(user.password, 10);
        const userCreate = new this.userModel({
            name: user.name,
            email: user.email,
            passwordHash
        })
        await userCreate.save();

        const { passwordHash: _, ...userWithoutPassword } = userCreate.toObject();
        return userWithoutPassword
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async finById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }
        return user;
    }
}
