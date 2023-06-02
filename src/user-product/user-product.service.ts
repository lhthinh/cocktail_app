import { Injectable } from '@nestjs/common'
import { CreateUserProductDto } from './dto/create-user-product.dto'
import { UpdateUserProductDto } from './dto/update-user-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProduct } from './entities/user-product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserProductService {
  constructor(@InjectRepository(UserProduct) private readonly userProductRepository: Repository<UserProduct>) {}
  async create(createUserProductDto: CreateUserProductDto) {
    const likeProduct = await this.userProductRepository.findOne({
      where: {
        userId: createUserProductDto?.userId,
        productId: createUserProductDto?.productId,
      },
    })
    return this.userProductRepository.save({ ...likeProduct, ...createUserProductDto })
  }

  findAllByUserId(userId: number) {
    return this.userProductRepository.find({ where: { userId }, relations: { product: true } })
  }

  findOne(id: number) {
    return `This action returns a #${id} userProduct`
  }

  update(id: number, updateUserProductDto: UpdateUserProductDto) {
    return `This action updates a #${id} userProduct`
  }

  remove(id: number) {
    return `This action removes a #${id} userProduct`
  }
}
