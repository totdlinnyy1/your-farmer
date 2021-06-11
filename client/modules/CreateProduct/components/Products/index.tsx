import { Box, HStack as Flex, HStack, Spinner, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'
import Product from '../../../../components/Product'
import { useMyProductsQuery } from '../../../../generated/graphql'
import { isServer } from '../../../../helpers/isServer'
import UpdateButton from '../UpdateButton'

const Products: FC = () => {
	const [{ data, fetching }] = useMyProductsQuery({
		pause: isServer()
	})
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [productId, setProductId] = useState<number | null>(null)
	const onOpen = (productId: number) => {
		setProductId(productId)
		setIsOpen(true)
	}
	const onClose = () => {
		setIsOpen(false)
		setProductId(null)
	}
	return (
		<Flex justifyContent='center' minHeight='100px' py={5} px={2}>
			{fetching ? (
				<Spinner />
			) : data?.myProducts.length ? (
				<Box>
					<HStack
						wrap='wrap'
						align='center'
						justifyContent='center'
						shouldWrapChildren
					>
						{data.myProducts.map(product => (
							<Box margin='20px 30px' key={product.id}>
								<Product
									editable={true}
									label={product.label}
									coast={product.coast}
									amount={product.amount}
									productId={product.id}
									productImage={product.productImage as string | undefined}
									onOpen={onOpen}
								/>
							</Box>
						))}
					</HStack>
					<UpdateButton
						isOpen={isOpen}
						productId={productId as number}
						onClose={onClose}
					/>
				</Box>
			) : (
				<Text fontSize='xl'>Продуктов нет</Text>
			)}
		</Flex>
	)
}

export default Products
