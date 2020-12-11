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

export interface DateTime {
  day:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31

  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

  year: number
}
