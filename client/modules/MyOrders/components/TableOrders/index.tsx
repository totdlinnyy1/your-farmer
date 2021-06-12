import Link from 'next/link'
import { FC } from 'react'
import {
	Box,
	ButtonGroup,
	Center,
	Icon,
	IconButton,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	OrderedList,
	ListItem,
	Stack,
	Skeleton,
	Button
} from '@chakra-ui/react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { BiHide } from 'react-icons/bi'
import { GetMyOrdersQuery } from '../../../../generated/graphql'
import status from '../../../../helpers/status'

interface Props {
	orders?: GetMyOrdersQuery
	fetching: boolean
}

const TableOrders: FC<Props> = ({ orders, fetching }) => {
	return (
		<Box w='100%' mt={10}>
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
			) : orders?.getMyOrders.length ? (
				<Table>
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Продукты</Th>
							<Th>Адрес</Th>
							<Th>Статус</Th>
							<Th>Действия</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders.getMyOrders.map((order, key) => (
							<Tr key={key}>
								<Td>{key + 1}</Td>
								<Td>
									<OrderedList>
										{order.products.map((product, key) => (
											<ListItem key={key}>{product.label}</ListItem>
										))}
									</OrderedList>
								</Td>
								<Td maxW='200px'>{order.placemark.address}</Td>
								<Td>{status(order.status)}</Td>
								<Td>
									<ButtonGroup>
										<IconButton
											aria-label='edit'
											icon={<Icon as={FiEdit2} />}
										/>
										<IconButton aria-label='hide' icon={<Icon as={BiHide} />} />
										<IconButton
											aria-label='delete'
											colorScheme='red'
											variant='outline'
											icon={<Icon as={FiTrash} />}
										/>
									</ButtonGroup>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<Center w='100%' h='200px'>
					<Box>
						<Text mb={2} textAlign='center'>
							Заказов нет
						</Text>
						<Link href='/new'>
							<a>
								<Button variant='link' colorScheme='blue'>
									Сделть заказ?
								</Button>
							</a>
						</Link>
					</Box>
				</Center>
			)}
		</Box>
	)
}

export default TableOrders
