import { IngredientProduct } from 'src/modules/ingredient-product/entities/ingredient-product.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  ingredientName: string

  @OneToMany(() => IngredientProduct, ingredientProduct => ingredientProduct.ingredient)
  ingredientProduct: IngredientProduct[]
}
