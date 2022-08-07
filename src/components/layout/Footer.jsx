/* eslint-disable react/no-unescaped-entities */
import { Flex, Box } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Box>
      <Flex
        left={0}
        bottom={0}
        right={0}
        as="footer"
        align="center"
        justify="center"
        wrap="wrap"
        w="100%"
        mb={0}
        mt={20}
        p={8}
        bg="black"
        color="white"
        position="relative"
      >
        Created by Ashley - Ada's React Project 2022
      </Flex>
    </Box>
  )
}
