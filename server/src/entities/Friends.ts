import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Friends extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User

  @Column('simple-array')
  friends: string[]
}
