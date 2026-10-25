import { FileText } from 'lucide-react'
import { weeklyConsumption, summary } from '../data/mockData'

export default function Reports() {
  const total = weeklyConsumption.reduce((sum, d) => sum + d.litres, 0)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Reports</h1>
          <p className="text-sm text-slate-500">Weekly water usage report.</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
        >
          <FileText size={16} />
          Print / Save as PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="font-semibold text-blue-950">{summary.institution}</p>
        <p className="text-xs text-slate-500 mb-4">Meter {summary.meterId}</p>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2">Day</th>
              <th className="py-2 text-right">Litres</th>
              <th className="py-2 text-right">Cost (K)</th>
            </tr>
          </thead>
          <tbody>
            {weeklyConsumption.map((d) => (
              <tr key={d.day} className="border-b border-slate-100">
                <td className="py-2">{d.day}</td>
                <td className="py-2 text-right">{d.litres.toLocaleString()}</td>
                <td className="py-2 text-right">{(d.litres * summary.tariff).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-blue-950">
              <td className="py-3">Total</td>
              <td className="py-3 text-right">{total.toLocaleString()}</td>
              <td className="py-3 text-right">{(total * summary.tariff).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}