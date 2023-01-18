import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';

export class FindUserDto extends OmitType(UpdateUserDto, ['password']) {}
