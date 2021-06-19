import {
	Center,
	Box,
	Text,
	Icon,
	FormLabel,
	FormControl,
	Textarea,
	Button,
	Flex,
	FormErrorMessage,
	useToast
} from '@chakra-ui/react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useState } from 'react'
import { useCreateReviewMutation } from '../../generated/graphql'

interface Props {
	farmerId: number
}

interface FormProps {
	text: string
	mark: number
}

const SendReview: FC<Props> = ({ farmerId }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitted }
	} = useForm<FormProps>()
	const [textLength, setTextLength] = useState<number>(0)
	const [mark, setMark] = useState<number>(0)
	const [markError, setMarkError] = useState<string>()
	const toast = useToast()

	const [{ fetching }, createReview] = useCreateReviewMutation()

	const onSubmit: SubmitHandler<FormProps> = async data => {
		if (!mark) return setMarkError('Это обязательное поле')
		setMarkError('')
		data['mark'] = mark

		const response = await createReview({
			mark: data.mark,
			text: data.text,
			farmerId
		})

		if (response.error) {
			reset()
			setMark(0)
			return toast({
				title: 'Вы уже оставили отзыв для этого фермера',
				position: 'bottom-right',
				status: 'error'
			})
		}
		reset()
		setMark(0)
		return
	}
	return (
		<Center w='100%' h='520px'>
			<Box minW='250px' w='30%' h='520px' bg='gray.100' p={2}>
				<Text textAlign='center' fontSize='2xl'>
					Оставьте отзыв
				</Text>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl mb={2} isInvalid={!!markError}>
						<FormLabel>Оценка:</FormLabel>
						<Rating
							emptySymbol={<Icon as={AiOutlineStar} boxSize='24px' />}
							fullSymbol={
								<Icon as={AiFillStar} color='yellow' boxSize='24px' />
							}
							placeholderSymbol={
								<Icon as={AiFillStar} color='yellow' boxSize='24px' />
							}
							onChange={setMark}
							placeholderRating={mark}
							readonly={fetching}
						/>
						<FormErrorMessage>{markError}</FormErrorMessage>
					</FormControl>
					<FormControl mb={2}>
						<FormLabel>Отзыв:</FormLabel>
						<Textarea
							{...register('text')}
							resize='none'
							h='250px'
							variant='filled'
							bg='gray.200'
							placeholder='Напишите свой отзыв...'
							maxLength={300}
							onChange={e => setTextLength(e.currentTarget.value.length)}
							isDisabled={isSubmitted}
						/>
					</FormControl>
					<Flex justifyContent='flex-end'>
						<Text>{textLength}/300</Text>
					</Flex>
					<Center>
						<Button
							type='submit'
							colorScheme='red'
							isLoading={isSubmitted}
							isDisabled={isSubmitted}
						>
							Отправить
						</Button>
					</Center>
				</form>
			</Box>
		</Center>
	)
}

export default SendReview
