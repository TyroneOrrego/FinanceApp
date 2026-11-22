import { ArrowRight, Calendar, DollarSign, PiggyBank, Sparkles, TrendingUp } from 'lucide-react'
import { CurrencyCode, Journal, Language } from '../types'
import { formatMoney, PILLARS } from '../lib/kakeibo'
import { TRANSLATIONS } from '../lib/i18n'

interface HistoryViewProps {
  journal: Journal
  currentMonth: string
  currency: CurrencyCode
  lang: Language
  onSelectMonth: (monthKey: string) => void
}

export function HistoryView({
  journal,
  currentMonth,
  currency,
  lang,
  onSelectMonth,
}: HistoryViewProps) {
  const months = Object.keys(journal).sort().reverse()
  const t = TRANSLATIONS[lang]
  const th = t.history

  const stats = months.map((m) => {
    const plan = journal[m]
    const spent = plan.expenses.reduce((s, e) => s + e.amount, 0)
    const allowance = Math.max(0, plan.income - plan.fixed - plan.savingsGoal)
    const saved = plan.income > 0 ? plan.income - plan.fixed - spent : 0
    const savingsRate = plan.income > 0 ? Math.round((saved / plan.income) * 100) : 0

    const date = new Date(Number(m.slice(0, 4)), Number(m.slice(5, 7)) - 1, 1)
    const label = date.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', {
      month: 'long',
      year: 'numeric',
    })

    return {
      monthKey: m,
      label,
      income: plan.income,
      fixed: plan.fixed,
      savingsGoal: plan.savingsGoal,
      allowance,
      spent,
      saved,
      savingsRate,
      expenseCount: plan.expenses.length,
      hasReflection: Boolean(plan.reflection.wentWell || plan.reflection.nextGoal),
      expenses: plan.expenses,
    }
  })

  const totalAllTimeSpent = stats.reduce((sum, s) => sum + s.spent, 0)
  const totalAllTimeSaved = stats.reduce((sum, s) => sum + Math.max(0, s.saved), 0)

  return (
    <div className="ledger-screen">
      <div className="screen-heading">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          {th.eyebrow}
        </span>
        <h2>{th.title}</h2>
        <p>{th.subtitle}</p>
      </div>

      {/* Aggregate summary cards */}
      <div className="overview-grid">
        <div className="allowance-card">
          <div className="card-topline">
            <span>{th.lifetimeSpent}</span>
            <DollarSign size={16} className="leaf-icon" />
          </div>
          <div className="allowance-number">
            {formatMoney(totalAllTimeSpent, currency, true, lang)}
          </div>
          <p className="card-subnote">{th.lifetimeSpentSub(months.length)}</p>
        </div>

        <div className="daily-card">
          <div className="card-topline">
            <span>{th.lifetimeSaved}</span>
            <PiggyBank size={16} className="daily-icon" />
          </div>
          <div className="daily-number">
            {formatMoney(totalAllTimeSaved, currency, true, lang)}
          </div>
          <p className="card-subnote">{th.lifetimeSavedSub}</p>
        </div>
      </div>

      {/* Months list */}
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>{th.panelTitle}</h2>
            <p>{th.panelSubtitle}</p>
          </div>
        </div>

        <div className="history-list">
          {stats.map((st) => {
            const isCurrent = st.monthKey === currentMonth
            return (
              <div
                key={st.monthKey}
                className={`history-card ${isCurrent ? 'active-history' : ''}`}
                onClick={() => onSelectMonth(st.monthKey)}
              >
                <div className="history-card-header">
                  <div>
                    <span className="history-badge">
                      {isCurrent ? th.activeMonthBadge : th.recordBadge}
                    </span>
                    <h4>{st.label}</h4>
                  </div>
                  <button
                    type="button"
                    className="history-view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectMonth(st.monthKey)
                    }}
                  >
                    {th.openMonthBtn} <ArrowRight size={14} />
                  </button>
                </div>

                <div className="history-metrics-grid">
                  <div>
                    <span>{th.colSpent}</span>
                    <strong>{formatMoney(st.spent, currency, false, lang)}</strong>
                  </div>
                  <div>
                    <span>{th.colAllowance}</span>
                    <strong>{formatMoney(st.allowance, currency, false, lang)}</strong>
                  </div>
                  <div>
                    <span>{th.colSaved}</span>
                    <strong className={st.saved < 0 ? 'text-destructive' : 'text-forest'}>
                      {formatMoney(st.saved, currency, false, lang)}
                    </strong>
                  </div>
                  <div>
                    <span>{th.colRate}</span>
                    <strong>{st.savingsRate}%</strong>
                  </div>
                </div>

                {/* Pillar mini breakdown bar */}
                <div className="history-pillar-bar">
                  {PILLARS.map((p) => {
                    const pillarSum = st.expenses
                      .filter((e) => e.pillar === p.name)
                      .reduce((s, e) => s + e.amount, 0)
                    const pct = st.spent > 0 ? (pillarSum / st.spent) * 100 : 0
                    const pTrans = t.pillars[p.name]
                    return (
                      <span
                        key={p.name}
                        title={`${pTrans.name}: ${formatMoney(pillarSum, currency, false, lang)} (${Math.round(pct)}%)`}
                        style={{ width: `${pct}%`, backgroundColor: p.color }}
                      />
                    )
                  })}
                </div>

                <div className="history-card-footer">
                  <span>
                    <Calendar size={13} /> {th.entriesRecorded(st.expenseCount)}
                  </span>
                  {st.hasReflection && (
                    <span className="history-reflection-tag">
                      <Sparkles size={12} /> {th.reflectionWritten}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
