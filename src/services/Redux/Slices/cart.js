import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
}
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      cartItem
        ? cartItem.quantity++
        : state.cart.push({ ...action.payload, quantity: 1 })

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    increaseQuantity: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      items.quantity++
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    decreaseQuantity: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      items.quantity === 1 ? (items.quantity = 1) : items.quantity--
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    removeItem: (state, action) => {
      const removeItems = state.cart.filter(
        (item) => item.id !== action.payload
      )
      state.cart = removeItems
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    clearCart: (state) => {
      state.cart = []
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
  },
})
export const cartReducer = cart.reducer
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cart.actions
export default cart.reducer
