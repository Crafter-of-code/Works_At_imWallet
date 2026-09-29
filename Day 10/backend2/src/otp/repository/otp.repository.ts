import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpModel } from '../model/otp.model.js';
import { Repository } from 'typeorm';
import { SourceTextModule } from 'vm';
import { randomInt } from 'crypto';
import { UserModel } from '../../user/model/user.model.js';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(OtpModel)
    private repository: Repository<OtpModel>,
  ) {}
  async setOtp(userDetail: UserModel) {
    console.log('This is user repository');
    const opt = randomInt(100000, 1000000).toString();
    this.repository.create({
      user: userDetail,
      // otpCode:
    });
  }
  async getOtp() {}
}
