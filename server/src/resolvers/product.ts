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
		return Product.create({
			...options,
			ownerId: req.session.userId
		}).save()
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
		await Product.delete({ id: productId, ownerId: req.session.userId })
		return true
	}
}
