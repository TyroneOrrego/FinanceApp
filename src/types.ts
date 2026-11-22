export type Pillar = 'Survival' | 'Optional' | 'Culture' | 'Extra'
export type ExpenseKind = 'Need' | 'Want'

export interface Expense {
  id: string
  amount: number
  date: string
  description: string
  pillar: Pillar
  kind: ExpenseKind
  tags?: string[]
  isSample?: boolean
}

export interface MonthReflection {
  wentWell: string
  overspent: string
  nextGoal: string
  mindfulnessScore?: number
}

export interface MonthPlan {
  income: number
  fixed: number
  savingsGoal: number
  intention: string
  expenses: Expense[]
  reflection: MonthReflection
}

export type Journal = Record<string, MonthPlan>

export type Language = 'es' | 'en'

export type CurrencyCode = 'COP' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'MXN' | 'BRL'

export interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  label: string
  rate?: number
}

export interface PillarInfo {
  name: Pillar
  japanese: string
  kanji: string
  color: string
  bgColor: string
  borderColor: string
  note: string
  examples: string
}

export interface UserSettings {
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
}

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
