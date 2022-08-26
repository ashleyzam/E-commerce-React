import { Header } from "./Header"
import { Footer } from "./Footer"
import { Flex } from "@chakra-ui/react"

const ShopLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Flex
        w="100%"
        minH="100vh"
        p={100}
        flexDirection="row"
        alignItems="center"
        justify="center"
        flexWrap="wrap"
      >
        {children}
      </Flex>
      <Footer />
    </div>
  )
}

export default ShopLayout
