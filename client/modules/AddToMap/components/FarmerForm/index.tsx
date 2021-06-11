import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Text,
	Input,
	InputGroup,
	InputRightAddon,
	Skeleton,
	Stack,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useToast
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Router from 'next/router'
import {
	FarmerProductsInput,
	useCreateFarmerOrderMutation,
	useMyProductsQuery
} from '../../../../generated/graphql'
import getCoordinates from '../../../../helpers/getCoordinates'
import { isServer } from '../../../../helpers/isServer'
import { placemark } from '../../../../types/placemark'

interface body {
	placemark: {
		coordinates: number[]
		address: string
	}
	products: FarmerProductsInput[]
}

interface Props {
	setPlacemarkToMap: (data: placemark) => void
}

const FarmerForm: FC<Props> = ({ setPlacemarkToMap }) => {
	const [{ fetching, data: products }] = useMyProductsQuery({
		pause: isServer()
	})
	const [{ fetching: sending }, createOrder] = useCreateFarmerOrderMutation()
	const toast = useToast()

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm()

	const [isProductActive, setActiveProducts] = useState<number[]>([])
	const [placemark, setPlacemark] = useState<placemark | null>(null)
	const [address, setAddress] = useState<string>('')

	const handleActive = (e: any, id: number) => {
		if (e.currentTarget.checked) setActiveProducts([...isProductActive, id])
		else setActiveProducts(isProductActive.filter(item => item !== id))
	}

	const handleGetCoordinates = async () => {
		if (address) {
			const response = await getCoordinates(address)
			setPlacemark(response as placemark)
			setPlacemarkToMap(response as placemark)
			return
		}
		return toast({
			title: 'Введите адрес и поставьте метку',
			status: 'error',
			position: 'bottom-right'
		})
	}

	const onSubmit = async (data: any) => {
		if (placemark) {
			if (isProductActive.length && products?.myProducts) {
				const body: body = {
					placemark,
					products: []
				}
				products.myProducts.forEach(product => {
					if (data[product.id]) {
						const productBody = {
							label: product.label,
							amount: product.amount,
							coast: product.coast,
							count: parseFloat(data[product.id]),
							class: product.class,
							productImage: product.productImage,
							value: product.value
						}
						body.products.push(productBody)
					}
				})
				const response = await createOrder({
					placemark: body.placemark,
					products: body.products
				})

				if (response.data?.createFarmerOrder.id)
					return Router.replace('/profile')

				return toast({
					title: 'Возникла какая-то ошибка',
					status: 'error',
					position: 'bottom-right'
				})
			}
			return toast({
				title: 'Отметьте нужные продукты',
				status: 'error',
				position: 'bottom-right'
			})
		}
		return toast({
			title: 'Поставтье метку',
			status: 'error',
			position: 'bottom-right'
		})
	}

	return (
		<Box my={5}>
			{fetching || !products?.myProducts ? (
				<Stack>
					<Skeleton height='30px' />
					<Skeleton height='30px' />
					<Skeleton height='30px' />
					<Skeleton height='30px' />
					<Skeleton height='30px' />
				</Stack>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Table size='md'>
						<Thead>
							<Tr>
								<Th>#</Th>
								<Th>Продукт</Th>
								<Th>Колличество</Th>
								<Th>Цена</Th>
							</Tr>
						</Thead>
						<Tbody>
							{products.myProducts.map(product => (
								<Tr key={product.id}>
									<Th>
										<input
											ref={register(`${product.id}check`).ref}
											type='checkbox'
											onChange={e => handleActive(e, product.id)}
										/>
									</Th>
									<Th>{product.label}</Th>
									<Th>
										<FormControl isInvalid={errors[product.id.toString()]}>
											<InputGroup size='xs' w='100px' variant='filled'>
												<Input
													{...register(product.id.toString(), {
														required: isProductActive.includes(product.id)
													})}
													as={InputMask}
													mask='999'
													maskChar=''
													placeholder='Колличество'
													disabled={!isProductActive.includes(product.id)}
												/>
												<InputRightAddon>
													<Text>{product.amount}</Text>
												</InputRightAddon>
											</InputGroup>
										</FormControl>
									</Th>
									<Th>{`${product.coast} р/${product.amount}`}</Th>
								</Tr>
							))}
						</Tbody>
					</Table>
					<Box my={8}>
						<FormLabel>Адрес:</FormLabel>
						<HStack>
							<Input
								name='address'
								placeholder='Адрес'
								onChange={e => setAddress(e.currentTarget.value)}
								w='250px'
							/>
							<Button size='sm' onClick={handleGetCoordinates}>
								Поставить метку
							</Button>
						</HStack>
					</Box>
					<Button
						colorScheme='red'
						type='submit'
						isLoading={sending}
						disabled={sending}
					>
						Добавить
					</Button>
				</form>
			)}
		</Box>
	)
}

export default FarmerForm
