import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchProducts,
  getProducts,
  getProductStatus,
} from "../features/products/productSlice"
import { useEffect } from "react"
import HomeCard from "./HomeCard"
import {
  Shirt,
  ShoppingBag,
  Gem,
  Laptop,
  ShoppingCart,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector(getProducts)
  const status = useSelector(getProductStatus)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [])

  const categories = [
    { name: "Men's Clothing", value: "men's clothing", icon: Shirt },
    { name: "Women's Clothing", value: "women's clothing", icon: ShoppingBag },
    { name: "Jewellery", value: "jewelery", icon: Gem },
    { name: "Electronics", value: "electronics", icon: Laptop },
  ]

  return (
    <div className="w-full">

      <section className="relative min-h-[90vh] flex items-center
        bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-6 py-2 mb-8
            rounded-full bg-white/10 backdrop-blur-md border border-white/20
            text-sm font-semibold">
            New Collection 2026 <Sparkles size={16} />
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6">
            Elevate Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500
              bg-clip-text text-transparent">
              Shopping Experience
            </span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
            Premium quality products, curated collections and seamless shopping
            experience designed just for you.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-4
              rounded-full bg-yellow-500 text-black font-semibold text-lg
              hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl"
            >
              <ShoppingCart size={22} />
              Shop Now
              <ArrowRight size={22} />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-4
              rounded-full border border-white/30 text-white
              hover:bg-white/10 transition-all"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link
              key={category.name}
              to={`/products?category=${category.value}`}
              className="group relative bg-white rounded-3xl p-10 text-center
              shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-3xl
                bg-gradient-to-br from-yellow-100 to-orange-100 opacity-0
                group-hover:opacity-100 transition"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto flex items-center justify-center
                  rounded-full bg-white shadow-lg mb-6
                  group-hover:scale-110 transition">
                  <category.icon size={36} className="text-gray-800" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Browse Collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>

            <Link
              to="/products"
              className="flex items-center gap-2 font-semibold
              text-yellow-600 hover:text-yellow-700 transition"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 8).map(product => (
              <HomeCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
