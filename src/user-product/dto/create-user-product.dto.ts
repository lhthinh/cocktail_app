import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CreateUserProductDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number

  @ApiProperty({ example: 52 })
  @IsNumber()
  productId: number
}
