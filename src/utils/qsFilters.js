import qs from "qs"
import { useState } from "react"

export const qsFilters = () => {
  const [price, setPrice] = useState("")
  const [page, setPages] = useState(0)
  const [titleValues, setTitleValues] = useState("")
  const [categories, setCategories] = useState("")

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

  const filterPrice = qs.stringify(
    {
      filters: {
        price: {
          $containsi: `${price}`,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  return {
    filters,
    pages,
    page,
    filterCategory,
    filterPrice,
    setPrice,
    setCategories,
    setPages,
    setTitleValues,
  }
}
