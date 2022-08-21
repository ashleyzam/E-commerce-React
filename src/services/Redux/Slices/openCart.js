import { createSlice } from "@reduxjs/toolkit"
const initialState = false
const openCart = createSlice({
  name: "openCart",
  initialState,
  reducers: {
    onOpenCart: () => true,
    onCloseCart: () => initialState,
  },
})
export const openCartReducer = openCart.reducer
export const { onOpenCart, onCloseCart } = openCart.actions
export default openCart.reducer
