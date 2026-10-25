import { useState } from 'react'
import { summary } from '../data/mockData'

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Grace Moyo',
    email: 'grace.moyo@example.com',
    phone: '',
    role: 'Administrator',
  })
  const [saved, setSaved] = useState(false)

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock save for now. Real saving comes with the back end.
    setSaved(true)
  }

  const field = (label, name, type = 'text', disabled = false) => (
    <label className="block text-xs text-slate-600">
      {label}
      <input
        type={type}
        value={form[name]}
        onChange={update(name)}
        disabled={disabled}
        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm disabled:bg-slate-50"
      />
    </label>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-950">Profile</h1>
      <p className="text-sm text-slate-500 mb-6">Your account details.</p>

      <div className="bg-white rounded-xl shadow-sm p-5 max-w-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-cyan-400 text-blue-950 flex items-center justify-center font-bold text-lg">
            {form.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-blue-950">{form.name}</p>
            <p className="text-xs text-slate-500">{summary.institution}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {field('Full name', 'name')}
          {field('Email', 'email', 'email')}
          {field('Phone', 'phone', 'tel')}
          {field('Role', 'role', 'text', true)}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Save changes
          </button>
          {saved && <p className="text-sm text-green-600">Changes saved.</p>}
        </form>
      </div>
    </div>
  )
}