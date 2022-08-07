import { Link, Flex, Box, Image } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { ModalHandle } from "../../pages/auth/Modal"

export const Header = () => {
  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={5}
        bg="black"
        color="white"
      >
        <Box>
          <Image
            w={20}
            h="10"
            src="https://static.vecteezy.com/system/resources/previews/002/486/285/non_2x/violet-purple-gradient-background-mesh-free-vector.jpg"
            alt="logogif"
          />
        </Box>
        <Flex align="center" justify="space-between" gap={5} padding={5}>
          <Link as={NavLink} to="/">
            Home
          </Link>
          <Link as={NavLink} to="/products">
            Products
          </Link>
          <Link as={NavLink} to="/hola">
            Cart
          </Link>
          <ModalHandle />
        </Flex>
      </Flex>
    </Box>
  )
}
