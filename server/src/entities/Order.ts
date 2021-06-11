import { Placemark } from '../types'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@ObjectType()
class product {
	@Field(() => String)
	label!: string

	@Field(() => String)
	value!: string

	@Field(() => String)
	class!: string

	@Field(() => String)
	amount!: string

	@Field(() => Float)
	count!: number
}

@ObjectType()
@Entity()
export class Order extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => Int)
	@Column()
	ownerId!: number

	@Field(() => User)
	@ManyToOne(() => User, user => user.orders)
	owner: User

	@Field(() => Placemark)
	@Column('json')
	placemark!: Placemark

	@Field(() => [product])
	@Column('jsonb')
	products!: product[]

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
