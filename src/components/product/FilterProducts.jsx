import { useEffect, useState } from "react"
import { FormControl, Input } from "@chakra-ui/react"

const FilterProducts = ({ setFilters, setPage }) => {
  const [titleValues, setTitleValues] = useState("")
  useEffect(() => {
    setPage(0)
    setFilters(`&filters[title][$containsi]=${titleValues}`)
  }, [titleValues])

  return (
    <FormControl mb={20}>
      <Input
        placeholder="search here"
        onChange={(e) => setTitleValues(e.target.value)}
      />
    </FormControl>
  )
}

export { FilterProducts }
