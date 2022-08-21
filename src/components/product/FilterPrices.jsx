import { FormControl, Input } from "@chakra-ui/react"

export const FilterPrices = ({ setMinPrice, setMaxPrice }) => {
  return (
    <FormControl mb={20}>
      <Input placeholder="min." onChange={(e) => setMinPrice(e.target.value)} />
      <Input placeholder="max." onChange={(e) => setMaxPrice(e.target.value)} />
    </FormControl>
  )
}
