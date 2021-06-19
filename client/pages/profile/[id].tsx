import { NextPage } from 'next'
import { Container, Box } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { Layout, Reviews } from '../../modules'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useRouter } from 'next/router'
import { useGetUserQuery, useMeQuery } from '../../generated/graphql'
import { useEffect } from 'react'
import { useState } from 'react'
import UserInfo from '../../components/UserInfo'
import isFarmer from '../../helpers/isFarmer'
import { isServer } from '../../helpers/isServer'
import { FarmerProducts, SendReview } from '../../components'

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
			router.replace('/profile')
		}

		if (!fetching && data?.getUser.user) {
			setTitle(`${data.getUser.user.name} ${data.getUser.user.lastname}`)
		}
	}, [data, fetching, myData, myFetching, intId, router])

	return (
		<Layout title={title} loading={fetching || myFetching}>
			{data?.getUser.user && (
				<Container maxW='container.xl' py={4} bg='white'>
					<UserInfo
						user={data.getUser.user}
						editable={false}
						canShowNumber={!!myData?.me}
					/>
					{isFarmer(data.getUser.user.role) && (
						<Box>
							<Reviews
								farmerId={data.getUser.user.id}
								userId={myData?.me?.id}
							/>
							<FarmerProducts farmerId={data.getUser.user.id} />
						</Box>
					)}
					{data?.getUser.user && myData?.me && !isFarmer(myData.me.role) && (
						<SendReview farmerId={data.getUser.user.id} />
					)}
				</Container>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(UserProfile)
