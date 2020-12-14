import { SpaceProps } from 'styled-system'

export const FIELD_DAY = 'day'
export const FIELD_MONTH = 'month'
export const FIELD_YEAR = 'year'
export const FIELD_HOUR = 'hour'
export const FIELD_MINUTE = 'minute'

export type TDatetimeField =
  | typeof FIELD_DAY
  | typeof FIELD_MONTH
  | typeof FIELD_YEAR
  | typeof FIELD_HOUR
  | typeof FIELD_MINUTE

export interface IMDateTimePickerProps {
  typePicker: 'date' | 'datetime-local' | 'time'
}
export declare type BaseDateTimePickerProps = React.ButtonHTMLAttributes<
  HTMLInputElement
> &
  IMDateTimePickerProps &
  SpaceProps

export declare type DatetimeField = React.ButtonHTMLAttributes<HTMLInputElement>
