import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { alerts } from '../data/mockData'

const styles = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-orange-100 text-orange-700',
  low: 'bg-blue-100 text-blue-700',
}

export default function Alerts() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Leakage Alerts</h1>
      <p className="text-sm text-slate-500 mb-6">
        Recent warnings from your water meter.
      </p>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <CheckCircle2 className="mx-auto text-green-600" size={32} />
          <p className="mt-2 text-blue-950 font-semibold">No alerts right now</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${styles[a.severity]}`}>
                <AlertTriangle size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-blue-950">{a.title}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${styles[a.severity]}`}>
                    {a.severity}
                  </span>
                  <span className="text-xs text-slate-400">{a.day}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}