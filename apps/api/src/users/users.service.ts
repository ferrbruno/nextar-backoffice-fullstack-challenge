import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ password, ...userData }: CreateUserDto): Promise<User> {
    const passwordHash = await hash(password, 10);

    const createdUser = await this.userModel.create({
      password: passwordHash,
      ...userData,
    });

    return createdUser;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(user: FindUserDto): Promise<User> {
    return this.userModel.findOne(user).populate('password').exec();
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto).orFail().exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).orFail().exec();
  }
}
