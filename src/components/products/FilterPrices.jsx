import { FormControl, Input } from "@chakra-ui/react"

export const FilterPrices = ({ setPrice }) => {
  return (
    <FormControl mb={20}>
      <Input
        type="number"
        placeholder="search by price"
        onChange={(e) => setPrice(e.target.value)}
      />
    </FormControl>
  )
}
