export interface IDate {
  isToday: boolean
}

type DateTimePickerDetailProps = {
  disable?: boolean
  date?: number
  dayName?: string
  maxWidth?: number
  iso?: string
  handleSelectDateCalendar: (date: Date) => void
}

export declare type BaseDateTimePickerDetailProps = DateTimePickerDetailProps
