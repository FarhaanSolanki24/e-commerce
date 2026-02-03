import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseItemQuantity,
  deleteItem,
  getCart,
  getTotalCartPrice,
  increaseItemQuantity,
} from "../features/cart/cartSlice";
import EmptyCart from "../components/EmptyCart";
import { Trash2, ArrowRight, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const navigate = useNavigate();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-green-600" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-28 w-28 object-contain rounded-xl bg-gray-50 border"
              />

              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  $ {item.unitPrice} each
                </p>

                {item.size && (
                  <span className="mt-2 w-fit px-3 py-1 text-xs font-semibold rounded-full
                   bg-gray-100">
                    Size: {item.size}
                  </span>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseItemQuantity({
                            productId: item.productId,
                            size: item.size,
                          })
                        )
                      }
                      className="h-9 w-9 rounded-full border flex items-center justify-center
                       hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseItemQuantity({
                            productId: item.productId,
                            size: item.size,
                          })
                        )
                      }
                      className="h-9 w-9 rounded-full border flex items-center justify-center
                       hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(
                        deleteItem({
                          productId: item.productId,
                          size: item.size,
                        })
                      )
                    }
                    className="flex items-center gap-1 text-sm font-semibold
                     text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <p className="text-xl font-bold text-green-600">
                  $ {item.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>$ {totalPrice}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span className="text-green-600">$ {totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-green-500 to-emerald-600
            hover:from-green-600 hover:to-emerald-700
            transition shadow-md hover:shadow-lg mb-3"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full px-6 py-3 rounded-xl font-semibold text-red-600 border
            border-red-500 hover:bg-red-50 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
