import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

export default function HomeCard({ product }) {
  return (
    <div
      key={product.id}
      className="group bg-white rounded-2xl overflow-hidden
      shadow-md hover:shadow-2xl transition-all duration-300
      hover:-translate-y-1 flex flex-col"
    >
      <Link
        to={`/products/${product.id}`}
        className="block flex-grow focus:outline-none"
      >
        <div className="relative h-52 bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-44 object-contain transition-transform
            duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-base text-gray-800 line-clamp-2 mb-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>

          <p className="text-xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      <Link
        to={`/products/${product.id}`}
        className="mx-5 mb-5 flex items-center justify-center gap-2
        rounded-xl bg-gradient-to-r from-green-500 to-emerald-600
        text-white py-3 font-semibold shadow-md
        hover:from-green-600 hover:to-emerald-700
        transition-all duration-300 active:scale-95"
      >
        <Eye size={18} />
        View Details
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
