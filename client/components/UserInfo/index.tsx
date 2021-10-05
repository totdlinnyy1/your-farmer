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
	Text,
	Center
} from '@chakra-ui/react'
import MediaQuery from 'react-responsive'
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
		reviewsCount?: number
		productsCount?: number
	}
	editable: boolean
	canShowNumber: boolean
}
const UserInfo: FC<UserInfoProps> = ({ user, editable, canShowNumber }) => {
	const [showNumber, setShowNumber] = useState<boolean>(false)
	return (
		<Flex justifyContent='center'>
			<MediaQuery minDeviceWidth={555}>
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
			</MediaQuery>
			<VStack justify='space-between' align='start'>
				<Box>
					<MediaQuery minDeviceWidth={555}>
						<Box>
							<Text fontSize='2xl'>{`${user.name} ${user.lastname}`}</Text>
						</Box>
					</MediaQuery>
					<MediaQuery maxDeviceWidth={554}>
						<Box w='100%' mb={4}>
							<HStack w='100%'>
								<Avatar
									name={`${user.name} ${user.lastname}`}
									url={user.avatarUrl}
									loading='lazy'
								/>
								<Text fontSize='xl'>{`${user.name} ${user.lastname}`}</Text>
							</HStack>
						</Box>
					</MediaQuery>
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
					{isFarmer(user.role) && (
						<MediaQuery maxDeviceWidth={554}>
							<Box mb={4}>
								<Text>Рейтинг: {user.averageRating?.toFixed(1)}</Text>
							</Box>
						</MediaQuery>
					)}
				</Box>
				<MediaQuery minDeviceWidth={555}>
					<Box>
						{isFarmer(user.role) && (
							<HStack spacing='20px' align='center'>
								<Box textAlign='center'>
									<Text fontSize='2xl' color='red'>
										{user.productsCount}
									</Text>
									<Text>товар(-ов)</Text>
								</Box>

								<Box textAlign='center'>
									<Text fontSize='2xl' color='red'>
										{user.reviewsCount}
									</Text>
									<Text>отзыв(-ов)</Text>
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
				</MediaQuery>
				{editable && (
					<MediaQuery maxDeviceWidth={554}>
						<Center w='100%'>
							<Link href='/profile/edit'>
								<a>
									<Button w='200px'>Изменить</Button>
								</a>
							</Link>
						</Center>
					</MediaQuery>
				)}
			</VStack>
		</Flex>
	)
}

export default UserInfo
