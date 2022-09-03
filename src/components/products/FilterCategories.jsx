import { Select } from "@chakra-ui/react"
import React from "react"

const FilterCategories = ({ setCategories }) => {
  return (
    <Select
      bg="white"
      placeholder="Categories"
      onChange={(e) => setCategories(e.target.value)}
    >
      <option value="smartwatch">Smartwatch</option>
      <option value="headphones">Headphones</option>
      <option value="laptop">Laptop</option>
    </Select>
  )
}

export { FilterCategories }
