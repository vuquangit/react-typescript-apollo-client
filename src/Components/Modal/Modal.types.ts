export interface IModalWrapper {
  show: boolean
}

export interface IModalContent {
  themeMode: 'light' | 'dark'
}

interface IModalProps {
  onClose: () => void
  children: React.ReactNode
}

export declare type BaseModalProps = IModalWrapper & IModalProps
