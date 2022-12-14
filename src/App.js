import "./App.css"
import "./index.css"
import { Routes, Route } from "react-router-dom"
import ShopLayout from "./components/layout/ShopLayout"
import { Products } from "./components/products/Products.jsx"
import { Home } from "./pages/Home/Home"
import { Error404 } from "./pages/404/Error404"
import { ProductsDetails } from "./pages/productDetails/ProductsDetails"
import { Profile } from "./pages/Profile/Profile.jsx"
import { ProtectedRoutes } from "./components/protectedRoute/ProtectedRoutes"
import { Cartitem } from "./components/cart/Cartitem"

function App() {
  return (
    <div className="App">
      <ShopLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cartitem />} />
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
