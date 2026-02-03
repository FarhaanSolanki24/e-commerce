import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getProducts,
  getProductStatus,
} from "../features/products/productSlice";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ShoppingCart, Search } from "lucide-react";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(getProductStatus);
  const allProducts = useSelector(getProducts);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  if (status === "Loading") return <Loader />;
  if (status === "error") return <Error />;

  const filteredProducts = allProducts
    .filter((p) => (category ? p.category === category : true))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-3xl font-bold mb-2">No Products Found</h2>
        <p className="text-gray-500 mb-6">
          Try a different category or search keyword
        </p>
        <button
          onClick={() => {
            setSearch("");
            setSearchInput("");
            navigate("/products");
          }}
          className="px-6 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-gray-800 to-black hover:opacity-90 transition"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          to="/cart"
          className="flex items-center gap-2 font-semibold text-gray-700
          hover:text-green-600 transition"
        >
          <ShoppingCart size={22} />
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border
            focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={() => setSearch(searchInput)}
          className="px-6 py-3 rounded-full font-semibold text-white
          bg-gradient-to-r from-green-500 to-emerald-600
          hover:from-green-600 hover:to-emerald-700 transition"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 pt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-5 py-2 rounded-xl border font-semibold
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-gray-100 transition"
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 rounded-xl border font-semibold
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
