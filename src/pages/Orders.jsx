import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../features/orders/ordersSlice";
import { Link } from "react-router-dom";
import { PackageCheck, ArrowRight, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Orders() {
  const orders = useSelector(getOrders).filter(
    order => order.isDeleted !== true
  );
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  function handleDelete(orderId) {
    setSelectedOrderId(orderId)
    setShowDeleteModal(true)
  }

  function confirmDelete(){
    dispatch(deleteOrder(selectedOrderId))
    setShowDeleteModal(false)
    selectedOrderId(null)
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <PackageCheck size={90} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">
          You haven't placed any orders yet.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700
          text-white font-semibold transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl
            transition-all p-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <img
                src={order.items[0]?.image}
                alt="Product"
                className="h-32 w-32 object-contain rounded-xl
                border bg-gray-50"
              />

              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">ORDER ID</p>
                  <p className="font-mono font-semibold">{order.id}</p>

                  <p className="mt-2 text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toDateString()}
                  </p>

                  <p className="mt-2 text-xl font-bold text-green-600">
                    $ {order.totalAmount}
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full
                    text-xs font-semibold
                    ${order.status === "Placed"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    DELIVERY ADDRESS
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {order.address.fullName},<br />
                    {order.address.city}, {order.address.state} –{" "}
                    {order.address.pincode}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link
                to={`/orders/${order.id}`}
                className="flex items-center gap-1 text-green-600
                font-semibold hover:underline"
              >
                View Details
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => handleDelete(order.id)}
                disabled={order.status !== "Cancelled"}
                className={`flex items-center gap-1 font-semibold
                  ${order.status !== "Cancelled" ?
                    "text-gray-400 cursor-not-allowed" :
                    "text-red-500 hover:text-red-700"
                  }`}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

        ))}
        <div className="mt-12 bg-gray-50 border border-dashed
        rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              Deleted Orders
            </h3>
            <p className="text-sm text-gray-500">
              View orders that you have removed earlier
            </p>
          </div>

          <Link
            to="/orders/deleted"
            className="px-5 py-2 rounded-full border
            border-green-600 text-green-600
            font-semibold hover:bg-green-600
            hover:text-white transition"
          >
            View Deleted Orders
          </Link>
        </div>

      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center
        justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            
            <h3 className="text-xl font-bold mb-3">
              Delete Order
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this order?
            </p>

            <div className="flex justify-end gap-3">
              <button
              onClick={() =>{
                setShowDeleteModal(false)
                setSelectedOrderId(null)
              }}
              className="px-5 py-2 rounded-xl border font-semibold">
                Cancel
              </button>

              <button
              onClick={confirmDelete}
              className="px-5 py-2 rounded-xl font-semibold text-white
             bg-red-600 hover:bg-red-700 transition">
              Confirm Delete
             </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
