import {
	Box,
	Center,
	ListItem,
	OrderedList,
	Skeleton,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'
import { FC } from 'react'
import { BuyerOrdersQuery } from '../../../../generated/graphql'

interface Props {
	orders?: BuyerOrdersQuery
	fetching: boolean
}

const TableOrders: FC<Props> = ({ orders, fetching }) => {
	return (
		<Box w='80%' maxW='900px' mt={10}>
			{fetching ? (
				<Box h='200px' w='100%'>
					<Stack>
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
						<Skeleton height='20px' />
					</Stack>
				</Box>
			) : orders?.buyerOrders.length ? (
				<Table>
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Продукты</Th>
							<Th>Адрес</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders.buyerOrders.map((order, key) => (
							<Tr key={key}>
								<Td>{key + 1}</Td>
								<Td>
									<OrderedList>
										{order.products.map((product, key) => (
											<ListItem key={key}>
												{product.label} ({product.count}
												{product.amount})
											</ListItem>
										))}
									</OrderedList>
								</Td>
								<Td maxW='200px'>{order.placemark.address}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<Center w='100%' h='200px'>
					<Text>Заказов нет</Text>
				</Center>
			)}
		</Box>
	)
}

export default TableOrders
