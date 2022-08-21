import { useState, useEffect } from "react"
const useGet = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [page, setPages] = useState(0)
  const [titleValues, setTitleValues] = useState("")

  const [categories, setCategories] = useState("")
  const qs = require("qs")

  const filters = qs.stringify(
    {
      filters: {
        title: {
          $containsi: `${titleValues}`,
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
  const filterCategory = qs.stringify(
    {
      filters: {
        categories: {
          name: {
            $containsi: `${categories}`,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
  const [minPrice, setMinPrice] = useState()
  const filterPrice = qs.stringify(
    {
      filters: {
        price: {
          $lte: `${minPrice}`,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:1337/api/products?populate=image&populate=categories&${pages}&${filters}&${filterCategory}&` ||
          filterPrice
      )
      setIsLoading(false)
      const data = await res.json()
      if (!data.data) {
        setError("error")
      }
      setData(data.data)
    }
    getData()
  }, [pages, filters, filterCategory, filterPrice])

  return {
    data,
    isLoading,
    error,
    page,
    setPages,
    setTitleValues,
    setCategories,
    setMinPrice,
  }
}
export { useGet }
