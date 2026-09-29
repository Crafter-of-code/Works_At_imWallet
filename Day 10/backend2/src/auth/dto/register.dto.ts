import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  userFirstName: string;

  @IsOptional()
  @IsString()
  userMiddleName?: string;

  @IsString()
  @IsNotEmpty()
  userLastName: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
