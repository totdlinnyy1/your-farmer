import { FC, useState } from 'react'
import Router from 'next/router'
import {
	Box,
	Flex,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	FormLabel,
	Button,
	useToast,
	Center,
	FormControl
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import SelectProduct from '../../../../components/SelectProducts'
import { placemark } from '../../../../types/placemark'
import getCoordinates from '../../../../helpers/getCoordinates'
import {
	ProductsInput,
	useCreateOrderMutation
} from '../../../../generated/graphql'

interface Product {
	label: string
	class: string
	amount: string
	value: string
	count: number
}

interface Props {
	setPlacemarkToMap: (data: placemark) => void
}

interface body {
	placemark: {
		coordinates: number[]
		address: string
	}
	products: ProductsInput[]
}

const BuyerForm: FC<Props> = ({ setPlacemarkToMap }) => {
	const [products, setProducts] = useState<Product[]>()
	const [address, setAddress] = useState<string>('')
	const [placemark, setPlacemark] = useState<placemark | null>(null)

	const toast = useToast()
	const [, createOrder] = useCreateOrderMutation()

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

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm()

	const onSubmit = async (data: any) => {
		if (!products)
			return toast({
				title: 'Вы не выбрали ни одного продукта',
				status: 'error',
				position: 'bottom-right'
			})

		if (!placemark)
			return toast({
				title: 'Вы не поставили метку на карте',
				status: 'error',
				position: 'bottom-right'
			})
		const body: body = {
			placemark,
			products: []
		}
		products.forEach(product => {
			product['count'] = parseFloat(data[product.value])
			body.products.push(product)
		})
		const response = await createOrder(body)
		if (response.data?.createOrder.id) return Router.replace('/profile')

		return toast({
			title: 'Возникла какая-то ошибка',
			status: 'error',
			position: 'bottom-right'
		})
	}

	return (
		<Box my={5}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<SelectProduct
					isMulti={true}
					onChange={setProducts}
					disabled={isSubmitting}
					value={products}
				/>
				<Flex minH='200px' my={5} shadow='md' p={2} wrap='wrap'>
					{products ? (
						products.map((product, key) => (
							<Box key={key} m={2}>
								<FormControl isInvalid={errors[product.value]}>
									<InputGroup size='sm'>
										<InputLeftAddon>
											<Text>{product.label}</Text>
										</InputLeftAddon>
										<Input
											placeholder='Количество'
											w='60px'
											bgColor='white'
											maxLength={4}
											disabled={isSubmitting}
											{...register(product.value, {
												required: true,
												validate: value => {
													if (
														isFinite(parseInt(value)) ||
														isFinite(parseFloat(value))
													) {
														if (
															(parseInt(value) > 0 || parseFloat(value) > 0) &&
															(parseInt(value) < 10 || parseInt(value) < 10)
														)
															return true
														toast({
															title: `(${product.label}) Количество должно быть больше 0 и меньше 10.
                                Нецелые числа указываете через точку.
                                (Например 0.5)
                                `,
															status: 'warning',
															position: 'bottom-right'
														})
														return false
													}
													toast({
														title: `(${product.label}) Количество должно быть числом`,
														status: 'error',
														position: 'bottom-right'
													})
													return false
												}
											})}
										/>
									</InputGroup>
								</FormControl>
							</Box>
						))
					) : (
						<Center h='200px' w='100%'>
							<Text>Выберете продукты</Text>
						</Center>
					)}
				</Flex>
				<Box my={8}>
					<FormLabel>Адрес:</FormLabel>
					<HStack>
						<Input
							name='address'
							placeholder='Адрес'
							onChange={e => setAddress(e.currentTarget.value)}
							w='250px'
							disabled={isSubmitting}
						/>
						<Button size='sm' onClick={handleGetCoordinates}>
							Поставить метку
						</Button>
					</HStack>
				</Box>
				<Box>
					<Button colorScheme='red' type='submit' isLoading={isSubmitting}>
						Сделать заказ
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default BuyerForm
