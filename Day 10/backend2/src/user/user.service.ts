import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class UserService {
  registerUser(userDetail: RegisterDto) {
    console.log(userDetail);
    const response = {
      status: true,
      message: 'everything looking good',
    };
    return response;
  }
}
