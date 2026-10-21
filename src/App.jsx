import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'

function Placeholder({ title }) {
  return <h1 className="text-2xl font-bold text-blue-950">{title} (coming next)</h1>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoring" element={<Placeholder title="Water Monitoring" />} />
          <Route path="/graph" element={<Placeholder title="Consumption Graph" />} />
          <Route path="/alerts" element={<Placeholder title="Leakage Alerts" />} />
          <Route path="/bill" element={<Placeholder title="Bill Estimator" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/profile" element={<Placeholder title="Profile" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}