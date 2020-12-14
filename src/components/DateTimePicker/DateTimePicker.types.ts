import { SpaceProps } from 'styled-system'

export interface IMDateTimePickerProps {
  type: 'date' | 'datetime-local'
}
export declare type BaseDateTimePickerProps = React.ButtonHTMLAttributes<
  HTMLInputElement
> &
  IMDateTimePickerProps &
  SpaceProps

export declare type DatetimeField = React.ButtonHTMLAttributes<HTMLInputElement>
