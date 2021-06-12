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
}
