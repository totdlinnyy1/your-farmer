import { FC } from 'react'
import { Box, Center, Text, Spinner, HStack } from '@chakra-ui/react'
import { useGetFarmerReviewsQuery } from '../../../generated/graphql'
import Review from '../components/review'

interface Props {
	farmerId: number
	userId?: number
}

const Reviews: FC<Props> = ({ farmerId, userId }) => {
	const [{ data, fetching }] = useGetFarmerReviewsQuery({
		variables: { farmerId }
	})
	return (
		<Box my={5}>
			<Text fontSize='3xl' textAlign='center'>
				Отзывы покупателей
			</Text>
			<Box w='100%' h='300px' bg='purple.100' my={10} borderRadius={4} p={2}>
				{fetching ? (
					<Center w='100%' h='300px'>
						<Spinner />
					</Center>
				) : (
					<Center w='100%' h='300px'>
						<HStack w='100%'>
							{data?.getFarmerReviews.map(review => (
								<Review review={review} userId={userId} key={review.id} />
							))}
						</HStack>
					</Center>
				)}
			</Box>
		</Box>
	)
}

export default Reviews
