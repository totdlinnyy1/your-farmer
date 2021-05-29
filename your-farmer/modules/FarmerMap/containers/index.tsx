import Link from 'next/link'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { FC } from 'react'
import { MapComponent, OrdersList } from '../components'

const FarmerMap: FC = () => {
	return (
		<Box my='40px'>
			<Text fontSize='3xl' textAlign='center' my='20px'>
				Заказы покупателей
			</Text>
			<Flex h='600px' bg='gray.100' border='2px dashed red' borderRadius='4px'>
				<Box w='70%'>
					<MapComponent />
				</Box>
				<Box w='30%' h='600px' py={3}>
					<Flex
						justifyContent='space-between'
						h='full'
						w='full'
						flexDirection='column'
					>
						<OrdersList />
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
		</Box>
	)
}

export default FarmerMap
