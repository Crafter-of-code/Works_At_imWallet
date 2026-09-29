import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({
    message: 'Phone number is required',
  })
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone number must contain exactly 10 digits',
  })
  userPhoneNumber: string;
}
