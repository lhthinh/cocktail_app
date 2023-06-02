import { Module } from '@nestjs/common'
import { UserProductService } from './user-product.service'
import { UserProductController } from './user-product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProduct } from './entities/user-product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct])],
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule {}
