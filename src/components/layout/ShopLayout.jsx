import { Header } from "./Header"
import { Footer } from "./Footer"
import { Flex } from "@chakra-ui/react"

const ShopLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Flex
        w="100%"
        h="100%"
        p={200}
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
