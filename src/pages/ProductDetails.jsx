import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../features/products/productSlice";
import { addItem, decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from "../features/cart/cartSlice";
import { useState } from "react";
import SizeChart from "../components/SizeChartModal";
import { ShoppingCart } from "lucide-react";

export default function ProductDetails() {
    const { id } = useParams();
    const product = useSelector(getProductById(Number(id)));


    const dispatch = useDispatch();
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const currentQuantity = useSelector(
        getCurrentQuantityById(product?.id, selectedSize)
    );

    function handleAddToCart() {
        dispatch(
            addItem({
                productId: product.id,
                size: selectedSize,
                title: product.title,
                image: product.image,
                unitPrice: product.price,
                quantity: 1,
                totalPrice: product.price,
            })
        );
    }

    if (!product) return <p>Loading Product...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex justify-center items-center
             bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl
              transition-shadow duration-300">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-96 object-contain"
                />
            </div>

            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.title}</h2>
                    <p className="text-3xl font-extrabold text-green-600 mb-4">$ {product.price}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 capitalize">{product.description}</p>

                    <div className="mb-4">
                        <p className="font-semibold mb-2">Select Size</p>
                        <div className="flex gap-3 flex-wrap">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-2 border rounded-full transition-all duration-200
                        ${selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "bg-white hover:border-black text-gray-700"}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSizeChart(true)}
                        className="text-sm text-blue-600 mb-6 hover:underline">
                        View Size Chart
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
                    {currentQuantity > 0 ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => dispatch(decreaseItemQuantity({
                                    productId: product.id,
                                    size: selectedSize
                                }))}
                                className="w-10 h-10 flex items-center justify-center border
                        border-gray-300 rounded-full font-bold text-gray-700
                        hover:bg-gray-100 transition-colors duration-200">
                                -
                            </button>

                            <span className="text-lg font-semibold">{currentQuantity}</span>

                            <button
                                onClick={() => dispatch(increaseItemQuantity({
                                    productId: product.id,
                                    size: selectedSize
                                }))}
                                className="w-10 h-10 flex items-center justify-center border
                        border-gray-300 rounded-full font-bold text-gray-700
                        hover:bg-gray-100 transition-colors duration-200">
                                +
                            </button>

                            <span className="text-green-600 font-medium">In Cart</span>
                        </div>
                    ) : (
                        <button
                            disabled={!selectedSize}
                            onClick={handleAddToCart}
                            className={`w-full md:w-auto flex justify-center items-center gap-2
                        px-6 py-3 rounded-xl font-semibold transition-all duration-300
                        ${selectedSize
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    )}

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 text-lg font-semibold
                         text-gray-800 hover:text-yellow-600 mt-2 md:mt-0">
                        <ShoppingCart size={18} />
                        <span>View Cart</span>
                    </Link>
                </div>
            </div>

            {showSizeChart && <SizeChart onClose={() => setShowSizeChart(false)} />}
        </div>
    );
}
