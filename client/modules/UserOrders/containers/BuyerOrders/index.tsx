import { FC } from 'react'
import { Box, Text, Divider, Center } from '@chakra-ui/react'
import { TableOrders } from '../../components'
import { useBuyerOrdersQuery } from '../../../../generated/graphql'

interface Props {
	ownerId: number
}

const BuyerOrders: FC<Props> = ({ ownerId }) => {
	const [{ fetching, data }] = useBuyerOrdersQuery({ variables: { ownerId } })
	return (
		<Box w='100%' mt={10}>
			<Text fontSize='3xl' textAlign='center'>
				Заказы
			</Text>
			<Divider mt={4} />
			<Center w='100%'>
				<TableOrders fetching={fetching} orders={data} />
			</Center>
		</Box>
	)
}

export default BuyerOrders
