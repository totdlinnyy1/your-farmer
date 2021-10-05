import {NextPage} from 'next'
import Image from 'next/image'
import Router from 'next/router'
import {Layout} from '../modules'
import {Box, Center, Container, Heading} from '@chakra-ui/react'
import {withUrqlClient} from 'next-urql'
import {createUrqlClient} from '../utils/createUrqlClient'
import logo from '../public/logo.png'
import React, {useEffect} from 'react'

const ConfirmEmail: NextPage = () => {
  useEffect(() => {
    if (Router.query.id && Router.query.code) {
      console.log
    } else Router.push('/')
  }, [Router])

  return (
    <Layout title='Подтвердите почту' loading={false}>
      <Container maxW='container.xl'>
        <Center h='700px'>
          <Box bg='white' p={10} minWidth='270px' width='100%' h='700px'>
            <Center h='700px'>
              <Box textAlign='center'>
                <Heading size='xl'>Почта успешно подтверждена!</Heading>
                <Box shadow='md' p={3} borderRadius={4} mt={5}>
                  <Image
                    src={logo}
                    alt='logo'
                    placeholder='blur'
                    width={415}
                    height={315}
                  />
                </Box>
              </Box>
            </Center>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(ConfirmEmail)
