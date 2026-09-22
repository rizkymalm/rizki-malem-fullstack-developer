import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { GeoLocationService } from '../common/utils/geolocation.service';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig.asProvider())],
  controllers: [AuthController],
  providers: [AuthService, TokenService, GeoLocationService, RoleService],
  exports: [AuthService],
})
export class AuthModule {}
