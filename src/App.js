import "./App.css"
import { Routes, Route } from "react-router-dom"
import ShopLayout from "./components/layout/ShopLayout"
import { Products } from "./components/product/Products.jsx"
import { Home } from "./pages/Home"
import { Error404 } from "./404/Error404"
import { ProductsDetails } from "./components/product/ProductsDetails"
import { Profile } from "./pages/Profile/Profile.jsx"
import { ProtectedRoutes } from "./components/protectedRoute/ProtectedRoutes"

function App() {
  return (
    <div className="App">
      <ShopLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ShopLayout>
    </div>
  )
}

export default App
