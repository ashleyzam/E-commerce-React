import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  cart: [],
}
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart recibe objeto del articulo/item que se agregará al estado como payload, para agregarlo primero me fijo si existe usando el metodo find, si existe incremento la cantidad, si no, lo agrego al estado usando el metodo push
    addToCart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        console.log(action.payload)
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    increaseStock: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      items.quantity++
    },
    decreaseStock: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      if (items.quantity === 1) {
        items.quantity = 1
      } else {
        items.quantity--
      }
    },
    removeItem: (state, action) => {
      const removeItems = state.cart.filter(
        (item) => item.id !== action.payload
      )
      state.cart = removeItems
    },
    clearCart: () => initialState,
  },
})
export const cartReducer = cart.reducer
export const {
  addToCart,
  increaseStock,
  decreaseStock,
  removeItem,
  clearCart,
} = cart.actions
export default cart.reducer
