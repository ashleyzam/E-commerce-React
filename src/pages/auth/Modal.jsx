import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalHeader,
  Flex,
} from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"
import { useLogin } from "../../services/ZustandHook/zustand"
import { LoginForm } from "../Forms/LoginForm"
import { RegisterForm } from "../Forms/RegisterForm"

export const Modalwindow = () => {
  const { isOpen, onOpen, onClose } = useLogin()
  const [switchForm, setSwitchForm] = useState(true)

  return (
    <>
      <Button onClick={onOpen} bg="black" _hover={{ bg: "none" }}>
        <AiOutlineUser fontSize="20" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Button
                onClick={() => setSwitchForm(true)}
                bgColor="transparent"
                _hover={{ borderBottom: "1px solid black" }}
                borderRadius="0px"
                _focus={{ bg: "none" }}
              >
                Log in
              </Button>
              <Button
                onClick={() => setSwitchForm(false)}
                bgColor="transparent"
                _hover={{ borderBottom: "1px solid black" }}
                borderRadius="0px"
                _focus={{ bg: "none" }}
              >
                Register
              </Button>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={3}>
            {switchForm ? <LoginForm /> : <RegisterForm />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
