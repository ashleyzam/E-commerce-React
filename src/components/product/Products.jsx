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
} from "@chakra-ui/react"
import { FilterProducts } from "../product/FilterProducts"
import { useGet } from "../../services/useGet"

const Products = () => {
  const { data, page, isLoading, setPages, setTitleValues } = useGet()
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
      <FilterProducts setTitleValues={setTitleValues} />
      {isLoading && <Spinner />}
      {data &&
        data.map((product) => (
          <Flex
            gap="30px"
            maxWidth="550"
            flexDirection="column"
            alignItems="center"
            justify="center"
            minWidth={200}
            wrap="wrap"
            w="50%"
            key={product.id}
          >
            <Heading>{product.attributes.title}</Heading>
            <Image
              w={200}
              src={
                product.attributes.image.data.attributes.formats.thumbnail.url
              }
            />
            <Link to={`/products/${product.id}`}>
              <Button colorScheme="blue">Details</Button>
            </Link>

            <Button onClick={() => handleAdd(product)}>add</Button>
          </Flex>
        ))}
      <Flex justify="center" alignItems="flex-end" w="100%" gap={3} h="150">
        <Button
          isDisabled={page === 0 && "disabled"}
          onClick={() => setPages(page - 3)}
          colorScheme="blue"
        >
          {"<"} Previous
        </Button>
        <Button
          isDisabled={page === 2 && "disabled"}
          onClick={() => setPages(page + 3)}
          colorScheme="blue"
        >
          Next {">"}
        </Button>
      </Flex>
    </>
  )
}

export { Products }
