import { FC } from 'react'
import { Box, Text, Divider } from '@chakra-ui/react'
import { TableOrders } from '../../components'
import { useGetMyOrdersQuery } from '../../../../generated/graphql'
import { isServer } from '../../../../helpers/isServer'

const BuyerOrders: FC = () => {
	const [{ fetching, data }] = useGetMyOrdersQuery({
		pause: isServer()
	})
	return (
		<Box w='100%' mt={10}>
			<Text fontSize='3xl' textAlign='center'>
				Ваши заказы
			</Text>
			<Divider mt={4} />
			<Box w='100%' overflowX='scroll'>
				<TableOrders fetching={fetching} orders={data} />
			</Box>
		</Box>
	)
}

export default BuyerOrders
