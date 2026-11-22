import React, { useMemo, useState } from 'react'
import { Coffee, Download, Plus, RotateCcw, Search, Sparkles, Trash2, X } from 'lucide-react'
import { CurrencyCode, Expense, ExpenseKind, Language, Pillar, SortOption } from '../../types'
import { CURRENCIES, formatMoney, PILLARS } from '../../lib/kakeibo'
import { TRANSLATIONS } from '../../lib/i18n'
import { ExpenseItemRow } from '../ExpenseItemRow'

interface ExpensesViewProps {
  expenses: Expense[]
  remaining: number
  currency: CurrencyCode
  lang: Language
  privacyMode: boolean
  selectedPillarFilter: 'All' | Pillar
  onSelectPillarFilter: (p: 'All' | Pillar) => void
  onOpenExpenseModal: () => void
  onQuickAdd: (data: Omit<Expense, 'id'>) => void
  onEditExpense: (e: Expense) => void
  onRemoveExpense: (id: string) => void
  onClearSamples: () => void
  onLoadSamples: () => void
  onExportCsv: () => void
}

export function ExpensesView({
  expenses,
  remaining,
  currency,
  lang,
  privacyMode,
  selectedPillarFilter,
  onSelectPillarFilter,
  onOpenExpenseModal,
  onQuickAdd,
  onEditExpense,
  onRemoveExpense,
  onClearSamples,
  onLoadSamples,
  onExportCsv,
}: ExpensesViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKindFilter, setSelectedKindFilter] = useState<'All' | ExpenseKind>('All')
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')

  const t = TRANSLATIONS[lang]
  const tt = t.track
  const isCop = currency === 'COP'
  const currencySymbol = CURRENCIES[currency]?.symbol || '$'

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        const matchesSearch =
          !searchQuery.trim() ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.amount.toString().includes(searchQuery)
        const matchesPillar =
          selectedPillarFilter === 'All' || item.pillar === selectedPillarFilter
        const matchesKind = selectedKindFilter === 'All' || item.kind === selectedKindFilter
        return matchesSearch && matchesPillar && matchesKind
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return b.date.localeCompare(a.date)
        if (sortBy === 'date-asc') return a.date.localeCompare(b.date)
        if (sortBy === 'amount-desc') return b.amount - a.amount
        if (sortBy === 'amount-asc') return a.amount - b.amount
        return 0
      })
  }, [expenses, searchQuery, selectedPillarFilter, selectedKindFilter, sortBy])

  const handleQuickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const amount = Number(formData.get('amount'))
    const description = String(formData.get('description') || '').trim()
    const date = String(formData.get('date') || new Date().toISOString().slice(0, 10))
    const pillar = String(formData.get('pillar')) as Pillar
    const kind = String(formData.get('kind')) as ExpenseKind

    if (!amount || amount <= 0 || !description) return

    onQuickAdd({ amount, description, date, pillar, kind })
    form.reset()
  }

  return (
    <div className="ledger-screen">
      <div className="screen-heading">
        <span className="eyebrow">
          <span className="eyebrow-line" />
          {tt.eyebrow}
        </span>
        <h2>{tt.title}</h2>
        <p>{tt.subtitle}</p>
      </div>

      {/* Action Bar with New Expense Button */}
      <div className="track-action-bar">
        <button type="button" className="btn-primary-glow" onClick={onOpenExpenseModal}>
          <Plus size={18} /> {tt.btnRecordNew}
        </button>
        <div className="track-stats-pill">
          <span>{tt.spendableLeft}</span>
          <strong className={privacyMode ? 'privacy-blur' : ''}>
            {formatMoney(Math.max(0, remaining), currency, false, lang)}
          </strong>
        </div>
      </div>

      {/* Inline Quick Add Form */}
      <section className="panel track-panel">
        <div className="panel-heading">
          <div>
            <h2>{tt.quickTitle}</h2>
            <p>{tt.quickSubtitle}</p>
          </div>
        </div>

        <form id="quick-expense-form" onSubmit={handleQuickSubmit}>
          <div className="pillar-choices">
            {PILLARS.map((p) => {
              const pTrans = t.pillars[p.name]
              return (
                <label key={p.name}>
                  <input
                    type="radio"
                    name="pillar"
                    value={p.name}
                    defaultChecked={p.name === 'Survival'}
                  />
                  <span style={{ borderLeftColor: p.color }}>
                    <i style={{ backgroundColor: p.color }} />
                    <strong>{pTrans.name}</strong>
                    <small>
                      {p.kanji} · {p.japanese.split(' ')[0]}
                    </small>
                  </span>
                </label>
              )
            })}
          </div>

          <div className="track-fields">
            <label>
              {tt.amount}
              <div className="input-prefix">
                <span className="currency-symbol">{currencySymbol}</span>
                <input
                  name="amount"
                  type="number"
                  step={isCop ? '1000' : '0.01'}
                  min={isCop ? '100' : '0.01'}
                  required
                  placeholder={isCop ? '50000' : '0.00'}
                />
              </div>
            </label>

            <label>
              {tt.date}
              <input
                name="date"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </label>

            <label className="track-note">
              {tt.description}
              <input
                name="description"
                required
                maxLength={75}
                placeholder={tt.descriptionPlaceholder}
              />
            </label>
          </div>

          <div className="quick-form-bottom">
            <fieldset className="need-want-compact">
              <legend>{tt.kindLegend}</legend>
              <label>
                <input type="radio" name="kind" value="Need" defaultChecked />
                <span>{t.kinds.Need}</span>
              </label>
              <label>
                <input type="radio" name="kind" value="Want" />
                <span>{t.kinds.Want}</span>
              </label>
            </fieldset>

            <button className="primary-action-compact" type="submit">
              <Plus size={16} /> {tt.addBtn}
            </button>
          </div>
        </form>
      </section>

      {/* Search, Filter & Expense List */}
      <section className="panel spending-panel">
        <div className="spending-controls">
          <div className="search-bar">
            <Search size={16} />
            <input
              type="text"
              placeholder={tt.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-pill-row">
            {/* Pillar filter pills */}
            <div className="pillar-filter-pills">
              <button
                type="button"
                className={`filter-pill ${selectedPillarFilter === 'All' ? 'active' : ''}`}
                onClick={() => onSelectPillarFilter('All')}
              >
                {tt.allPillars}
              </button>
              {PILLARS.map((p) => {
                const pTrans = t.pillars[p.name]
                return (
                  <button
                    key={p.name}
                    type="button"
                    className={`filter-pill ${selectedPillarFilter === p.name ? 'active' : ''}`}
                    onClick={() => onSelectPillarFilter(p.name)}
                  >
                    <i style={{ backgroundColor: p.color }} />
                    {pTrans.name}
                  </button>
                )
              })}
            </div>

            {/* Need / Want filter */}
            <div className="kind-filter-pills">
              <button
                type="button"
                className={`filter-pill ${selectedKindFilter === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedKindFilter('All')}
              >
                {tt.allKinds}
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedKindFilter === 'Need' ? 'active' : ''}`}
                onClick={() => setSelectedKindFilter('Need')}
              >
                {t.kinds.Need}
              </button>
              <button
                type="button"
                className={`filter-pill ${selectedKindFilter === 'Want' ? 'active' : ''}`}
                onClick={() => setSelectedKindFilter('Want')}
              >
                {t.kinds.Want}
              </button>
            </div>

            {/* Sort selector */}
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="date-desc">{tt.sortNewest}</option>
              <option value="date-asc">{tt.sortOldest}</option>
              <option value="amount-desc">{tt.sortHighest}</option>
              <option value="amount-asc">{tt.sortLowest}</option>
            </select>
          </div>
        </div>

        {/* Expense list header with batch actions */}
        <div className="panel-heading" style={{ marginTop: 12 }}>
          <div>
            <h2>{tt.ledgerEntriesTitle(filteredExpenses.length)}</h2>
            <p>{tt.showingCount(filteredExpenses.length, expenses.length)}</p>
          </div>
          <div className="utility-buttons-inline">
            <button
              type="button"
              className="clear-button"
              onClick={onClearSamples}
              title="Remove sample dummy entries"
            >
              <Trash2 size={13} /> {tt.clearSamples}
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={onLoadSamples}
              title="Reload sample entries"
            >
              <RotateCcw size={13} /> {tt.loadSamples}
            </button>
            <button type="button" className="clear-button" onClick={onExportCsv}>
              <Download size={13} /> {tt.exportCsv}
            </button>
          </div>
        </div>

        {/* Transactions list or Poetic Empty State */}
        {filteredExpenses.length > 0 ? (
          <div className="ledger-expenses">
            {filteredExpenses.map((expense) => (
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
        ) : expenses.length === 0 ? (
          /* Poetic Zen Empty State when month has 0 expenses */
          <div className="zen-empty-state">
            <div className="zen-empty-icon-wrap">
              <Coffee size={28} className="zen-cup-icon" />
              <span className="zen-leaf-dot" />
            </div>
            <h3>{tt.emptyZenTitle}</h3>
            <p>{tt.emptyZenSubtitle}</p>
            <button
              type="button"
              onClick={onOpenExpenseModal}
              className="btn-primary-glow inline-flex items-center gap-2"
            >
              <Plus size={16} /> {tt.emptyZenLogFirst}
            </button>
          </div>
        ) : (
          /* Empty search / filter results */
          <div className="empty-state-card">
            <p>{tt.emptySearch}</p>
            <button
              type="button"
              className="text-action"
              onClick={() => {
                setSearchQuery('')
                onSelectPillarFilter('All')
                setSelectedKindFilter('All')
              }}
            >
              {tt.resetFilters}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
