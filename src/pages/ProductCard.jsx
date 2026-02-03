import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
      <Link to={`/products/${product.id}`} className="relative block">
        <div className="h-52 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-3 mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>

            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              In Stock
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 pt-0 mt-auto">
        <Link
          to={`/products/${product.id}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
          bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold
          hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
        >
          <Eye size={18} />
          View Details
        </Link>
      </div>
    </div>
  );
}
