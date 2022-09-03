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
        pb={100}
        pt={90}
        flexDirection="row"
        alignItems="center"
        justify="space-evenly"
        flexWrap="wrap"
      >
        {children}
      </Flex>
      <Footer />
    </div>
  )
}

export default ShopLayout
