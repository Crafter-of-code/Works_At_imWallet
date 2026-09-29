import { arrayBuffer } from 'stream/consumers';
import { LoginDto } from '../auth/dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { UserRepository } from './repository/user.repository.js';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from './model/user.model.js';
import { OtpService } from '../otp/otp.service.js';
@Injectable()
export class UserAuthService {
  constructor(
    private userRepository: UserRepository,
    private otpService: OtpService,
  ) {}

  async registerUserService(userRegisterDetail: RegisterDto) {
    console.log(userRegisterDetail);
    const data = {
      status: true,
      message: 'you are signed successfully',
    };
    const userName =
      userRegisterDetail.userFirstName +
      ' ' +
      userRegisterDetail.userMiddleName +
      ' ' +
      userRegisterDetail.userLastName;
    const userData: UserModel = await this.userRepository.createUser(
      userName,
      userRegisterDetail.userEmail,
      userRegisterDetail.userPhoneNumber,
    );
    if (!userData)
      throw new BadRequestException('Unable to create you account write now');
    this.otpService.sendOtp();
    return data;
  }
  loginUserService(userLoginDetail: LoginDto) {
    const data = {
      status: true,
      message: 'you are loged in succesfully',
    };
    return data;
  }
}
