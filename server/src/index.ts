import 'reflect-metadata'
import 'dotenv-safe/config'
import express from 'express'
import { createConnection } from 'typeorm'
import { __prod__ } from './constans'
import { Product } from './entities/Product'
import path from 'path'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { ProductResolver } from './resolvers/product'
import { User } from './entities/User'
import { UserResolver } from './resolvers/user'
import { MyContext } from './types'
import { FarmerOrder } from './entities/FarmerOrder'
import { FarmerOrderResolver } from './resolvers/farmerorder'
import { Order } from './entities/Order'
import { OrderResolver } from './resolvers/order'
import { Review } from './entities/Review'
import { ReviewResolver } from './resolvers/review'

const PORT = process.env.PORT || 4000

const main = async () => {
	await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		synchronize: true,
		logging: true,
		migrations: [path.join(__dirname, './migrations/*')],
		entities: [Product, User, FarmerOrder, Order, Review]
	})

	const app = express()

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true
		})
	)

	const RedisStore = connectRedis(session)
	const redisClient = new Redis({
		host: process.env.REDIS_URL,
		password: process.env.REDIS_PASSWORD,
		port: 13003
	})

	app.use(
		session({
			name: 'kit',
			store: new RedisStore({
				client: redisClient,
				disableTouch: true
			}),
			cookie: {
				maxAge: 60000 * 60 * 24 * 365,
				httpOnly: true,
				secure: __prod__,
				sameSite: 'lax'
			},
			saveUninitialized: false,
			secret: 'kat',
			resave: false
		})
	)

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				ProductResolver,
				UserResolver,
				FarmerOrderResolver,
				OrderResolver,
				ReviewResolver
			],
			validate: false
		}),
		context: ({ req, res }): MyContext => ({ req, res })
	})

	apolloServer.applyMiddleware({ app, cors: false })

	app.get('/', (_, res) => {
		res.send('Hello world!')
	})

	app.listen(PORT, () => {
		console.log(`server started on port ${PORT}`)
	})
}

main().catch(error => console.log(error))
