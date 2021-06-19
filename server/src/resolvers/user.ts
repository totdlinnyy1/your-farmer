import { User } from '../entities/User'
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver
} from 'type-graphql'
import argon2 from 'argon2'
import { MyContext } from '../types'
import { Review } from '../entities/Review'

@InputType()
class RegisterInput {
	@Field()
	name: string
	@Field()
	lastname: string
	@Field()
	email: string
	@Field()
	number: string
	@Field()
	role: string
	@Field()
	password: string
}

@InputType()
class LoginInput {
	@Field()
	email: string
	@Field()
	password: string
}

@ObjectType()
class UserResponse {
	@Field(() => User)
	user!: User

	@Field(() => [Review], { nullable: true })
	reviews?: Review[]
}

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) {
			return null
		}
		let user = await User.findOne(req.session.userId)

		if (!user) {
			return null
		}

		return user
	}

	@Mutation(() => User)
	async register(
		@Arg('options') options: RegisterInput,
		@Ctx() { req }: MyContext
	): Promise<User> {
		try {
			if (!options.email.includes('@') || options.email.length < 5) {
				throw new Error('Некорректная почта')
			}

			if (options.password.length < 6) {
				throw new Error('Пароль должен быть больше 6 символов')
			}

			if (options.password.length > 16) {
				throw new Error('Пароль должен быть меньше 16 символов')
			}
			const hash = await argon2.hash(options.password)

			const user = await User.create({
				name: options.name,
				lastname: options.lastname,
				email: options.email,
				number: options.number,
				role: options.role,
				hash
			}).save()
			req.session.userId = user?.id

			return user
		} catch (error) {
			if (error.code === '23505') {
				throw new Error('Такой пользователь уже существует')
			}
			throw error
		}
	}

	@Mutation(() => User)
	async login(
		@Arg('options') options: LoginInput,
		@Ctx() { req }: MyContext
	): Promise<User> {
		try {
			const user = await User.findOne({ where: { email: options.email } })
			if (!user) {
				throw new Error('Такой пользователь не найден')
			}
			const valid = await argon2.verify(user.hash, options.password)
			if (!valid) {
				throw new Error('Такой пользователь не найден')
			}

			req.session.userId = user.id

			return user
		} catch (error) {
			throw error
		}
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise(resolve =>
			req.session.destroy(error => {
				res.clearCookie('kit')
				if (error) {
					console.log(error)
					resolve(false)
					return
				}
				resolve(true)
			})
		)
	}

	@Query(() => UserResponse)
	async getUser(@Arg('id', () => Int) id: number): Promise<UserResponse> {
		try {
			let user = await User.findOne(id)

			if (!user) throw new Error('Пользователь не найден')

			if (user.role === 'farmer') {
				const reviews = await Review.find({
					where: { farmerId: id },
					relations: ['owner']
				})
				return {
					user,
					reviews
				}
			}

			return { user }
		} catch (error) {
			throw error
		}
	}
}
