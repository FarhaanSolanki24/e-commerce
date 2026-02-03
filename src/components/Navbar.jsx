import { useDispatch, useSelector } from "react-redux"
import { getTotalCartQuantity } from "../features/cart/cartSlice"
import { Link } from "react-router-dom"
import logo from "../assets/logo.jpeg"
import { ShoppingCart, LogOut, LogIn } from "lucide-react"
import { getAuth, logout } from "../features/auth/authSlice"

export default function Navbar() {
    const totalQuantity = useSelector(getTotalCartQuantity)
    const auth = useSelector(getAuth)
    const dispatch = useDispatch()

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
                    <img
                        src={logo}
                        alt="ShopHub Logo"
                        className="h-9 w-10 object-contain"
                    />
                    Shop<span className="text-yellow-500">Hub</span>
                </Link>

                <div className="flex items-center gap-8">

                    {["Home", "Products", "Orders"].map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="relative font-medium text-gray-700
                            hover:text-yellow-500 transition-colors"
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px]
                            bg-yellow-500 transition-all duration-300 hover:w-full" />
                        </Link>
                    ))}

                    {auth.isLoggedIn && auth.role === "admin" && (
                        <>
                            <Link
                                to="/admin/orders"
                                className="relative font-medium text-gray-700
                                hover:text-yellow-500 transition-colors"
                            >
                                Admin Orders
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px]
                                bg-yellow-500 transition-all duration-300 hover:w-full" />
                            </Link>

                            <Link
                                to="/admin/dashboard"
                                className="relative font-medium text-gray-700
                                hover:text-yellow-500 transition-colors"
                            >
                                Dashboard
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px]
                                bg-yellow-500 transition-all duration-300 hover:w-full" />
                            </Link>
                        </>
                    )}

                    {!auth.isLoggedIn ? (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-5 py-2
                            rounded-full font-semibold text-white
                            bg-gradient-to-r from-yellow-500 to-orange-500
                            hover:from-yellow-600 hover:to-orange-600
                            transition-all shadow-md hover:shadow-lg
                            active:scale-95"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={() => dispatch(logout())}
                            className="flex items-center gap-2 px-5 py-2
                            rounded-full font-semibold text-red-600
                            border border-red-200
                            hover:bg-red-50 hover:border-red-300
                            transition-all active:scale-95"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    )}

                    <Link to="/cart" className="relative">
                        <ShoppingCart
                            size={26}
                            className="text-gray-700 hover:text-yellow-500
                            transition-transform hover:scale-110"
                        />

                        {totalQuantity > 0 && (
                            <span
                                className="absolute -top-2 -right-3
                                bg-gradient-to-r from-red-500 to-red-600
                                text-white text-xs w-5 h-5 flex items-center
                                justify-center rounded-full font-semibold shadow"
                            >
                                {totalQuantity}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    )
}
