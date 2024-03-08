import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    const permissions = this.reflector.get<string[]>(
      'PERMISSIONS',
      context.getHandler(),
    );
    if (!permissions.length) {
      return true;
    }
    const userPermissions: string[] = [];
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        const checkPermission = userPermissions.find(
          (userPermission) => userPermission === permission.name,
        );
        if (!checkPermission) {
          userPermissions.push(permission.name);
        }
      });
    });
    user.permissions.forEach((permission) => {
      const checkPermission = userPermissions.find(
        (userPermission) => userPermission === permission.name,
      );
      if (!checkPermission) {
        userPermissions.push(permission.name);
      }
    });
    return userPermissions.some((userPermission) =>
      permissions.includes(userPermission),
    );
  }
}
