import { Box, Center, Container, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FarmerProducts, SendReview } from '../../components'
import UserInfo from '../../components/UserInfo'
import { useGetUserQuery, useMeQuery } from '../../generated/graphql'
import isFarmer from '../../helpers/isFarmer'
import { isServer } from '../../helpers/isServer'
import { Layout, Reviews, FarmerOrders, BuyerOrders } from '../../modules'
import farmer from '../../public/farmer.png'
import { createUrqlClient } from '../../utils/createUrqlClient'

const UserProfile: NextPage = () => {
	const router = useRouter()
	const [title, setTitle] = useState<string>('Загрузка..')
	const intId =
		typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
	useEffect(() => {
		if (intId === -1) {
			router.replace('/profile')
		}
	}, [intId, router])
	const [{ fetching, data }] = useGetUserQuery({
		variables: {
			id: intId
		}
	})
	const [{ data: myData, fetching: myFetching }] = useMeQuery({
		pause: isServer()
	})
	useEffect(() => {
		if (!fetching && !data) {
			setTitle('Пользователь не найден')
		}

		if (!fetching && data?.getUser.user) {
			setTitle(`${data.getUser.user.name} ${data.getUser.user.lastname}`)
		}
	}, [data, fetching, myData, myFetching, intId, router])

	return (
		<Layout title={title} loading={fetching || myFetching}>
			{data?.getUser.user ? (
				<Container maxW='container.xl' py={4} bg='white'>
					<UserInfo
						user={data.getUser.user}
						editable={false}
						canShowNumber={!!myData?.me}
					/>
					{isFarmer(data.getUser.user.role) ? (
						<Box>
							<FarmerOrders ownerId={data.getUser.user.id} />
							<Reviews
								farmerId={data.getUser.user.id}
								userId={myData?.me?.id}
							/>
							<FarmerProducts farmerId={data.getUser.user.id} />
						</Box>
					) : (
						<Box>
							<BuyerOrders ownerId={data.getUser.user.id} />
						</Box>
					)}
					{data?.getUser.user && myData?.me && !isFarmer(myData.me.role) && (
						<SendReview farmerId={data.getUser.user.id} />
					)}
				</Container>
			) : (
				<Center w='100%' h='600px'>
					<Box maxWidth='420px' shadow='md' bg='white' borderRadius={4} p={2}>
						<Image
							src={farmer}
							placeholder='blur'
							alt='farmer'
							width={400}
							height={400}
						/>
						<Text fontSize='3xl' textAlign='center' mt={3}>
							Пользователь не найден
						</Text>
					</Box>
				</Center>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(UserProfile)
