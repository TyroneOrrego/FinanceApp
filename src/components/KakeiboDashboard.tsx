import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles } from 'lucide-react'

import { Expense, Pillar } from '../types'
import { TRANSLATIONS } from '../lib/i18n'
import { useSettings } from '../hooks/useSettings'
import { useJournal } from '../hooks/useJournal'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'

import { Header } from './Header'
import { BottomNav, TabId } from './BottomNav'
import { ExpenseModal } from './ExpenseModal'
import { GuideModal } from './GuideModal'
import { DashboardView } from './views/DashboardView'
import { ExpensesView } from './views/ExpensesView'
import { BudgetView } from './views/BudgetView'
import { ReflectionView } from './views/ReflectionView'
import { HistoryView } from './HistoryView'

export function KakeiboDashboard() {
  const { currency, lang, privacyMode, setCurrency, setLang, togglePrivacyMode } = useSettings()

  const {
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
  } = useJournal(currency, lang)

  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<'All' | Pillar>('All')
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const t = TRANSLATIONS[lang]

  const showNotice = (msg: string) => {
    setNotice(msg)
    window.setTimeout(() => setNotice(''), 3500)
  }

  // Keyboard shortcuts (N for new expense, Esc to close modals)
  useKeyboardShortcuts({
    onNewExpense: () => {
      setEditingExpense(null)
      setIsExpenseModalOpen(true)
    },
    onEscape: () => {
      setIsExpenseModalOpen(false)
      setIsGuideOpen(false)
    },
  })

  const handleOpenExpenseModal = () => {
    setEditingExpense(null)
    setIsExpenseModalOpen(true)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setIsExpenseModalOpen(true)
  }

  const handleSaveExpense = (data: Omit<Expense, 'id'>, editId?: string) => {
    if (editId) {
      editExpense(editId, data)
      showNotice(t.notices.updated)
    } else {
      addExpense(data)
      showNotice(t.notices.logged)
    }
  }

  const handleRemoveExpense = (id: string) => {
    removeExpense(id)
    showNotice(t.notices.removed)
  }

  const handleClearSamples = () => {
    clearSamples()
    showNotice(t.notices.samplesCleared)
  }

  const handleLoadSamples = () => {
    loadSamples()
    showNotice(t.notices.samplesLoaded)
  }

  const handleExportJson = () => {
    exportJson()
    showNotice(t.notices.backupDownloaded)
  }

  const handleExportCsv = () => {
    exportCsv()
    showNotice(t.notices.csvGenerated)
  }

  const handleImportJson = async (file?: File) => {
    const success = await importJournal(file)
    if (success) {
      showNotice(t.notices.restoredSuccess)
    } else {
      showNotice(t.notices.restoreError)
    }
  }

  const handleCelebrate = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#4f6c49', '#bd6a4c', '#6e5f86', '#b28935', '#e9ecdf'],
    })
    showNotice(t.notices.reflectionSaved)
  }

  return (
    <div className="ledger-shell">
      {/* Top Header */}
      <Header
        month={month}
        currency={currency}
        lang={lang}
        privacyMode={privacyMode}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
        onTogglePrivacy={togglePrivacyMode}
        onChangeCurrency={setCurrency}
        onChangeLang={setLang}
        onOpenGuide={() => setIsGuideOpen(true)}
        onExportCsv={handleExportCsv}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onLoadSamples={handleLoadSamples}
        onClearSamples={handleClearSamples}
      />

      {/* Main Content Area */}
      <main className="ledger-main">
        {activeTab === 'dashboard' && (
          <DashboardView
            month={month}
            plan={plan}
            spent={spent}
            allowance={allowance}
            remaining={remaining}
            daily={daily}
            daysLeft={daysLeft}
            pillarBreakdown={pillarBreakdown}
            needsVsWants={needsVsWants}
            currency={currency}
            lang={lang}
            privacyMode={privacyMode}
            onNavigateTab={setActiveTab}
            onSelectPillarFilter={setSelectedPillarFilter}
            onOpenExpenseModal={handleOpenExpenseModal}
            onOpenGuide={() => setIsGuideOpen(true)}
            onEditExpense={handleEditExpense}
            onRemoveExpense={handleRemoveExpense}
          />
        )}

        {activeTab === 'track' && (
          <ExpensesView
            expenses={plan.expenses}
            remaining={remaining}
            currency={currency}
            lang={lang}
            privacyMode={privacyMode}
            selectedPillarFilter={selectedPillarFilter}
            onSelectPillarFilter={setSelectedPillarFilter}
            onOpenExpenseModal={handleOpenExpenseModal}
            onQuickAdd={(data) => handleSaveExpense(data)}
            onEditExpense={handleEditExpense}
            onRemoveExpense={handleRemoveExpense}
            onClearSamples={handleClearSamples}
            onLoadSamples={handleLoadSamples}
            onExportCsv={handleExportCsv}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetView
            month={month}
            plan={plan}
            spent={spent}
            allowance={allowance}
            remaining={remaining}
            daily={daily}
            savingsRate={savingsRate}
            currency={currency}
            lang={lang}
            privacyMode={privacyMode}
            onUpdatePlan={updatePlan}
          />
        )}

        {activeTab === 'reflect' && (
          <ReflectionView
            plan={plan}
            spent={spent}
            savedActual={savedActual}
            currency={currency}
            lang={lang}
            privacyMode={privacyMode}
            onUpdatePlan={updatePlan}
            onCelebrate={handleCelebrate}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            journal={journal}
            currentMonth={month}
            currency={currency}
            lang={lang}
            onSelectMonth={(m) => {
              setMonth(m)
              setActiveTab('dashboard')
            }}
          />
        )}
      </main>

      {/* Persistent Bottom Nav */}
      <BottomNav activeTab={activeTab} lang={lang} onSelectTab={setActiveTab} />

      {/* Floating Notice Toast */}
      {notice && (
        <div className="notice" role="status">
          <Sparkles size={14} />
          <span>{notice}</span>
        </div>
      )}

      {/* Modals */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false)
          setEditingExpense(null)
        }}
        onSave={handleSaveExpense}
        editingExpense={editingExpense}
        lang={lang}
        currency={currency}
      />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} lang={lang} />
    </div>
  )
}
