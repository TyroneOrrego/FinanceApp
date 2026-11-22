import { CurrencyCode, CurrencyConfig, Expense, Journal, Language, MonthPlan, Pillar, PillarInfo } from '../types'

export const STORAGE_KEY = 'kakeibo-journal-v2'
export const SETTINGS_KEY = 'kakeibo-settings-v2'

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  COP: { code: 'COP', symbol: '$', label: 'COP ($)' },
  USD: { code: 'USD', symbol: '$', label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  JPY: { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  CAD: { code: 'CAD', symbol: '$', label: 'CAD ($)' },
  AUD: { code: 'AUD', symbol: '$', label: 'AUD ($)' },
  MXN: { code: 'MXN', symbol: '$', label: 'MXN ($)' },
  BRL: { code: 'BRL', symbol: 'R$', label: 'BRL (R$)' },
}

export const PILLARS: PillarInfo[] = [
  {
    name: 'Survival',
    japanese: 'Seikatsu (生活)',
    kanji: '生',
    color: '#4f6c49',
    bgColor: '#edf2eb',
    borderColor: '#c6dac1',
    note: 'Needs: Groceries, rent/mortgage, utilities, transport, medicine',
    examples: 'Supermarket, subway pass, pharmacy, gas, power bill',
  },
  {
    name: 'Optional',
    japanese: 'Goraku (娯楽)',
    kanji: '遊',
    color: '#bd6a4c',
    bgColor: '#faeee9',
    borderColor: '#e8c4b6',
    note: 'Wants: Dining out, takeout, cocktails, shopping, entertainment',
    examples: 'Cafes, takeout sushi, cinema, clothing, drinks with friends',
  },
  {
    name: 'Culture',
    japanese: 'Kyoyo (教養)',
    kanji: '文',
    color: '#6e5f86',
    bgColor: '#f2eff7',
    borderColor: '#c9bfd8',
    note: 'Growth: Books, courses, museums, music, theater, self-cultivation',
    examples: 'Novels, online courses, museum admission, instruments, workshops',
  },
  {
    name: 'Extra',
    japanese: 'Tokubetsu (特別)',
    kanji: '突',
    color: '#b28935',
    bgColor: '#faf3e5',
    borderColor: '#dfd0a6',
    note: 'Unplanned: Emergencies, gifts, repairs, sudden seasonal fees',
    examples: 'Car repair, birthday gift, appliance fix, sudden clinic fee',
  },
]

export const monthKey = (date = new Date()): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export const blankPlan = (): MonthPlan => ({
  income: 0,
  fixed: 0,
  savingsGoal: 0,
  intention: '',
  expenses: [],
  reflection: {
    wentWell: '',
    overspent: '',
    nextGoal: '',
    mindfulnessScore: 4,
  },
})

export const sampleJournal = (currency: CurrencyCode = 'COP', lang: Language = 'es'): Journal => {
  const key = monthKey()
  const year = Number(key.slice(0, 4))
  const month = Number(key.slice(5, 7)) - 1
  const dateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const isCop = currency === 'COP'
  const isEs = lang === 'es'

  if (isCop) {
    return {
      [key]: {
        income: 4250000,
        fixed: 1800000,
        savingsGoal: 700000,
        intention: isEs
          ? 'Gastar con calma y consciencia, priorizando comidas en casa y crecimiento interior.'
          : 'Spend with quiet care, prioritizing home-cooked meals and personal growth.',
        expenses: [
          {
            id: 's1',
            amount: 165000,
            date: dateStr(2),
            description: isEs ? 'Mercado semanal de frutas y verduras' : 'Weekly organic groceries',
            pillar: 'Survival',
            kind: 'Need',
            isSample: true,
          },
          {
            id: 's2',
            amount: 45000,
            date: dateStr(4),
            description: isEs ? 'Almuerzo y café con amigos' : 'Lunch & matcha with friends',
            pillar: 'Optional',
            kind: 'Want',
            isSample: true,
          },
          {
            id: 's3',
            amount: 35000,
            date: dateStr(7),
            description: isEs ? 'Libro de poesía y desarrollo personal' : 'Poetry and mindfulness book',
            pillar: 'Culture',
            kind: 'Need',
            isSample: true,
          },
          {
            id: 's4',
            amount: 55000,
            date: dateStr(9),
            description: isEs ? 'Farmacia y vitaminas esenciales' : 'Pharmacy essentials & vitamins',
            pillar: 'Survival',
            kind: 'Need',
            isSample: true,
          },
          {
            id: 's5',
            amount: 28000,
            date: dateStr(12),
            description: isEs ? 'Entrada a cine independiente' : 'Independent cinema ticket',
            pillar: 'Optional',
            kind: 'Want',
            isSample: true,
          },
          {
            id: 's6',
            amount: 140000,
            date: dateStr(15),
            description: isEs ? 'Tarjeta de transporte mensual' : 'Monthly commuter transit pass',
            pillar: 'Survival',
            kind: 'Need',
            isSample: true,
          },
          {
            id: 's7',
            amount: 60000,
            date: dateStr(18),
            description: isEs ? 'Taza de cerámica artesanal para regalo' : 'Handmade ceramic mug gift',
            pillar: 'Extra',
            kind: 'Want',
            isSample: true,
          },
          {
            id: 's8',
            amount: 18000,
            date: dateStr(21),
            description: isEs ? 'Café especial y pausa reflexiva' : 'Specialty coffee & mindful pause',
            pillar: 'Optional',
            kind: 'Want',
            isSample: true,
          },
        ],
        reflection: {
          wentWell: isEs
            ? 'Cocinamos casi todos los almuerzos en casa y disfrutamos caminatas tranquilas.'
            : 'Cooked almost all lunches at home and enjoyed peaceful walks.',
          overspent: isEs
            ? 'Un par de domicilios apresurados en días con mucho trabajo.'
            : 'A couple of spontaneous takeout orders during rushed afternoons.',
          nextGoal: isEs
            ? 'Preparar café en termo para la oficina y evitar comprar por impulso.'
            : 'Brew morning coffee at home and avoid impulse snacks outside.',
          mindfulnessScore: 4,
        },
      },
    }
  }

  // Standard USD amounts
  return {
    [key]: {
      income: 4250,
      fixed: 1480,
      savingsGoal: 700,
      intention: isEs
        ? 'Gastar con calma y consciencia, priorizando comidas en casa y crecimiento interior.'
        : 'Spend with quiet care, prioritizing wholesome meals and mindful growth.',
      expenses: [
        {
          id: 's1',
          amount: 68.4,
          date: dateStr(2),
          description: isEs ? 'Mercado semanal de frutas y verduras' : 'Weekly organic market groceries',
          pillar: 'Survival',
          kind: 'Need',
          isSample: true,
        },
        {
          id: 's2',
          amount: 34.5,
          date: dateStr(4),
          description: isEs ? 'Almuerzo y café con amigos' : 'Lunch & matcha with Maya',
          pillar: 'Optional',
          kind: 'Want',
          isSample: true,
        },
        {
          id: 's3',
          amount: 24.0,
          date: dateStr(7),
          description: isEs ? 'Libro de poesía y desarrollo personal' : 'Japanese calligraphy and poetry book',
          pillar: 'Culture',
          kind: 'Need',
          isSample: true,
        },
        {
          id: 's4',
          amount: 45.0,
          date: dateStr(9),
          description: isEs ? 'Farmacia y vitaminas esenciales' : 'Pharmacy essentials & vitamins',
          pillar: 'Survival',
          kind: 'Need',
          isSample: true,
        },
        {
          id: 's5',
          amount: 19.5,
          date: dateStr(12),
          description: isEs ? 'Entrada a cine independiente' : 'Independent cinema ticket',
          pillar: 'Optional',
          kind: 'Want',
          isSample: true,
        },
        {
          id: 's6',
          amount: 90.0,
          date: dateStr(15),
          description: isEs ? 'Tarjeta de transporte mensual' : 'Monthly commuter train pass',
          pillar: 'Survival',
          kind: 'Need',
          isSample: true,
        },
        {
          id: 's7',
          amount: 42.0,
          date: dateStr(18),
          description: isEs ? 'Taza de cerámica artesanal para regalo' : 'Handmade ceramic mug for brother',
          pillar: 'Extra',
          kind: 'Want',
          isSample: true,
        },
        {
          id: 's8',
          amount: 15.0,
          date: dateStr(21),
          description: isEs ? 'Café especial y pausa reflexiva' : 'Morning sencha tea at tea house',
          pillar: 'Optional',
          kind: 'Want',
          isSample: true,
        },
      ],
      reflection: {
        wentWell: isEs
          ? 'Cocinamos casi todos los almuerzos en casa y disfrutamos caminatas tranquilas.'
          : 'Cooked almost all weekday lunches at home and enjoyed peaceful walks.',
        overspent: isEs
          ? 'Un par de domicilios apresurados en días con mucho trabajo.'
          : 'A couple of spontaneous cafe snacks during rushed afternoons.',
        nextGoal: isEs
          ? 'Preparar café en termo para la oficina y evitar comprar por impulso.'
          : 'Prepare midday matcha at my desk instead of purchasing outside.',
        mindfulnessScore: 4,
      },
    },
  }
}

export const formatMoney = (
  amount: number,
  currency: CurrencyCode = 'COP',
  compact: boolean = false,
  lang: Language = 'es'
): string => {
  const isZeroDecimal = currency === 'JPY' || currency === 'COP'
  const locale = lang === 'es' ? 'es-CO' : 'en-US'

  if (currency === 'COP') {
    const formattedNum = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Math.round(amount))
    return `$ ${formattedNum}`
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: isZeroDecimal ? 0 : compact ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount)
}

export function downloadFile(name: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

export function exportJournalToCsv(
  journal: Journal,
  currency: CurrencyCode = 'COP',
  lang: Language = 'es'
): void {
  const isEs = lang === 'es'
  const rows = [
    [
      isEs ? 'Mes' : 'Month',
      isEs ? 'Fecha' : 'Date',
      isEs ? 'Descripción' : 'Description',
      isEs ? 'Pilar' : 'Pillar',
      'Kanji',
      isEs ? 'Necesidad o Deseo' : 'Need or Want',
      `${isEs ? 'Monto' : 'Amount'} (${currency})`,
    ],
  ]

  const sortedMonths = Object.keys(journal).sort()
  for (const m of sortedMonths) {
    const plan = journal[m]
    if (!plan) continue
    for (const exp of plan.expenses) {
      const pInfo = PILLARS.find((p) => p.name === exp.pillar)
      rows.push([
        m,
        exp.date,
        exp.description,
        exp.pillar,
        pInfo?.kanji || '',
        exp.kind,
        currency === 'COP' ? Math.round(exp.amount).toString() : exp.amount.toFixed(2),
      ])
    }
  }

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  downloadFile('kakeibo-diario-gastos.csv', csv, 'text/csv;charset=utf-8;')
}
