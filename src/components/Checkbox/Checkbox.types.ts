import { SpaceProps } from 'styled-system'

export type ICheckboxLabel = React.ButtonHTMLAttributes<HTMLLabelElement>

export interface ICheckboxProps {
  checked?: boolean
  label?: string
  color?: 'default' | 'primary' | 'secondary'
  size?: 'medium' | 'small'
  disabled?: boolean
  onChange?: () => void
}

export declare type BaseCheckboxProps = ICheckboxProps & SpaceProps
