import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import {
  increaseQuantity,
  removeItem,
  clearCart,
  decreaseQuantity,
} from "../../services/Redux/Slices/cart"

import { FcEmptyTrash } from "react-icons/fc"
import { onCloseCart } from "../../services/Redux/Slices/openCart"

import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  DrawerHeader,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Link,
  Spinner,
} from "@chakra-ui/react"
import { FaHome, FaShoppingBag } from "react-icons/fa"
import { useGet } from "../../Hooks/useGetProducts"

const Cartdrawer = () => {
  const btnRef = React.useRef()
  const cart = useSelector((state) => state.cart)
  const openCart = useSelector((state) => state.openCart)
  const { isLoading } = useGet()
  const dispatch = useDispatch()
  const toast = useToast()

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.cart.forEach((item) => {
      totalQuantity += item.quantity
      totalPrice += item.attributes.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }
  const handleIncrement = (data) => {
    dispatch(increaseQuantity(data))
    toast({
      title: "a product was added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <>
      <Drawer
        isOpen={openCart}
        placement="right"
        onClose={() => dispatch(onCloseCart())}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>My cart</DrawerHeader>

          <DrawerBody>
            {cart.cart.length === 0 ? (
              <Flex
                w="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                wrap="wrap"
                gap={5}
              >
                <Text mt="1em">Your cart is empty.</Text>
                <Link as={NavLink} to="/">
                  <Button colorScheme="linkedin">
                    <FaHome fontSize="20" />
                  </Button>
                </Link>
              </Flex>
            ) : (
              <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                wrap="wrap"
                gap={5}
              >
                {isLoading && <Spinner />}
                {cart.cart?.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Image
                      src={
                        item.attributes.image.data.attributes.formats.thumbnail
                          .url
                      }
                      w="40%"
                    />
                    <Box
                      key={item.id}
                      display="flex"
                      w="100%"
                      alignItems="center"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Text
                        textAlign="center"
                        fontWeight="bold"
                        textTransform="capitalize"
                        fontSize="1em"
                      >
                        {item.attributes.title}
                      </Text>
                      <Text textAlign="center">
                        Price: ${item.attributes.price}
                      </Text>
                      <Text textAlign="center">Quantity: {item.quantity}</Text>
                      <Text>Stock: {item.attributes.stock}</Text>

                      <Box display="flex" w="100%" justifyContent="center">
                        <Button
                          m="1"
                          isDisabled={item.quantity === 1}
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          -
                        </Button>
                        <Button
                          m="1"
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          {<FcEmptyTrash />}
                        </Button>
                        <Button
                          m="1"
                          isDisabled={item.quantity === item.attributes.stock}
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Text>
                  total ({getTotal().totalQuantity}) :{" "}
                  <strong>${getTotal().totalPrice}</strong>
                </Text>
                <Flex justify="flex-end" alignItems="flex-end" h={150} gap={5}>
                  <Link as={NavLink} to="/cart">
                    <Button bg="black" p="0px 48px" _hover={{ bg: "black" }}>
                      {<FaShoppingBag fontSize="20px" color="white" />}
                    </Button>{" "}
                  </Link>
                  <Button
                    onClick={() => dispatch(clearCart())}
                    colorScheme="red"
                  >
                    Empty cart
                  </Button>
                </Flex>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { Cartdrawer }
