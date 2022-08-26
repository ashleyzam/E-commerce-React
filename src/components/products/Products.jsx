import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../../services/Redux/Slices/cart"
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
import { useGet } from "../../Hooks/useGet"
import { FilterCategories } from "./FilterCategories"
import { FilterPrices } from "./FilterPrices"
import { FaShoppingBag } from "react-icons/fa"
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs"

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

  return (
    <>
      <Flex w="100%" gap={5} minW={350} pt={58}>
        <FilterProducts setTitleValues={setTitleValues} setPages={setPages} />
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
            p="2px 1px 40px 1px"
            maxWidth="500"
            m={25}
            border="1px solid #dddddd"
            flexDirection="column"
            alignItems="center"
            justify="center"
            minWidth={300}
            wrap="wrap"
            borderRadius=" 8px 8px 40px 40px;"
            w="18%"
            key={product.id}
          >
            <Heading w="99%" bg="black" color="white" borderRadius={5} p={5}>
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
            <Text mt="50px" textAlign="center">
              Price: ${product.attributes.price}
            </Text>
            <Text mt="50px" textAlign="center">
              Stock: {product.attributes.stock}
            </Text>

            <Link to={`/products/${product.id}`}>
              <Button colorScheme="green" p="0px 123px" color="white">
                Details
              </Button>
            </Link>
            <Button
              bg="black"
              p="0px 137px"
              _hover={{ bg: "black" }}
              onClick={() => handleAdd(product)}
            >
              {<FaShoppingBag fontSize="20px" color="white" />}
            </Button>
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
