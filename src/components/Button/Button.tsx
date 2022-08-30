interface ButtonProps {
  className?: string
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  sx?: React.CSSProperties
}

const Button = ({ className, text, onClick, sx }: ButtonProps) => {
  return (
    <button className={className} type="button" onClick={onClick} style={sx}>
      {text}
    </button>
  )
}

export default Button
