interface ErrorMessageProps {
  message: string
  hide?: boolean
}

const ErrorMessage = ({ message, hide = false }: ErrorMessageProps) => {
  return (
    <div className="error-message" style={{ display: hide && !message ? 'none' : '' }}>
      {message && <span>{message}</span>}
    </div>
  )
}
export default ErrorMessage
