export interface MoreAboutOrderProps {
	owner: {
		id: number
		name: string
		lastname: String
		avatarUrl?: string | null
		number: string
	}
	products: {
		label: string
		coast?: number
		count: number
		class: string
		amount: string
	}[]
	adrress: string
}
