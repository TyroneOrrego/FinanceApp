import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="ledger-shell flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-700 grid place-items-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-serif text-foreground mb-2">
            Algo inesperado ocurrió / Something went wrong
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
            Tu diario local está protegido. Puedes recargar la aplicación para continuar con tu práctica.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="btn-primary-glow inline-flex items-center gap-2"
          >
            <RotateCcw size={16} /> Recargar Aplicación / Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
