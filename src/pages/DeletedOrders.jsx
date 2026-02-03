import { useDispatch, useSelector } from "react-redux";
import { getOrders, restoreOrder } from "../features/orders/ordersSlice";
import { RotateCcw, ArrowLeft, Archive } from "lucide-react";
import { Link } from "react-router-dom";

export default function DeletedOrders() {
  const dispatch = useDispatch();

  const deletedOrders = useSelector(getOrders).filter(
    order => order.isDeleted === true
  );

  if (deletedOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <Archive size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Deleted Orders</h2>
        <p className="text-gray-500 mb-6">
          You haven’t deleted any orders yet.
        </p>
        <Link
          to="/orders"
          className="flex items-center gap-2 px-6 py-3
          rounded-full bg-green-600 hover:bg-green-700
          text-white font-semibold transition"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deleted Orders</h1>
        <Link
          to="/orders"
          className="flex items-center gap-1 text-green-600
          font-semibold hover:underline"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="space-y-6">
        {deletedOrders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md
            hover:shadow-lg transition-all p-6
            flex flex-col sm:flex-row gap-6 items-center"
          >
            <img
              src={order.items[0]?.image}
              alt="Product"
              className="h-24 w-24 object-contain rounded-xl
              border bg-gray-50"
            />

            <div className="flex-1">
              <p className="text-xs text-gray-500">ORDER ID</p>
              <p className="font-mono font-semibold">{order.id}</p>

              <p className="mt-2 text-sm text-gray-500">
                Deleted order
              </p>

              <p className="mt-2 text-lg font-bold text-green-600">
                ₹ {order.totalAmount}
              </p>
            </div>

            <button
              onClick={() => dispatch(restoreOrder(order.id))}
              className="flex items-center gap-2 px-5 py-2.5
              rounded-full bg-green-600 hover:bg-green-700
              text-white font-semibold transition
              shadow-md hover:shadow-lg"
            >
              <RotateCcw size={16} />
              Restore Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
