import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateIngredientProductDto } from 'src/modules/ingredient-product/dto/create-ingredient-product.dto'

export class CreateProductDto {
  @ApiProperty({ example: 'cfe muối' })
  @IsString()
  productName: string

  @ApiProperty({
    example: [{ ingredientId: 1, unit: 'ml', quantity: 20 }],
  })
  ingredients: CreateIngredientProductDto[]
}
