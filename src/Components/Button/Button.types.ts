import {
  SpaceProps,
  LayoutProps,
  FlexBasisProps,
  ButtonStyleProps,
  BorderProps,
  TypographyProps,
  ColorProps,
} from 'styled-system'

interface ThemeButton {
  color?: string
  variant?: 'normal' | 'large'
}

interface ButtonProps {
  theme?: ThemeButton
  label?: string
  cursor?: number | string
  themeMode?: 'light' | 'dark'
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
  TypographyProps &
  ColorProps

export interface IButtonProps extends BaseButtonProps {
  children?: React.ReactNode
  props?: BaseButtonProps
  ref?: any
}
