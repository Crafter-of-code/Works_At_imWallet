import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deflate } from 'zlib';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto.js';
import { LoginDto } from '../auth/dto/login.dto.js';
import UserEntity from './entity/user.entity.js';
@Injectable()
class UserAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  registerUser(userDetail: RegisterDto) {
    console.log('this is from UserAuthService regsiter user');
    console.log(userDetail);
    this.userRepository.create({
      userEmail: userDetail.userEmail,
      userName: userDetail.userName,
      userPassword: userDetail.userPhoneNumber,
    });
  }
  loginUser(userDetail: LoginDto) {}
}
export default UserAuthService;
