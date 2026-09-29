import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserAuthService from './user.auth.service.js';
import UserEntity from './entity/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserAuthService],
  controllers: [UserController],
  exports: [UserAuthService],
})
export class UserModule {}
