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
import { FarmerOrdersQuery } from '../../../../generated/graphql'

interface Props {
	orders?: FarmerOrdersQuery
	fetching: boolean
}

const TableFarmerOrders: FC<Props> = ({ orders, fetching }) => {
	return (
		<Box maxW='900px' w='80%' mt={10}>
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
			) : orders?.farmerOrders.length ? (
				<Table>
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Продукты</Th>
							<Th>Адрес</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders.farmerOrders.map((order, key) => (
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
					<Text>Выставленных на карту продуктов нет</Text>
				</Center>
			)}
		</Box>
	)
}

export default TableFarmerOrders
