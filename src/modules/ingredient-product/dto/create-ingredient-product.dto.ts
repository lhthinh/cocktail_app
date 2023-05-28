import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CreateIngredientProductDto {
  @IsNumber()
  @Type(() => Number)
  productId: number

  @IsNumber()
  @Type(() => Number)
  ingredientId: number

  @IsNumber()
  @Type(() => Number)
  quantity: number

  @IsString()
  unit: string
}
