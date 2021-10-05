import { FC } from 'react'
import { Box, Text, Divider } from '@chakra-ui/react'
import { TableFarmerOrders } from '../../components'
import { useGetMyFarmerOrdersQuery } from '../../../../generated/graphql'
import { isServer } from '../../../../helpers/isServer'

const FarmerOrders: FC = () => {
	const [{ fetching, data }] = useGetMyFarmerOrdersQuery({
		pause: isServer()
	})
	return (
		<Box w='100%' mt={10}>
			<Text fontSize='3xl' textAlign='center'>
				Ваши продукты выставленные на карту
			</Text>
			<Divider mt={4} />
			<Box w='100%' overflowX='scroll'>
				<TableFarmerOrders fetching={fetching} orders={data} />
			</Box>
		</Box>
	)
}

export default FarmerOrders
