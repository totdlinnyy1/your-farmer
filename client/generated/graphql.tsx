import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
}

export type ErrorField = {
	__typename?: 'ErrorField'
	message: Scalars['String']
}

export type FarmerOrder = {
	__typename?: 'FarmerOrder'
	id: Scalars['Int']
	ownerId: Scalars['Int']
	owner: User
	placemark: Placemark
	products: Array<FarmerProduct>
	status: Scalars['String']
	createdAt: Scalars['String']
	updatedAt: Scalars['String']
}

export type FarmerProduct = {
	__typename?: 'FarmerProduct'
	label: Scalars['String']
	coast: Scalars['Int']
	value: Scalars['String']
	class: Scalars['String']
	amount: Scalars['String']
	productImage?: Maybe<Scalars['String']>
	count: Scalars['Float']
}

export type FarmerProductsInput = {
	label: Scalars['String']
	coast: Scalars['Int']
	value: Scalars['String']
	class: Scalars['String']
	amount: Scalars['String']
	productImage?: Maybe<Scalars['String']>
	count: Scalars['Float']
}

export type LoginInput = {
	email: Scalars['String']
	password: Scalars['String']
}

export type Mutation = {
	__typename?: 'Mutation'
	createProduct: Product
	product: Product
	updateProduct: Product
	deleteProduct: Scalars['Boolean']
	register: UserResponse
	login: UserResponse
	logout: Scalars['Boolean']
	createFarmerOrder: FarmerOrder
	createOrder: Order
}

export type MutationCreateProductArgs = {
	options: ProductInput
}

export type MutationProductArgs = {
	productId: Scalars['Int']
}

export type MutationUpdateProductArgs = {
	coast: Scalars['Int']
	productId: Scalars['Int']
}

export type MutationDeleteProductArgs = {
	productId: Scalars['Int']
}

export type MutationRegisterArgs = {
	options: RegisterInput
}

export type MutationLoginArgs = {
	options: LoginInput
}

export type MutationCreateFarmerOrderArgs = {
	products: Array<FarmerProductsInput>
	placemark: PlacemarkInput
}

export type MutationCreateOrderArgs = {
	products: Array<ProductsInput>
	placemark: PlacemarkInput
}

export type Order = {
	__typename?: 'Order'
	id: Scalars['Int']
	ownerId: Scalars['Int']
	owner: User
	placemark: Placemark
	products: Array<Product>
	status: Scalars['String']
	createdAt: Scalars['String']
	updatedAt: Scalars['String']
}

export type Placemark = {
	__typename?: 'Placemark'
	address: Scalars['String']
	coordinates: Array<Scalars['Float']>
}

export type PlacemarkInput = {
	address: Scalars['String']
	coordinates: Array<Scalars['Float']>
}

export type Product = {
	__typename?: 'Product'
	id: Scalars['Int']
	label: Scalars['String']
	coast: Scalars['Int']
	value: Scalars['String']
	class: Scalars['String']
	amount: Scalars['String']
	productImage?: Maybe<Scalars['String']>
	ownerId: Scalars['Float']
	createdAt: Scalars['String']
	updatedAt: Scalars['String']
}

export type ProductInput = {
	label: Scalars['String']
	coast: Scalars['Int']
	amount: Scalars['String']
	class: Scalars['String']
	value: Scalars['String']
	productImage?: Maybe<Scalars['String']>
}

export type ProductsInput = {
	label: Scalars['String']
	value: Scalars['String']
	class: Scalars['String']
	amount: Scalars['String']
	count: Scalars['Float']
}

export type Query = {
	__typename?: 'Query'
	products: Array<Product>
	myProducts: Array<Product>
	me?: Maybe<User>
	getUser: UserResponse
	getAllFarmerOrders: Array<FarmerOrder>
	getMyFarmerOrders: Array<FarmerOrder>
	getAllOrders: Array<Order>
	getMyOrders: Array<Order>
}

export type QueryGetUserArgs = {
	id: Scalars['Int']
}

export type RegisterInput = {
	name: Scalars['String']
	lastname: Scalars['String']
	email: Scalars['String']
	number: Scalars['String']
	role: Scalars['String']
	password: Scalars['String']
}

export type User = {
	__typename?: 'User'
	id: Scalars['Int']
	email: Scalars['String']
	name: Scalars['String']
	lastname: Scalars['String']
	number: Scalars['String']
	role: Scalars['String']
	avatarUrl?: Maybe<Scalars['String']>
	createdAt: Scalars['String']
	updatedAt: Scalars['String']
}

