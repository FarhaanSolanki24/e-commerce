import { createSlice } from "@reduxjs/toolkit"

const loadAuth = () => {
    const data = localStorage.getItem("auth")
    return data ? JSON.parse(data) : {
        isLoggedIn: false,
        role: null,
        user: null
    }
}

const saveAuth = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth))
}

const initialState = loadAuth()

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true
            state.user = action.payload.user
            state.role = action.payload.role
            saveAuth(state)
        },

        logout(state) {
            state.isLoggedIn = false
            state.user = null
            state.role = null
            localStorage.removeItem("auth")
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

export const getAuth = (state) => state.auth
export const isAdmin = (state) => state.auth.role === "admin"