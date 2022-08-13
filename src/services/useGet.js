import { useState, useEffect } from "react"
const useGet = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState("")
  useEffect(() => {
    const getData = async (url) => {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:1337/api/products?populate=image&pagination[start]=${page}&pagination[limit]=6${filters}`
      )
      setIsLoading(false)
      const data = await res.json()
      if (!data.data) {
        setError("error")
      }
      setData(data.data)
    }
    getData()
  }, [page, filters])

  return { data, isLoading, error, page, setPage, setFilters }
}
export { useGet }
