import { useState } from 'react'
import { weeklyConsumption, summary } from '../data/mockData'

export default function Bill() {
  const weekTotal = weeklyConsumption.reduce((sum, d) => sum + d.litres, 0)
  const [litres, setLitres] = useState(weekTotal)
  const [tariff, setTariff] = useState(summary.tariff)

  const cost = (Number(litres) || 0) * (Number(tariff) || 0)
  const money = (n) =>
    n.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Bill Estimator</h1>
      <p className="text-sm text-slate-500 mb-6">
        Change the numbers to see what your water bill could be.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <label className="block text-xs text-slate-600">
            Water used (litres)
            <input
              type="number"
              min="0"
              value={litres}
              onChange={(e) => setLitres(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs text-slate-600">
            Tariff (K per litre)
            <input
              type="number"
              min="0"
              step="0.01"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setLitres(weekTotal)
              setTariff(summary.tariff)
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Reset to this week&apos;s usage
          </button>
        </div>

        <div className="bg-blue-950 text-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-blue-200">Estimated bill</p>
          <p className="text-4xl font-bold mt-1">K {money(cost)}</p>
          <p className="text-xs text-blue-200 mt-2">
            {(Number(litres) || 0).toLocaleString()} L at K {Number(tariff) || 0} per litre
          </p>
          <div className="mt-6 border-t border-blue-800 pt-4 text-sm space-y-1">
            <p className="flex justify-between">
              <span className="text-blue-200">Today so far</span>
              <span>K {money(summary.totalToday * summary.tariff)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-200">This week</span>
              <span>K {money(weekTotal * summary.tariff)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}