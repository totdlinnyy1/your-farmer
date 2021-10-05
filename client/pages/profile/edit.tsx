import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useEffect } from 'react'
import Router from 'next/router'
import { Container } from '@chakra-ui/react'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../helpers/isServer'
import { Layout, EditUser } from '../../modules'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Edit: NextPage = () => {
	const [{ data, fetching }] = useMeQuery({
		pause: isServer()
	})
	useEffect(() => {
		if (!fetching && !data?.me && !isServer()) Router.push('/signin')
	}, [fetching, data])
	return (
		<Layout title='Редактировать профиль' loading={fetching}>
			{data?.me && (
				<Container maxW='container.xl' py={4} bg='white'>
					<EditUser user={data} />
				</Container>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(Edit)
