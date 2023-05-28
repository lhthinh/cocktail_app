import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class EditProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  avatar: any

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  password: string
}
