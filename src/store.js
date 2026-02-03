import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice"
import cartReducer from "./features/cart/cartSlice"
import addressReducer from "./features/address/addressSlice"
import ordersReducer from "./features/orders/ordersSlice"
import authReducer from "./features/auth/authSlice"

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        address: addressReducer,
        orders: ordersReducer,
        auth: authReducer,
    }
})
export default store