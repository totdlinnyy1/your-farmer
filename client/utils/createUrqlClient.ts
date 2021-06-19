import { dedupExchange, fetchExchange } from 'urql'
import {
	LogoutMutation,
	MeQuery,
	MeDocument,
	LoginMutation,
	RegisterMutation,
	MyProductsDocument,
	CreateProductMutation,
	MyProductsQuery,
	DeleteProductMutation,
	GetFarmerReviewsDocument,
	GetFarmerReviewsQuery,
	DeleteReviewMutation,
	CreateReviewMutation
} from '../generated/graphql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { betterUpdateQuery } from './betterUpdateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
	url: 'http://localhost:4000/graphql',
	fetchOptions: {
		credentials: 'include' as const
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			keys: {
				product: () => null,
				Placemark: () => null,
				FarmerProduct: () => null,
				UserResponse: () => null,
				FarmerOrder: () => null
			},
			updates: {
				Mutation: {
					logout: (_result, args, cache, info) => {
						betterUpdateQuery<LogoutMutation, MeQuery>(
							cache,
							{
								query: MeDocument
							},
							_result,
							() => ({ me: null })
						)
					},
					login: (_result, args, cache, info) => {
						betterUpdateQuery<LoginMutation, MeQuery>(
							cache,
							{
								query: MeDocument
							},
							_result,
							(result, query) => {
								if (!result.login) {
									return query
								}
								return {
									me: result.login
								}
							}
						)
					},
					register: (_result, args, cache, info) => {
						betterUpdateQuery<RegisterMutation, MeQuery>(
							cache,
							{
								query: MeDocument
							},
							_result,
							(result, query) => {
								if (!result.register) {
									return query
								}
								return {
									me: result.register
								}
							}
						)
					},
					createProduct: (_result, args, cache, info) => {
						betterUpdateQuery<CreateProductMutation, MyProductsQuery>(
							cache,
							{
								query: MyProductsDocument
							},
							_result,
							// @ts-ignore
							(result, query) => {
								if (result.createProduct) {
									result.createProduct['__typename'] = 'Product'
									const myProducts = query.myProducts.push(result.createProduct)
									return {
										myProducts
									}
								}
								return query
							}
						)
					},
					deleteProduct: (_result, args, cache, info) => {
						betterUpdateQuery<DeleteProductMutation, MyProductsQuery>(
							cache,
							{
								query: MyProductsDocument
							},
							_result,
							(result, query) => {
								if (result.deleteProduct) {
									return {
										myProducts: query.myProducts.filter(
											product => product.id !== args.productId
										)
									}
								}
								return query
							}
						)
					},
					createReview: (_result, args, cache, info) => {
						console.log(_result, args, cache)
						betterUpdateQuery<CreateReviewMutation, GetFarmerReviewsQuery>(
							cache,
							{
								query: GetFarmerReviewsDocument,
								variables: { farmerId: args.farmerId }
							},
							_result,
							// @ts-ignore
							(result, query) => {
								if (result.createReview) {
									result.createReview['__typename'] = 'Review'
									const getFarmerReviews = query.getFarmerReviews.push(
										result.createReview
									)
									return {
										getFarmerReviews
									}
								}
								return query
							}
						)
					},
					deleteReview: (_result, args, cache, info) => {
						betterUpdateQuery<DeleteReviewMutation, GetFarmerReviewsQuery>(
							cache,
							{
								query: GetFarmerReviewsDocument,
								variables: { farmerId: args.farmerId }
							},
							_result,
							(result, query) => {
								if (result.deleteReview) {
									return {
										getFarmerReviews: query.getFarmerReviews.filter(
											review => review.id !== args.reviewId
										)
									}
								}
								return query
							}
						)
					}
				}
			}
		}),
		ssrExchange,
		fetchExchange
	]
})
