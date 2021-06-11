import { Box, Container } from '@chakra-ui/react'
import { NextPage } from 'next'
import Router from 'next/router'
import { withUrqlClient } from 'next-urql'
import UserInfo from '../../components/UserInfo'
import { useMeQuery } from '../../generated/graphql'
import isFarmer from '../../helpers/isFarmer'
import { isServer } from '../../helpers/isServer'
import { BuyerMap, CreateProduct, FarmerMap, Layout } from '../../modules'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Profile: NextPage = () => {
	const [{ fetching, data }] = useMeQuery({
		pause: isServer()
	})
	if (!fetching && !data?.me && !isServer()) Router.push('/signin')
	return (
		<Layout title='Профиль' loading={fetching}>
			{data?.me && (
				<Container maxW='container.xl' py={4} bg='white'>
					<UserInfo
						user={{
							name: data.me.name,
							lastname: data.me.lastname,
							avatarUrl: data.me.avatarUrl as string | null,
							role: data.me.role,
							number: data.me.number,
							editable: true
						}}
					/>
					{isFarmer(data.me.role) ? (
						<Box>
							<FarmerMap />
							<CreateProduct />
						</Box>
					) : (
						<Box>
							<BuyerMap />
						</Box>
					)}
				</Container>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(Profile)
