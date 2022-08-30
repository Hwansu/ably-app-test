interface InputProps {
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const Input = ({ placeholder = '', onChange, onKeyDown, type = 'text' }: InputProps) => {
  return <input type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} />
}

export default Input
