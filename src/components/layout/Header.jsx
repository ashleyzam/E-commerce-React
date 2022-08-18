import { NavLink } from "react-router-dom"
import { Link, Flex, Box, Image } from "@chakra-ui/react"
import { Modalwindow } from "../../pages/auth/Modal"
import { useDispatch, useSelector } from "react-redux"

import { logout } from "../../services/Redux/Slices/auth"
import { FaShoppingBag } from "react-icons/fa"

export const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const getTotalQuantity = () => {
    let result = 0
    // console.log(cart)
    cart.cart.forEach((item) => {
      result += item.quantity
    })
    return result
  }
  const handleClick = () => {
    dispatch(logout())
  }
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
        <Flex align="center" justify="space-between" gap={5} padding={3}>
          <Link as={NavLink} to="/">
            Home
          </Link>
          <Link as={NavLink} to="/products">
            Products
          </Link>
          <Link as={NavLink} to="/cart" display="flex" gap={5}>
            <FaShoppingBag fontSize="20px" /> {getTotalQuantity() || 0}
          </Link>
          <Link as={NavLink} to="/profile">
            Profile
          </Link>
          {user ? (
            <Link to="/profile" bg="none" onClick={handleClick}>
              Log Out
            </Link>
          ) : (
            <Modalwindow />
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
