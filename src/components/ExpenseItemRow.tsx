import React, { memo } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { CurrencyCode, Expense, Language } from '../types'
import { formatMoney, PILLARS } from '../lib/kakeibo'
import { formatExpenseDate } from '../lib/date'
import { TRANSLATIONS } from '../lib/i18n'

interface ExpenseItemRowProps {
  expense: Expense
  currency: CurrencyCode
  lang: Language
  privacyMode?: boolean
  onEdit: (e: Expense) => void
  onRemove: (id: string) => void
}

export const ExpenseItemRow = memo(function ExpenseItemRow({
  expense,
  currency,
  lang,
  privacyMode,
  onEdit,
  onRemove,
}: ExpenseItemRowProps) {
  const t = TRANSLATIONS[lang]
  const pillar = PILLARS.find((item) => item.name === expense.pillar)
  const pillarTrans = t.pillars[expense.pillar]
  const formattedDate = formatExpenseDate(expense.date, lang)

  return (
    <div className="ledger-expense">
      <span className="expense-dot" style={{ backgroundColor: pillar?.color }} />
      <span className="expense-kanji-tag" style={{ color: pillar?.color }}>
        {pillar?.kanji}
      </span>

      <div className="ledger-expense-main">
        <strong>{expense.description}</strong>
        <span>
          {formattedDate} · <span className="pillar-name-tag">{pillarTrans?.name}</span> ·{' '}
          <span className={`kind-tag ${expense.kind === 'Need' ? 'kind-need' : 'kind-want'}`}>
            {t.kinds[expense.kind]}
          </span>
        </span>
      </div>

      <strong
        className={`ledger-expense-amount ${privacyMode ? 'privacy-blur' : ''}`}
      >
        −{formatMoney(expense.amount, currency, false, lang)}
      </strong>

      <div className="expense-row-actions">
        <button
          type="button"
          aria-label={`Edit ${expense.description}`}
          title={lang === 'es' ? 'Editar gasto' : 'Edit expense'}
          onClick={() => onEdit(expense)}
          className="btn-icon-subtle"
        >
          <Edit2 size={14} />
        </button>
        <button
          type="button"
          aria-label={`Remove ${expense.description}`}
          title={lang === 'es' ? 'Eliminar gasto' : 'Delete expense'}
          onClick={() => onRemove(expense.id)}
          className="btn-icon-subtle btn-remove"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
})
