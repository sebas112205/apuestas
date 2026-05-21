import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class UserRegisterDto {
  @IsNotEmpty()
  @Length(2, 80)
  name!: string

  @IsEmail()
  email!: string

  @IsNotEmpty()
  @Length(8, 128)
  password!: string
}
