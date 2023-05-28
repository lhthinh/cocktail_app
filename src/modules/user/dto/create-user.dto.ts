import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  username: string

  @ApiProperty({ example: 'string' })
  @IsString()
  password: string
}
