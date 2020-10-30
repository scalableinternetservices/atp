import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
//import { Classes as GraphqlClasses } from '../graphql/schema.types'

@Entity()
export class Classes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
