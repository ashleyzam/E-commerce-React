import { useParams, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Spinner,
  useToast,
  Link,
} from "@chakra-ui/react"

import { addToCart } from "../../services/Redux/Slices/cart"
import { FaShoppingBag } from "react-icons/fa"

const ProductsDetails = () => {
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const cart = useSelector((state) => state.cart)
  const { id } = useParams()
  const dispatch = useDispatch()
  const toast = useToast()

  const maxValue = () => {
    const findProd = cart.cart.find((prod) => prod.id === Number(id))
    return findProd && findProd.quantity >= product.data.attributes.stock
  }

  const handleClick = (product) => {
    dispatch(addToCart(product))
    toast({
      title: "a product was added to cart",
      description: "",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:1337/api/products/${id}?populate=image`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProduct(data)
        setIsLoading(false)
      })
  }, [id])

  return (
    <Flex direction="column">
      {isLoading && <Spinner />}
      {product && (
        <Flex
          minH={50}
          maxWidth="310"
          minW="300"
          flexDirection="column"
          alignItems="center"
          justify="center"
          border="1px solid #dddddd"
          p="2px 1px 10px 1px"
          wrap="wrap"
          gap="5"
          bg="#dddde266"
          w="80%"
          m={20}
        >
          <Heading w="99%" p={5}>
            {product.data.attributes.title}
          </Heading>
          <Image
            objectFit="scale-down"
            w="100%"
            h={200}
            src={
              product.data.attributes.image.data.attributes.formats.thumbnail
                .url
            }
          />
          <Text>${product.data.attributes.price}</Text>
          <Text>{product.data.attributes.description}</Text>
          <Text>Stock: {product.data.attributes.stock}</Text>

          <Button
            isDisabled={maxValue()}
            bg="black"
            p="0px 137px"
            _hover={{ bg: "#3c3b3b" }}
            onClick={() => handleClick(product.data)}
          >
            {<FaShoppingBag fontSize="20px" color="white" />}
          </Button>
        </Flex>
      )}
      <Flex justify="center">
        <Link as={NavLink} to="/products">
          <Button bg="black" color="white" _hover={{ bg: "#3c3b3b" }}>
            Go back
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export { ProductsDetails }
