import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { weeklyConsumption } from '../data/mockData'

export default function Graph() {
  const [type, setType] = useState('bar')

  const tab = (name, label) => (
    <button
      type="button"
      onClick={() => setType(name)}
      className={`px-4 py-1.5 rounded-lg text-sm ${
        type === name ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
      }`}
    >
      {label}
    </button>
  )

  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="day" />
      <YAxis tickFormatter={(v) => `${v} L`} width={70} />
      <Tooltip formatter={(v) => [`${v.toLocaleString()} L`, 'Consumption']} />
    </>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Consumption Graph</h1>
      <p className="text-sm text-slate-500 mb-6">Litres used per day this week.</p>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex gap-2 mb-4">
          {tab('bar', 'Bar')}
          {tab('line', 'Line')}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'bar' ? (
              <BarChart data={weeklyConsumption}>
                {axes}
                <Bar dataKey="litres" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={weeklyConsumption}>
                {axes}
                <Line type="monotone" dataKey="litres" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}