export type UserResponse = {
	__typename?: 'UserResponse'
	errors?: Maybe<Array<ErrorField>>
	user?: Maybe<User>
}

export type CreateFarmerOrderMutationVariables = Exact<{
	products: Array<FarmerProductsInput> | FarmerProductsInput
	placemark: PlacemarkInput
}>

export type CreateFarmerOrderMutation = { __typename?: 'Mutation' } & {
	createFarmerOrder: { __typename?: 'FarmerOrder' } & Pick<FarmerOrder, 'id'>
}

export type CreateOrderMutationVariables = Exact<{
	products: Array<ProductsInput> | ProductsInput
	placemark: PlacemarkInput
}>

export type CreateOrderMutation = { __typename?: 'Mutation' } & {
	createOrder: { __typename?: 'Order' } & Pick<Order, 'id'>
}

export type CreateProductMutationVariables = Exact<{
	label: Scalars['String']
	amount: Scalars['String']
	coast: Scalars['Int']
	class: Scalars['String']
	value: Scalars['String']
	productImage?: Maybe<Scalars['String']>
}>

export type CreateProductMutation = { __typename?: 'Mutation' } & {
	createProduct: { __typename?: 'Product' } & Pick<
		Product,
		'label' | 'id' | 'ownerId' | 'coast' | 'amount' | 'class' | 'value'
	>
}

export type DeleteProductMutationVariables = Exact<{
	productId: Scalars['Int']
}>

export type DeleteProductMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'deleteProduct'
>

export type LoginMutationVariables = Exact<{
	email: Scalars['String']
	password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
	login: { __typename?: 'UserResponse' } & {
		errors?: Maybe<
			Array<{ __typename?: 'ErrorField' } & Pick<ErrorField, 'message'>>
		>
		user?: Maybe<
			{ __typename?: 'User' } & Pick<
				User,
				'id' | 'name' | 'lastname' | 'email' | 'role' | 'number' | 'avatarUrl'
			>
		>
	}
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'logout'
>

export type ProductMutationVariables = Exact<{
	productId: Scalars['Int']
}>

export type ProductMutation = { __typename?: 'Mutation' } & {
	product: { __typename?: 'Product' } & Pick<
		Product,
		'label' | 'amount' | 'coast'
	>
}

export type RegisterMutationVariables = Exact<{
	name: Scalars['String']
	lastname: Scalars['String']
	email: Scalars['String']
	role: Scalars['String']
	number: Scalars['String']
	password: Scalars['String']
}>

export type RegisterMutation = { __typename?: 'Mutation' } & {
	register: { __typename?: 'UserResponse' } & {
		errors?: Maybe<
			Array<{ __typename?: 'ErrorField' } & Pick<ErrorField, 'message'>>
		>
		user?: Maybe<
			{ __typename?: 'User' } & Pick<
				User,
				'id' | 'name' | 'lastname' | 'email' | 'role' | 'number' | 'avatarUrl'
			>
		>
	}
}

export type UpdateProductMutationVariables = Exact<{
	productId: Scalars['Int']
	coast: Scalars['Int']
}>

export type UpdateProductMutation = { __typename?: 'Mutation' } & {
	updateProduct: { __typename?: 'Product' } & Pick<Product, 'id' | 'coast'>
}

export type GetAllFarmerOrdersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllFarmerOrdersQuery = { __typename?: 'Query' } & {
	getAllFarmerOrders: Array<
		{ __typename?: 'FarmerOrder' } & Pick<FarmerOrder, 'id' | 'ownerId'> & {
				products: Array<
					{ __typename?: 'FarmerProduct' } & Pick<
						FarmerProduct,
						'label' | 'class' | 'amount' | 'coast' | 'count'
					>
				>
				placemark: { __typename?: 'Placemark' } & Pick<
					Placemark,
					'address' | 'coordinates'
				>
				owner: { __typename?: 'User' } & Pick<
					User,
					'id' | 'name' | 'lastname' | 'number' | 'avatarUrl'
				>
			}
	>
}

export type GetMyFarmerOrdersQueryVariables = Exact<{ [key: string]: never }>

export type GetMyFarmerOrdersQuery = { __typename?: 'Query' } & {
	getMyFarmerOrders: Array<
		{ __typename?: 'FarmerOrder' } & Pick<FarmerOrder, 'id' | 'status'> & {
				products: Array<
					{ __typename?: 'FarmerProduct' } & Pick<
						FarmerProduct,
						'label' | 'amount' | 'count' | 'coast'
					>
				>
				placemark: { __typename?: 'Placemark' } & Pick<Placemark, 'address'>
			}
	>
}

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never }>

