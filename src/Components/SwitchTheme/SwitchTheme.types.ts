export interface BaseSwitchLight {
  isLightMode: boolean
}

export interface BaseSwitchDark {
  isDarkMode: boolean
}

export interface BaseSwitchToggleThumb {
  checked: boolean
}

export declare type BaseSwitchScreenReader = React.InputHTMLAttributes<
  HTMLInputElement
>
