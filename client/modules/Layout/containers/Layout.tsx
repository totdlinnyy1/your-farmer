import { FC } from 'react'
import Head from 'next/head'
import { Header, Footer } from '../components'
import { Box, Center, Spinner } from '@chakra-ui/react'

interface LayoutProps {
	title: string
	loading: boolean
}

const Layout: FC<LayoutProps> = ({ title, loading, children }) => {
	return (
		<Box bg='gray.200'>
			<Head>
				<title>{title}</title>
			</Head>
			<Header />
			<Box m='20px 0'>
				{loading ? (
					<Center h='600px'>
						<Spinner size='xl' />
					</Center>
				) : (
					children
				)}
			</Box>
			<Footer />
		</Box>
	)
}

export default Layout
