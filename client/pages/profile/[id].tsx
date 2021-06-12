import { NextPage } from 'next'
import { Container } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../../modules'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '../../generated/graphql'
import { useEffect } from 'react'
import { useState } from 'react'
import UserInfo from '../../components/UserInfo'

const UserProfile: NextPage = () => {
	const router = useRouter()
	const [title, setTitle] = useState<string>('Загрузка..')
	const intId =
		typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
	useEffect(() => {
		if (intId === -1) {
			router.replace('/profile')
		}
	}, [intId])
	const [{ fetching, data }] = useGetUserQuery({
		variables: {
			id: intId
		}
	})
	useEffect(() => {
		if (!fetching && !data) {
			router.replace('/profile')
		}
		if (!fetching && data?.getUser.errors) {
			router.replace('/profile')
		}
		if (!fetching && data?.getUser.user) {
			setTitle(`${data.getUser.user.name} ${data.getUser.user.lastname}`)
		}
	}, [data, fetching])

	return (
		<Layout title={title} loading={fetching}>
			{data?.getUser.user && (
				<Container maxW='container.xl' py={4} bg='white'>
					<UserInfo user={data.getUser.user} editable={false} />
				</Container>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(UserProfile)
