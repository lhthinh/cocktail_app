import { PartialType } from '@nestjs/swagger'
import { CreateIngredientProductDto } from './create-ingredient-product.dto'

export class UpdateIngredientProductDto extends PartialType(CreateIngredientProductDto) {}
