import { Product } from 'src/modules/product/entities/product.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user-product')
export class UserProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: number

  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product, product => product.userProducts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product

  @ManyToOne(() => User, user => user.userProducts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User
}
