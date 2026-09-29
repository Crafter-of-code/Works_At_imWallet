import { Injectable } from '@nestjs/common';
import { OtpRepository } from './repository/otp.repository.js';

@Injectable()
export class OtpService {
  constructor(private otpRepository: OtpRepository) {}
  sendOtp(userId: number) {
    try {
      this.otpRepository.setOtp;
    } catch (e) {
      console.log('finding the ');
    }
  }
  verifyOtp() {}
}
