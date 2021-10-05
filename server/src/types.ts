import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { InputType, Field, Float, ObjectType } from 'type-graphql'

export type MyContext = {
	req: Request & {
		session?: Session & Partial<SessionData> & { userId?: number }
	}
	res: Response
}

@InputType()
export class PlacemarkInput {
	@Field(() => String)
	address: string

	@Field(() => [Float])
	coordinates: number[]
}

@ObjectType()
export class Placemark {
	@Field(() => String)
	address!: string

	@Field(() => [Float])
	coordinates!: number[]
}

