import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Flex, Heading, Image, Button } from "@chakra-ui/react"
import { FilterProducts } from "../product/FilterProducts"

const Products = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState("")

  useEffect(() => {
    fetch(
      `https://strapiecommerce-production-f2a0.up.railway.app/api/products?populate=image&pagination[start]=${page}&pagination[limit]=6${filters}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
  }, [page, filters])

  return (
    <>
      <FilterProducts setPage={setPage} setFilters={setFilters} />
      {products.map((product) => (
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
            src={product.attributes.image.data.attributes.formats.thumbnail.url}
          />
          <Link to={`/products/${product.id}`}>
            <Button colorScheme="blue">Details</Button>
          </Link>
        </Flex>
      ))}
      <Flex justify="center" alignItems="flex-end" w="100%" gap={3} h="150">
        <Button
          disabled={page === 0 && "disabled"}
          onClick={() => setPage(page - 1)}
          colorScheme="blue"
        >
          {"<<"} Previous
        </Button>
        <Button
          disabled={page === 2 || (products.length < 6 && "disabled")}
          onClick={() => setPage(page + 1)}
          colorScheme="blue"
        >
          Next {">>"}
        </Button>
      </Flex>
    </>
  )
}

export { Products }
