import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  cart: [],
}
const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart recibe objeto del articulo/item que se agregará al estado como payload, para agregarlo primero me fijo si existe usando el metodo find, si existe incremento la cantidad, si no, lo agrego al estado usando el metodo push
    // me copio el ...action.payload que es el PRODUCTO que recibo de la accion cuando hago el onClick addToCart, de esta manera le agrego la propiedad QUANTITY ,la idea de esto es tener una propiedad que pueda incrementar en 1, cuando sea que ya tenga un producto en el carrito.
    addToCart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        // console.log(action.payload)
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    // recibo el id como payload que uso para encontrar el item en el estado en incrementar su cantidad en 1.
    increaseQuantity: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      items.quantity++
    },
    // en este reducer también recibo el id como payload para encontrar y decrementar únicamente cuando quantity sea mayor a 1.
    decreaseQuantity: (state, action) => {
      const items = state.cart.find((item) => item.id === action.payload)
      if (items.quantity === 1) {
        items.quantity = 1
      } else {
        items.quantity--
      }
    },
    // también recibo el id como payload, para luego usarlo y remover el item y estado del carrito.
    removeItem: (state, action) => {
      const removeItems = state.cart.filter(
        (item) => item.id !== action.payload
      )
      state.cart = removeItems
    },
    // simplemente vuelvo a mi estado inicial de [] vacío, limpiando así todo el carrito de compras con una sola acción.
    clearCart: () => initialState,
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
