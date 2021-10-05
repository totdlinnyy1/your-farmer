import { isAuth } from '../middleware/isAuth'
import { MyContext, PlacemarkInput } from '../types'
import {
	Arg,
	Ctx,
	Field,
	Float,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { Order } from '../entities/Order'
import { User } from '../entities/User'

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
			.andWhere('o.status = :status', { status: 'show' })
			.getMany()
	}

	@Query(() => [Order])
	@UseMiddleware(isAuth)
	async getMyOrders(@Ctx() { req }: MyContext): Promise<Order[]> {
		return Order.find({ where: { ownerId: req.session.userId } })
	}

	@Mutation(() => Order)
	@UseMiddleware(isAuth)
	async changeOrderStatus(
		@Arg('orderId', () => Int) orderId: number,
		@Ctx() { req }: MyContext
	): Promise<Order> {
		try {
			const order = await Order.findOne({
				where: { id: orderId, ownerId: req.session.userId }
			})

			if (!order) throw new Error('Заказ не найден')

			await Order.update(orderId, {
				status: order.status === 'show' ? 'hide' : 'show'
			})

			const updatedOrder = await Order.findOne({
				where: { id: orderId, ownerId: req.session.userId }
			})

			if (!updatedOrder) throw new Error('Заказ не найден')

			return updatedOrder
		} catch (error) {
			throw error
		}
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteOrder(
		@Arg('orderId', () => Int) orderId: number,
		@Ctx() { req }: MyContext
	): Promise<Boolean> {
		try {
			const order = await Order.findOne({
				where: { id: orderId, ownerId: req.session.userId }
			})

			if (!order) throw new Error('Заказ не найден')

			await Order.delete(orderId)

			return true
		} catch (error) {
			throw error
		}
	}

	@Query(() => [Order])
	async buyerOrders(
		@Arg('ownerId', () => Int) ownerId: number
	): Promise<Order[]> {
		try {
			const user = await User.findOne({ where: { id: ownerId, role: 'buyer' } })
			if (!user) throw new Error('Пользователь не найден')
			const orders = await Order.find({ where: { ownerId } })
			if (!orders) return []
			return orders
		} catch (error) {
			throw error
		}
	}
}
