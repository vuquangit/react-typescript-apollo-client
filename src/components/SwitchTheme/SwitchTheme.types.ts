import { SpaceProps } from 'styled-system'

interface IThemeMode {
  themeMode: 'light' | 'dark'
}
export declare type BaseSwitchLight = IThemeMode

export declare type BaseSwitchDark = IThemeMode

export declare type BaseSwitchToggleThumb = IThemeMode

export declare type BaseSwitchScreenReader = React.InputHTMLAttributes<
  HTMLInputElement
>

export declare type BaseSwitchThemeProps = SpaceProps
