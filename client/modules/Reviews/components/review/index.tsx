import { FC } from 'react'
import { Box, HStack, Avatar, Text, Icon, Button, Flex } from '@chakra-ui/react'
import Rating from 'react-rating'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useDeleteReviewMutation } from '../../../../generated/graphql'

interface Props {
	review: {
		id: number
		mark: number
		text?: string | null
		owner: {
			id: number
			name: string
			lastname: string
			avatarUrl?: string | null
		}
		farmerId: number
	}
	userId?: number
}

const Review: FC<Props> = ({ review, userId }) => {
	const [, delteReview] = useDeleteReviewMutation()

	return (
		<Box
			maxW='350px'
			maxH='300px'
			bg='white'
			borderRadius={4}
			shadow='md'
			p={2}
		>
			<HStack>
				<Box>
					<Avatar
						src={review.owner.avatarUrl as string}
						name={`${review.owner.name} ${review.owner.lastname}`}
					/>
				</Box>
				<Box>
					<Text>{`${review.owner.name} ${review.owner.lastname}`}</Text>
				</Box>
				<Box>
					<Rating
						placeholderRating={review.mark}
						emptySymbol={<Icon as={AiOutlineStar} />}
						fullSymbol={<Icon as={AiFillStar} color='yellow' />}
						placeholderSymbol={<Icon as={AiFillStar} color='yellow' />}
						readonly
					/>
				</Box>
			</HStack>
			{review.text && (
				<Box w='100%' my={4}>
					<Text>{review.text}</Text>
				</Box>
			)}
			{review.owner.id === userId && (
				<Flex justifyContent='flex-end'>
					<Button
						size='xs'
						my={2}
						onClick={() =>
							delteReview({ reviewId: review.id, farmerId: review.farmerId })
						}
					>
						Удалить
					</Button>
				</Flex>
			)}
		</Box>
	)
}

export default Review
