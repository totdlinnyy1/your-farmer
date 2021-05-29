import { VStack } from '@chakra-ui/layout'
import { FC } from 'react'
import { Order } from '../../../../components'

const OrdersList: FC = () => {
	return (
		<VStack spacing='20px'>
			<Order owner={{ name: 'Данил', lastname: 'Балцевич', id: 1 }} />
		</VStack>
	)
}

export default OrdersList
