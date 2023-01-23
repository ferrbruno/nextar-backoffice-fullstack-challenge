export enum Permission {
  admin = "admin",
  standard = "standard",
}

export class User {
  name!: string;
  email!: string;
  phone!: string;
  permission!: Permission;
  password!: string;
}

export class AuthUser {
  name!: string;
  email!: string;
  userId!: string;
  permission!: string;
}
