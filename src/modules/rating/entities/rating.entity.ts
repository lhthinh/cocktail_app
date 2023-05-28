import { Product } from 'src/modules/product/entities/product.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'rate_note' })
  rateNote: string

  @Column({ name: 'product_id' })
  productId: number

  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => Product, product => product.ratings)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product

  @ManyToOne(() => User, user => user.ratings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User
}
