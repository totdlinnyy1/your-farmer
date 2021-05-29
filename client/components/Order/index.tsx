import Link from 'next/link'
import { Avatar, Box, Flex, HStack, Text, Button } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
	owner: {
		avatarUrl?: string | null
		name: string
		lastname: string
		id: number
	}
}

const Order: FC<Props> = ({ owner }) => {
	return (
		<Box
			shadow='md'
			bg='whiteAlpha.900'
			w='97%'
			p={2}
			borderRadius='4px'
			transition='0.3s'
			_hover={{ shadow: 'lg' }}
		>
			<Flex justifyContent='space-between' align='center'>
				<Link href={`/profile/${owner.id}`}>
					<a>
						<HStack>
							<Avatar name={`${owner.name} ${owner.lastname}`} />
							<Text>{`${owner.name} ${owner.lastname}`}</Text>
						</HStack>
					</a>
				</Link>
				<Button colorScheme='red'>Подробнее</Button>
			</Flex>
			<Box mt={4}>Продукты</Box>
		</Box>
	)
}

export default Order
