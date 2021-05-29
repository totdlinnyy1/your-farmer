import { NextPage } from 'next'
import { Layout } from '../modules'
import { Box, Center, Container, Heading } from '@chakra-ui/react'
import { Props } from 'next/dist/client/experimental-script'
import { SignInForm } from '../components'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const SignIn: NextPage<Props> = () => {
	return (
		<Layout title='Вход' loading={false}>
			<Container>
				<Center h='700px'>
					<Box bg='white' p={10} minWidth='270px' width='100%'>
						<Box textAlign='center' mb={10}>
							<Heading as='h4'>Вход</Heading>
						</Box>
						<Box>
							<SignInForm />
						</Box>
					</Box>
				</Center>
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(SignIn)
