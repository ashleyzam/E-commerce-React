import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Flex, Heading, Image, Text, Spinner } from "@chakra-ui/react"

const ProductsDetails = () => {
  const [details, setDetail] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:1337/api/products/${id}?populate=image`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.data) setDetail(data)
        setIsLoading(false)
      })
  }, [id])
  // console.log(details)
  return (
    <>
      {isLoading && <Spinner />}
      {details && (
        <Flex
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
          <Heading>{details.data.attributes.title}</Heading>
          <Image
            w={200}
            src={
              details.data.attributes.image.data.attributes.formats.thumbnail
                .url
            }
          />
          <Text>{details.data.attributes.description}</Text>
          <Button colorScheme="blue">Add to cart</Button>
        </Flex>
      )}
    </>
  )
}

export { ProductsDetails }
