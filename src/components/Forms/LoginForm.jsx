import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { login } from "../../services/Redux/Slices/auth"
import {
  ModalFooter,
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react"

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const dispatch = useDispatch()
  const toast = useToast()
  const onSubmit = async ({ email, password }) => {
    const res = await fetch(`http://localhost:1337/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    })
    const data = await res.json()
    if (!data.user) {
      toast({
        title: "An error occurred.",
        description: "This account does not exist, please register",
        status: "error",
        isClosable: true,
      })
    }
    console.log(data)
    dispatch(login(data))
  }

  return (
    <>
      <Flex justify="center" h="1">
        <Heading>Log in</Heading>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={10} mt={20}>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email address*</FormLabel>
            <Input
              w="100%"
              id="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Invalid e-mail",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors?.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password*</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors?.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
            >
              Log in
            </Button>
          </ModalFooter>
        </VStack>
      </form>
    </>
  )
}
