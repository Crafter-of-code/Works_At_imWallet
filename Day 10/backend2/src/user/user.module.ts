import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.model.js';
import { UserAuthService } from './user.auth.service.js';
import { UserRepository } from './repository/user.repository.js';
import { OtpModule } from '../otp/otp.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), OtpModule],
  providers: [UserService, UserAuthService, UserRepository],
  controllers: [UserController],
  exports: [UserAuthService],
})
export class UserModule {}
