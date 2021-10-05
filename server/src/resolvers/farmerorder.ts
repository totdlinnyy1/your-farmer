import { FarmerOrder } from '../entities/FarmerOrder'
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
import { User } from '../entities/User'

@InputType()
class FarmerProductsInput {
	@Field(() => String)
	label!: string

	@Field(() => Int)
	coast!: number

	@Field(() => String)
	value!: string

	@Field(() => String)
	class!: string

	@Field(() => String)
	amount!: string

	@Field(() => String, { nullable: true })
	productImage: string

	@Field(() => Float)
	count!: number
}

@Resolver()
export class FarmerOrderResolver {
	@Mutation(() => FarmerOrder)
	@UseMiddleware(isAuth)
	async createFarmerOrder(
		@Arg('placemark', () => PlacemarkInput) placemark: PlacemarkInput,
		@Arg('products', () => [FarmerProductsInput])
		products: FarmerProductsInput[],
		@Ctx() { req }: MyContext
	): Promise<FarmerOrder> {
		return FarmerOrder.create({
			placemark,
			products,
			ownerId: req.session.userId
		}).save()
	}

	@Query(() => [FarmerOrder])
	@UseMiddleware(isAuth)
	async getAllFarmerOrders(): Promise<FarmerOrder[]> {
		return FarmerOrder.createQueryBuilder('o')
			.innerJoinAndSelect('o.owner', 'u', 'u.id = o."ownerId"')
			.andWhere('o.status = :status', { status: 'show' })
			.getMany()
	}

	@Query(() => [FarmerOrder])
	@UseMiddleware(isAuth)
	async getMyFarmerOrders(@Ctx() { req }: MyContext): Promise<FarmerOrder[]> {
		return FarmerOrder.find({ where: { ownerId: req.session.userId } })
	}

	@Mutation(() => FarmerOrder)
	@UseMiddleware(isAuth)
	async changeFarmerOrderStatus(
		@Arg('orderId', () => Int) orderId: number,
		@Ctx() { req }: MyContext
	): Promise<FarmerOrder> {
		try {
			const order = await FarmerOrder.findOne({
				where: { id: orderId, ownerId: req.session.userId }
			})

			if (!order) throw new Error('Заказ не найден')

			await FarmerOrder.update(orderId, {
				status: order.status === 'show' ? 'hide' : 'show'
			})

			const updatedOrder = await FarmerOrder.findOne({
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
	async deleteFarmerOrder(
		@Arg('orderId', () => Int) orderId: number,
		@Ctx() { req }: MyContext
	): Promise<Boolean> {
		try {
			const order = await FarmerOrder.findOne({
				where: { id: orderId, ownerId: req.session.userId }
			})

			if (!order) throw new Error('Заказ не найден')

			await FarmerOrder.delete(orderId)

			return true
		} catch (error) {
			throw error
		}
	}

	@Query(() => [FarmerOrder])
	async farmerOrders(
		@Arg('ownerId', () => Int) ownerId: number
	): Promise<FarmerOrder[]> {
		try {
			const user = await User.findOne({
				where: { id: ownerId, role: 'farmer' }
			})
			if (!user) throw new Error('Пользователь не найден')
			const orders = await FarmerOrder.find({ where: { ownerId } })
			if (!orders) return []
			return orders
		} catch (error) {
			throw error
		}
	}
}
