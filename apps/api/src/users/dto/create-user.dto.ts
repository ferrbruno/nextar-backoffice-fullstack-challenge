import { Permission } from 'common';

export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  permission: Permission;
  password: string;
}
