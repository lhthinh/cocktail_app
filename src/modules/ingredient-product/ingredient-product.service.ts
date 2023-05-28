import { Injectable } from '@nestjs/common'
import { CreateIngredientProductDto } from './dto/create-ingredient-product.dto'
import { UpdateIngredientProductDto } from './dto/update-ingredient-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { IngredientProduct } from './entities/ingredient-product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class IngredientProductService {
  constructor(
    @InjectRepository(IngredientProduct) private readonly ingredientProductRepository: Repository<IngredientProduct>,
  ) {}
  create(createIngredientProductDto: CreateIngredientProductDto) {
    return this.ingredientProductRepository.save(createIngredientProductDto)
  }

  findAll() {
    return `This action returns all ingredientProduct`
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientProduct`
  }

  update(id: number, updateIngredientProductDto: UpdateIngredientProductDto) {
    return `This action updates a #${id} ingredientProduct`
  }

  async remove(id: number) {
    await this.ingredientProductRepository.delete({ id })
  }

  async removeByProductId(productId: number) {
    const ingredientProduct = await this.ingredientProductRepository.find({ where: { productId } })
    for await (const item of ingredientProduct) {
      await this.remove(item?.id)
    }
  }
}
