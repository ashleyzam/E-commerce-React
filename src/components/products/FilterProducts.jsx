import { FormControl, Input } from "@chakra-ui/react"

const FilterProducts = ({ setTitleValues }) => {
  return (
    <FormControl mb={20}>
      <Input
        bg="white"
        placeholder="Search products"
        onChange={(e) => setTitleValues(e.target.value)}
      />
    </FormControl>
  )
}

export { FilterProducts }
