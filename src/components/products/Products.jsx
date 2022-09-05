import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../services/Redux/Slices/cart"
import { FaShoppingBag } from "react-icons/fa"
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs"
import {
  Flex,
  Heading,
  Image,
  Button,
  useToast,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react"
import { FilterProducts } from "./FilterProducts"
import { useGet } from "../../Hooks/useGetProducts"
import { FilterCategories } from "./FilterCategories"
import { FilterPrices } from "./FilterPrices"

const Products = () => {
  const {
    data,
    page,
    isLoading,
    setPages,
    setTitleValues,
    setCategories,
    setPrice,
  } = useGet()
  const dispatch = useDispatch()
  const toast = useToast()
  const cart = useSelector((state) => state.cart)
  const handleAdd = (data) => {
    dispatch(addToCart(data))
    toast({
      title: "a product was added to cart",
      description: "",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }
  const maxValue = (id) => {
    const findProd = cart.cart.find((prod) => prod.id === id)
    return findProd && findProd.quantity
  }

  return (
    <>
      <Flex w="100%" gap={5} minW={300} p="80px 20px 0px 20px" bg="#ccd8d4">
        <FilterProducts setTitleValues={setTitleValues} />
        <FilterCategories setCategories={setCategories} />
        <FilterPrices setPrice={setPrice} />
      </Flex>
      <Box w="100%" h="20px">
        {isLoading && <Spinner />}
      </Box>
      {data && !data.length && (
        <Text>No products matching the current search</Text>
      )}

      {data &&
        data.map((product) => (
          <Flex
            gap="10px"
            p="2px 1px 10px 1px"
            maxWidth="310"
            m={25}
            border="1px solid #dddddd"
            flexDirection="column"
            alignItems="center"
            justify="center"
            minWidth={300}
            wrap="wrap"
            mt={50}
            bg="#dddde266"
            w="18%"
            key={product.id}
          >
            <Heading w="99%" color="black" borderRadius={5} p={5}>
              {product.attributes.title}
            </Heading>
            <Image
              objectFit="scale-down"
              w="100%"
              h={200}
              src={
                product.attributes.image.data.attributes.formats.thumbnail.url
              }
            />
            <Text textAlign="center">Price: ${product.attributes.price}</Text>
            <Text textAlign="center">Stock: {product.attributes.stock}</Text>
            <Flex justify="flex-end" h={128} flexDirection="column" gap={2}>
              <Link to={`/products/${product.id}`}>
                <Button
                  bg="black"
                  p="0px 123px"
                  color="white"
                  _hover={{ bg: "#3c3b3b" }}
                >
                  Details
                </Button>
              </Link>
              <Button
                bg="#2cc7ad"
                p="0px 137px"
                _hover={{ bg: "#66e8d2" }}
                onClick={() => handleAdd(product)}
                isDisabled={maxValue(product.id) === product.attributes.stock}
              >
                {<FaShoppingBag fontSize="20px" color="white" />}
              </Button>
            </Flex>
          </Flex>
        ))}
      <>
        <Flex
          justify="center"
          alignItems="flex-end"
          w="100%"
          gap={3}
          m={15}
          justifyContent="center"
        >
          <Button
            isDisabled={page === 0}
            onClick={() => setPages(page - 3)}
            bg="black"
            _hover={{ bg: "black" }}
          >
            <BsFillArrowLeftSquareFill color="white" />
          </Button>
          <Button
            isDisabled={page === 6}
            onClick={() => setPages(page + 3)}
            bg="black"
            _hover={{ bg: "black" }}
          >
            <BsFillArrowRightSquareFill color="white" />
          </Button>
        </Flex>
      </>
    </>
  )
}

export { Products }
