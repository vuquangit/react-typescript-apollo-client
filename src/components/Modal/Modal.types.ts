import { SpaceProps } from 'styled-system'

export interface IModalWrapper {
  show: boolean
  widthContent?: string
  backgroundBlack?: boolean
  position?: 'fixed' | 'absolute'
  isShowCloseIcon?: boolean
}

export interface IModalContent extends SpaceProps {
  themeMode: 'light' | 'dark'
  widthContent?: string
  position?: 'fixed' | 'absolute'
}

interface IModalProps {
  onClose: () => void
  children: React.ReactNode
}

export declare type BaseModalProps = IModalWrapper & IModalProps & SpaceProps
