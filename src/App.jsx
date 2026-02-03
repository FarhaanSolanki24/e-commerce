import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import OrdersDetails from './pages/OrdersDetails'
import DeletedOrders from './pages/DeletedOrders'
import AdminOrders from './pages/AdminOrders'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoutes'

export default function APP() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:orderId' element={<OrdersDetails />} />
          <Route path='/orders/deleted' element={<DeletedOrders />} />

          <Route element={<ProtectedRoute adminOnly />}>
          <Route path='/admin/orders' element={<AdminOrders />}/>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}