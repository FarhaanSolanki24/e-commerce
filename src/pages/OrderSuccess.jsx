import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { clearCart, getTotalCartPrice } from "../features/cart/cartSlice";
import { getAddress } from "../features/address/addressSlice";
import { Van, Box } from "lucide-react";

export default function OrderSuccess() {
    const dispatch = useDispatch();

    const totalPrice = useSelector(getTotalCartPrice);
    const address = useSelector(getAddress);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4">

            <Confetti recycle={false} numberOfPieces={250} />

            <CheckCircle
                size={90}
                className="text-green-500 drop-shadow-md mb-6"
            />

            <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
                Order Placed Successfully!
            </h1>

            <p className="text-sm text-gray-500 mb-4">
                Order ID: <span className="font-mono font-semibold">{orderId}</span>
            </p>

            <p className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                <Box /> Estimated Delivery by{" "}
                <span className="font-semibold">
                    {deliveryDate.toDateString()}
                </span>
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 w-full max-w-md text-left">
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Order Summary
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                    <p>
                        💰 Total Paid:{" "}
                        <span className="font-semibold text-green-600">
                            $ {totalPrice}
                        </span>
                    </p>

                    <p className="flex items-center justify-start gap-2">
                        <Van size={18} /> Shipping: <span className="font-semibold">Free</span></p>

                    <p>
                        📍 Delivery Address:
                        <br />
                        <span className="font-semibold">
                            {address.fullName}, {address.street}, {address.city},{" "}
                            {address.state} - {address.pincode}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/products"
                    className="px-8 py-3 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-600 hover:to-emerald-700
                    transition-all duration-300 shadow-md hover:shadow-lg
                    hover:scale-105 active:scale-95"
                >
                    Continue Shopping
                </Link>

                <Link
                    to="/orders"
                    className="px-8 py-3 rounded-xl font-semibold
                    border border-gray-300 text-gray-700
                    hover:bg-gray-100 transition-all duration-300"
                >
                    View My Orders
                </Link>
            </div>
        </div>
    );
}
