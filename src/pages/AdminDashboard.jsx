import {
    Package,
    Truck,
    CheckCircle,
    XCircle,
    IndianRupee,
    DollarSign
} from "lucide-react"
import { useSelector } from "react-redux"
import { getOrders } from "../features/orders/ordersSlice"

export default function AdminDashboard() {

    const orders = useSelector(getOrders)

    const activeOrders = orders.filter(order => !order.isDeleted)
    const totalOrders = activeOrders.length

    const pendingOrders = activeOrders.filter(
        order => order.status !== "Delivered" && order.status !== "Cancelled"
    ).length

    const deliveredOrders = activeOrders.filter(
        order => order.status === "Delivered"
    ).length

    const cancelledOrders = activeOrders.filter(
        order => order.status === "Cancelled"
    ).length

    const totalRevenue = activeOrders
        .filter(order => order.status === "Delivered")
        .reduce((sum, order) => sum + order.totalAmount, 0)

    const statusCounts = activeOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
    }, {})

    const recentOrders = [...activeOrders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

            <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                    Real-time overview of store performance
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={<Package />}
                    gradient="from-blue-500 to-blue-600"
                />
                <StatCard
                    title="Pending"
                    value={pendingOrders}
                    icon={<Truck />}
                    gradient="from-yellow-400 to-yellow-500"
                />
                <StatCard
                    title="Delivered"
                    value={deliveredOrders}
                    icon={<CheckCircle />}
                    gradient="from-green-500 to-green-600"
                />
                <StatCard
                    title="Cancelled"
                    value={cancelledOrders}
                    icon={<XCircle />}
                    gradient="from-red-500 to-red-600"
                />
                <StatCard
                    title="Revenue"
                    value={`$ ${totalRevenue.toFixed(2)}`}
                    icon={<DollarSign />}
                    gradient="from-emerald-500 to-emerald-600"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">
                    Order Status Breakdown
                </h2>

                <div className="space-y-4">
                    {["Placed", "Packed", "Shipped", "Delivered", "Cancelled"].map(status => {
                        const percentage =
                            ((statusCounts[status] || 0) / totalOrders) * 100 || 0

                        return (
                            <div key={status}>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span>{status}</span>
                                    <span>{statusCounts[status] || 0}</span>
                                </div>

                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500
                                            ${status === "Delivered"
                                                ? "bg-green-500"
                                                : status === "Cancelled"
                                                    ? "bg-red-500"
                                                    : status === "Shipped"
                                                        ? "bg-blue-500"
                                                        : status === "Packed"
                                                            ? "bg-yellow-500"
                                                            : "bg-gray-400"
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">
                    Recent Orders
                </h2>

                {recentOrders.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No recent orders available
                    </p>
                ) : (
                    <div className="space-y-4">
                        {recentOrders.map(order => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between
                                rounded-xl border border-gray-100 p-4
                                hover:bg-gray-50 transition"
                            >
                                <div>
                                    <p className="font-mono text-sm font-semibold">
                                        {order.id}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(order.createdAt).toDateString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-green-600">
                                        $ {order.totalAmount.toFixed(2)}
                                    </p>
                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full
                                        text-xs font-semibold
                                        ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

function StatCard({ title, value, icon, gradient }) {
    return (
        <div className="rounded-2xl shadow-lg bg-white p-5
            hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">
                        {title}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                        {value}
                    </p>
                </div>

                <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${gradient}
                    text-white shadow-md`}
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}
