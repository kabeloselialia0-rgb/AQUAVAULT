import { useState } from 'react'

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-blue-950">{label}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 shrink-0 rounded-full transition ${
          checked ? 'bg-blue-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}

export default function Settings() {
  const [leakAlerts, setLeakAlerts] = useState(true)
  const [emailReports, setEmailReports] = useState(false)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [unit, setUnit] = useState('litres')

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Settings</h1>
      <p className="text-sm text-slate-500 mb-6">Choose how AquaVolt works for you.</p>

      <div className="bg-white rounded-xl shadow-sm p-5 max-w-xl">
        <h2 className="font-semibold text-blue-950">Notifications</h2>
        <div className="divide-y divide-slate-100">
          <Toggle
            checked={leakAlerts}
            onChange={setLeakAlerts}
            label="Leak alerts"
            hint="Warn me when usage looks abnormal."
          />
          <Toggle
            checked={emailReports}
            onChange={setEmailReports}
            label="Weekly email report"
            hint="Send a usage summary every Monday."
          />
          <Toggle
            checked={smsAlerts}
            onChange={setSmsAlerts}
            label="SMS alerts"
            hint="Text me for high severity alerts."
          />
        </div>

        <h2 className="font-semibold text-blue-950 mt-6 mb-2">Display</h2>
        <label className="block text-xs text-slate-600">
          Measurement unit
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="litres">Litres (L)</option>
            <option value="m3">Cubic metres (m³)</option>
          </select>
        </label>
      </div>
    </div>
  )
}