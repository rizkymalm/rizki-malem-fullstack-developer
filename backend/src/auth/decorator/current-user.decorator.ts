// auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from '../types/jwt-payload.types';

export const CurrentUser = createParamDecorator(
  (data: keyof JWTPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JWTPayload;

    // Jika parameter spesifik diminta (misal: @CurrentUser('id')), kembalikan properti itu saja
    return data ? user?.[data] : user;
  },
);
