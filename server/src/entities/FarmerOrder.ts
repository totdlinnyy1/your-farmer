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
class FarmerProduct {
	@Field(() => String)
	label!: string

	@Field(() => Int)
	coast!: number

	@Field(() => String)
	value!: string

	@Field(() => String)
	class!: string

	@Field(() => String)
	amount!: string

	@Field(() => String, { nullable: true })
	productImage: string

	@Field(() => Float)
	count!: number
}

@ObjectType()
@Entity()
export class FarmerOrder extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => Int)
	@Column()
	ownerId!: number

	@Field(() => User)
	@ManyToOne(() => User, user => user.farmerOrders)
	owner: User

	@Field(() => Placemark)
	@Column('json')
	placemark!: Placemark

	@Field(() => [FarmerProduct])
	@Column('jsonb')
	products!: FarmerProduct[]

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
