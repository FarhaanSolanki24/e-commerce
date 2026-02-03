import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/auth/authSlice"
import { Mail, Lock, LogIn } from "lucide-react"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleLogin(e) {
    e.preventDefault()

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    if (email === "admin123@gmail.com" && password === "admin123") {
      dispatch(login({ user: { email }, role: "admin" }))
      navigate("/admin/dashboard")
      return
    }

    if (password === "user123") {
      dispatch(login({ user: { email }, role: "user" }))
      navigate("/")
      return
    }

    setError("Invalid credentials")
  }

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-300 text-sm">
            Login to continue shopping
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl
                bg-white/90 text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl
                bg-white/90 text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            disabled={!email || !password}
            className={`w-full flex items-center justify-center gap-2
              py-3 rounded-xl font-semibold text-lg transition-all
              ${!email || !password
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02] shadow-lg"
              }`}
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>Admin → admin123@gmail.com / admin123</p>
          <p>User → any email / user123</p>
        </div>

      </div>
    </div>
  )
}
