import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, User } from 'common';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

interface UserRequest extends Request {
  user: User;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<UserRequest>();

    return requiredPermissions.some((permission) =>
      user.permission?.includes(permission),
    );
  }
}
