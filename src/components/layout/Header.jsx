import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaShoppingBag, FaHome } from "react-icons/fa"
import { onOpenCart } from "../../services/Redux/Slices/openCart"
import { logout } from "../../services/Redux/Slices/auth"
import { Cartdrawer } from "../cart/Cartdrawer"
import { Modalwindow } from "../../pages/auth/Modal"
import { Link, Flex, Box, Image } from "@chakra-ui/react"

export const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const getTotalQuantity = () => {
    let result = 0
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
            <FaHome fontSize="20px" />
          </Link>
          <Link as={NavLink} to="/products">
            Products
          </Link>
          <Link onClick={() => dispatch(onOpenCart())} display="flex" gap={5}>
            <FaShoppingBag fontSize="20px" />
            <Cartdrawer />

            {getTotalQuantity() || 0}
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
