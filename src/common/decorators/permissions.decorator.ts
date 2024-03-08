import { UseGuards, applyDecorators } from '@nestjs/common';
import { SetPermission } from './set-metadata.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/authentication/guards/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Permissions = (...values: string[]) => {
  console.log(true);
  return applyDecorators(
    SetPermission(values),
    UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth(),
  );
};
