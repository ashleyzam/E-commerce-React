import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../services/ZustandHook/useAuth"
const ProtectedRoutes = () => {
  const {
    auth: { user },
  } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export { ProtectedRoutes }
