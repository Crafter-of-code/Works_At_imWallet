import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import UserAuthService from '../user/user.auth.service.js';

@Injectable()
export class AuthService {
  constructor(private userAuthService: UserAuthService) {}
  async registerUserService(userDetail: RegisterDto) {
    let data;
    try {
      this.userAuthService.registerUser(userDetail);
      data = {
        status: true,
        message: 'you are register successfully',
      };
    } catch (e) {
      console.log(e);
      data = {
        status: true,
        message: e,
      };
    }
    return data;
  }
  loginUserService(userDetail: LoginDto) {
    const data = {
      status: true,
      message: 'You are successfully logged in',
    };
    return data;
  }
}
