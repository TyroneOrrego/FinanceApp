import React, { useMemo } from 'react'
import {
  AlertCircle,
  BookOpen,
  Compass,
  HelpCircle,
  Heart,
  Leaf,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { CurrencyCode, Expense, Language, MonthPlan, Pillar } from '../../types'
import { formatMoney } from '../../lib/kakeibo'
import { formatMonthLabel } from '../../lib/date'
import { TRANSLATIONS } from '../../lib/i18n'
import { ExpenseItemRow } from '../ExpenseItemRow'
import { TabId } from '../BottomNav'

interface DashboardViewProps {
  month: string
  plan: MonthPlan
  spent: number
  allowance: number
  remaining: number
  daily: number
  daysLeft: number
  pillarBreakdown: Array<{
    name: Pillar
    japanese: string
    kanji: string
    color: string
    total: number
    percentage: number
  }>
  needsVsWants: {
    needExpenses: Expense[]
    wantExpenses: Expense[]
    totalNeeds: number
    totalWants: number
    needPercentage: number
    wantPercentage: number
  }
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
  onNavigateTab: (tab: TabId) => void
  onSelectPillarFilter: (pillar: Pillar) => void
  onOpenExpenseModal: () => void
  onOpenGuide: () => void
  onEditExpense: (e: Expense) => void
  onRemoveExpense: (id: string) => void
}

export function DashboardView({
  month,
  plan,
  spent,
  allowance,
  remaining,
  daily,
  daysLeft,
  pillarBreakdown,
  needsVsWants,
  currency,
  lang,
  privacyMode,
  onNavigateTab,
  onSelectPillarFilter,
  onOpenExpenseModal,
  onOpenGuide,
  onEditExpense,
  onRemoveExpense,
}: DashboardViewProps) {
  const t = TRANSLATIONS[lang]
  const td = t.dashboard
  const monthLabel = formatMonthLabel(month, lang)

  const percentageSpent = allowance > 0 ? Math.min(100, Math.max(0, (spent / allowance) * 100)) : 0
  const isOverBudget = allowance > 0 && spent > allowance
  const quote = t.quotes[Number(month.slice(5, 7)) % t.quotes.length]

  // Calculate Living Pace Status
  const paceStatus = useMemo(() => {
    if (allowance <= 0) {
      return {
        badge: td.paceSerene,
        desc: td.paceSereneDesc,
        tone: 'neutral',
        icon: <Leaf size={14} />,
      }
    }
    if (remaining <= 0) {
      return {
        badge: td.paceExceeded,
        desc: td.paceExceededDesc,
        tone: 'danger',
        icon: <AlertCircle size={14} />,
      }
    }
    const year = Number(month.slice(0, 4))
    const mNum = Number(month.slice(5, 7))
    const totalDays = new Date(year, mNum, 0).getDate()
    const baselineDaily = allowance / totalDays

    if (daily >= baselineDaily * 0.85) {
      return {
        badge: td.paceSerene,
        desc: td.paceSereneDesc,
        tone: 'serene',
        icon: <Leaf size={14} />,
      }
    }
    return {
      badge: td.paceWarning,
      desc: td.paceWarningDesc,
      tone: 'warning',
      icon: <Compass size={14} />,
    }
  }, [allowance, remaining, daily, month, td])

  // Emotional Guidance based on Needs vs Wants
  const guidanceMessage = useMemo(() => {
    if (spent === 0) return null
    if (needsVsWants.needPercentage >= 65) {
      return td.guidanceNeedsDominant
    }
    if (needsVsWants.wantPercentage >= 50) {
      return td.guidanceWantsDominant
    }
    return td.guidanceBalanced
  }, [spent, needsVsWants, td])

  return (
    <div className="ledger-screen">
      {/* Allowance Balance Hero Card with Pace Indicator */}
      <section
        className={`balance-card ${isOverBudget ? 'balance-card-over' : ''}`}
        aria-label="Monthly spendable allowance"
      >
        <div className="balance-top">
          <div className="balance-top-tag">
            <span className="balance-pulse" />
            <p>{td.remainingTitle}</p>
          </div>
          <span>{monthLabel}</span>
        </div>

        <strong className={`balance-amount ${privacyMode ? 'privacy-blur' : ''}`}>
          {formatMoney(Math.max(0, remaining), currency, false, lang)}
        </strong>

        {/* Pace Status Badge */}
        <div className={`pace-status-pill tone-${paceStatus.tone}`}>
          {paceStatus.icon}
          <strong>{paceStatus.badge}:</strong>
          <span>{paceStatus.desc}</span>
        </div>

        {/* Progress Bar */}
        <div
          className="balance-progress"
          role="progressbar"
          aria-label="Monthly budget spent"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentageSpent}
        >
          <span
            style={{
              width: `${percentageSpent}%`,
              backgroundColor: isOverBudget ? '#d9776b' : '#aab99f',
            }}
          />
        </div>

        {/* Multi-Stat Breakdown Footer */}
        <div className="balance-stats-footer">
          <div className="balance-stat-col">
            <span className="stat-label">{td.statRemaining}</span>
            <strong className={`stat-value ${privacyMode ? 'privacy-blur' : ''}`}>
              {formatMoney(Math.max(0, remaining), currency, false, lang)}
            </strong>
          </div>
          <div className="stat-divider" />
          <div className="balance-stat-col">
            <span className="stat-label">{td.statSpent}</span>
            <strong className={`stat-value ${privacyMode ? 'privacy-blur' : ''}`}>
              {formatMoney(spent, currency, false, lang)}
            </strong>
          </div>
          <div className="stat-divider" />
          <div className="balance-stat-col">
            <span className="stat-label">{td.statDaily}</span>
            <strong className={`stat-value ${privacyMode ? 'privacy-blur' : ''}`}>
              {formatMoney(daily, currency, false, lang)}
            </strong>
            <small>{daysLeft} {td.daysLeft}</small>
          </div>
        </div>
      </section>

      {/* Pillar Breakdown Section */}
      <section className="pillar-summary" aria-label="Spending across the Four Pillars">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {td.pillarsEyebrow}
            </span>
            <h2>{td.pillarsTitle}</h2>
          </div>
          <button type="button" className="text-subtle-action" onClick={onOpenGuide}>
            {td.learnPillars} <HelpCircle size={13} />
          </button>
        </div>

        <div className="pillar-progress">
          {pillarBreakdown.map((p) => {
            const pTrans = t.pillars[p.name]
            return (
              <span
                key={p.name}
                style={{
                  width: `${spent ? (p.total / spent) * 100 : 25}%`,
                  backgroundColor: p.color,
                }}
                title={`${pTrans.name}: ${formatMoney(p.total, currency, false, lang)} (${p.percentage}%)`}
              />
            )
          })}
        </div>

        <div className="pillar-grid">
          {pillarBreakdown.map((p) => {
            const pTrans = t.pillars[p.name]
            return (
              <div
                key={p.name}
                className="pillar-mini"
                style={{ borderTopColor: p.color }}
                onClick={() => {
                  onSelectPillarFilter(p.name)
                  onNavigateTab('track')
                }}
              >
                <div className="pillar-mini-top">
                  <span className="pillar-kanji-badge" style={{ color: p.color }}>
                    {p.kanji}
                  </span>
                  <div>
                    <strong>{pTrans.name}</strong>
                    <small>{p.japanese.split(' ')[0]}</small>
                  </div>
                </div>
                <div className="pillar-mini-amount">
                  <strong className={privacyMode ? 'privacy-blur' : ''}>
                    {formatMoney(p.total, currency, false, lang)}
                  </strong>
                  <span>{p.percentage}% {td.pctOfSpent}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Need vs Want Ratio Section with Emotional Coaching */}
      <section className="panel need-want-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {td.needsWantsEyebrow}
            </span>
            <h2>{td.needsWantsTitle}</h2>
          </div>
          <span className="ratio-badge">
            {needsVsWants.totalNeeds >= needsVsWants.totalWants
              ? td.ratioGrounded
              : td.ratioDiscretionary}
          </span>
        </div>

        <div className="ratio-bar-container">
          <div
            className="ratio-segment needs-segment"
            style={{ width: `${needsVsWants.needPercentage}%` }}
          >
            <span>{t.kinds.Need} {needsVsWants.needPercentage}%</span>
          </div>
          <div
            className="ratio-segment wants-segment"
            style={{ width: `${needsVsWants.wantPercentage}%` }}
          >
            <span>{t.kinds.Want} {needsVsWants.wantPercentage}%</span>
          </div>
        </div>

        {guidanceMessage && (
          <div className="ratio-guidance-banner">
            <Sparkles size={14} className="text-forest shrink-0 mt-0.5" />
            <p>{guidanceMessage}</p>
          </div>
        )}

        <div className="ratio-details-grid">
          <div className="ratio-box need-box">
            <div className="ratio-box-header">
              <ShieldCheck size={16} />
              <span>{td.essentialNeeds}</span>
            </div>
            <strong className={privacyMode ? 'privacy-blur' : ''}>
              {formatMoney(needsVsWants.totalNeeds, currency, false, lang)}
            </strong>
            <p>{td.essentialsCount(needsVsWants.needExpenses.length)}</p>
          </div>
          <div className="ratio-box want-box">
            <div className="ratio-box-header">
              <Heart size={16} />
              <span>{td.wantsAndJoys}</span>
            </div>
            <strong className={privacyMode ? 'privacy-blur' : ''}>
              {formatMoney(needsVsWants.totalWants, currency, false, lang)}
            </strong>
            <p>{td.pleasuresCount(needsVsWants.wantExpenses.length)}</p>
          </div>
        </div>
      </section>

      {/* Intention & Quote of the Month */}
      <div className="dashboard-intention-quote">
        <div className="intention-card">
          <div className="intention-icon">
            <Sparkles size={18} />
          </div>
          <div className="intention-copy">
            <span>{td.monthlyIntention}</span>
            <p>
              {plan.intention ? (
                `“${plan.intention}”`
              ) : (
                <em className="text-muted">{td.noIntentionSet}</em>
              )}
            </p>
          </div>
          <button
            type="button"
            className="text-action"
            onClick={() => onNavigateTab('budget')}
          >
            {td.editIntention}
          </button>
        </div>

        <div className="kakeibo-quote-card">
          <p>“{quote.quote}”</p>
          <small>— {quote.author}</small>
        </div>
      </div>

      {/* Action Cards */}
      <div className="dashboard-actions">
        <button type="button" className="action-card" onClick={onOpenExpenseModal}>
          <div className="action-card-icon">
            <Plus size={20} />
          </div>
          <strong>{td.actionLog}</strong>
          <span>{td.actionLogDesc}</span>
        </button>

        <button
          type="button"
          className="action-card"
          onClick={() => onNavigateTab('reflect')}
        >
          <div className="action-card-icon">
            <BookOpen size={20} />
          </div>
          <strong>{td.actionReflect}</strong>
          <span>{td.actionReflectDesc}</span>
        </button>
      </div>

      {/* Recent Expenses Preview */}
      {plan.expenses.length > 0 && (
        <section className="panel recent-card">
          <div className="panel-heading">
            <div>
              <h2>{td.recentTitle}</h2>
              <p>{td.recentSubtitle(plan.expenses.length)}</p>
            </div>
            <button
              type="button"
              className="text-subtle-action"
              onClick={() => onNavigateTab('track')}
            >
              {td.viewAll(plan.expenses.length)}
            </button>
          </div>

          <div className="ledger-expenses">
            {plan.expenses.slice(0, 4).map((expense) => (
              <ExpenseItemRow
                key={expense.id}
                expense={expense}
                currency={currency}
                lang={lang}
                privacyMode={privacyMode}
                onEdit={onEditExpense}
                onRemove={onRemoveExpense}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
