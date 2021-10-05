import { useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Router from 'next/router'
import UserInfo from '../../components/UserInfo'
import { useMeQuery } from '../../generated/graphql'
import isFarmer from '../../helpers/isFarmer'
import { isServer } from '../../helpers/isServer'
import {
	BuyerMap,
	CreateProduct,
	FarmerMap,
	Layout,
	MyBuyerOrders,
	MyFarmerOrders,
	Reviews
} from '../../modules'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Profile: NextPage = () => {
	const [{ fetching, data }] = useMeQuery({
		pause: isServer()
	})
	useEffect(() => {
		if (!fetching && !data?.me && !isServer()) Router.push('/signin')
	}, [fetching, data])

	if (!data?.me) {
		return <Layout title='Загрузка...' loading={true}></Layout>
	}
	return (
		<Layout title='Профиль' loading={fetching}>
			<Container maxW='container.xl' py={4} bg='white'>
				<UserInfo user={data.me} editable={true} canShowNumber={true} />
				{isFarmer(data.me.role) ? (
					<Box>
						<FarmerMap />
						<Reviews farmerId={data.me.id} />
						<CreateProduct />
						<MyFarmerOrders />
					</Box>
				) : (
					<Box>
						<BuyerMap />
						<MyBuyerOrders />
					</Box>
				)}
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(Profile)
