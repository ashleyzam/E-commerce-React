import { Box, Flex, Image, Spinner } from "@chakra-ui/react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React from "react"
import Slider from "react-slick"
import { useGet } from "../../Hooks/useGetProducts"
import { useGetCarousel } from "../../Hooks/useGetCarousel"
const Home = () => {
  const { isLoading, carousel } = useGetCarousel()
  const { data } = useGet()
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Box w="75%">
      <Box>{isLoading && <Spinner />}</Box>
      <Slider {...settings}>
        {carousel &&
          carousel.map((item) => (
            <Flex key={item.id} justify="center" w="100%">
              <Image
                w="30%"
                m="auto"
                src={
                  item.attributes.image.data.attributes.formats.thumbnail.url
                }
              />
            </Flex>
          ))}
      </Slider>
      <Flex justify="center">
        {data &&
          data.map((prod) => (
            <Flex flexDirection="row" key={prod.id}>
              <Image
                objectFit="scale-down"
                w="100%"
                h={200}
                src={
                  prod.attributes.image.data.attributes.formats.thumbnail.url
                }
              />
            </Flex>
          ))}
      </Flex>
    </Box>
  )
}
export { Home }
