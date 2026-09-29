import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OtpModel } from '../../otp/model/otp.model.js';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  userName: string;
  @Column({ unique: true, length: 255 })
  userEmail: string;
  @Column({ unique: true })
  userPhoneNumber: string;
  @Column({ default: false })
  userVerified: boolean;

  @OneToMany(() => OtpModel, (otp) => otp.user)
  otps: OtpModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
