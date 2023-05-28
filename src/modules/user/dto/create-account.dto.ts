import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAccountDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  username: string

  @ApiProperty({ example: 'string' })
  @IsString()
  password: string
}