export type GetMyOrdersQuery = { __typename?: 'Query' } & {
	getMyOrders: Array<
		{ __typename?: 'Order' } & Pick<Order, 'id' | 'status'> & {
				products: Array<
					{ __typename?: 'product' } & Pick<
						Product,
						'label' | 'amount' | 'count'
					>
				>
				placemark: { __typename?: 'Placemark' } & Pick<Placemark, 'address'>
			}
	>
}

export type GetUserQueryVariables = Exact<{
	id: Scalars['Int']
}>

export type GetUserQuery = { __typename?: 'Query' } & {
	getUser: { __typename?: 'UserResponse' } & {
		user?: Maybe<
			{ __typename?: 'User' } & Pick<
				User,
				'id' | 'name' | 'lastname' | 'number' | 'role' | 'avatarUrl'
			>
		>
		errors?: Maybe<
			Array<{ __typename?: 'ErrorField' } & Pick<ErrorField, 'message'>>
		>
	}
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
	me?: Maybe<
		{ __typename?: 'User' } & Pick<
			User,
			'id' | 'email' | 'name' | 'lastname' | 'number' | 'avatarUrl' | 'role'
		>
	>
}

export type MyProductsQueryVariables = Exact<{ [key: string]: never }>

export type MyProductsQuery = { __typename?: 'Query' } & {
	myProducts: Array<
		{ __typename?: 'Product' } & Pick<
			Product,
			'id' | 'label' | 'coast' | 'amount' | 'value' | 'class' | 'productImage'
		>
	>
}

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllOrdersQuery = { __typename?: 'Query' } & {
	getAllOrders: Array<
		{ __typename?: 'Order' } & Pick<Order, 'id'> & {
				owner: { __typename?: 'User' } & Pick<
					User,
					'id' | 'name' | 'lastname' | 'number' | 'avatarUrl'
				>
				products: Array<
					{ __typename?: 'product' } & Pick<
						Product,
						'label' | 'amount' | 'class' | 'count'
					>
				>
				placemark: { __typename?: 'Placemark' } & Pick<
					Placemark,
					'address' | 'coordinates'
				>
			}
	>
}

export const CreateFarmerOrderDocument = gql`
	mutation CreateFarmerOrder(
		$products: [FarmerProductsInput!]!
		$placemark: PlacemarkInput!
	) {
		createFarmerOrder(products: $products, placemark: $placemark) {
			id
		}
	}
`

export function useCreateFarmerOrderMutation() {
	return Urql.useMutation<
		CreateFarmerOrderMutation,
		CreateFarmerOrderMutationVariables
	>(CreateFarmerOrderDocument)
}
export const CreateOrderDocument = gql`
	mutation CreateOrder(
		$products: [ProductsInput!]!
		$placemark: PlacemarkInput!
	) {
		createOrder(products: $products, placemark: $placemark) {
			id
		}
	}
`

export function useCreateOrderMutation() {
	return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
		CreateOrderDocument
	)
}
export const CreateProductDocument = gql`
	mutation CreateProduct(
		$label: String!
		$amount: String!
		$coast: Int!
		$class: String!
		$value: String!
		$productImage: String
	) {
		createProduct(
			options: {
				label: $label
				amount: $amount
				coast: $coast
				class: $class
				value: $value
				productImage: $productImage
			}
		) {
			label
			id
			ownerId
			coast
			amount
			class
			value
		}
	}
`

export function useCreateProductMutation() {
	return Urql.useMutation<
		CreateProductMutation,
		CreateProductMutationVariables
	>(CreateProductDocument)
}
export const DeleteProductDocument = gql`
	mutation DeleteProduct($productId: Int!) {
		deleteProduct(productId: $productId)
	}
`

export function useDeleteProductMutation() {
	return Urql.useMutation<
		DeleteProductMutation,
		DeleteProductMutationVariables
	>(DeleteProductDocument)
}
export const LoginDocument = gql`
	mutation Login($email: String!, $password: String!) {
		login(options: { email: $email, password: $password }) {
			errors {
				message
			}
			user {
				id
				name
				lastname
				email
				role
				number
				avatarUrl
			}
		}
	}
`

