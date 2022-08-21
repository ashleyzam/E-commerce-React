import { Select } from "@chakra-ui/react"
import React from "react"

const FilterCategories = ({ setCategories }) => {
  return (
    <Select
      placeholder="Categories"
      onChange={(e) => setCategories(e.target.value)}
    >
      <option value="headphones">Headphones</option>
      <option value="Smartwatch">Smartwatch</option>
    </Select>
  )
}

export { FilterCategories }
