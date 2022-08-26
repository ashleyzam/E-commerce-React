import { useParams } from "react-router-dom"
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
  console.log(product && product)
  console.log(cart)

  const maxValue = () => {
    const findProd = cart.cart.find((prod) => prod.id === Number(id))
    console.log(findProd)
    return findProd && findProd.quantity >= product.data.attributes.stock
  }

  const handleClick = (product) => {
    dispatch(addToCart(product))
    toast({
      title: "a product was added to cart",
      description: "",
      status: "success",
      duration: 9000,
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
    <>
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
          borderRadius=" 8px 8px 40px 40px;"
          wrap="wrap"
          gap="5"
          w="80%"
          pb={50}
          m={20}
        >
          <Heading w="99%" bg="black" color="white" borderRadius={5} p={5}>
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
          <Text>{product.data.attributes.stock}</Text>

          <Button
            isDisabled={maxValue()}
            bg="black"
            p="0px 137px"
            _hover={{ bg: "black" }}
            onClick={() => handleClick(product.data)}
          >
            {<FaShoppingBag fontSize="20px" color="white" />}
          </Button>
        </Flex>
      )}
    </>
  )
}

export { ProductsDetails }
