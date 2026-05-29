'use client'

import { ReactNode } from 'react'
import ErrorState from './ErrorState'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8">
            <ErrorState
              title="Error Loading Component"
              message="An unexpected error occurred while rendering this section."
              details={this.state.error?.message}
              icon="❌"
              onRetry={() => this.setState({ hasError: false, error: null })}
              actionLabel="Reset"
            />
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// Import React as needed
import React from 'react'
