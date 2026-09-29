import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModel } from '../model/user.model.js';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async createUser(
    userName: string,
    userEmail: string,
    userPhoneNumber: string,
  ): Promise<UserModel> {
    const user = this.repository.create({
      userName,
      userEmail,
      userPhoneNumber,
    });
    return this.repository.save(user);
  }
}
