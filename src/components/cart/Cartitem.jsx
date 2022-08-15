import { useSelector, useDispatch } from "react-redux"
import {
  increaseStock,
  removeItem,
  clearCart,
} from "../../services/Redux/Slices/cart"
import { FcEmptyTrash } from "react-icons/fc"
import { Flex, Heading, Text, Image, Button, useToast } from "@chakra-ui/react"
import React from "react"

const Cartitem = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const toast = useToast()
  const emptyCart = (data) => {
    dispatch(clearCart(data))
  }
  const handleRemove = (data) => {
    dispatch(removeItem(data))
  }
  const handleIncrement = (data) => {
    dispatch(increaseStock(data))
    toast({
      title: "a product was added to cart",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }
  return (
    <Flex>
      <Heading>Shopping Cart</Heading>

      {cart?.cart.map((item) => (
        <Flex direction="column" alignItems="center" w="30%" key={item.id}>
          <Image
            w={100}
            src={item.attributes.image.data.attributes.formats.thumbnail.url}
          />
          <Heading>{item.attributes.title}</Heading>
          <Text>Price: ${item.attributes.price}</Text>
          <Text>{item.attributes.description}</Text>
          <Text>You added: {item.quantity}</Text>
          <Text>Stock: {item.attributes.stock}</Text>
          <Button
            isDisabled={item.quantity === item.attributes.stock && "disabled"}
            onClick={() => handleIncrement(item.id)}
          >
            +
          </Button>
          <Button onClick={() => handleRemove(item.id)}>
            {<FcEmptyTrash />}
          </Button>
          <Button onClick={() => emptyCart(item)}>Clear</Button>
        </Flex>
      ))}
    </Flex>
  )
}

export { Cartitem }
