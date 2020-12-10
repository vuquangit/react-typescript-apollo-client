import styled from 'styled-components'
import { space } from 'styled-system'
import { ICheckboxLabel } from './Checkbox.types'

export const CheckboxWrapper = styled('div')`
  ${space};

  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const CheckboxInput = styled('input')`
  cursor: pointer;
  height: 16px;
  width: 16px;
`

export const CheckboxLabel = styled('label')<ICheckboxLabel>`
  padding-left: 8px;
  cursor: pointer;
`
