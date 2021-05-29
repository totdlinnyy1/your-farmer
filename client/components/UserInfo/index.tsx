import {
	Flex,
	Box,
	Avatar,
	Button,
	VStack,
	HStack,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import isFarmer from '../../helpers/isFarmer'
import role from '../../helpers/role'

interface UserInfoProps {
	user: {
		avatarUrl: string | null
		name: string
		lastname: string
		role: string
		number: string
		editable: boolean
	}
}
const UserInfo: FC<UserInfoProps> = ({ user }) => {
	return (
		<Flex justifyContent='center'>
			<Box mr={5}>
				<Box mb={3} textAlign='center'>
					<Avatar
						name={`${user.name} ${user.lastname}`}
						url={user.avatarUrl}
						size='2xl'
						loading='lazy'
					/>
				</Box>
				{user.editable && (
					<Box>
						<Link href='/profile/edit'>
							<a>
								<Button size='lg' w='200px'>
									Изменить
								</Button>
							</a>
						</Link>
					</Box>
				)}
			</Box>
			<VStack justify='space-between' align='start'>
				<Box>
					<Box>
						<Text fontSize='2xl'>{`${user.name} ${user.lastname}`}</Text>
					</Box>
					<Box>
						<Text>Роль: {role(user.role)}</Text>
					</Box>
					<Box>
						<Text>Номер телефона: +7{user.number}</Text>
					</Box>
				</Box>
				<Box>
					<HStack spacing='20px'>
						{isFarmer(user.role) && (
							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									0
								</Text>
								<Text>товаров</Text>
							</Box>
						)}
						<Box textAlign='center'>
							<Text fontSize='2xl' color='red'>
								0
							</Text>
							<Text>
								{isFarmer(user.role) ? 'Товаров' : 'Заказов'} на карте
							</Text>
						</Box>
						{isFarmer(user.role) && (
							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									0
								</Text>
								<Text>отзывов</Text>
							</Box>
						)}
						{isFarmer(user.role) && (
							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									0
								</Text>
								<Text>ваш рейтиг</Text>
							</Box>
						)}
					</HStack>
				</Box>
			</VStack>
		</Flex>
	)
}

export default UserInfo
