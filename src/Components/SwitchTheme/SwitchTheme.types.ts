import { ReactHTMLElement } from 'react'

interface IThemeMode {
  themeMode: 'light' | 'dark'
}
export declare type BaseSwitchLight = IThemeMode

export declare type BaseSwitchDark = IThemeMode

export declare type BaseSwitchToggleThumb = IThemeMode

export declare type BaseSwitchScreenReader = React.InputHTMLAttributes<
  HTMLInputElement
>
