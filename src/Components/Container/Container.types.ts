// eslint-disable-next-line @typescript-eslint/ban-types
export declare type BaseContainerProps = {}

export interface IContainerProps extends BaseContainerProps {
  children?: React.ReactNode
  props?: BaseContainerProps
  ref?: any
}
