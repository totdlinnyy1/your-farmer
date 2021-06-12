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
	DeleteProductMutation
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
								if (result.login.errors) {
									return query
								}
								return {
									me: result.login.user
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
								if (result.register.errors) {
									return query
								}
								return {
									me: result.register.user
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
					}
				}
			}
		}),
		ssrExchange,
		fetchExchange
	]
})
