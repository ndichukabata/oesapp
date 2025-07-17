import { FormControl, FormLabel, InputGroup } from 'react-bootstrap'
import { TbLockPassword } from 'react-icons/tb'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import { useState } from 'react'
type PasswordInputProps = {
  password: string
  setPassword: (value: string) => void
  showIcon?: boolean
  id?: string
  name?: string
  placeholder?: string
  label?: string
  labelClassName?: string
  inputClassName?: string
}

const calculatePasswordStrength = (password: string): number => {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[\W_]/.test(password)) strength++
  return strength
}

const PasswordInputWithStrength = ({
  password,
  setPassword,
  id,
  label,
  name,
  placeholder,
  showIcon,
  labelClassName,
  inputClassName,
}: PasswordInputProps) => {
  const strength = calculatePasswordStrength(password)
  const strengthBars = new Array(4).fill(0)
  const [passState, setPassState] = useState(false);
  return (
    <>
      {label && (
        <FormLabel htmlFor={id} className={labelClassName}>
          {label} <span className="text-danger">*</span>
        </FormLabel>
      )}

      <div className="input-group">
        {showIcon && (
          <span className="input-group-text bg-light">
            <TbLockPassword className="text-muted fs-xl" />
          </span>
        )}
        <InputGroup>
          <FormControl
            type={passState ? "text" : "password"}
            name={name}
            id={id}
            placeholder={placeholder}
            required
            className={inputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputGroupText className="password-eye" onClick={(ev) => {
            ev.preventDefault();
            setPassState(!passState);
          }}>
            <TbEye className={passState ? "d-block" : "d-none"} />
            <TbEyeClosed className={passState ? "d-none" : "d-block"} />
          </InputGroupText>
        </InputGroup>
      </div>

      <div className="password-bar my-2">
        {strengthBars.map((_, i) => (
          <div key={i} className={'strong-bar ' + (i < strength ? `bar-active-${strength}` : '')} />
        ))}
      </div>

      <p className="text-muted fs-xs mb-0">Use 8+ characters with letters, numbers & symbols.</p>
    </>
  )
}

export default PasswordInputWithStrength
