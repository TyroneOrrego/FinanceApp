import { useCallback, useEffect, useMemo, useState } from 'react'
import { CurrencyCode, Expense, Journal, Language, MonthPlan, Pillar } from '../types'
import {
  blankPlan,
  downloadFile,
  exportJournalToCsv,
  PILLARS,
  sampleJournal,
  STORAGE_KEY,
} from '../lib/kakeibo'
import { getDaysLeftInMonth, getMonthKey, shiftMonthKey } from '../lib/date'
import { safeStorage } from '../lib/storage'

export function useJournal(currency: CurrencyCode, lang: Language) {
  const [journal, setJournal] = useState<Journal>(() => {
    const stored = safeStorage.get<Journal | null>(STORAGE_KEY, null)
    if (stored && typeof stored === 'object' && Object.keys(stored).length > 0) {
      return stored
    }
    return sampleJournal(currency, lang)
  })

  const [month, setMonth] = useState<string>(() => getMonthKey())

  // Persist journal whenever it updates
  useEffect(() => {
    safeStorage.set(STORAGE_KEY, journal)
  }, [journal])

  const plan: MonthPlan = useMemo(() => journal[month] ?? blankPlan(), [journal, month])

  const updatePlan = useCallback(
    (patch: Partial<MonthPlan>) => {
      setJournal((prev) => ({
        ...prev,
        [month]: {
          ...(prev[month] ?? blankPlan()),
          ...patch,
        },
      }))
    },
    [month]
  )

  // Calculations
  const spent = useMemo(
    () => plan.expenses.reduce((sum, item) => sum + item.amount, 0),
    [plan.expenses]
  )

  const allowance = useMemo(
    () => Math.max(0, plan.income - plan.fixed - plan.savingsGoal),
    [plan.income, plan.fixed, plan.savingsGoal]
  )

  const remaining = allowance - spent
  const savedActual = plan.income > 0 ? plan.income - plan.fixed - spent : 0
  const savingsRate = plan.income > 0 ? Math.round((savedActual / plan.income) * 100) : 0
  const daysLeft = useMemo(() => getDaysLeftInMonth(month), [month])
  const daily = Math.max(0, remaining) / daysLeft

  // Pillar Breakdown
  const pillarBreakdown = useMemo(() => {
    return PILLARS.map((p) => {
      const total = plan.expenses
        .filter((e) => e.pillar === p.name)
        .reduce((sum, e) => sum + e.amount, 0)
      const count = plan.expenses.filter((e) => e.pillar === p.name).length
      const percentage = spent > 0 ? Math.round((total / spent) * 100) : 0
      return {
        ...p,
        total,
        count,
        percentage,
      }
    })
  }, [plan.expenses, spent])

  // Needs vs Wants Breakdown
  const needsVsWants = useMemo(() => {
    const needExpenses = plan.expenses.filter((e) => e.kind === 'Need')
    const wantExpenses = plan.expenses.filter((e) => e.kind === 'Want')
    const totalNeeds = needExpenses.reduce((s, e) => s + e.amount, 0)
    const totalWants = wantExpenses.reduce((s, e) => s + e.amount, 0)
    const needPercentage = spent > 0 ? Math.round((totalNeeds / spent) * 100) : 50
    const wantPercentage = spent > 0 ? 100 - needPercentage : 50

    return {
      needExpenses,
      wantExpenses,
      totalNeeds,
      totalWants,
      needPercentage,
      wantPercentage,
    }
  }, [plan.expenses, spent])

  // Actions
  const addExpense = useCallback(
    (data: Omit<Expense, 'id'>) => {
      const newExpense: Expense = {
        ...data,
        id: crypto.randomUUID(),
      }
      updatePlan({ expenses: [newExpense, ...plan.expenses] })
    },
    [plan.expenses, updatePlan]
  )

  const editExpense = useCallback(
    (id: string, data: Omit<Expense, 'id'>) => {
      updatePlan({
        expenses: plan.expenses.map((e) => (e.id === id ? { ...e, ...data } : e)),
      })
    },
    [plan.expenses, updatePlan]
  )

  const removeExpense = useCallback(
    (id: string) => {
      updatePlan({
        expenses: plan.expenses.filter((e) => e.id !== id),
      })
    },
    [plan.expenses, updatePlan]
  )

  const clearSamples = useCallback(() => {
    const remainingExps = plan.expenses.filter((e) => !e.isSample && !/^s[1-8]$/.test(e.id))
    updatePlan({ expenses: remainingExps })
  }, [plan.expenses, updatePlan])

  const loadSamples = useCallback(() => {
    const samples = sampleJournal(currency, lang)
    setJournal((prev) => ({ ...prev, ...samples }))
  }, [currency, lang])

  const changeMonth = useCallback(
    (delta: number) => {
      setMonth((prev) => shiftMonthKey(prev, delta))
    },
    []
  )

  const exportJson = useCallback(() => {
    downloadFile(
      `kakeibo-diario-backup-${month}.json`,
      JSON.stringify(journal, null, 2),
      'application/json'
    )
  }, [journal, month])

  const exportCsv = useCallback(() => {
    exportJournalToCsv(journal, currency, lang)
  }, [journal, currency, lang])

  const importJournal = useCallback(async (file?: File): Promise<boolean> => {
    if (!file) return false
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return false
      }
      setJournal(parsed)
      return true
    } catch {
      return false
    }
  }, [])

  return {
    journal,
    month,
    plan,
    spent,
    allowance,
    remaining,
    savedActual,
    savingsRate,
    daysLeft,
    daily,
    pillarBreakdown,
    needsVsWants,
    setMonth,
    updatePlan,
    addExpense,
    editExpense,
    removeExpense,
    clearSamples,
    loadSamples,
    changeMonth,
    exportJson,
    exportCsv,
    importJournal,
  }
}
