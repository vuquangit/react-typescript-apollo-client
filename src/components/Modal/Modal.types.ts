export interface IModalWrapper {
  show: boolean
  widthContent?: string
  backgroundBlack?: boolean
  position?: 'fixed' | 'absolute'
  isShowCloseIcon?: boolean
}

export interface IModalContent {
  themeMode: 'light' | 'dark'
  widthContent?: string
  position?: 'fixed' | 'absolute'
}

interface IModalProps {
  onClose: () => void
  children: React.ReactNode
}

export declare type BaseModalProps = IModalWrapper & IModalProps
