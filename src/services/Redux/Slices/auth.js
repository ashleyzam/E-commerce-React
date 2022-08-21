import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  jwt: null,
  user: null,
}
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => payload,
    logout: () => initialState,
  },
})
export const { login, logout } = auth.actions

export default auth.reducer
