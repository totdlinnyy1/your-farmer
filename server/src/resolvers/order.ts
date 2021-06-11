import { isAuth } from '../middleware/isAuth'
import { MyContext, PlacemarkInput } from '../types'
import {
	Arg,
	Ctx,
	Field,
	Float,
	InputType,
	Mutation,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { Order } from '../entities/Order'

@InputType()
class ProductsInput {
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

@Resolver()
export class OrderResolver {
	@Mutation(() => Order)
	@UseMiddleware(isAuth)
	async createOrder(
		@Arg('placemark', () => PlacemarkInput) placemark: PlacemarkInput,
		@Arg('products', () => [ProductsInput]) products: ProductsInput[],
		@Ctx() { req }: MyContext
	): Promise<Order> {
		return Order.create({
			placemark,
			products,
			ownerId: req.session.userId
		}).save()
	}

	@Query(() => [Order])
	@UseMiddleware(isAuth)
	async getAllOrders(): Promise<Order[]> {
		return Order.createQueryBuilder('o')
			.innerJoinAndSelect('o.owner', 'u', 'u.id = o."ownerId"')
			.getMany()
	}
}
