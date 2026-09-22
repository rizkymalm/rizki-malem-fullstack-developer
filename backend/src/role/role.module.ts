import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
