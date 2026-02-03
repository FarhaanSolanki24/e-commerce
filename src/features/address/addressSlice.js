import { createSlice } from "@reduxjs/toolkit"

const loadAddressFromStorage = () => {
    const data = localStorage.getItem("address")
    return data ? JSON.parse(data) : {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    }
}

const savedAddressToStorage = (address) => {
    localStorage.setItem("address", JSON.stringify(address))
}

const initialState = {
    data: loadAddressFromStorage()
}

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        saveAddress(state, action) {
            state.data = action.payload
            savedAddressToStorage(state.data)
        },

        clearAddress(state) {
            state.data = {
                fullName: "",
                phone: "",
                street: "",
                city: "",
                state: "",
                pincode: ""
            }
            localStorage.removeItem("address")
        }
    },
})

export const { saveAddress, clearAddress } = addressSlice.actions

export default addressSlice.reducer

export const getAddress = (state) => state.address.data