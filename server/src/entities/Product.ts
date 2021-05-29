import { Field, Int, ObjectType } from 'type-graphql'
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	ManyToOne
} from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity()
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String)
	@Column()
	label!: string

	@Field(() => Int)
	@Column()
	coast!: number

	@Field(() => String)
	@Column()
	value!: string

	@Field(() => String)
	@Column()
	class!: string

	@Field(() => String)
	@Column()
	amount!: string

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	productImage: string

	@Field()
	@Column()
	ownerId: number

	@ManyToOne(() => User, user => user.products)
	owner: User

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
