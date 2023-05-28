import { Rating } from 'src/modules/rating/entities/rating.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'first_name', nullable: true })
  firstName: string

  @Column({ name: 'last_name', nullable: true })
  lastName: string

  @Column({ nullable: true })
  email: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @Column({ name: 'createdBy', nullable: true })
  createdBy: string

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[]
}
