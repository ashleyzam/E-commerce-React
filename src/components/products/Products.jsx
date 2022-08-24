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
} from "@chakra-ui/react"
import { FilterProducts } from "./FilterProducts"
import { useGet } from "../../Hooks/useGet"
import { FilterCategories } from "./FilterCategories"
import { FilterPrices } from "./FilterPrices"
import { FaShoppingBag } from "react-icons/fa"

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
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Flex w="100%" gap={5} minW={350}>
        <FilterProducts setTitleValues={setTitleValues} setPages={setPages} />
        <FilterCategories setCategories={setCategories} />
        <FilterPrices setPrice={setPrice} />
      </Flex>

      {data && !data.length && (
        <Text>No products matching the current search</Text>
      )}
      {data &&
        data.map((product) => (
          <Flex
            gap="15px"
            p="10px 0px 0px 0px"
            maxWidth="500"
            m={25}
            border="1px solid #dddddd"
            flexDirection="column"
            alignItems="center"
            justify="center"
            minWidth={300}
            wrap="wrap"
            w="20%"
            key={product.id}
          >
            <Heading>{product.attributes.title}</Heading>
            <Image
              objectFit="scale-down"
              w={250}
              src={
                product.attributes.image.data.attributes.formats.thumbnail.url
              }
            />
            <Text mt="50px" textAlign="center">
              Price: ${product.attributes.price}
            </Text>
            <Link to={`/products/${product.id}`}>
              <Button colorScheme="linkedin">Details</Button>
            </Link>

            <Button onClick={() => handleAdd(product)}>
              {<FaShoppingBag fontSize="20px" />}
            </Button>
          </Flex>
        ))}
      <Flex justify="center" alignItems="flex-end" w="100%" gap={3}>
        <Button
          isDisabled={page === 0}
          onClick={() => setPages(page - 3)}
          colorScheme="linkedin"
        >
          {"<"} Previous
        </Button>
        <Button
          isDisabled={page === 6}
          onClick={() => setPages(page + 3)}
          colorScheme="linkedin"
        >
          Next {">"}
        </Button>
      </Flex>
    </>
  )
}

export { Products }
