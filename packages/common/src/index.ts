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
