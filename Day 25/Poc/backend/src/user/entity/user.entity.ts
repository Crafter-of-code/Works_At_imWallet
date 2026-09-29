import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  userName: string;
  @Column({ unique: true })
  userEmail: string;
  @Column({ unique: true })
  userPassword: string;
}
export default UserEntity;

