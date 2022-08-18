import { createSlice } from "@reduxjs/toolkit"
const initialState = false

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: () => true,
    onClose: () => initialState,
  },
})
export const modalReducer = modal.reducer
export const { openModal, onClose } = modal.actions
export default modal.reducer
