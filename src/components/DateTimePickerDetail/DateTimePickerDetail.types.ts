export interface IDate {
  isToday: boolean
}

type DateTimePickerDetailProps = {
  disable?: boolean
  date?: number
  dayName?: string
  maxWidth?: number
  iso?: string
}

export declare type BaseDateTimePickerDetailProps = DateTimePickerDetailProps
