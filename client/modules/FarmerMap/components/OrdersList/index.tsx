import { Box, VStack, Spinner, Center } from '@chakra-ui/react'
import { FC } from 'react'
import { Order } from '../../../../components'
import { GetAllOrdersQuery } from '../../../../generated/graphql'
import { MoreAboutOrderProps } from '../../../../types/moreAboutOrder'
import { OrderProduct } from '../../../../types/orderProduct'

interface Props {
	fetching: boolean
	orders?: GetAllOrdersQuery
	setFocusPlacemark: (coordinates: number[]) => void
	setFocusOrder: (orderId: number) => void
	setMoreAboutOrder: (data: MoreAboutOrderProps) => void
	focusOrder?: number
	onOpen: () => void
}

const OrdersList: FC<Props> = ({
	fetching,
	orders,
	onOpen,
	focusOrder,
	setFocusPlacemark,
	setFocusOrder,
	setMoreAboutOrder
}) => {
	return (
		<Box w='100%'>
			<VStack spacing='20px'>
				{fetching ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					orders?.getAllOrders.map(order => (
						<Order
							key={order.id}
							owner={order.owner}
							orderId={order.id}
							products={order.products as OrderProduct[]}
							onOpen={onOpen}
							focusId={focusOrder}
							setFocusPlacemark={setFocusPlacemark}
							setFocusOrder={setFocusOrder}
							setMoreAboutOrder={setMoreAboutOrder}
							placemark={order.placemark}
						/>
					))
				)}
			</VStack>
		</Box>
	)
}

export default OrdersList
