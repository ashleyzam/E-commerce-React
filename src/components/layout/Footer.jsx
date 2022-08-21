/* eslint-disable react/no-unescaped-entities */
import { Flex, Box } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Box>
      <Flex
        as="footer"
        align="center"
        justify="center"
        wrap="wrap"
        w="100%"
        mb={0}
        p={8}
        bg="black"
        color="white"
      >
        Created by Ashley - Ada's React Project 2022
      </Flex>
    </Box>
  )
}
