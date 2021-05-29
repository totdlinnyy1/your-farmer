import {
	Center,
	VStack,
	Text,
	Spinner,
	FormControl,
	FormLabel,
	InputGroup,
	InputRightAddon,
	Input,
	FormErrorMessage,
	ButtonGroup,
	Button,
	IconButton,
	Icon
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiTrash } from 'react-icons/fi'
import { ModalWindow } from '../../../../components'
import {
	Product,
	useProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation
} from '../../../../generated/graphql'

interface Props {
	productId: number
	isOpen: boolean
	onClose: () => void
}

interface SubmitData {
	coast: string
}

const UpdateButton: FC<Props> = ({ productId, isOpen, onClose }) => {
	const [{ fetching }, getProductData] = useProductMutation()
	const [, updateProduct] = useUpdateProductMutation()
	const [, deleteProduct] = useDeleteProductMutation()

	const [product, setProduct] =
		useState<
			| ({ __typename?: 'Product' | undefined } & Pick<
					Product,
					'label' | 'amount' | 'coast'
			  >)
			| null
		>(null)
	useEffect(() => {
		const fetchData = async () => {
			if (productId && isOpen) {
				const response = await getProductData({ productId })
				if (!fetching) {
					if (response.data?.product) {
						setProduct(response.data.product)
					}
				}
			}
		}
		fetchData()
	}, [productId])

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit
	} = useForm<SubmitData>()

	const onSubmit: SubmitHandler<SubmitData> = async data => {
		const response = await updateProduct({
			productId,
			coast: parseInt(data.coast)
		})
		if (response.data?.updateProduct) {
			onClose()
		}
	}

	const deleteHandle = async () => {
		const result = await deleteProduct({ productId })
		if (result.data?.deleteProduct) {
			onClose()
		}
	}
	return (
		<ModalWindow
			isOpen={isOpen}
			onClose={onClose}
			headerText='Изменить продукт'
		>
			{fetching ? (
				<Center h='300px'>
					<Spinner />
				</Center>
			) : product ? (
				<VStack alignItems='flex-start'>
					<Text fontSize='xl'>{product?.label}</Text>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl id='coast' mb={10} mt={5} isInvalid={!!errors.coast}>
							<FormLabel>Цена:</FormLabel>
							<InputGroup>
								<Input
									{...register('coast', {
										required: { value: true, message: 'Это обязательное поле' },
										validate: {
											isNumber: v =>
												isFinite(parseInt(v)) || 'Цена введена некорректно',
											isPositive: v =>
												parseInt(v) > 0 || 'Цена введена некорректно'
										}
									})}
									placeholder={product.coast.toString()}
									type='text'
									disabled={isSubmitting}
									maxLength={10}
								/>
								<InputRightAddon>
									р/{product ? product?.amount : '...'}
								</InputRightAddon>
							</InputGroup>
							<FormErrorMessage>
								{errors.coast && errors.coast.message}
							</FormErrorMessage>
						</FormControl>
						<ButtonGroup>
							<Button colorScheme='red' type='submit'>
								Изменить
							</Button>
							<IconButton
								aria-label='Удалить'
								icon={<Icon as={FiTrash} boxSize='24px' />}
								onClick={deleteHandle}
							/>
						</ButtonGroup>
					</form>
				</VStack>
			) : (
				<Center h='300px'>
					<Spinner />
				</Center>
			)}
		</ModalWindow>
	)
}

export default UpdateButton
