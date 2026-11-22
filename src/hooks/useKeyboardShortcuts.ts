import { useEffect } from 'react'

interface ShortcutHandlers {
  onNewExpense?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts({ onNewExpense, onEscape }: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable

      if (e.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      // Quick key 'n' for new expense when not typing in an input
      if ((e.key === 'n' || e.key === 'N') && !isInput && !e.metaKey && !e.ctrlKey) {
        if (onNewExpense) {
          e.preventDefault()
          onNewExpense()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNewExpense, onEscape])
}
