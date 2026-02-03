import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrders, updateOrderStatus } from "../features/orders/ordersSlice";
import { PackageCheck, Truck, XCircle } from "lucide-react";

export default function AdminOrders() {
  const ORDER_STEPS = ["Placed", "Packed", "Shipped", "Delivered"];

  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  function handleNextStatus(order) {
    const currentIndex = ORDER_STEPS.indexOf(order.status);
    const nextStatus = ORDER_STEPS[currentIndex + 1];

    if (nextStatus) {
      dispatch(
        updateOrderStatus({
          id: order.id,
          nextStatus,
        })
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Orders Panel</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl
            transition-all p-6"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex gap-5 items-start">
                <img
                  src={order.items[0]?.image}
                  alt="Product"
                  className="h-24 w-24 object-contain rounded-xl
                  border bg-gray-50"
                />

                <div>
                  <p className="text-xs text-gray-500">ORDER ID</p>
                  <p className="font-mono font-semibold mb-1">
                    {order.id}
                  </p>

                  <p className="text-sm text-gray-600">
                    Total:{" "}
                    <span className="font-semibold text-green-600">
                      $ {order.totalAmount}
                    </span>
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full
                    text-xs font-semibold
                    ${
                      order.status === "Placed"
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
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleNextStatus(order)}
                  disabled={
                    order.status === "Delivered" ||
                    order.status === "Cancelled"
                  }
                  className="flex items-center gap-2 px-5 py-2 rounded-xl
                  bg-gradient-to-r from-green-500 to-emerald-600
                  text-white text-sm font-semibold shadow
                  hover:from-green-600 hover:to-emerald-700
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  transition"
                >
                  <Truck size={16} />
                  Next Status
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      cancelOrder({
                        id: order.id,
                        reason: "Cancelled by Admin",
                      })
                    )
                  }
                  disabled={order.status !== "Placed"}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl
                  bg-gradient-to-r from-red-500 to-red-600
                  text-white text-sm font-semibold shadow
                  hover:from-red-600 hover:to-red-700
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  transition"
                >
                  <XCircle size={16} />
                  Cancel
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                {ORDER_STEPS.map((step, index) => {
                  const isCompleted =
                    ORDER_STEPS.indexOf(order.status) >= index;

                  return (
                    <div key={step} className="flex-1 text-center">
                      <div
                        className={`mx-auto h-8 w-8 rounded-full flex items-center
                        justify-center text-xs font-bold
                        ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <p
                        className={`mt-2 text-xs font-semibold
                        ${
                          isCompleted
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
