import { Field, Int, ObjectType } from 'type-graphql'
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
@Entity()
export class Review extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true })
	text: string

	@Field(() => Int)
	@Column('int')
	mark!: number

	@Field(() => Int)
	@Column({ unique: true })
	ownerId: number

	@Field(() => Int)
	@Column()
	farmerId: number

	@Field(() => User)
	@ManyToOne(() => User, user => user.sendReviews)
	owner: User

	@Field(() => User)
	@ManyToOne(() => User, user => user.reviews)
	farmer: User

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
