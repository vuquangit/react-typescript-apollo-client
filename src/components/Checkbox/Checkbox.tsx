import React, { FC } from 'react'

import {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
} from './Checkbox.styled'
import { BaseCheckboxProps } from './Checkbox.types'

const Checkbox: FC<BaseCheckboxProps> = ({
  checked,
  label,
  disabled,
  onChange,
}) => {
  return (
    <CheckboxWrapper data-testid="checkbox-wrapper">
      <CheckboxInput
        type="checkbox"
        id="checkboxId"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckboxLabel htmlFor="checkboxId">{label}</CheckboxLabel>
    </CheckboxWrapper>
  )
}

export default Checkbox
