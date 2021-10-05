import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  Text,
  HStack,
  Avatar,
  Flex,
  useToast
} from '@chakra-ui/react'
import {FC} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import InputMask from 'react-input-mask'
import {
  useEditUserMutation,
  useSendConfirmEmailCodeMutation
} from '../../../../generated/graphql'
import role from '../../../../helpers/role'

interface Props {
  user: {
    name: string
    lastname: string
    number: string
    avatarUrl?: string | null
    email: string
    role: string
    isEmailConfirmed: boolean
  }
}

interface EditableData {
  name: string
  lastname: string
  number: string
  avatarUrl?: any
}

const FormEdit: FC<Props> = ({user}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted},
    reset
  } = useForm<EditableData>({
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      number: user.number
    }
  })

  const [, editUser] = useEditUserMutation()
  const [, sendConfirmEmailCode] = useSendConfirmEmailCodeMutation()
  const toast = useToast()

  const onSubmit: SubmitHandler<EditableData> = async (data) => {
    const response = await editUser({
      name: data.name,
      lastname: data.lastname,
      number: data.number
    })

    if (response.data?.editUser) {
      reset()
    }
    return
  }

  const onSend = async () => {
    const response = await sendConfirmEmailCode()
    console.log(response)
    if (response.data?.sendConfirmEmailCode) {
      toast({
        title: 'Письмо отправлено',
        status: 'success',
        position: 'bottom-right'
      })
    }
  }
  return (
    <Box maxW="400px" w="70%" minW="250px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5}>
          <FormLabel>Изображение профиля:</FormLabel>
          <HStack justifyContent="space-between">
            <Box>
              <Avatar size="2xl" name={`${user.name} ${user.lastname}`} />
            </Box>
          </HStack>
        </FormControl>
        <FormControl isInvalid={!!errors.name} mb={5}>
          <FormLabel>Имя:</FormLabel>
          <Input
            {...register('name')}
            placeholder="Имя"
            disabled={isSubmitted}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.lastname} mb={5}>
          <FormLabel>Фамилия:</FormLabel>
          <Input
            {...register('lastname')}
            placeholder="Фамилия"
            disabled={isSubmitted}
          />
          <FormErrorMessage>
            {errors.lastname && errors.lastname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.number} mb={5}>
          <FormLabel>Номер телефона:</FormLabel>
          <InputGroup>
            <InputLeftAddon>+7</InputLeftAddon>
            <Input
              {...register('number', {
                required: {value: true, message: 'Это обязательное поле'},
                validate: (value) =>
                  !value.includes('_') || 'Некорректный номер телефона'
              })}
              as={InputMask}
              mask="(999)-999-99-99"
              defaultValue={user.number}
              type="text"
              placeholder="Номер телефона"
              disabled={isSubmitted}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.number && errors.number.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Email:</FormLabel>
          <Text>{user.email}</Text>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Роль:</FormLabel>
          <Text>{role(user.role)}</Text>
        </FormControl>
        <FormControl mb={10}>
          <FormLabel>Еmail подтвержден?:</FormLabel>
          <HStack>
            <Box>
              <Text>
                {user.isEmailConfirmed ? 'Подтвержден' : 'Не подтвержден'}
              </Text>
            </Box>
            {!user.isEmailConfirmed && (
              <Box>
                <Button variant="link" onClick={onSend}>
                  Подтвердить?
                </Button>
              </Box>
            )}
          </HStack>
        </FormControl>
        <Flex justifyContent="center">
          <Button
            type="submit"
            colorScheme="red"
            isLoading={isSubmitted}
            disabled={isSubmitted}
          >
            Соранить изменения
          </Button>
        </Flex>
      </form>
      <HStack mt={10} justifyContent="center">
        <Box>
          <Text>Удалить профиль</Text>
        </Box>
        <Box>
          <Button variant="outline" colorScheme="red">
            Удалить
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}

export default FormEdit
