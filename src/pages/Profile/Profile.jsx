import { Box, Heading, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Box>
      <Heading>hola {user.username}</Heading>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et qui quae
        nostrum ad provident ut minima magni deleniti. Sapiente quam,
        dignissimos deserunt delectus labore amet temporibus fugit qui pariatur
        quos?
      </Text>
    </Box>
  )
}

export { Profile }
