import { useState, useEffect } from "react"
export const useGetCarousel = () => {
  const [carousel, setCarousel] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:1337/api/carousels?populate=image`
      )
      setIsLoading(false)
      const data = await res.json()

      setCarousel(data.data)
    }
    getData()
  }, [])

  return {
    carousel,
    isLoading,
  }
}
