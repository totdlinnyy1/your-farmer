import { Field, Float, Int, ObjectType } from 'type-graphql'
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	OneToMany
} from 'typeorm'
import { FarmerOrder } from './FarmerOrder'
import { Order } from './Order'
import { Product } from './Product'
import { Review } from './Review'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String)
	@Column({ unique: true })
	email!: string

	@Field(() => String)
	@Column()
	name!: string

	@Field(() => String)
	@Column()
	lastname!: string

	@Field(() => String)
	@Column()
	number!: string

	@Field(() => String)
	@Column()
	role!: string

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	avatarUrl?: string

	@Column('float', { default: 0.0 })
	rating: number

	@Field(() => Float)
	@Column('float', { default: 0.0 })
	averageRating: number

	@Field(() => Int)
	@Column('int', { default: 0 })
	reviewsCount: number

	@Field(() => Int)
	@Column('int', { default: 0 })
	productsCount: number

	@Field(() => Boolean)
	@Column('boolean', {default: false})
	isEmailConfirmed: boolean

	@Column('int', {default: 0})
	confirmEmailCode: number

	@Column()
	hash!: string

	@OneToMany(() => Product, product => product.owner)
	products: Product[]

	@OneToMany(() => FarmerOrder, order => order.owner)
	farmerOrders: FarmerOrder[]

	@OneToMany(() => Order, order => order.owner)
	orders: Order[]

	@OneToMany(() => Review, review => review.owner)
	sendReviews: Review[]

	@Field(() => [Review])
	@OneToMany(() => Review, review => review.farmer)
	reviews: Review[]

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
