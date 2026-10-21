import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Droplet, LayoutDashboard, Waves, ChartLine, Bell, Receipt,
  FileText, CircleUser, Settings, LogOut, Menu, X,
} from 'lucide-react'
import { summary } from '../data/mockData'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/monitoring', label: 'Water Monitoring', icon: Waves },
  { to: '/graph', label: 'Consumption Graph', icon: ChartLine },
  { to: '/alerts', label: 'Leakage Alerts', icon: Bell },
  { to: '/bill', label: 'Bill Estimator', icon: Receipt },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/profile', label: 'Profile', icon: CircleUser },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${menuOpen ? 'block' : 'hidden'} md:block fixed md:static inset-y-0 left-0 z-30 w-64 bg-blue-950 text-white flex flex-col`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-900">
          <Droplet size={28} className="text-cyan-300" />
          <span className="text-xl font-bold">
            Aqua<span className="text-cyan-300">Volt</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="md:hidden ml-auto text-blue-200 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-blue-100 hover:bg-blue-900'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-400 text-blue-950 flex items-center justify-center font-bold text-sm">
              GM
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Grace Moyo</p>
              <p className="text-xs text-blue-200 truncate">Administrator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-blue-800 px-3 py-2 text-sm text-blue-100 hover:bg-blue-900"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-20 bg-blue-950/40 md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-blue-950"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <p className="text-sm font-semibold text-blue-950">{summary.institution}</p>
            <p className="text-xs text-slate-500">Meter {summary.meterId}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            System online
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
