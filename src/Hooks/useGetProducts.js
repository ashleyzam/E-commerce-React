import { useState, useEffect } from "react"
import { qsFilters } from "../utils/qsFilters"

const useGet = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const {
    filters,
    pages,
    page,
    filterCategory,
    filterPrice,
    setPrice,
    setCategories,
    setPages,
    setTitleValues,
  } = qsFilters()
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:1337/api/products?populate=image&populate=categories&${pages}&${filters}&${filterCategory}&${filterPrice} `
      )
      setIsLoading(false)
      const data = await res.json()

      setData(data.data)
    }
    getData()
  }, [pages, filters, filterCategory, filterPrice])

  return {
    data,
    isLoading,
    page,
    pages,
    setPages,
    setTitleValues,
    setCategories,
    setPrice,
  }
}
export { useGet }
