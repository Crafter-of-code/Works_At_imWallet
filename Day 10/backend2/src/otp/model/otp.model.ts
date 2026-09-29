import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { UserModel } from '../../user/model/user.model.js';

@Entity('user_otp')
export class OtpModel {
  @PrimaryGeneratedColumn()
  otpId: number;

  @ManyToOne('UserModel', (user: UserModel) => user.otps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column()
  otpCode: string;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  used: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
