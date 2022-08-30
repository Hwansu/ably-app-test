import { useController, UseControllerProps } from 'react-hook-form'
import { FormInputValue } from 'types'

interface FormInputProps extends UseControllerProps<FormInputValue> {
  placeholder?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  type?: React.HTMLInputTypeAttribute
}

const FormInput = (props: FormInputProps) => {
  const { field } = useController(props)
  const { placeholder, name, onKeyDown, type = 'text' } = props

  return <input {...field} type={type} placeholder={placeholder || name} onKeyDown={onKeyDown} />
}

export default FormInput
