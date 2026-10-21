export const weeklyConsumption = [
  { day: 'Mon', litres: 980 },
  { day: 'Tue', litres: 1020 },
  { day: 'Wed', litres: 960 },
  { day: 'Thu', litres: 1105 },
  { day: 'Fri', litres: 1040 },
  { day: 'Sat', litres: 1680 },
  { day: 'Sun', litres: 995 },
]

export const summary = {
  institution: 'Sunrise Secondary School',
  meterId: 'MTR-2024-0871',
  totalToday: 995,
  tariff: 0.85,
  changeFromYesterday: 12,
}

export const alerts = [
  {
    id: 1,
    title: 'Possible leak detected',
    detail: 'Saturday consumption reached 1,680 L, well above the daily average.',
    day: 'Sat',
    severity: 'high',
  },
  {
    id: 2,
    title: 'Pipe pressure drop',
    detail: 'Inlet pressure fell below 1.5 bar for 20 minutes.',
    day: 'Fri',
    severity: 'medium',
  },
  {
    id: 3,
    title: 'Filter service due',
    detail: 'Main filter last serviced 90 days ago.',
    day: 'Tue',
    severity: 'low',
  },
]
