import { useCallback, useState } from 'react'

interface InputProps {
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  reg?: RegExp
}

const Input = ({ placeholder = '', onChange, onKeyDown, type = 'text', reg }: InputProps) => {
  const [value, setValue] = useState('')
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value: _value } = e.currentTarget
      if (reg && !reg.test(_value)) return
      setValue(_value)
      onChange(e)
    },
    [onChange, reg]
  )
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  )
}

export default Input
