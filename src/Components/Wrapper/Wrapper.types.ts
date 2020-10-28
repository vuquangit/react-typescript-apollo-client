import {
  SpaceProps,
  DisplayProps,
  BorderProps,
  BackgroundProps,
  PositionProps,
  FlexboxProps,
  LayoutProps,
  WidthProps,
  ResponsiveValue,
} from 'styled-system'

export interface IWrapperProps {
  width?:
    | string
    | number
    | (string | number | null)[]
    | {
        [key: string]: string
      }
}

export type BaseProps = SpaceProps &
  DisplayProps &
  BorderProps &
  BackgroundProps &
  PositionProps &
  WidthProps &
  FlexboxProps & { children?: React.ReactNode } & LayoutProps &
  React.HTMLProps<HTMLDivElement>

export type WrapperProps = Omit<BaseProps, 'width'> & IWrapperProps
