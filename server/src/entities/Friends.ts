import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Friends extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User

  @Column()
  friends: string
}
