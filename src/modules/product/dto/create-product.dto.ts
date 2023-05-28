import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsString } from 'class-validator'
import { CreateIngredientProductDto } from 'src/modules/ingredient-product/dto/create-ingredient-product.dto'

export class CreateProductDto {
  @ApiProperty({ example: 'cfe muối' })
  @IsString()
  productName: string

  @ApiProperty({ example: [{ ingredientId: 1, unit: 'ml', quantity: 20 }] })
  @IsArray()
  @Type(() => Array)
  ingredients: CreateIngredientProductDto[]
}
