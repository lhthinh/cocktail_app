import { Injectable } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Ingredient } from './entities/ingredient.entity'
import { Repository } from 'typeorm'
import { ApiOperation } from '@nestjs/swagger'

@Injectable()
export class IngredientService {
  constructor(@InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>) {}
  @ApiOperation({ summary: 'Thêm nguyền liệu' })
  async create(createIngredientDto: CreateIngredientDto) {
    const { ingredientName } = createIngredientDto
    const ingredient = await this.ingredientRepository.findOne({ where: { ingredientName } })
    if (!ingredient) this.ingredientRepository.save(createIngredientDto)
  }

  findAll() {
    return this.ingredientRepository.find()
  }
  findOne(id: number) {
    return `This action returns a #${id} ingredient`
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`
  }

  remove(id: number) {
    return this.ingredientRepository.delete({ id })
  }
}
