import { Box, Divider, Text } from '@chakra-ui/layout'
import { FC } from 'react'
import { CreateButton, Products } from '../components'

const CreateProduct: FC = () => {
	return (
		<Box w='100%' mt={10}>
			<Text fontSize='3xl' textAlign='center'>
				Ваши продукты
			</Text>
			<Divider mt={4} />
			<Box h='900px' overflowY='scroll'>
				<Products />
			</Box>
			<Divider mb={4} />
			<CreateButton />
		</Box>
	)
}

export default CreateProduct
