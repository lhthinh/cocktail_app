import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { IngredientProductService } from './ingredient-product.service'
import { CreateIngredientProductDto } from './dto/create-ingredient-product.dto'
import { UpdateIngredientProductDto } from './dto/update-ingredient-product.dto'

@Controller('ingredient-product')
export class IngredientProductController {
  constructor(private readonly ingredientProductService: IngredientProductService) {}

  @Post()
  create(@Body() createIngredientProductDto: CreateIngredientProductDto) {
    return this.ingredientProductService.create(createIngredientProductDto)
  }

  @Get()
  findAll() {
    return this.ingredientProductService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientProductService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientProductDto: UpdateIngredientProductDto) {
    return this.ingredientProductService.update(+id, updateIngredientProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientProductService.remove(+id)
  }
}
