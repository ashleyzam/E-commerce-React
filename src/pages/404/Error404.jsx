import { Flex, Image, Text } from "@chakra-ui/react"

const Error404 = () => {
  return (
    <Flex alignItems="center" justify="center" flexDirection="column" w="100%">
      <Text fontSize={20}>The page you are looking for is not available</Text>
      <Image
        m="0"
        width="30%"
        flexWrap="wrap"
        minW="400"
        src={
          "https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=826&t=st=1659546620~exp=1659547220~hmac=56a0f80053a96cd5d769d3c1fc24d2d4ef62e045e5eb0960207d2e192e608a31"
        }
        alt="404 The page you are looking for is  not available"
      />
    </Flex>
  )
}

export { Error404 }
