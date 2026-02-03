import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    clearCart,
    getCart,
    getTotalCartPrice,
} from "../features/cart/cartSlice";
import { CheckCircle, Van } from "lucide-react";
import { useState } from "react";
import { getAddress, saveAddress } from "../features/address/addressSlice";
import { addOrder } from "../features/orders/ordersSlice";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(getCart);
    const totalPrice = useSelector(getTotalCartPrice);
    const savedAddress = useSelector(getAddress)

    const [address, setAddress] = useState(savedAddress);

    function handleChange(e) {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    function handlePlaceOrder() {
        const { fullName, phone, street, city, state, pincode } = address;

        if (!fullName || !phone || !street || !city || !state || !pincode) {
            alert("Please fill all address fields");
            return;
        }

        dispatch(
            addOrder({
                id: `ORD-${Date.now().toString().slice(-6)}`,
                items: cart.map(item => ({ ...item })),
                address,
                totalAmount: totalPrice,
                status: "Placed",
                isDeleted: false,
                createdAt: new Date().toISOString(),
            })
        );

        dispatch(saveAddress(address))
        dispatch(clearCart());

        navigate("/order-success");
    }

    const addressFields = [
        { name: "fullName", type: "text", placeholder: "Full Name" },
        { name: "phone", type: "tel", placeholder: "Phone Number" },
        { name: "street", type: "text", placeholder: "Street Address" },
        { name: "city", type: "text", placeholder: "City" },
        { name: "state", type: "text", placeholder: "State" },
        { name: "pincode", type: "number", placeholder: "Pincode" }
    ];


    return (
        <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="flex items-center justify-start gap-2 text-2xl font-bold mb-6">
                    <Van /><span> Shipping Address</span></h2>

                <div className="grid gap-4">
                    {addressFields.map((field) => (
                        <input
                            key={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={address[field.name] || ""}
                            onChange={handleChange}
                            className="input"
                        />
                    ))}
                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 h-fit">
                <h2 className="text-2xl font-bold mb-6">🛒 Order Summary</h2>

                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {cart.map((item) => (
                        <div
                            key={`${item.productId}-${item.size}`}
                            className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-14 h-14 object-contain rounded-lg bg-gray-50" />
                                <div>
                                    <h3 className="font-semibold line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Size: {item.size}
                                    </p>
                                </div>
                            </div>

                            <p className="font-semibold">$ {item.totalPrice}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-2 text-gray-700">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$ {totalPrice}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold border-t pt-4">
                        <span>Total</span>
                        <span className="text-green-600">₹ {totalPrice}</span>
                    </div>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2
                    bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-600 hover:to-emerald-700
                    text-white py-3 rounded-xl font-semibold
                    transition-all duration-300 shadow-md hover:shadow-lg
                    hover:scale-105 active:scale-95">
                    <CheckCircle size={18} />
                    Place Order
                </button>
            </div>
        </div>
    );
}
