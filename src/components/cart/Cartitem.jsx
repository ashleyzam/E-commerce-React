import React from "react"
import { openModal } from "../../services/Redux/Slices/modal"
import { useDispatch, useSelector } from "react-redux"

import { NavLink } from "react-router-dom"
import {
  increaseQuantity,
  removeItem,
  clearCart,
  decreaseQuantity,
} from "../../services/Redux/Slices/cart"

import { FcEmptyTrash } from "react-icons/fc"

import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  useToast,
  Link,
  Spinner,
} from "@chakra-ui/react"
import { FaHome } from "react-icons/fa"
import { useGet } from "../../Hooks/useGetProducts"
import { BsFillCheckCircleFill } from "react-icons/bs"
export const Cartitem = () => {
  const { jwt, user } = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { isLoading } = useGet()
  const toast = useToast()
  const handleIncrement = (data) => {
    dispatch(increaseQuantity(data))
    toast({
      title: "a product was added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.cart.forEach((item) => {
      totalQuantity += item.quantity
      totalPrice += item.attributes.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }
  const sendData = async ({ cart }) => {
    if (!user) {
      dispatch(openModal())
      toast({
        title: "please, login or sign in to continue",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    }
    const data = {
      Item: cart,
      users_permissions_user: user.id,
    }

    const res = await fetch(`http://localhost:1337/api/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
    const info = await res.json()

    if (!info.data) {
      throw new Error("error")
    }
    toast({
      title: "Purchase made successfully!",
      description: "",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <div>
      <Flex justify="center" alignItems="center" h={150}></Flex>
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
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src={
                  item.attributes.image.data.attributes.formats.thumbnail.url
                }
                objectFit="scale-down"
                w="100%"
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
                <Text textAlign="center">Price: ${item.attributes.price}</Text>
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
                  <Button m="1" onClick={() => dispatch(removeItem(item.id))}>
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
          <Flex flexDirection="column" gap={5}>
            <Button
              onClick={() => sendData(cart)}
              bg="black"
              p="0px 20px"
              _hover={{ bg: "black" }}
              color="white"
              gap={2}
            >
              <BsFillCheckCircleFill color="white" />
              Checkout
            </Button>
            <Button onClick={() => dispatch(clearCart())} colorScheme="red">
              Empty cart
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  )
}
