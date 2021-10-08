import {NextPage} from 'next'
import Image from 'next/image'
import {Layout} from '../modules'
import {Box, Center, Container, Heading, Spinner} from '@chakra-ui/react'
import {withUrqlClient} from 'next-urql'
import {createUrqlClient} from '../utils/createUrqlClient'
import logo from '../public/logo.png'
import React, {useEffect, useState} from 'react'
import {useConfirmEmailMutation} from '../generated/graphql'
import {useRouter} from 'next/router'

const ConfirmEmail: NextPage = () => {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false)

  const router = useRouter()
  const [, confirmEmail] = useConfirmEmailMutation()

  useEffect(() => {
    const sendConfirmCode = async () => {
      const response = await confirmEmail({
        id: parseInt(router.query.id as string),
        code: parseInt(router.query.code as string)
      })
      if (response) {
        setIsEmailConfirmed(true)
      }
    }
    sendConfirmCode()
  }, [router, confirmEmail])

  return (
    <Layout title='Подтвердите почту' loading={false}>
      <Container maxW='container.xl'>
        <Center h='700px'>
          <Box bg='white' p={10} minWidth='270px' width='100%' h='700px'>
            <Center h='700px'>
              {isEmailConfirmed ? (
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
              ) : (
                <Spinner size='lg' />
              )}
            </Center>
          </Box>
        </Center>
      </Container>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(ConfirmEmail)
