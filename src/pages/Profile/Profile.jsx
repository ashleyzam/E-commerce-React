import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react"
// import { BsFillCheckCircleFill } from "react-icons/bs"
const Profile = () => {
  const { user, jwt } = useSelector((state) => state.auth)
  const [data, setData] = useState("")

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(
        `http://localhost:1337/api/users/${user.id}?populate[0]=orders`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      const data = await res.json()
      console.log(data)
      setData(data)
    }
    getUserData()
  }, [user.id])

  // data &&
  //   data.orders.forEach((item) =>
  //     item.Item.forEach((prod) => console.log(prod))
  //   )

  return (
    <Box minH="100vh">
      <Heading>Hi there {user.username}!</Heading>
      <Text>Purchases you{"'"}ve made:</Text>

      {data &&
        data.orders.map((item) =>
          item.Item.map((prod) => (
            <Flex key={prod.id} flexDirection="column">
              {console.log(prod)}
              <Text>{prod.attributes.title}</Text>
              <strong>${prod.attributes.price}</strong>
              <Image
                w={220}
                src={
                  prod.attributes.image.data.attributes.formats.thumbnail.url
                }
              />
            </Flex>
          ))
        )}
    </Box>
  )
}

export { Profile }
