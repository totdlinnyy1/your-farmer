import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	VStack,
	DrawerBody,
	Spinner,
	Center
} from '@chakra-ui/react'
import { VscMenu } from 'react-icons/vsc'
import MediaQuery from 'react-responsive'
import { useLogoutMutation, useMeQuery } from '../../../../generated/graphql'
import { isServer } from '../../../../helpers/isServer'
import logo from '../../../../public/logo.png'

const Header: FC = () => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const [{ fetching, data }] = useMeQuery({
		pause: isServer()
	})
	const [, logout] = useLogoutMutation()
	return (
		<Box shadow='md' bg='white'>
			<Container maxW='container.xl' px='0'>
				<Flex
					h={100}
					w='100%'
					alignItems='center'
					justifyContent='space-between'
				>
					<Flex alignItems='center'>
						<Link href='/'>
							<a>
								<HStack spacing='20px' align='center'>
									<Box>
										<Image
											src={logo}
											placeholder='blur'
											alt='logo'
											width={100}
											height={80}
										/>
									</Box>
									<MediaQuery minDeviceWidth={360}>
										<Box>
											<Heading as='h5' size='md'>
												Мой Фермер
											</Heading>
										</Box>
									</MediaQuery>
								</HStack>
							</a>
						</Link>
						<MediaQuery maxDeviceWidth={929} minDeviceWidth={690}>
							<Box ml={5}>
								<Menu>
									<MenuButton
										as={Button}
										variant='ghost'
										rightIcon={<Icon as={VscMenu} boxSize={6} />}
									>
										Меню
									</MenuButton>
									<MenuList>
										<MenuItem>
											<Link href='/'>
												<a>
													<Text>Главная</Text>
												</a>
											</Link>
										</MenuItem>
										<MenuItem>
											<Text>Продукты</Text>
										</MenuItem>
										<MenuItem>
											<Text>Фермеры</Text>
										</MenuItem>
										<MenuItem>
											<Text>О нас</Text>
										</MenuItem>
									</MenuList>
								</Menu>
							</Box>
						</MediaQuery>
					</Flex>
					<MediaQuery minDeviceWidth={930}>
						<HStack>
							<Link href='/'>
								<a>
									<Button variant='ghost'>Главная</Button>
								</a>
							</Link>
							<Button variant='ghost'>Продукты</Button>
							<Button variant='ghost'>Фермеры</Button>
							<Button variant='ghost'>О нас</Button>
						</HStack>
					</MediaQuery>
					<MediaQuery minDeviceWidth={690}>
						{fetching ? (
							<Center w='260px'>
								<Spinner />
							</Center>
						) : data?.me ? (
							<HStack>
								<Link href='/profile'>
									<a>
										<Button size='lg' colorScheme='red'>
											Личный кабинет
										</Button>
									</a>
								</Link>
								<Button
									variant='link'
									onClick={async () => {
										await logout()
									}}
								>
									Выйти
								</Button>
							</HStack>
						) : (
							<HStack>
								<Link href='/signin'>
									<a>
										<Button size='lg'>Войти</Button>
									</a>
								</Link>
								<Link href='/signup'>
									<a>
										<Button size='lg' colorScheme='red'>
											Регистрация
										</Button>
									</a>
								</Link>
							</HStack>
						)}
					</MediaQuery>
					<MediaQuery maxDeviceWidth={689}>
						<Button p={2} variant='ghost' onClick={onOpen}>
							<Icon as={VscMenu} boxSize={10} />
						</Button>
					</MediaQuery>
				</Flex>
			</Container>
			<Drawer onClose={onClose} isOpen={isOpen} placement='right'>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>
						<Flex
							w='100%'
							p={5}
							justifyContent='space-between'
							alignItems='center'
						>
							<Heading as='h6' size='md'>
								Мой Фермер
							</Heading>
							<Button p={2} variant='ghost' onClick={onClose}>
								<Icon as={VscMenu} boxSize={10} />
							</Button>
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<Box mb={10}>
							{!fetching && data?.me ? (
								<VStack>
									<Link href='/profile'>
										<a>
											<Button size='lg' colorScheme='red'>
												Личный кабинет
											</Button>
										</a>
									</Link>
									<Button
										variant='link'
										onClick={async () => {
											await logout()
										}}
									>
										Выйти
									</Button>
								</VStack>
							) : (
								<VStack>
									<Link href='/signup'>
										<a>
											<Button size='lg' colorScheme='red'>
												Регистрация
											</Button>
										</a>
									</Link>
									<Link href='/signin'>
										<a>
											<Button size='lg'>Войти</Button>
										</a>
									</Link>
								</VStack>
							)}
						</Box>
						<VStack>
							<Link href='/'>
								<a>
									<Button variant='ghost'>Главная</Button>
								</a>
							</Link>
							<Button variant='ghost'>Продукты</Button>
							<Button variant='ghost'>Фермеры</Button>
							<Button variant='ghost'>О нас</Button>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	)
}

export default Header
