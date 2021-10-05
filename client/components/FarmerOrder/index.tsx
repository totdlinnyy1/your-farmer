import Link from 'next/link'
import {
	Avatar,
	Box,
	Flex,
	HStack,
	Text,
	Button,
	OrderedList,
	ListItem,
	Center,
	Icon
} from '@chakra-ui/react'
import { FC } from 'react'
import { MdPlace } from 'react-icons/md'
import { OrderProduct } from '../../types/orderProduct'
import { placemark } from '../../types/placemark'
import { MoreAboutOrderProps } from '../../types/moreAboutOrder'

interface Props {
	owner: {
		avatarUrl?: string | null
		name: string
		lastname: string
		id: number
		number: string
	}
	onOpen: () => void
	products: OrderProduct[]
	placemark: placemark
	setFocusPlacemark: (coordinates: number[]) => void
	setFocusOrder: (orderId: number) => void
	setMoreAboutOrder: (data: MoreAboutOrderProps) => void
	focusId?: number
	orderId: number
}

const FarmerOrder: FC<Props> = ({
	owner,
	placemark,
	products,
	setFocusPlacemark,
	setFocusOrder,
	setMoreAboutOrder,
	focusId,
	orderId,
	onOpen
}) => {
	return (
		<Box
			bg='whiteAlpha.900'
			w='97%'
			maxW='500px'
			p={2}
			border={focusId === orderId ? '2px solid red' : undefined}
			shadow={focusId === orderId ? 'xl' : 'md'}
			borderRadius='4px'
			transition='0.3s'
			_hover={{ shadow: 'xl' }}
			onClick={() => {
				setFocusOrder(orderId)
				setFocusPlacemark(placemark.coordinates)
			}}
		>
			<Flex justifyContent='space-between' align='center' mb={3}>
				<Link href={`/profile/${owner.id}`}>
					<a>
						<HStack>
							<Avatar name={`${owner.name} ${owner.lastname}`} />
							<Text>{`${owner.name} ${owner.lastname}`}</Text>
						</HStack>
					</a>
				</Link>
				<Button
					colorScheme='red'
					onClick={() => {
						setMoreAboutOrder({ owner, products, adrress: placemark.address })
						onOpen()
					}}
				>
					Подробнее
				</Button>
			</Flex>
			<Box mb={3}>
				<HStack>
					<Center bg='gray.200' borderRadius={4} w='30px' h='30px'>
						<Icon as={MdPlace} />
					</Center>
					<Box>
						<Text>{placemark.address}</Text>
					</Box>
				</HStack>
			</Box>
			<Box>
				<Text>Продукты:</Text>
				<Box maxH='80px' w='100%' overflowY='scroll'>
					<OrderedList>
						{products.map((product, key) => (
							<ListItem key={key}>{product.label}</ListItem>
						))}
					</OrderedList>
				</Box>
			</Box>
		</Box>
	)
}

export default FarmerOrder
