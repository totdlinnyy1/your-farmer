import { Review } from '../entities/Review'
import { isAuth } from '../middleware/isAuth'
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { MyContext } from '../types'
import { User } from '../entities/User'
import { getConnection } from 'typeorm'

@Resolver()
export class ReviewResolver {
	@Mutation(() => Review)
	@UseMiddleware(isAuth)
	async createReview(
		@Arg('text', () => String, { nullable: true }) text: string,
		@Arg('farmerId', () => Int) farmerId: number,
		@Arg('mark', () => Int) mark: number,
		@Ctx() { req }: MyContext
	): Promise<Review> {
		try {
			if (mark < 0.0 || mark > 5.0)
				throw new Error('Оценка не может быть меньше 0 и больше 5')

			const owner = await User.findOne(req.session.userId)
			if (owner && owner.role === 'farmer')
				throw new Error('Только покупатели могут оставлять отзыв')

			let farmer = await User.findOne(farmerId)

			if (!farmer) throw new Error('Фермер не найден')

			let review = await Review.create({
				text,
				mark,
				ownerId: req.session.userId,
				farmerId
			}).save()
			await getConnection()
				.getRepository(User)
				.increment({ id: farmerId }, 'reviewsCount', 1)

			await getConnection()
				.getRepository(User)
				.increment({ id: farmerId }, 'rating', mark)

			farmer = await User.findOne(farmerId)

			if (!farmer) throw new Error('Фермер не найден')

			await User.update(farmerId, {
				averageRating: farmer.rating / farmer.reviewsCount
			})

			review = (await Review.findOne(review.id, {
				relations: ['owner']
			})) as Review

			return review
		} catch (error) {
			throw error
		}
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteReview(
		@Arg('reviewId', () => Int) reviewId: number,
		@Arg('farmerId', () => Int) farmerId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		try {
			const review = await Review.findOne({
				where: { id: reviewId, farmerId, ownerId: req.session.userId }
			})

			if (!review) throw new Error('Отзыв не найден')

			await Review.delete(reviewId)

			return true
		} catch (error) {
			throw error
		}
	}

	@Query(() => [Review])
	async getFarmerReviews(
		@Arg('farmerId', () => Int) farmerId: number
	): Promise<Review[]> {
		try {
			const farmer = await User.findOne(farmerId)
			if (!farmer) throw new Error('Фермер не найден')
			return Review.find({ where: { farmerId }, relations: ['owner'] })
		} catch (error) {
			throw error
		}
	}
}
