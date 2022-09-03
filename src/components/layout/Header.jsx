import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaShoppingBag, FaHome } from "react-icons/fa"
import { onOpenCart } from "../../services/Redux/Slices/openCart"
import { logout } from "../../services/Redux/Slices/auth"
import { Cartdrawer } from "../cart/Cartdrawer"
import { Modalwindow } from "../auth/Modal"
import { Link, Flex, Box, Image } from "@chakra-ui/react"
import logo from "../../assets/logo.png"
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
        minW={350}
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={2}
        position="fixed"
        zIndex={2}
        bg="#268ba5"
        color="white"
        borderBottom="2px solid black"
      >
        <Box>
          <Image
            ml="13px"
            w="110px"
            h="80px"
            src={logo}
            alt="logogif"
            border="2px solid #4cedff"
          />
        </Box>
        <Flex align="center" justify="space-between" gap={5} padding={3}>
          <Link as={NavLink} to="/">
            <FaHome fontSize="20px" />
          </Link>
          <Link as={NavLink} to="/products">
            Products
          </Link>
          <Link onClick={() => dispatch(onOpenCart())} display="flex">
            <FaShoppingBag fontSize="20px" />
            <Cartdrawer />

            <Box borderRadius="100%" w="26px" bg="yellow" color="black">
              {getTotalQuantity() || 0}
            </Box>
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
