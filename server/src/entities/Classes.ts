import { BaseEntity, ManyToOne, JoinColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
//import { Classes as GraphqlClasses } from '../graphql/schema.types'

@Entity()
export class Classes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User

  @Column()
  title: string

  @Column()
  rRule: string

  @Column()
  zoom: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date
}
