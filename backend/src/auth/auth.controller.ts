import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { type JWTPayload } from './types/jwt-payload.types';
import { type IResult } from 'ua-parser-js';
import { UserAgent } from '../common/decorators/user-agent.decorator';
import { ClientIp } from '../common/decorators/client-ip.decorator';

// @Post -> auth/login
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  postRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  postLogin(
    @Body() data: LoginUserDto,
    @UserAgent() uaResult: IResult,
    @ClientIp() clientIp: string,
  ) {
    return this.authService.loginUser(data, uaResult, clientIp);
  }

  @Post('refresh')
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.refreshTokens(data.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  someProtetedRoute(@Req() req: JWTPayload) {
    return {
      user: req.id,
    };
  }
}
