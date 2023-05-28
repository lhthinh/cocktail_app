import { Ingredient } from 'src/modules/ingredient/entities/ingredient.entity'
import { Product } from 'src/modules/product/entities/product.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('ingredient-product')
export class IngredientProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'ingredient_id' })
  ingredientId: number

  @Column({ name: 'product_id' })
  productId: number

  @Column({ name: 'unit' })
  unit: string

  @Column({ name: 'quantity' })
  quantity: number

  @ManyToOne(() => Product, product => product.ingredientProduct)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product

  @ManyToOne(() => Ingredient, ingredient => ingredient.ingredientProduct)
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient: Ingredient
}
