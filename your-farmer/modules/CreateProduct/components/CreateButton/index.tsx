import React, { FC, useState } from 'react'
import {
	Button,
	Flex,
	useDisclosure,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputRightAddon,
	Text
} from '@chakra-ui/react'
import { ModalWindow } from '../../../../components'
import SelectProduct from '../../../../components/SelectProducts'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateProductMutation } from '../../../../generated/graphql'

interface Product {
	label: string
	class: string
	amount: string
	value: string
}

interface SubmitData {
	product: Product
	coast: string
	image: any
}

const CreateButton: FC = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()

	const [product, setProduct] = useState<Product | null>(null)

	const [productError, setProductError] = useState<boolean>(false)

	const [, createProduct] = useCreateProductMutation()

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit
	} = useForm<SubmitData>()

	const onSubmit: SubmitHandler<SubmitData> = async data => {
		if (!product) return setProductError(true)
		await createProduct({
			amount: product.amount,
			label: product.label,
			class: product.class,
			value: product.value,
			coast: parseInt(data.coast)
		})
		onClose()
	}

	return (
		<Flex justifyContent='center'>
			<Button colorScheme='red' onClick={onOpen}>
				Создать продукт
			</Button>
			<ModalWindow
				isOpen={isOpen}
				onClose={onClose}
				headerText='Создать продукт'
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<SelectProduct
						isMulti={false}
						disabled={false}
						onChange={(value: Product) => {
							setProduct(value)
							setProductError(false)
						}}
						value={product}
					/>
					<Text color='red'>{productError && 'Это обязательное поле'}</Text>
					<FormControl id='coast' my={5} isInvalid={!!errors.coast}>
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
					<FormControl
						id='image'
						my={5}
						isInvalid={!!errors.image}
						border='none'
					>
						<FormLabel>Изображение:</FormLabel>
						<Input
							{...register('image')}
							type='file'
							disabled={isSubmitting}
							variant='outline'
							border='none'
							borderRadius={0}
							px={0}
							accept='image/png, image/jpeg'
						/>
						<FormErrorMessage>
							{errors.image && errors.image.message}
						</FormErrorMessage>
					</FormControl>
					<Flex justifyContent='center'>
						<Button colorScheme='red' size='lg' type='submit'>
							Создать
						</Button>
					</Flex>
				</form>
			</ModalWindow>
		</Flex>
	)
}

export default CreateButton
