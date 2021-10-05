import { FC } from 'react'
import { Box, Center, Heading } from '@chakra-ui/react'
import { MeQuery } from '../../../generated/graphql'
import { FormEdit } from '../components'

interface Props {
	user: MeQuery
}

const EditUser: FC<Props> = ({ user }) => {
	return (
		<Box my={5} w='100%'>
			<Heading as='h4' textAlign='center' my={3}>
				Редактировать профиль
			</Heading>
			<Center w='100%'>
				<FormEdit user={user.me!} />
			</Center>
		</Box>
	)
}

export default EditUser
