import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import { IngredientProductService } from '../ingredient-product/ingredient-product.service'
import * as _ from 'lodash'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly ingredientProductService: IngredientProductService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { ingredients, productName } = createProductDto
    const product = await this.productRepository.save({ productName })
    for await (const ingredient of ingredients) {
      const { ingredientId, quantity, unit } = ingredient
      await this.ingredientProductService.create({
        ingredientId,
        productId: product.id,
        quantity,
        unit,
      })
    }
    return await this.productRepository.findOneBy({ id: product.id })
  }

  addImage(file: Express.Multer.File, id: number) {
    return this.productRepository.save({
      id,
      image: '/files/product/' + file.filename,
    })
  }
  async findAll() {
    const products = await this.productRepository.find({
      relations: {
        ingredientProduct: {
          ingredient: true,
        },
      },
    })
    const resProduct = _.map(products, item => {
      let recipe = ''
      _.forEach(item.ingredientProduct, (ingredientProduct, index) => {
        const suffix = !(item.ingredientProduct.length == index + 1) ? ' + ' : ''
        recipe +=
          ingredientProduct.quantity +
          ingredientProduct.unit +
          ' ' +
          ingredientProduct.ingredient.ingredientName +
          suffix
      })
      return { id: item.id, productName: item.productName, recipe, image: item.image }
    })
    return resProduct
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        ingredientProduct: {
          ingredient: true,
        },
      },
    })
    let recipe = ''
    _.forEach(product.ingredientProduct, item => {
      recipe = item.quantity + item.unit
    })
    return { productName: product.productName, recipe }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: number) {
    await this.ingredientProductService.removeByProductId(id)
    return this.productRepository.delete({ id })
  }
}
