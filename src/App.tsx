import { ErrorBoundary } from './components/ErrorBoundary'
import { KakeiboDashboard } from './components/KakeiboDashboard'

export default function App() {
  return (
    <ErrorBoundary>
      <KakeiboDashboard />
    </ErrorBoundary>
  )
}
