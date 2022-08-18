import { useState, useEffect } from "react"
const useGet = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [page, setPages] = useState(0)
  const [titleValues, setTitleValues] = useState("")
  const qs = require("qs")

  const filters = qs.stringify(
    {
      filters: {
        title: {
          $contains: `${titleValues}`,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
  const pages = qs.stringify(
    {
      pagination: {
        start: `${page}`,
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    const getData = async (url) => {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:1337/api/products?populate=image&${pages}&${filters}`
      )
      setIsLoading(false)
      const data = await res.json()
      if (!data.data) {
        setError("error")
      }
      setData(data.data)
    }
    getData()
  }, [pages, filters])

  return { data, isLoading, error, page, setPages, setTitleValues }
}
export { useGet }
