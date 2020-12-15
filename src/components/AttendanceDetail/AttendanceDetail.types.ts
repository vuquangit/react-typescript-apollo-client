export interface IDate {
  isToday?: boolean
}

type AttendanceDetailProps = {
  disable?: boolean
  date?: number
  dayName?: string
  maxWidth?: number
  iso?: string
}

export declare type BaseAttendanceDetailProps = AttendanceDetailProps
