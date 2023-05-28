import { Module } from '@nestjs/common'
import { IngredientProductService } from './ingredient-product.service'
import { IngredientProductController } from './ingredient-product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IngredientProduct } from './entities/ingredient-product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([IngredientProduct])],
  controllers: [IngredientProductController],
  providers: [IngredientProductService],
  exports: [IngredientProductService],
})
export class IngredientProductModule {}
