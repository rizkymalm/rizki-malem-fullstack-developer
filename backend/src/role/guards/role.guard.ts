import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RoleService } from '../role.service';
import { JWTPayload } from 'src/auth/types/jwt-payload.types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // Jika tidak ada dekorator @Roles, izinkan akses
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JWTPayload;

    if (!user || !user.role) {
      throw new UnauthorizedException('Role ID not found in token');
    }

    const role = await this.roleService.findRole(user.role);
    if (!role) {
      throw new ForbiddenException('Role not found');
    }

    const hasRole = requiredRoles.includes(role.name);
    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }
}
