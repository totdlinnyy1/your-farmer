import { Center, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { FC } from 'react'
import { FarmerOrder } from '../../../../components'
import { GetAllFarmerOrdersQuery } from '../../../../generated/graphql'
import { OrderProduct } from '../../../../types/orderProduct'
import { MoreAboutOrderProps } from '../../../../types/moreAboutOrder'

interface Props {
	fetching: boolean
	orders?: GetAllFarmerOrdersQuery
	setFocusPlacemark: (coordinates: number[]) => void
	setFocusOrder: (orderId: number) => void
	setMoreAboutOrder: (data: MoreAboutOrderProps) => void
	focusOrder?: number
	onOpen: () => void
}

const OrdersList: FC<Props> = ({
	fetching,
	orders,
	setFocusPlacemark,
	setFocusOrder,
	focusOrder,
	setMoreAboutOrder,
	onOpen
}) => {
	return (
		<VStack spacing='20px'>
			{fetching ? (
				<Center>
					<Spinner />
				</Center>
			) : (
				orders?.getAllFarmerOrders.map(order => (
					<FarmerOrder
						key={order.id}
						orderId={order.id}
						focusId={focusOrder}
						owner={order.owner}
						products={order.products as OrderProduct[]}
						placemark={order.placemark}
						setFocusPlacemark={setFocusPlacemark}
						setFocusOrder={setFocusOrder}
						setMoreAboutOrder={setMoreAboutOrder}
						onOpen={onOpen}
					/>
				))
			)}
		</VStack>
	)
}

export default OrdersList
