import { FC } from 'react'
import { Flex, Spinner, Box, HStack, Text } from '@chakra-ui/react'
import { useGetFarmerProductsQuery } from '../../generated/graphql'
import Product from '../Product'

interface Props {
	farmerId: number
}

const FarmerProducts: FC<Props> = ({ farmerId }) => {
	const [{ data, fetching }] = useGetFarmerProductsQuery({
		variables: { farmerId }
	})
	return (
		<Box my={3}>
			<Text fontSize='3xl' textAlign='center' my={3}>
				Продукты
			</Text>
			<Flex justifyContent='center' minHeight='100px' py={5} px={2}>
				{fetching ? (
					<Spinner />
				) : data?.getFarmerProducts.length ? (
					<Box>
						<HStack
							wrap='wrap'
							align='center'
							justifyContent='center'
							shouldWrapChildren
						>
							{data.getFarmerProducts.map(product => (
								<Box margin='20px 30px' key={product.id}>
									<Product
										editable={false}
										label={product.label}
										coast={product.coast}
										amount={product.amount}
										productId={product.id}
										productImage={product.productImage as string | undefined}
									/>
								</Box>
							))}
						</HStack>
					</Box>
				) : (
					<Text fontSize='xl'>Продуктов нет</Text>
				)}
			</Flex>
		</Box>
	)
}

export default FarmerProducts
