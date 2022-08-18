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
// import { useLogin } from "../../services/ZustandHook/zustand"
import { useDispatch, useSelector } from "react-redux"
import { openModal, onClose } from "../../services/Redux/Slices/modal"
import { LoginForm } from "../Forms/LoginForm"
import { RegisterForm } from "../Forms/RegisterForm"

export const Modalwindow = () => {
  const dispatch = useDispatch()
  const modal = useSelector((state) => state.modal)
  const [switchForm, setSwitchForm] = useState(true)

  return (
    <>
      <Button
        onClick={() => dispatch(openModal())}
        bg="black"
        _hover={{ bg: "none" }}
      >
        <AiOutlineUser fontSize="20" />
      </Button>

      <Modal isOpen={modal} onClose={() => dispatch(onClose())}>
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
