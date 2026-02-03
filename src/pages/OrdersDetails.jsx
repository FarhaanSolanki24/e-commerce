import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import {
    cancelOrder,
    getOrderByID,
    updateOrderStatus,
} from "../features/orders/ordersSlice"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function OrdersDetails() {
    const { orderId } = useParams()
    const order = useSelector(getOrderByID(orderId))
    const dispatch = useDispatch()

    const [showCancelModal, setShowCancelModal] = useState(false)
    const [cancelReason, setCancelReason] = useState("")

    const ORDER_STEPS = ["Placed", "Packed", "Shipped", "Delivered"]

    if (!order) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
                <Link to="/orders" className="text-green-600 font-semibold">
                    Back to Orders
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Order Details</h1>
                <Link
                    to="/orders"
                    className="flex items-center gap-1 text-green-600 font-semibold
                     hover:underline"
                >
                    <ArrowLeft size={18} />
                    Back
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow p-6 space-y-2">
                    <p className="text-xs text-gray-500">ORDER ID</p>
                    <p className="font-mono font-semibold">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-4">ORDER DATE</p>
                    <p className="font-semibold">
                        {new Date(order.createdAt).toDateString()}
                    </p>
                </div>

                <div className=" bg-white rounded-2xl shadow p-6 space-y-4">
                    <p className="text-xs text-gray-500">STATUS</p>
                    <span
                        className={`inline-flex w-fit px-4 py-1.5 rounded-full
                         text-xs font-semibold
                          ${order.status === "Placed"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                            }`}
                    >
                        {order.status}
                    </span>

                    {order.status === "Placed" && (
                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="ml-3 w-fit px-3 py-2 rounded-full text-sm
                            font-semibold text-white bg-gradient-to-r
                            from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                             transition shadow"
                        >
                            Cancel Order
                        </button>
                    )}

                    {order.status === "Cancelled" && order.cancelReason && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                            <p className="text-xs text-red-500 font-semibold mb-1">
                                Cancellation Reason
                            </p>
                            <p className="text-sm text-red-700">{order.cancelReason}</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Truck size={18} />
                        Delivery Address
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        {order.address.fullName}
                        <br />
                        {order.address.street}
                        <br />
                        {order.address.city}, {order.address.state} -{" "}
                        {order.address.pincode}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Package size={20} />
                    Items
                </h2>

                <div className="space-y-4">
                    {order.items.map(item => (
                        <div
                            key={`${item.productId}-${item.size}`}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-20 w-20 object-contain rounded-xl border
                                     bg-gray-50"
                                />
                                <div>
                                    <p className="font-semibold line-clamp-1">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        Size: {item.size} · Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-green-600">
                                $ {item.totalPrice}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-bold mb-6">Order Progress</h3>

                <div className="flex items-center justify-between">
                    {ORDER_STEPS.map((step, index) => {
                        const completed =
                            ORDER_STEPS.indexOf(order.status) >= index
                        return (
                            <div key={step} className="flex-1 text-center">
                                <div
                                    className={`mx-auto h-10 w-10 rounded-full
                                         flex items-center justify-center
                                       ${completed
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-300 text-gray-600"
                                        }`}
                                >
                                    {completed ? <CheckCircle size={18} /> : index + 1}
                                </div>
                                <p
                                    className={`mt-2 text-sm font-semibold
                                ${completed ? "text-green-600" : "text-gray-400"}`}
                                >
                                    {step}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {order.status !== "Cancelled" && order.status !== "Delivered" && (
                    <button
                        onClick={() => {
                            const currentIndex = ORDER_STEPS.indexOf(order.status)
                            const nextStatus = ORDER_STEPS[currentIndex + 1]
                            if (nextStatus) {
                                dispatch(
                                    updateOrderStatus({
                                        id: order.id,
                                        nextStatus,
                                    })
                                )
                            }
                        }}
                        className="mt-6 px-6 py-2 rounded-xl bg-blue-600 text-white
                        font-semibold hover:bg-blue-700 transition"
                    >
                        Move to Next Stage
                    </button>
                )}
            </div>

            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold mb-4">Cancel Order</h3>
                        <textarea
                            rows="4"
                            value={cancelReason}
                            onChange={e => setCancelReason(e.target.value)}
                            placeholder="Enter cancellation reason..."
                            className="w-full border rounded-xl p-3 text-sm
                            focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false)
                                    setCancelReason("")
                                }}
                                className="px-5 py-2 rounded-xl border font-semibold"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    if (!cancelReason.trim()) return
                                    dispatch(
                                        cancelOrder({
                                            id: order.id,
                                            reason: cancelReason,
                                        })
                                    )
                                    setShowCancelModal(false)
                                    setCancelReason("")
                                }}
                                className="px-5 py-2 rounded-xl font-semibold text-white
                               bg-red-600 hover:bg-red-700 transition"
                            >
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
