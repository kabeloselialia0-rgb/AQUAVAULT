import { Droplet, Gauge, TrendingUp } from 'lucide-react'
import { weeklyConsumption, summary } from '../data/mockData'

export default function Monitoring() {
  const total = weeklyConsumption.reduce((sum, d) => sum + d.litres, 0)
  const average = Math.round(total / weeklyConsumption.length)
  const peak = weeklyConsumption.reduce((a, b) => (b.litres > a.litres ? b : a))

  const cards = [
    { icon: Droplet, label: 'Used today', value: `${summary.totalToday.toLocaleString()} L`, color: 'bg-blue-100 text-blue-600' },
    { icon: Gauge, label: 'Daily average', value: `${average.toLocaleString()} L`, color: 'bg-cyan-100 text-cyan-600' },
    { icon: TrendingUp, label: `Peak day (${peak.day})`, value: `${peak.litres.toLocaleString()} L`, color: 'bg-orange-100 text-orange-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Water Monitoring</h1>
      <p className="text-sm text-slate-500 mb-6">
        Meter {summary.meterId} at {summary.institution}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-blue-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-blue-950 mb-4">This week, day by day</h2>
        <div className="space-y-3">
          {weeklyConsumption.map((d) => (
            <div key={d.day} className="flex items-center gap-3 text-sm">
              <span className="w-10 text-slate-500">{d.day}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${(d.litres / peak.litres) * 100}%` }}
                />
              </div>
              <span className="w-20 text-right text-blue-950 font-semibold">
                {d.litres.toLocaleString()} L
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}