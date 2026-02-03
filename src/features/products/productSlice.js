import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const res = await axios.get("https://fakestoreapi.com/products")
        console.log(res.data)
        return res.data
    }
)

const initialState = {
    products: [],
    status: "idle",
    error: null
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProducts(state) {
            state.products = []
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
})

export const { clearProducts } = productSlice.actions

export default productSlice.reducer

export const getProducts = (state) => state.products.products

export const getProductStatus = (state) => state.products.status

export const getProductById = (id) => (state) =>
    state.products.products.find((product) => product.id === id)