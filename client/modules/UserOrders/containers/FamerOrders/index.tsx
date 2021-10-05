import { Box, Divider, Text, Center } from '@chakra-ui/react'
import { FC } from 'react'
import { useFarmerOrdersQuery } from '../../../../generated/graphql'
import { TableFarmerOrders } from '../../components'

interface Props {
	ownerId: number
}

const FarmerOrders: FC<Props> = ({ ownerId }) => {
	const [{ fetching, data }] = useFarmerOrdersQuery({ variables: { ownerId } })
	return (
		<Box mt={10}>
			<Text fontSize='3xl' textAlign='center'>
				Продукты выставленные на карту
			</Text>
			<Divider mt={4} />
			<Center w='100%'>
				<TableFarmerOrders fetching={fetching} orders={data} />
			</Center>
		</Box>
	)
}

export default FarmerOrders
