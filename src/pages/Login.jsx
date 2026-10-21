import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Droplet, User, Lock, Eye, EyeOff,
  Activity, AlertTriangle, Wallet, Leaf,
} from 'lucide-react'

const features = [
  { icon: Activity, label: 'Monitor Water Usage' },
  { icon: AlertTriangle, label: 'Detect Leaks Early' },
  { icon: Wallet, label: 'Manage Your Costs' },
  { icon: Leaf, label: 'Build a Water-Smart Future' },
]

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login for now. Real authentication comes later.
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left: branding panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Droplet size={48} className="text-cyan-300" />
            <h1 className="text-4xl font-bold">
              Aqua<span className="text-cyan-300">Volt</span>
            </h1>
          </div>
          <p className="mt-4 text-xl">
            Smart Water Management
            <br />
            for a Sustainable Tomorrow
          </p>
        </div>

        <div className="space-y-4 my-10">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="bg-blue-600 p-2 rounded-full">
                <Icon size={18} />
              </span>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-blue-100">
          For Schools &nbsp;|&nbsp; Hospitals &nbsp;|&nbsp; Malls &nbsp;|&nbsp; Companies
        </p>
      </div>

      {/* Right: login card */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Droplet size={28} className="text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">
              Aqua<span className="text-blue-500">Volt</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-950">Welcome Back</h2>
          <p className="text-sm text-center text-slate-500 mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5">
              <User size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2.5">
              <Lock size={18} className="text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}