export function useLoginMutation() {
	return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`

export function useLogoutMutation() {
	return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument
	)
}
export const ProductDocument = gql`
	mutation Product($productId: Int!) {
		product(productId: $productId) {
			label
			amount
			coast
		}
	}
`

export function useProductMutation() {
	return Urql.useMutation<ProductMutation, ProductMutationVariables>(
		ProductDocument
	)
}
export const RegisterDocument = gql`
	mutation Register(
		$name: String!
		$lastname: String!
		$email: String!
		$role: String!
		$number: String!
		$password: String!
	) {
		register(
			options: {
				name: $name
				lastname: $lastname
				email: $email
				role: $role
				number: $number
				password: $password
			}
		) {
			errors {
				message
			}
			user {
				id
				name
				lastname
				email
				role
				number
				avatarUrl
			}
		}
	}
`

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument
	)
}
export const UpdateProductDocument = gql`
	mutation UpdateProduct($productId: Int!, $coast: Int!) {
		updateProduct(productId: $productId, coast: $coast) {
			id
			coast
		}
	}
`

export function useUpdateProductMutation() {
	return Urql.useMutation<
		UpdateProductMutation,
		UpdateProductMutationVariables
	>(UpdateProductDocument)
}
export const GetAllFarmerOrdersDocument = gql`
	query GetAllFarmerOrders {
		getAllFarmerOrders {
			id
			ownerId
			products {
				label
				class
				amount
				coast
				count
			}
			placemark {
				address
				coordinates
			}
			owner {
				id
				name
				lastname
				number
				avatarUrl
			}
		}
	}
`

export function useGetAllFarmerOrdersQuery(
	options: Omit<
		Urql.UseQueryArgs<GetAllFarmerOrdersQueryVariables>,
		'query'
	> = {}
) {
	return Urql.useQuery<GetAllFarmerOrdersQuery>({
		query: GetAllFarmerOrdersDocument,
		...options
	})
}
export const GetMyFarmerOrdersDocument = gql`
	query GetMyFarmerOrders {
		getMyFarmerOrders {
			id
			status
			products {
				label
				amount
				count
				coast
			}
			placemark {
				address
			}
		}
	}
`

export function useGetMyFarmerOrdersQuery(
	options: Omit<
		Urql.UseQueryArgs<GetMyFarmerOrdersQueryVariables>,
		'query'
	> = {}
) {
	return Urql.useQuery<GetMyFarmerOrdersQuery>({
		query: GetMyFarmerOrdersDocument,
		...options
	})
}
export const GetMyOrdersDocument = gql`
	query GetMyOrders {
		getMyOrders {
			id
			status
			products {
				label
				amount
				count
			}
			placemark {
				address
			}
		}
	}
`

export function useGetMyOrdersQuery(
	options: Omit<Urql.UseQueryArgs<GetMyOrdersQueryVariables>, 'query'> = {}
) {
	return Urql.useQuery<GetMyOrdersQuery>({
		query: GetMyOrdersDocument,
		...options
	})
}
export const GetUserDocument = gql`
	query GetUser($id: Int!) {
		getUser(id: $id) {
			user {
				id
				name
				lastname
				number
				role
				avatarUrl
			}
			errors {
				message
			}
		}
	}
`

export function useGetUserQuery(
	options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}
) {
	return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options })
}
export const MeDocument = gql`
	query Me {
		me {
			id
			email
			name
			lastname
			number
			avatarUrl
			role
		}
	}
`

export function useMeQuery(
	options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
	return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
export const MyProductsDocument = gql`
	query MyProducts {
		myProducts {
			id
			label
			coast
			amount
			value
			class
			productImage
		}
	}
`

export function useMyProductsQuery(
	options: Omit<Urql.UseQueryArgs<MyProductsQueryVariables>, 'query'> = {}
) {
	return Urql.useQuery<MyProductsQuery>({
		query: MyProductsDocument,
		...options
	})
}
export const GetAllOrdersDocument = gql`
	query GetAllOrders {
		getAllOrders {
			id
			owner {
				id
				name
				lastname
				number
				avatarUrl
			}
			products {
				label
				amount
				class
				count
			}
			placemark {
				address
				coordinates
			}
		}
	}
`

export function useGetAllOrdersQuery(
	options: Omit<Urql.UseQueryArgs<GetAllOrdersQueryVariables>, 'query'> = {}
) {
	return Urql.useQuery<GetAllOrdersQuery>({
		query: GetAllOrdersDocument,
		...options
	})
}
