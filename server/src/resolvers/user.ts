import { User } from '../entities/User'
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver
} from 'type-graphql'
import argon2 from 'argon2'
import { MyContext } from 'src/types'

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
class ErrorField {
	@Field()
	message: string
}

@ObjectType()
class UserResponse {
	@Field(() => [ErrorField], { nullable: true })
	errors?: ErrorField[]
	@Field(() => User, { nullable: true })
	user?: User
}

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) {
			return null
		}
		return User.findOne(req.session.userId)
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: RegisterInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		let user
		if (!options.email.includes('@') || options.email.length < 5) {
			return {
				errors: [
					{
						message: 'Некорректная почта'
					}
				]
			}
		}

		if (options.password.length < 6) {
			return {
				errors: [
					{
						message: 'Пароль должен быть больше 6 символов'
					}
				]
			}
		}

		if (options.password.length > 16) {
			return {
				errors: [
					{
						message: 'Пароль должен быть меньше 16 символов'
					}
				]
			}
		}

		try {
			const hash = await argon2.hash(options.password)

			user = await User.create({
				name: options.name,
				lastname: options.lastname,
				email: options.email,
				number: options.number,
				role: options.role,
				hash
			}).save()
		} catch (error) {
			if (error.code === '23505') {
				return {
					errors: [
						{
							message: 'Такой пользователь уже существует'
						}
					]
				}
			}
		}

		req.session.userId = user?.id

		return {
			user
		}
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('options') options: LoginInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({ where: { email: options.email } })
		if (!user) {
			return {
				errors: [
					{
						message: 'Такой пользователь не найден'
					}
				]
			}
		}
		const valid = await argon2.verify(user.hash, options.password)
		if (!valid) {
			return {
				errors: [
					{
						message: 'Такой пользователь не найден'
					}
				]
			}
		}

		req.session.userId = user.id

		return {
			user
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
}
