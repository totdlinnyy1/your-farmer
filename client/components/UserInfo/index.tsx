import Link from 'next/link'
import Router from 'next/router'
import { useState, FC } from 'react'
import {
	Flex,
	Box,
	Avatar,
	Button,
	VStack,
	HStack,
	Text
} from '@chakra-ui/react'
import isFarmer from '../../helpers/isFarmer'
import role from '../../helpers/role'

interface UserInfoProps {
	user: {
		avatarUrl?: string | null
		name: string
		lastname: string
		role: string
		number: string
		averageRating?: number
	}
	editable: boolean
	canShowNumber: boolean
}
const UserInfo: FC<UserInfoProps> = ({ user, editable, canShowNumber }) => {
	const [showNumber, setShowNumber] = useState<boolean>(false)
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
				{editable && (
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
						<HStack minH='40px'>
							<Text>Номер телефона:</Text>
							{showNumber || editable ? (
								<Text>+7{user.number}</Text>
							) : (
								<Button
									onClick={() => {
										canShowNumber ? setShowNumber(true) : Router.push('/signin')
									}}
								>
									Показать
								</Button>
							)}
						</HStack>
					</Box>
				</Box>
				<Box>
					{isFarmer(user.role) && (
						<HStack spacing='20px' align='center'>
							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									0
								</Text>
								<Text>товаров</Text>
							</Box>

							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									0
								</Text>
								<Text>отзывов</Text>
							</Box>
							<Box textAlign='center'>
								<Text fontSize='2xl' color='red'>
									{user.averageRating?.toFixed(1)}
								</Text>
								<Text>рейтинг</Text>
							</Box>
						</HStack>
					)}
				</Box>
			</VStack>
		</Flex>
	)
}

export default UserInfo
