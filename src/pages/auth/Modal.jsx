import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"
import { useForm } from "react-hook-form"

export const ModalHandle = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`welcome`)
        resolve()
      }, 3000)
    })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} bg="black" _hover={{ bg: "none" }}>
        <AiOutlineUser fontSize="20" />{" "}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={3}>
            <Flex justify="center" h="1">
              <Heading color="thistle">Log In</Heading>
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
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Este email no es valido",
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
                      required: "Este campo es requerido",
                      minLength: {
                        value: 8,
                        message: "Minimo 8 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <FormErrorMessage>
                      {errors?.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <ModalFooter>
                  {" "}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
