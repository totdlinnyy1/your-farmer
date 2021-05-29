import Image from 'next/image'
import {
	Container,
	Wrap,
	WrapItem,
	Box,
	Heading,
	Link,
	Button,
	Divider,
	Text,
	Center
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { Layout } from '../modules'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Home: NextPage = () => {
	const isSmallerThan885 = useMediaQuery({ maxDeviceWidth: 885 })

	return (
		<Layout title='Главная' loading={false}>
			<Container maxW='container.xl' bg='white'>
				<Wrap justify='space-between' align='center' mb={10}>
					<WrapItem width={isSmallerThan885 ? '100%' : '50%'}>
						<Box>
							<Box mb={5}>
								<Heading>
									«Мой фермер - оналйн-сервис для поиска и продажи фeрмерской
									продукции.
								</Heading>
							</Box>
							<Box mb={5}>
								<Wrap align='center' spacing='30px'>
									<WrapItem>
										<Box>
											<Text fontSize='3xl' color='red'>
												1000
											</Text>
											<Text>покупателей</Text>
										</Box>
									</WrapItem>
									<WrapItem>
										<Box>
											<Text fontSize='3xl' color='red'>
												900
											</Text>
											<Text>заказов</Text>
										</Box>
									</WrapItem>
									<WrapItem>
										<Box>
											<Text fontSize='3xl' color='red'>
												200
											</Text>
											<Text>фермеров</Text>
										</Box>
									</WrapItem>
								</Wrap>
							</Box>
							<Box>
								<Wrap spacing='30px'>
									<WrapItem>
										<Link href='/signup?farmer=true'>
											<a>
												<Button>Стать фермером</Button>
											</a>
										</Link>
									</WrapItem>
									<WrapItem>
										<Link href='/signup?farmer=false'>
											<a>
												<Button colorScheme='red'>Сделать первый заказ</Button>
											</a>
										</Link>
									</WrapItem>
								</Wrap>
							</Box>
						</Box>
					</WrapItem>
					<MediaQuery minDeviceWidth={886}>
						<WrapItem>
							<Box>
								<Image src='/logo.png' width={415} height={315} />
							</Box>
						</WrapItem>
					</MediaQuery>
				</Wrap>
				<Divider />
				<Wrap spacing='30px' m='40px 0' align='center' justify='center'>
					<WrapItem>
						<Center maxWidth='420px' shadow='xl'>
							<Image src='/farmer.png' width={400} height={400} />
						</Center>
					</WrapItem>
					<WrapItem>
						<Center maxWidth='650px'>
							<Box>
								<Heading as='h6' mb={10}>
									Если Вы - фермер, то здесь Вы сможете продать свою продукцию!
								</Heading>
								<Link href='/signup?farmer=true'>
									<a>
										<Button colorScheme='blue'>Стать фермером</Button>
									</a>
								</Link>
							</Box>
						</Center>
					</WrapItem>
				</Wrap>
				<Divider />
				<Wrap spacing='30px' m='40px 0' align='center' justify='center'>
					<WrapItem>
						<Center maxWidth='650px'>
							<Box>
								<Heading as='h6' mb={10}>
									Здесь вы можете приобрести фермерские продукты без
									посредников!
								</Heading>
								<Link href='/signup?farmer=false'>
									<a>
										<Button colorScheme='purple'>Сделать первый заказ</Button>
									</a>
								</Link>
							</Box>
						</Center>
					</WrapItem>
					<WrapItem>
						<Center maxWidth='420px' maxHeight='420' shadow='xl'>
							<Image src='/buyer.png' width={400} height={300} />
						</Center>
					</WrapItem>
				</Wrap>
			</Container>
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
