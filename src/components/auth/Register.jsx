import axios from "axios"
import React from "react"

axios
  .post(
    "https://strapiecommerce-production-f2a0.up.railway.app/api/auth/local/register",
    {
      username: "hola q tal",
      email: "ashleyzam4@gmail.com",
      password: "123458",
    }
  )
  .then((response) => {
    // Handle success.
    console.log("Well done!")
    console.log("User profile", response.data.user)
    console.log("User token", response.data.jwt)
  })
  .catch((error) => {
    console.log("An error occurred:", error.response)
  })

export const Register = () => {
  return <div>Register</div>
}
