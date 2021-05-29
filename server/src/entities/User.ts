import { Field, Int, ObjectType } from 'type-graphql'
import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity,
	OneToMany
} from 'typeorm'
import { Product } from './Product'

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

	@Column()
	hash!: string

	@OneToMany(() => Product, product => product.owner)
	products: Product[]

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
