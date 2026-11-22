import React from 'react'
import { BookOpen, Flower2, History, Plus, Wallet } from 'lucide-react'
import { Language } from '../types'
import { TRANSLATIONS } from '../lib/i18n'

export type TabId = 'dashboard' | 'track' | 'budget' | 'reflect' | 'history'

interface BottomNavProps {
  activeTab: TabId
  lang: Language
  onSelectTab: (tab: TabId) => void
}

export function BottomNav({ activeTab, lang, onSelectTab }: BottomNavProps) {
  const t = TRANSLATIONS[lang]

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.tabs.dashboard, icon: <Flower2 size={18} strokeWidth={2} /> },
    { id: 'track', label: t.tabs.track, icon: <Plus size={18} strokeWidth={2} /> },
    { id: 'budget', label: t.tabs.budget, icon: <Wallet size={18} strokeWidth={2} /> },
    { id: 'reflect', label: t.tabs.reflect, icon: <BookOpen size={18} strokeWidth={2} /> },
    { id: 'history', label: t.tabs.history, icon: <History size={18} strokeWidth={2} /> },
  ]

  return (
    <nav className="ledger-nav" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-current={activeTab === tab.id ? 'page' : undefined}
          className={activeTab === tab.id ? 'active' : ''}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
