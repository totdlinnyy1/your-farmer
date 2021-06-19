import Link from 'next/link'
import Router from 'next/router'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import InputMask from 'react-input-mask'
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	InputGroup,
	Button,
	InputRightElement,
	Icon,
	Flex,
	InputLeftAddon,
	Switch,
	Checkbox,
	useToast
} from '@chakra-ui/react'
import { BiShow, BiHide } from 'react-icons/bi'
import { useRegisterMutation } from '../../generated/graphql'

type FormData = {
	email: string
	password: string
	name: string
	lastname: string
	number: string
	rpassword?: string
	farmer?: boolean
	access?: boolean
	role: string
}

const SignUpForm: FC = () => {
	const toast = useToast()

	const [, signup] = useRegisterMutation()

	const [show, setShow] = useState<boolean>(false)
	const handleClick = () => setShow(!show)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch
	} = useForm<FormData>()
	const watchPassword = watch('password')
	const onSubmit: SubmitHandler<FormData> = async data => {
		if (data.farmer) {
			data['role'] = 'farmer'
		} else {
			data['role'] = 'buyer'
		}
		delete data['farmer']
		delete data['rpassword']
		delete data['access']
		const response = await signup(data)
		if (response.data?.register.id) {
			return Router.push('/profile')
		}
		if (response.error?.graphQLErrors.length) {
			return toast({
				title: response.error.graphQLErrors[0].message,
				position: 'bottom-right',
				status: 'error'
			})
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl id='email' mb={5} isInvalid={!!errors.email}>
				<FormLabel>Email:</FormLabel>
				<Input
					{...register('email', {
						required: { value: true, message: 'Это обязательное поле' },
						pattern: {
							value:
								/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
							message: 'Введена некорректная почта'
						}
					})}
					type='email'
					placeholder='example@email.com'
					disabled={isSubmitting}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='name' mb={5} isInvalid={!!errors.name}>
				<FormLabel>Имя:</FormLabel>
				<Input
					{...register('name', {
						required: { value: true, message: 'Это обязательное поле' },
						pattern: {
							value: /(-?([А-Я].\s)?([А-Я][а-я]+)\s?)$/gm,
							message: 'Некорректное имя'
						},
						minLength: { value: 2, message: 'Слишком короткое' },
						maxLength: { value: 20, message: 'Слишком длинное' }
					})}
					type='text'
					placeholder='Имя'
					disabled={isSubmitting}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='lastname' mb={5} isInvalid={!!errors.lastname}>
				<FormLabel>Фамилия:</FormLabel>
				<Input
					{...register('lastname', {
						required: { value: true, message: 'Это обязательное поле' },
						pattern: {
							value: /(-?([А-Я].\s)?([А-Я][а-я]+)\s?)$/gm,
							message: 'Некорректная фамилия'
						},
						minLength: { value: 2, message: 'Слишком короткая' },
						maxLength: { value: 20, message: 'Слишком длинная' }
					})}
					type='text'
					placeholder='Фамилия'
				/>
				<FormErrorMessage>
					{errors.lastname && errors.lastname.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='number' mb={5} isInvalid={!!errors.number}>
				<FormLabel>Номер телефона:</FormLabel>
				<InputGroup>
					<InputLeftAddon>+7</InputLeftAddon>
					<Input
						{...register('number', {
							required: { value: true, message: 'Это обязательное поле' },
							validate: value =>
								!value.includes('_') || 'Некорректный номер телефона'
						})}
						as={InputMask}
						mask='(999)-999-99-99'
						type='text'
						placeholder='Номер телефона'
						disabled={isSubmitting}
					/>
				</InputGroup>
				<FormErrorMessage>
					{errors.number && errors.number.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='password' mb={5} isInvalid={!!errors.password}>
				<FormLabel>Пароль:</FormLabel>
				<InputGroup>
					<Input
						{...register('password', {
							required: { value: true, message: 'Это обязательное поле' },
							minLength: { value: 6, message: 'Минимальная длина 6 символов' },
							maxLength: {
								value: 16,
								message: 'Максимальная длина 16 символов'
							}
						})}
						type={show ? 'text' : 'password'}
						placeholder='Пароль'
						disabled={isSubmitting}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick}>
							{show ? <Icon as={BiShow} /> : <Icon as={BiHide} />}
						</Button>
					</InputRightElement>
				</InputGroup>
				<FormErrorMessage>
					{errors.password && errors.password.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='rpassword' mb={5} isInvalid={!!errors.rpassword}>
				<FormLabel>Повторите пароль:</FormLabel>
				<Input
					{...register('rpassword', {
						required: { value: true, message: 'Это обязательное поле' },
						validate: value => value === watchPassword || 'Пароли не совпадают'
					})}
					type='password'
					placeholder='Повторите пароль:'
					disabled={isSubmitting}
				/>
				<FormErrorMessage>
					{errors.rpassword && errors.rpassword.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl id='farmer' mb={5} display='flex' alignItems='center'>
				<FormLabel>Фермер?</FormLabel>
				<Switch {...register('farmer')} />
			</FormControl>
			<FormControl id='access' mb={5} isInvalid={!!errors.access}>
				<Checkbox
					{...register('access', {
						required: { value: true, message: 'Это обязательное поле' }
					})}
				>
					Даю согласие на обработку персональных данных
				</Checkbox>
				<FormErrorMessage>
					{errors.access && errors.access.message}
				</FormErrorMessage>
			</FormControl>
			<Flex align='center' justifyContent='space-between'>
				<Button
					type='submit'
					colorScheme='red'
					isLoading={isSubmitting}
					disabled={isSubmitting}
					size='lg'
				>
					Регистрация
				</Button>
				<Link href='/'>
					<a>
						<Button variant='link'>Забыли пароль?</Button>
					</a>
				</Link>
			</Flex>
		</form>
	)
}

export default SignUpForm
