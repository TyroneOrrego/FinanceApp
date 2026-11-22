import React, { useEffect, useState } from 'react'
import { Check, Heart, Sparkles, X } from 'lucide-react'
import { CurrencyCode, Expense, ExpenseKind, Language, Pillar } from '../types'
import { CURRENCIES, PILLARS } from '../lib/kakeibo'
import { TRANSLATIONS } from '../lib/i18n'

interface ExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (expenseData: Omit<Expense, 'id'>, editId?: string) => void
  editingExpense?: Expense | null
  lang: Language
  currency: CurrencyCode
}

export function ExpenseModal({
  isOpen,
  onClose,
  onSave,
  editingExpense,
  lang,
  currency,
}: ExpenseModalProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [pillar, setPillar] = useState<Pillar>('Survival')
  const [kind, setKind] = useState<ExpenseKind>('Need')

  const t = TRANSLATIONS[lang]
  const tm = t.expenseModal

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString())
      setDescription(editingExpense.description)
      setDate(editingExpense.date)
      setPillar(editingExpense.pillar)
      setKind(editingExpense.kind)
    } else {
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().slice(0, 10))
      setPillar('Survival')
      setKind('Need')
    }
  }, [editingExpense, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0 || !description.trim()) {
      return
    }

    onSave(
      {
        amount: numericAmount,
        description: description.trim(),
        date,
        pillar,
        kind,
      },
      editingExpense?.id
    )
    onClose()
  }

  const isCop = currency === 'COP'
  const currencySymbol = CURRENCIES[currency]?.symbol || '$'

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {editingExpense ? tm.eyebrowEdit : tm.eyebrowAdd}
            </span>
            <h3>{editingExpense ? tm.titleEdit : tm.titleAdd}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Pillar Selector */}
          <div>
            <label className="form-label">
              <span>{tm.pillarLabel}</span>
              <span className="form-sublabel">{tm.pillarSublabel}</span>
            </label>
            <div className="pillar-selector-grid">
              {PILLARS.map((p) => {
                const isSelected = pillar === p.name
                const pTrans = t.pillars[p.name]
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPillar(p.name)}
                    className={`pillar-option-card ${isSelected ? 'selected' : ''}`}
                    style={
                      isSelected
                        ? {
                            borderColor: p.color,
                            backgroundColor: p.bgColor,
                          }
                        : {}
                    }
                  >
                    <div className="pillar-option-top">
                      <span className="pillar-kanji-badge" style={{ color: p.color }}>
                        {p.kanji}
                      </span>
                      <strong>{pTrans.name}</strong>
                    </div>
                    <small>{p.japanese.split(' ')[0]}</small>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Amount and Date */}
          <div className="form-row-2">
            <div>
              <label className="form-label">{tm.amountLabel}</label>
              <div className="input-prefix">
                <span className="currency-symbol">{currencySymbol}</span>
                <input
                  type="number"
                  step={isCop ? '1000' : '0.01'}
                  min={isCop ? '100' : '0.01'}
                  required
                  autoFocus
                  placeholder={isCop ? '50000' : '0.00'}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="form-label">{tm.dateLabel}</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="modal-input"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">{tm.descLabel}</label>
            <input
              type="text"
              required
              maxLength={80}
              placeholder={tm.descPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-input"
            />
          </div>

          {/* Need vs Want */}
          <div>
            <label className="form-label">
              <span>{tm.kindLabel}</span>
              <span className="form-sublabel">{tm.kindSublabel}</span>
            </label>
            <div className="need-want-selector">
              <button
                type="button"
                className={`need-want-pill ${kind === 'Need' ? 'active-need' : ''}`}
                onClick={() => setKind('Need')}
              >
                <Check size={14} className={kind === 'Need' ? 'opacity-100' : 'opacity-0'} />
                <span>{tm.needBtn}</span>
              </button>
              <button
                type="button"
                className={`need-want-pill ${kind === 'Want' ? 'active-want' : ''}`}
                onClick={() => setKind('Want')}
              >
                <Heart size={14} className={kind === 'Want' ? 'opacity-100' : 'opacity-0'} />
                <span>{tm.wantBtn}</span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="modal-secondary-btn">
              {tm.cancelBtn}
            </button>
            <button type="submit" className="modal-primary-btn">
              <Sparkles size={16} />
              {editingExpense ? tm.saveEditBtn : tm.saveAddBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
