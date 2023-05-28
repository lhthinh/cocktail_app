import { IngredientProduct } from 'src/modules/ingredient-product/entities/ingredient-product.entity'
import { Rating } from 'src/modules/rating/entities/rating.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  productName: string

  @Column({ name: 'image', nullable: true })
  image: string

  @OneToMany(() => IngredientProduct, ingredientProduct => ingredientProduct.product)
  ingredientProduct: IngredientProduct[]

  @OneToMany(() => Rating, rating => rating.product)
  ratings: Rating[]
}
