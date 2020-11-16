import {
  SpaceProps,
  LayoutProps,
  FlexBasisProps,
  ButtonStyleProps,
  BorderProps,
  TypographyProps,
} from 'styled-system'

interface ThemeButton {
  color?: string
  kind?: string
}

interface ButtonProps {
  theme?: ThemeButton
  label?: string
  size?: 'small' | 'medium' | 'large'
}

export declare type BaseButtonProps = React.ButtonHTMLAttributes<
  HTMLButtonElement
> &
  ButtonProps &
  SpaceProps &
  LayoutProps &
  FlexBasisProps &
  ButtonStyleProps &
  BorderProps &
  TypographyProps

export interface IButtonProps extends BaseButtonProps {
  children?: React.ReactNode
  props?: BaseButtonProps
  ref?: any
}
