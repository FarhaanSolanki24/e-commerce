import { createSlice } from "@reduxjs/toolkit"

const loadCartFromStorage = () => {
    const data = localStorage.getItem("cart")
    return data ? JSON.parse(data) : []
}

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

const initialState = {
    cart: loadCartFromStorage()
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload

            if (!item.size) return

            const existingItem = state.cart.find((product) =>
                product.productId === item.productId &&
                product.size === item.size
            )
            if (existingItem) {
                existingItem.quantity += 1
                existingItem.totalPrice =
                    existingItem.quantity * existingItem.unitPrice
            } else {
                state.cart.push(item)
            }
            saveCartToStorage(state.cart)
        },

        deleteItem(state, action) {
            const { productId, size } = action.payload;

            state.cart = state.cart.filter(
                (item) =>
                    !(item.productId === productId && item.size === size)
            );

            saveCartToStorage(state.cart);
        },

        increaseItemQuantity(state, action) {
            const { productId, size } = action.payload

            const item = state.cart.find
                ((product) => product.productId === productId && product.size === size)

            if (item) {
                item.quantity += 1
                item.totalPrice = item.quantity * item.unitPrice
            }
            saveCartToStorage(state.cart)
        },

        decreaseItemQuantity(state, action) {
            const { productId, size } = action.payload

            const item = state.cart.find
                ((product) => product.productId === productId && product.size === size)

            if (!item) return

            if (item.quantity === 1) {
                state.cart = state.cart.filter
                    ((product) => !(product.productId === productId && product.size === size))
            } else {
                item.quantity -= 1;
                item.totalPrice = item.quantity * item.unitPrice;
            }

            saveCartToStorage(state.cart)
        },

        clearCart(state) {
            state.cart = []
            localStorage.removeItem("cart")
        }
    }
})

export const { addItem, deleteItem,
    increaseItemQuantity, decreaseItemQuantity,
    clearCart } = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id, size) => (state) =>
    state.cart.cart.find((item) => item.productId === id && item.size === size)?.quantity ?? 0;
