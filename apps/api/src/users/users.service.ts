import { BadRequestException, Injectable } from '@nestjs/common';
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

    try {
      const document = await this.userModel.create({
        password: passwordHash,
        ...userData,
      });

      return document.toObject();
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('User with this email already exists.');
      }

      throw err;
    }
  }

  async find(filter: FindUserDto) {
    const regexFilter = {
      $or: Object.entries(filter).map(([key, value]) => ({
        [key]: new RegExp(value, 'i'),
      })),
    };

    const document = await this.userModel
      .find(regexFilter)
      .sort({ name: 'asc' })
      .exec();

    return document.map((userDocument) => userDocument.toObject());
  }

  async findAll() {
    const document = await this.userModel.find().exec();

    return document.map((userDocument) => userDocument.toObject());
  }

  async findOne(user: FindUserDto) {
    const document = await this.userModel
      .findOne(user)
      .populate('password')
      .exec();

    return document.toObject();
  }

  async findById(id: string) {
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
