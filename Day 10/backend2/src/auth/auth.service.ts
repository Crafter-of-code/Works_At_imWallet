import { Injectable } from '@nestjs/common';
import { UserAuthService } from '../user/user.auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private userAuthService: UserAuthService) {}
  registerUserService(userRegisterDetail: RegisterDto) {
    return this.userAuthService.registerUserService(
      userRegisterDetail as unknown as Parameters<
        UserAuthService['registerUserService']
      >[0],
    );
  }
  loginUserService(userLoginDetail: LoginDto) {
    return this.userAuthService.loginUserService(userLoginDetail);
  }
}
