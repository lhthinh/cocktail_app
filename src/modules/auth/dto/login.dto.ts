import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'thinhlh' })
  @IsString()
  username: string

  @ApiProperty({ example: '123123' })
  @IsString()
  password: string
}
