import Link from 'next/link'
import Router from 'next/router'
import { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
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
	useToast
} from '@chakra-ui/react'
import { BiShow, BiHide } from 'react-icons/bi'
import { useLoginMutation } from '../../generated/graphql'

interface SubmitData {
	email: string
	password: string
}

const SignInForm: FC = () => {
	const [show, setShow] = useState<boolean>(false)
	const handleClick = () => setShow(!show)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<SubmitData>()

	const [, signin] = useLoginMutation()

	const toast = useToast()

	const onSubmit: SubmitHandler<SubmitData> = async data => {
		const response = await signin(data)
		console.log(response)

		if (response.data?.login.id) {
			Router.push('/profile')
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
					maxLength={50}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
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
						maxLength={20}
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
			<Flex align='center' justifyContent='space-between'>
				<Button
					type='submit'
					colorScheme='red'
					isLoading={isSubmitting}
					disabled={isSubmitting}
					size='lg'
				>
					Войти
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

export default SignInForm
