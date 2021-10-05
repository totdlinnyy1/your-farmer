import Link from 'next/link'
import {
	Flex,
	Box,
	Text,
	Button,
	Avatar,
	Table,
	HStack,
	Thead,
	Tbody,
	Tr,
	Th,
	Td
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { MapComponent, OrdersList } from '../components'
import { useGetAllOrdersQuery } from '../../../generated/graphql'
import { MoreAboutOrderProps } from '../../../types/moreAboutOrder'
import { ModalWindow } from '../../../components'

const FarmerMap: FC = () => {
	const [focusPlacemark, setFocusPlacemark] = useState<number[]>([])
	const [focusOrder, setFocusOrder] = useState<number>()
	const [moreAboutOrder, setMoreAboutOrder] = useState<MoreAboutOrderProps>()
	const [showNumber, setShowNumber] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [{ fetching, data }] = useGetAllOrdersQuery()
	const onOpen = () => setIsOpen(true)
	const onClose = () => {
		setIsOpen(false)
		setShowNumber(false)
	}

	const isSmallerThen993 = useMediaQuery({ maxDeviceWidth: 993 })

	return (
		<Box my='40px'>
			<Text fontSize='3xl' textAlign='center' my='20px'>
				Заказы покупателей
			</Text>
			<Flex
				h={isSmallerThen993 ? '1200px' : '600px'}
				bg='gray.100'
				border='2px dashed red'
				borderRadius='4px'
				flexDirection={isSmallerThen993 ? 'column' : undefined}
			>
				<Box w={isSmallerThen993 ? '100%' : '70%'} h='600px'>
					<MapComponent
						focusPlacemark={focusPlacemark}
						setFocusOrder={setFocusOrder}
						orders={data}
					/>
				</Box>
				<Box w={isSmallerThen993 ? '100%' : '30%'} h='600px' py={3}>
					<Flex
						justifyContent='space-between'
						h='full'
						w='full'
						flexDirection='column'
					>
						<Box>
							<OrdersList
								fetching={fetching}
								orders={data}
								setFocusPlacemark={setFocusPlacemark}
								focusOrder={focusOrder}
								setMoreAboutOrder={setMoreAboutOrder}
								setFocusOrder={setFocusOrder}
								onOpen={onOpen}
							/>
						</Box>
						<Box m='0 auto'>
							<Link href='/new'>
								<a>
									<Button colorScheme='purple'>Добавить товары на карту</Button>
								</a>
							</Link>
						</Box>
					</Flex>
				</Box>
			</Flex>
			<ModalWindow headerText='Подробнее' isOpen={isOpen} onClose={onClose}>
				{moreAboutOrder && (
					<Box>
						<Link href={`/profile/${moreAboutOrder.owner.id}`}>
							<a>
								<HStack mb={3}>
									<Avatar
										src={moreAboutOrder.owner.avatarUrl as string | undefined}
										name={`${moreAboutOrder.owner.name} ${moreAboutOrder.owner.lastname}`}
									/>
									<Text>{`${moreAboutOrder.owner.name} ${moreAboutOrder.owner.lastname}`}</Text>
								</HStack>
							</a>
						</Link>
						<HStack mb={3}>
							<Text>Номер телефона:</Text>
							{showNumber ? (
								<Text>+7{moreAboutOrder.owner.number}</Text>
							) : (
								<Button onClick={() => setShowNumber(true)}>
									Показать номер
								</Button>
							)}
						</HStack>
						<Box mb={3}>
							<Text>Адрес: {moreAboutOrder.adrress}</Text>
						</Box>
						<Box>
							<Text>Продукты:</Text>
							<Table>
								<Thead>
									<Tr>
										<Th>#</Th>
										<Th>Продукт</Th>
										<Th>Количество</Th>
									</Tr>
								</Thead>
								<Tbody>
									{moreAboutOrder.products.map((product, key) => (
										<Tr key={key}>
											<Td>{key + 1}</Td>
											<Td>{product.label}</Td>
											<Td>{`${product.count} ${product.amount}`}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</Box>
					</Box>
				)}
			</ModalWindow>
		</Box>
	)
}

export default FarmerMap
