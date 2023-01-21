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

    const document = await this.userModel.create({
      password: passwordHash,
      ...userData,
    });

    return document.toObject();
  }

  async findAll(): Promise<User[]> {
    const document = await this.userModel.find().exec();
    return document.map((userDocument) => userDocument.toObject());
  }

  async findOne(user: FindUserDto): Promise<User> {
    const document = await this.userModel
      .findOne(user)
      .populate('password')
      .exec();

    return document.toObject();
  }

  async findById(id: string): Promise<User> {
    const document = await this.userModel.findById(id).exec();

    return document.toObject();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedDocument = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto)
      .orFail()
      .exec();

    return updatedDocument.toObject();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).orFail().exec();
  }
}
