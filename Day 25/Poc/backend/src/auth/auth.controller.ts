import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { get } from 'http';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Get()
  getAuthController() {
    const data = {
      status: true,
      message: 'working correctly',
    };
    return data;
  }
  @Post('register')
  registerController(@Body() userDetail: RegisterDto) {
    return this.auth.registerUserService(userDetail);
  }
  @Post('login')
  loginUserController(@Body() userDetail: LoginDto) {
    return this.auth.loginUserService(userDetail);
  }
}
