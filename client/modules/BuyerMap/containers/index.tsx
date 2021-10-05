import Link from 'next/link'
import {
	Flex,
	Box,
	Text,
	Button,
	useDisclosure,
	HStack,
	Avatar,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { MapComponent, OrdersList } from '../components'
import { useGetAllFarmerOrdersQuery } from '../../../generated/graphql'
import { ModalWindow } from '../../../components'
import { MoreAboutOrderProps } from '../../../types/moreAboutOrder'
import { useMediaQuery } from 'react-responsive'

const BuyerMap: FC = () => {
	const [focusPlacemark, setFocusPlacemark] = useState<number[]>([])
	const [focusOrder, setFocusOrder] = useState<number>()
	const [moreAboutOrder, setMoreAboutOrder] = useState<MoreAboutOrderProps>()
	const [showNumber, setShowNumber] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [{ fetching, data }] = useGetAllFarmerOrdersQuery()
	const onOpen = () => setIsOpen(true)
	const onClose = () => {
		setIsOpen(false)
		setShowNumber(false)
	}

	const isSmallerThen993 = useMediaQuery({ maxDeviceWidth: 993 })
	return (
		<Box my='40px'>
			<Text fontSize='3xl' textAlign='center' my='20px'>
				Продукты фермеров
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
						orders={data}
						focusPlacemark={focusPlacemark}
						setFocusOrder={setFocusOrder}
					/>
				</Box>
				<Box w={isSmallerThen993 ? '100%' : '30%'} h='600px' py={3}>
					<Flex
						justifyContent='space-between'
						h='full'
						w='full'
						flexDirection='column'
					>
						<Box overflowY='scroll' height='90%'>
							<OrdersList
								fetching={fetching}
								orders={data}
								setFocusPlacemark={setFocusPlacemark}
								focusOrder={focusOrder}
								setFocusOrder={setFocusOrder}
								setMoreAboutOrder={setMoreAboutOrder}
								onOpen={onOpen}
							/>
						</Box>
						<Box m='0 auto'>
							<Link href='/new'>
								<a>
									<Button colorScheme='purple'>Сделать заказ</Button>
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
										<Th>Цена</Th>
										<Th>Кол..</Th>
									</Tr>
								</Thead>
								<Tbody>
									{moreAboutOrder.products.map((product, key) => (
										<Tr key={key}>
											<Td>{key + 1}</Td>
											<Td>{product.label}</Td>
											<Td>{`${product.coast} р/${product.amount}`}</Td>
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

export default BuyerMap
