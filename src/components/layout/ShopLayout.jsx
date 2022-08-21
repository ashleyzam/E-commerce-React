import { Header } from "./Header"
import { Footer } from "./Footer"
import { Flex } from "@chakra-ui/react"

const ShopLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Flex
        w="100%"
        h="100vh"
        flexDirection="row"
        alignItems="center"
        justify="center"
        flexWrap="wrap"
        p={6}
      >
        {children}
      </Flex>
      <Footer />
    </div>
  )
}

export default ShopLayout
