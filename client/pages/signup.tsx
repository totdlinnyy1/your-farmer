import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Props } from 'next/dist/client/experimental-script'
import { Box, Center, Container, Heading } from '@chakra-ui/react'
import { Layout } from '../modules'
import { SignUpForm } from '../components'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const SignUp: NextPage<Props> = () => {
	const router = useRouter()

	const query = router.query.farmer && router.query.farmer === 'true'
	//TO-DO

	return (
		<Layout title='Регистрация' loading={false}>
			<Container>
				<Center>
					<Box bg='white' p={10} minWidth='270px' width='100%'>
						<Box textAlign='center' mb={10}>
							<Heading as='h4'>Регистрация</Heading>
						</Box>
						<Box>
							<SignUpForm />
						</Box>
					</Box>
				</Center>
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(SignUp)
