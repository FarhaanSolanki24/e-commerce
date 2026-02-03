import { createSlice } from "@reduxjs/toolkit"

const loadOrders = () => {
    const data = localStorage.getItem("orders")
    return data ? JSON.parse(data) : []
}

const savedOrders = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders))
}

const initialState = {
    orders: loadOrders()
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder(state, action) {
            state.orders.unshift(action.payload) //unshift used for when adding items on top 
            savedOrders(state.orders)
        },

        cancelOrder(state, action) {
            const { id, reason } = action.payload;

            const order = state.orders.find(
                o => String(o.id) === String(id)
            );

            if (!order || order.status !== "Placed") return;

            order.status = "Cancelled";
            order.cancelReason = reason;

            savedOrders(state.orders);
        },


        deleteOrder(state, action) {
            const order = state.orders.find((o) =>
                String(o.id) === String(action.payload))

            if (!order) return
            order.isDeleted = true

            savedOrders(state.orders)
        },

        restoreOrder(state, action) {
            const order = state.orders.find(
                (o) => String(o.id) === String(action.payload)
            )
            if (!order) return
            order.isDeleted = false

            savedOrders(state.orders)
        },

        updateOrderStatus(state, action) {
            const { id, nextStatus } = action.payload

            const order = state.orders.find(
                (o) => String(o.id) === String(id)
            )
            if (!order) return
            if (order.status === "Cancelled") return

            order.status = nextStatus
            savedOrders(state.orders)
        }
    },
});

export const { addOrder, cancelOrder, deleteOrder, restoreOrder, updateOrderStatus } = ordersSlice.actions

export default ordersSlice.reducer

export const getOrders = (state) => state.orders.orders

export const getOrderByID = (orderId) => (state) =>
    state.orders.orders.find(
        order => String(order.id) === String(orderId)
    )