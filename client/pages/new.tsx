import { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Container } from '@chakra-ui/react'
import { useMeQuery } from '../generated/graphql'
import isFarmer from '../helpers/isFarmer'
import { isServer } from '../helpers/isServer'
import { BuyerAddToMap, FarmerAddToMap, Layout } from '../modules'
import { createUrqlClient } from '../utils/createUrqlClient'

const NewPage: NextPage = () => {
	const [{ fetching, data }] = useMeQuery({
		pause: isServer()
	})
	useEffect(() => {
		if (!fetching && !data?.me && !isServer()) Router.push('/signin')
	}, [fetching, data])

	if (!data?.me) {
		return <Layout title={'Загрузка...'} loading={true}></Layout>
	}

	return (
		<Layout
			title={
				isFarmer(data.me.role) ? 'Добавить продукты на карту' : 'Сделать заказ'
			}
			loading={fetching}
		>
			<Container maxW='container.xl' bg='white'>
				{isFarmer(data.me.role) ? <FarmerAddToMap /> : <BuyerAddToMap />}
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(NewPage)
