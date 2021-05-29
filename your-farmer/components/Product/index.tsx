import { Box, Button, Flex, VStack, Icon, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { GiCow } from 'react-icons/gi'

interface Props {
	productId: number
	productImage?: string
	label: string
	coast: number
	amount: string
	editable: boolean
	onOpen?: (productId: number) => void
}

const Product: FC<Props> = ({
	productId,
	label,
	coast,
	amount,
	editable,
	productImage,
	onOpen
}) => {
	return (
		<Flex
			h='350px'
			w='200px'
			border='2px solid red'
			borderRadius={6}
			overflow='hidden'
			flexDirection='column'
			justifyContent={editable ? 'space-between' : 'flex-start'}
		>
			<Flex h='200px' justifyContent='center' align='center' bgColor='gray.100'>
				{productImage ? (
					<Image src={productImage} w='100%' h='200px' objectFit='cover' />
				) : (
					<VStack>
						<Icon as={GiCow} boxSize='70px' color='white' />
						<Text color='white'>(Изображения нет)</Text>
					</VStack>
				)}
			</Flex>
			<Box>
				<Box py={2}>
					<Text fontSize='xl' textAlign='center'>
						{label}
					</Text>
				</Box>
				<Box py={4}>
					<Text textAlign='center'>
						{coast} р/{amount}
					</Text>
				</Box>
			</Box>
			{editable && onOpen && (
				<Box p={2} w='100%'>
					<Button w='100%' onClick={() => onOpen(productId)}>
						Изменить
					</Button>
				</Box>
			)}
		</Flex>
	)
}

export default Product
