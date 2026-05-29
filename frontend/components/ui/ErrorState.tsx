interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  details?: string
  icon?: string
  actionLabel?: string
  actionHref?: string
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  details,
  icon = '⚠️',
  actionLabel = 'Retry',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-size8 font-semibold text-text-primary mb-2 font-poppins">
        {title}
      </h3>
      <p className="text-text-text5 text-size5 max-w-md mb-4">
        {message}
      </p>
      {details && (
        <p className="text-text-text6 text-size4 max-w-md mb-6 font-mono bg-gray-100 p-3 rounded">
          {details}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

interface ErrorAlertProps {
  message: string
  onDismiss?: () => void
  variant?: 'error' | 'warning' | 'info'
}

export function ErrorAlert({ message, onDismiss, variant = 'error' }: ErrorAlertProps) {
  const bgColors = {
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  }

  const textColors = {
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  }

  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${bgColors[variant]}`}>
      <span className="text-lg">{icons[variant]}</span>
      <div className={`flex-1 text-size5 ${textColors[variant]}`}>{message}</div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export function ValidationError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-red-600 text-size4 mt-1">
      <span>⚠</span>
      {message}
    </div>
  )
}
