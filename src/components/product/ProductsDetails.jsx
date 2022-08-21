import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
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

const ProductsDetails = () => {
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const dispatch = useDispatch()
  const toast = useToast()

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
          height="100vh"
          maxWidth="450"
          flexDirection="column"
          alignItems="center"
          justify="center"
          minWidth={250}
          wrap="wrap"
          gap="5"
          w="100%"
          m={5}
        >
          <Heading>{product.data.attributes.title}</Heading>
          <Image
            w={200}
            src={
              product.data.attributes.image.data.attributes.formats.thumbnail
                .url
            }
          />
          <Text>{product.data.attributes.description}</Text>
          <Button
            colorScheme="linkedin"
            onClick={() => handleClick(product.data)}
          >
            Add to cart
          </Button>
        </Flex>
      )}
    </>
  )
}

export { ProductsDetails }
