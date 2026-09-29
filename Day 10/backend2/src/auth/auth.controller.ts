import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  registerUserController(@Body() userRegisterDetail: RegisterDto) {
    return this.authService.registerUserService(userRegisterDetail);
  }
  @Post('login')
  loginUserController(@Body() userLoginDetail: LoginDto) {
    return this.authService.loginUserService(userLoginDetail);
  }
}
