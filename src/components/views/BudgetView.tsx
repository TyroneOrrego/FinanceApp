import React, { useMemo } from 'react'
import { Check, Layers, PiggyBank, ShieldCheck, Sparkles, Wallet } from 'lucide-react'
import { CurrencyCode, Language, MonthPlan } from '../../types'
import { CURRENCIES, formatMoney } from '../../lib/kakeibo'
import { formatMonthLabel } from '../../lib/date'
import { TRANSLATIONS } from '../../lib/i18n'

interface BudgetViewProps {
  month: string
  plan: MonthPlan
  spent: number
  allowance: number
  remaining: number
  daily: number
  savingsRate: number
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
  onUpdatePlan: (patch: Partial<MonthPlan>) => void
}

export function BudgetView({
  month,
  plan,
  spent,
  allowance,
  remaining,
  daily,
  savingsRate,
  currency,
  lang,
  privacyMode,
  onUpdatePlan,
}: BudgetViewProps) {
  const t = TRANSLATIONS[lang]
  const tb = t.budget
  const monthLabel = formatMonthLabel(month, lang)
  const isCop = currency === 'COP'
  const currencySymbol = CURRENCIES[currency]?.symbol || '$'

  // Allocation Stream breakdown (Income = Fixed + Savings + Spendable)
  const allocationBreakdown = useMemo(() => {
    if (plan.income <= 0) {
      return { fixedPct: 33, savingsPct: 33, allowancePct: 34 }
    }
    const fixedPct = Math.min(100, Math.round((plan.fixed / plan.income) * 100))
    const savingsPct = Math.min(100 - fixedPct, Math.round((plan.savingsGoal / plan.income) * 100))
    const allowancePct = Math.max(0, 100 - fixedPct - savingsPct)
    return { fixedPct, savingsPct, allowancePct }
  }, [plan.income, plan.fixed, plan.savingsGoal])

  return (
    <div className="ledger-screen">
      <div className="screen-heading">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          {tb.eyebrow}
        </span>
        <h2>{tb.title}</h2>
        <p>{tb.subtitle}</p>
      </div>

      {/* Interactive calculation equation card */}
      <div className="budget-equation-card">
        <div className="equation-col">
          <span className="eq-label">{tb.eqIncome}</span>
          <strong className={`eq-val text-forest ${privacyMode ? 'privacy-blur' : ''}`}>
            +{formatMoney(plan.income, currency, false, lang)}
          </strong>
        </div>
        <span className="eq-op">−</span>
        <div className="equation-col">
          <span className="eq-label">{tb.eqFixed}</span>
          <strong className={`eq-val text-destructive ${privacyMode ? 'privacy-blur' : ''}`}>
            −{formatMoney(plan.fixed, currency, false, lang)}
          </strong>
        </div>
        <span className="eq-op">−</span>
        <div className="equation-col">
          <span className="eq-label">{tb.eqSavings}</span>
          <strong className={`eq-val text-culture ${privacyMode ? 'privacy-blur' : ''}`}>
            −{formatMoney(plan.savingsGoal, currency, false, lang)}
          </strong>
        </div>
        <span className="eq-op">=</span>
        <div className="equation-col highlight">
          <span className="eq-label">{tb.eqAllowance}</span>
          <strong className={`eq-val text-allowance ${privacyMode ? 'privacy-blur' : ''}`}>
            {formatMoney(allowance, currency, false, lang)}
          </strong>
        </div>
      </div>

      {/* 3-Bucket Income Allocation Stream */}
      <section className="panel allocation-stream-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              100% {tb.eqIncome.toUpperCase()}
            </span>
            <h2>{tb.bucketTitle}</h2>
            <p>{tb.bucketSubtitle}</p>
          </div>
        </div>

        <div className="allocation-stream-bar">
          <div
            className="stream-segment segment-fixed"
            style={{ width: `${allocationBreakdown.fixedPct}%` }}
            title={`${tb.bucketFixed}: ${allocationBreakdown.fixedPct}%`}
          >
            <span>{allocationBreakdown.fixedPct}%</span>
          </div>
          <div
            className="stream-segment segment-savings"
            style={{ width: `${allocationBreakdown.savingsPct}%` }}
            title={`${tb.bucketSavings}: ${allocationBreakdown.savingsPct}%`}
          >
            <span>{allocationBreakdown.savingsPct}%</span>
          </div>
          <div
            className="stream-segment segment-allowance"
            style={{ width: `${allocationBreakdown.allowancePct}%` }}
            title={`${tb.bucketSpendable}: ${allocationBreakdown.allowancePct}%`}
          >
            <span>{allocationBreakdown.allowancePct}%</span>
          </div>
        </div>

        <div className="allocation-legend-grid">
          <div className="legend-item">
            <span className="legend-indicator bg-destructive" />
            <div>
              <strong>{tb.bucketFixed} ({allocationBreakdown.fixedPct}%)</strong>
              <small className={privacyMode ? 'privacy-blur' : ''}>
                {formatMoney(plan.fixed, currency, false, lang)}
              </small>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-indicator bg-culture" />
            <div>
              <strong>{tb.bucketSavings} ({allocationBreakdown.savingsPct}%)</strong>
              <small className={privacyMode ? 'privacy-blur' : ''}>
                {formatMoney(plan.savingsGoal, currency, false, lang)}
              </small>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-indicator bg-forest" />
            <div>
              <strong>{tb.bucketSpendable} ({allocationBreakdown.allowancePct}%)</strong>
              <small className={privacyMode ? 'privacy-blur' : ''}>
                {formatMoney(allowance, currency, false, lang)}
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Input Fields */}
      <section className="panel budget-panel">
        <div className="budget-field-group">
          <div className="field-header">
            <label htmlFor="income-input" className="field-label">
              {tb.incomeLabel}
            </label>
            <span className="field-subnote">{tb.incomeSubnote}</span>
          </div>
          <div className="input-prefix">
            <span className="currency-symbol">{currencySymbol}</span>
            <input
              id="income-input"
              aria-label="Monthly income"
              type="number"
              min="0"
              step={isCop ? '1000' : '0.01'}
              value={plan.income || ''}
              onChange={(e) => onUpdatePlan({ income: Number(e.target.value) })}
              placeholder={isCop ? '4250000' : '0.00'}
            />
          </div>
        </div>

        <div className="budget-field-group">
          <div className="field-header">
            <label htmlFor="fixed-input" className="field-label">
              {tb.fixedLabel}
            </label>
            <span className="field-subnote">{tb.fixedSubnote}</span>
          </div>
          <div className="input-prefix">
            <span className="currency-symbol">{currencySymbol}</span>
            <input
              id="fixed-input"
              aria-label="Fixed expenses"
              type="number"
              min="0"
              step={isCop ? '1000' : '0.01'}
              value={plan.fixed || ''}
              onChange={(e) => onUpdatePlan({ fixed: Number(e.target.value) })}
              placeholder={isCop ? '1800000' : '0.00'}
            />
          </div>
        </div>

        <div className="budget-field-group">
          <div className="field-header">
            <label htmlFor="savings-input" className="field-label">
              {tb.savingsLabel}
            </label>
            <span className="field-subnote">{tb.savingsSubnote}</span>
          </div>
          <div className="input-prefix">
            <span className="currency-symbol">{currencySymbol}</span>
            <input
              id="savings-input"
              aria-label="Savings goal"
              type="number"
              min="0"
              step={isCop ? '1000' : '0.01'}
              value={plan.savingsGoal || ''}
              onChange={(e) => onUpdatePlan({ savingsGoal: Number(e.target.value) })}
              placeholder={isCop ? '700000' : '0.00'}
            />
          </div>
        </div>

        <div className="savings-target-rate">
          <PiggyBank size={18} />
          <span>{tb.targetRateText(savingsRate)}</span>
        </div>

        <div className="budget-field-group">
          <div className="field-header">
            <label htmlFor="intention-input" className="field-label">
              {tb.intentionLabel}
            </label>
            <span className="field-subnote">{tb.intentionSubnote}</span>
          </div>
          <div className="budget-intention-field">
            <input
              id="intention-input"
              value={plan.intention}
              onChange={(e) => onUpdatePlan({ intention: e.target.value })}
              placeholder={tb.intentionPlaceholder}
            />
          </div>
        </div>

        <p className="save-note">
          <Check size={14} /> {tb.autoSaveNotice}
        </p>
      </section>

      {/* Glance Summary Card */}
      <section className="panel glance-panel">
        <div className="panel-heading">
          <div>
            <h2>{tb.pulseTitle(monthLabel)}</h2>
            <p>{tb.pulseSubtitle}</p>
          </div>
        </div>

        <div className="glance-grid">
          <div>
            <span>{tb.glanceTotal}</span>
            <strong className={privacyMode ? 'privacy-blur' : ''}>
              {formatMoney(allowance, currency, false, lang)}
            </strong>
          </div>
          <div>
            <span>{tb.glanceSpent}</span>
            <strong className={privacyMode ? 'privacy-blur' : ''}>
              {formatMoney(spent, currency, false, lang)}
            </strong>
          </div>
          <div>
            <span>{tb.glanceBalance}</span>
            <strong
              className={`${remaining < 0 ? 'text-destructive' : 'text-forest'} ${privacyMode ? 'privacy-blur' : ''}`}
            >
              {formatMoney(remaining, currency, false, lang)}
            </strong>
          </div>
          <div>
            <span>{tb.glanceDaily}</span>
            <strong className={privacyMode ? 'privacy-blur' : ''}>
              {formatMoney(daily, currency, false, lang)}
            </strong>
          </div>
        </div>
      </section>
    </div>
  )
}
