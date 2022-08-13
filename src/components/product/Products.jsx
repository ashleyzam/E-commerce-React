import { Link } from "react-router-dom"

import { Flex, Heading, Image, Button } from "@chakra-ui/react"
import { FilterProducts } from "../product/FilterProducts"
import { useGet } from "../../services/useGet"

const Products = () => {
  const { data, page, setPage, setFilters } = useGet()

  return (
    <>
      <FilterProducts setPage={setPage} setFilters={setFilters} />

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
          </Flex>
        ))}
      <Flex justify="center" alignItems="flex-end" w="100%" gap={3} h="150">
        <Button
          isDisabled={page === 0 && "disabled"}
          onClick={() => setPage(page - 1)}
          colorScheme="blue"
        >
          {"<"} Previous
        </Button>
        <Button
          isDisabled={page === 2}
          onClick={() => setPage(page + 1)}
          colorScheme="blue"
        >
          Next {">"}
        </Button>
      </Flex>
    </>
  )
}

export { Products }
