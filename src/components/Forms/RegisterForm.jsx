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
} from "@chakra-ui/react"

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const dispatch = useDispatch()
  const onSubmit = async ({ username, email, password }) => {
    const res = await fetch(`http://localhost:1337/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()
    if (!data.user) {
      throw new Error("error")
    }
    dispatch(login(data))
  }

  return (
    <>
      <Flex justify="center" h="1">
        <Heading>Register</Heading>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={10} mt={20}>
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">User name*</FormLabel>
            <Input
              type="text"
              w="100%"
              id="username"
              placeholder="Choose your user name"
              {...register("username", {
                required: "This field is required",
                pattern: {
                  value: "",
                  message: "This field is required",
                },
              })}
            />
            {errors.username && (
              <FormErrorMessage>{errors?.username.message}</FormErrorMessage>
            )}
          </FormControl>
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
              Register
            </Button>
          </ModalFooter>
        </VStack>
      </form>
    </>
  )
}

export { RegisterForm }
