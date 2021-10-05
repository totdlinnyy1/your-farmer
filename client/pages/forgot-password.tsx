import {
	Center,
	Container,
	Box,
	Heading,
	Text,
	FormControl,
	Input,
	FormErrorMessage,
	IconButton,
	Icon,
	Flex
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useForm } from 'react-hook-form'
import { Layout } from '../modules'
import { createUrqlClient } from '../utils/createUrqlClient'
import { GrFormNext } from 'react-icons/gr'

interface SubmitData {
	email: string
}

const ForgotPassword: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<SubmitData>()
	return (
		<Layout title='Забыли пароль?' loading={false}>
			<Container>
				<Center h='700px'>
					<Box bg='white' p={10} minWidth='270px' width='100%'>
						<Center mb={10}>
							<Heading as='h4' textAlign='center'>
								Забыли пароль?
							</Heading>
						</Center>
						<Center mb={4}>
							<Text textAlign='center'>
								Для воостановления пароля укажите ваш адрес электронной почты
							</Text>
						</Center>
						<Center>
							<form>
								<Flex alignContent='start'>
									<Box mr={2}>
										<FormControl id='email' mb={5} isInvalid={!!errors.email}>
											<Input
												{...register('email', {
													required: {
														value: true,
														message: 'Это обязательное поле'
													},
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
									</Box>
									<Box>
										<IconButton
											aria-label='next'
											icon={<Icon as={GrFormNext} />}
											type='submit'
											colorScheme='yellow'
										/>
									</Box>
								</Flex>
							</form>
						</Center>
					</Box>
				</Center>
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
