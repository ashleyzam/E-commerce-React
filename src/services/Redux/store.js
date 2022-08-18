import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./Slices/auth"
import cartReducer from "./Slices/cart"
import { modalReducer } from "./Slices/modal"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
})
