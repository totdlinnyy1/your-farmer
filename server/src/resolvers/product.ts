import { Product } from '../entities/Product'
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'
import { getConnection } from 'typeorm'
import { User } from '../entities/User'

@InputType()
class ProductInput {
	@Field(() => String)
	label!: string
	@Field(() => Int)
	coast!: number
	@Field(() => String)
	amount!: string
	@Field(() => String)
	class!: string
	@Field(() => String)
	value!: string
	@Field(() => String, { nullable: true })
	productImage?: string
}

@Resolver()
export class ProductResolver {
	@Mutation(() => Product)
	@UseMiddleware(isAuth)
	async createProduct(
		@Arg('options') options: ProductInput,
		@Ctx() { req }: MyContext
	): Promise<Product> {
		try {
			const product = await Product.create({
				...options,
				ownerId: req.session.userId
			}).save()
			await getConnection()
				.getRepository(User)
				.increment({ id: req.session.userId }, 'productsCount', 1)
			return product
		} catch (error) {
			throw error
		}
	}

	@Query(() => [Product])
	products(): Promise<Product[]> {
		return Product.find()
	}

	@Query(() => [Product])
	@UseMiddleware(isAuth)
	myProducts(@Ctx() { req }: MyContext): Promise<Product[]> {
		return Product.find({ where: { ownerId: req.session.userId } })
	}

	@Mutation(() => Product)
	product(
		@Arg('productId', () => Int) productId: number
	): Promise<Product | undefined> {
		return Product.findOne({ where: { id: productId } })
	}

	@Mutation(() => Product)
	@UseMiddleware(isAuth)
	async updateProduct(
		@Arg('productId', () => Int) productId: number,
		@Arg('coast', () => Int) coast: number,
		@Ctx() { req }: MyContext
	) {
		const result = await getConnection()
			.createQueryBuilder()
			.update(Product)
			.set({ coast })
			.where('id = :productId and "ownerId" = :ownerId', {
				productId,
				ownerId: req.session.userId
			})
			.returning('*')
			.execute()

		return result.raw[0]
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteProduct(
		@Arg('productId', () => Int) productId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		try {
			await Product.delete({ id: productId, ownerId: req.session.userId })
			await getConnection()
				.getRepository(User)
				.decrement({ id: req.session.userId }, 'productsCount', 1)
			return true
		} catch (error) {
			throw error
		}
	}

	@Query(() => [Product])
	async getFarmerProducts(
		@Arg('farmerId', () => Int) farmerId: number
	): Promise<Product[]> {
		try {
			const products = await Product.find({ where: { ownerId: farmerId } })
			if (!products) throw new Error('???????????????? ???? ??????????????')

			return products
		} catch (error) {
			throw error
		}
	}
}
