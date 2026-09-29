import { Module } from '@nestjs/common';
import { OtpService } from './otp.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModel } from './model/otp.model.js';
import { OtpRepository } from './repository/otp.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([OtpModel])],
  providers: [OtpService, OtpRepository],
  exports: [OtpService],
})
export class OtpModule {}
