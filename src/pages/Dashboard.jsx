import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  Droplet, CircleDollarSign, Gauge, AlertTriangle, TrendingUp,
  LineChart, FileText, User, CheckCircle2,
} from 'lucide-react'
import { weeklyConsumption, summary } from '../data/mockData'

function Card({ icon: Icon, color, label, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-xs text-slate-500">{label}</p>
      {children}
    </div>
  )
}

export default function Dashboard() {
  // What the user considers normal, and how far above it counts as abnormal
  const [normalLitres, setNormalLitres] = useState(1000)
  const [percentOver, setPercentOver] = useState(20)

  const normal = Number(normalLitres) || 0
  const percent = Number(percentOver) || 0
  const threshold = normal * (1 + percent / 100)

  // Mark each day as abnormal or not
  const data = weeklyConsumption.map((d) => ({
    ...d,
    abnormal: normal > 0 && d.litres > threshold,
  }))
  const abnormalDays = data.filter((d) => d.abnormal)
  const hasLeak = abnormalDays.length > 0

  const bill = (summary.totalToday * summary.tariff).toFixed(2)

  // Draws a red dot and label only on abnormal days
  const renderDot = (props) => {
    const { cx, cy, payload, index } = props
    if (!payload.abnormal) return <g key={index} />
    return (
      <g key={index}>
        <circle cx={cx} cy={cy} r={7} fill="#ef4444" stroke="#fff" strokeWidth={2} />
        <text x={cx} y={cy - 14} textAnchor="middle" fontSize={12} fill="#ef4444">
          Possible Leak
        </text>
      </g>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Good morning, Grace!</h1>
          <p className="text-sm text-slate-500">
            Here&apos;s an overview of your water usage and system status.
          </p>
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">
          <option>{summary.institution}</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card icon={Droplet} color="bg-blue-100 text-blue-600" label="Total Water Consumed">
          <p className="text-2xl font-bold text-blue-950">
            {summary.totalToday.toLocaleString()} L
          </p>
          <p className="text-xs text-slate-500">Today</p>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> {summary.changeFromYesterday}% from yesterday
          </p>
        </Card>

        <Card icon={CircleDollarSign} color="bg-green-100 text-green-600" label="Estimated Water Bill">
          <p className="text-2xl font-bold text-blue-950">
            K {Number(bill).toLocaleString('en', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500">(at K {summary.tariff.toFixed(2)}/L)</p>
          <p className="text-xs text-slate-400 mt-1">Based on current usage</p>
        </Card>

        <Card icon={Gauge} color="bg-cyan-100 text-cyan-600" label="Meter ID">
          <p className="text-2xl font-bold text-blue-950">{summary.meterId}</p>
          <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
            Active
          </span>
        </Card>

        <Card
          icon={hasLeak ? AlertTriangle : CheckCircle2}
          color={hasLeak ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}
          label="Water Usage Status"
        >
          <p className={`text-2xl font-bold ${hasLeak ? 'text-red-600' : 'text-blue-950'}`}>
            {hasLeak ? 'Leak Suspected' : 'Normal'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {hasLeak
              ? `${abnormalDays.length} abnormal day(s) this week`
              : 'No unusual spikes detected'}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Weekly chart */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-blue-950 mb-4">Weekly Water Consumption</h2>

          {/* User inputs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 bg-slate-50 rounded-lg p-3">
            <label className="flex-1 text-xs text-slate-600">
              Normal daily usage (litres)
              <input
                type="number"
                min="0"
                value={normalLitres}
                onChange={(e) => setNormalLitres(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
              />
            </label>
            <label className="flex-1 text-xs text-slate-600">
              Abnormal when above normal by (%)
              <input
                type="number"
                min="0"
                value={percentOver}
                onChange={(e) => setPercentOver(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
              />
            </label>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Alert threshold: <span className="font-semibold">{Math.round(threshold).toLocaleString()} L</span> per day
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(v) => `${v.toLocaleString()} L`} width={70} />
                <Tooltip formatter={(v) => [`${v.toLocaleString()} L`, 'Consumption']} />
                {normal > 0 && (
                  <ReferenceLine
                    y={threshold}
                    stroke="#f97316"
                    strokeDasharray="6 4"
                    label={{ value: 'Threshold', position: 'insideTopRight', fill: '#f97316', fontSize: 11 }}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="litres"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#blueFill)"
                  dot={renderDot}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-blue-950 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { icon: LineChart, label: 'View Detailed Graph' },
              { icon: AlertTriangle, label: 'Check Alerts' },
              { icon: FileText, label: 'Generate Report' },
              { icon: User, label: 'Manage Profile' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3 text-sm text-blue-950 hover:bg-slate-50"
              >
                <Icon size={18} className="text-blue-600" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}