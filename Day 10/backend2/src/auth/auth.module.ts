import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModel } from '../user/model/user.model.js';
import { UserModule } from '../user/user.module.js';
// import { OptService } from './opt/opt.service';

@Module({
  imports: [UserModel, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
