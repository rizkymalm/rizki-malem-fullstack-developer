import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { TokenService } from './token/token.service';
import { JWTPayload } from './types/jwt-payload.types';
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';
import { type IResult } from 'ua-parser-js';
import { GeoLocationService } from '../common/utils/geolocation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly geoLocation: GeoLocationService,
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  public async registerUser(data: RegisterUserDto) {
    const emailExist = await this.prisma.auth.count({
      where: { email: data.email },
    });
    const checkRole = await this.roleService.findRole(data.role);
    if (!checkRole) {
      if (emailExist) {
        throw new NotFoundException('Role Not Found');
      }
    }
    if (emailExist) {
      throw new ConflictException('Email already exist');
    }

    const createdUser = this.prisma.$transaction(async () => {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(data.password, salt);
      // insert user
      const saveUser = await this.prisma.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      //insert auth
      const auth = await this.prisma.auth.create({
        data: {
          email: data.email,
          password: hashedPassword,
          roleId: data.role,
          userId: saveUser.id,
        },
      });
      return auth;
    });
    return createdUser;
  }

  public async loginUser(data: LoginUserDto, userAgent: IResult, ip: string) {
    const user = await this.prisma.auth.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    //check password
    const decrypt = await bcrypt.compare(data.password, user.password);
    if (!decrypt) {
      throw new UnauthorizedException('Password not match');
    }

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.roleId,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);
    const sessionKey = uuidv7();
    const token = uuidv4();
    const refreshToken = `${sessionKey}.${token}`;
    const hashedToken = await bcrypt.hash(token, 10);
    await this.storeSession(sessionKey, hashedToken, user.id, userAgent, ip);
    return { accessToken, refreshToken };
  }

  async storeSession(
    key: string,
    token: string,
    user: string,
    userAgent: IResult,
    ip: string,
  ) {
    const expiryDate = new Date();
    const location = await this.geoLocation.getLocation(ip);
    expiryDate.setDate(expiryDate.getDate() + 7);
    await this.prisma.session.create({
      data: {
        refreshTokenHash: token,
        sessionKey: key,
        expiryDate: expiryDate,
        browser: userAgent.browser.name,
        os: userAgent.os.name,
        ipAddress: ip,
        userAgent: userAgent.ua,
        country: location.country,
        city: location.city,
        ll: location.ll,
        timezone: location.timezone,
        authId: user,
      },
    });
  }

  async storeUpdateTokenSession(id: string, token: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    await this.prisma.session.update({
      where: {
        id: id,
      },
      data: { refreshTokenHash: token },
    });
  }

  async refreshTokens(refreshToken: string) {
    const [key, token] = refreshToken.split('.');

    const checkToken = await this.prisma.session.findFirst({
      where: {
        sessionKey: key,
        expiryDate: { gt: new Date() },
        revokedAt: null,
      },
    });
    if (!checkToken) {
      throw new ForbiddenException('Refresh token expired');
    }

    const decrypt = await bcrypt.compare(token, checkToken.refreshTokenHash);
    if (!decrypt) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const auth = await this.prisma.auth.findFirst({
      where: {
        id: checkToken.authId,
      },
    });

    if (!auth) {
      throw new UnauthorizedException();
    }

    const payload: JWTPayload = {
      id: auth.id,
      email: auth.email,
      role: auth.roleId,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);
    const newRefreshToken = uuidv4();
    const refreshTokenHashed = await bcrypt.hash(newRefreshToken, 10);
    const refreshTokenWithKey = `${key}.${newRefreshToken}`;
    await this.storeUpdateTokenSession(checkToken.id, refreshTokenHashed);

    return {
      accessToken,
      refreshToken: refreshTokenWithKey,
    };
  }
}
