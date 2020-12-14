export declare type IDate = {
  date: number
  dayName: string
  iso: string
  type?: string
}

export type TWeek = IDate[]

export declare type TWeeks = TWeek[]

export const CALENDAR_TYPE_YEARS = 'years'
export const CALENDAR_TYPE_YEAR = 'year'
export const CALENDAR_TYPE_MONTH = 'month'
export const CALENDAR_TYPE_DAYS = 'days'

export const ON_TYPE_PREV_DATE_MORE = 'prevDateMore'
export const ON_TYPE_PREV_DATE = 'prevDate'
export const ON_TYPE_TODAY = 'today'
export const ON_TYPE_NEXT_DATE = 'nextDate'
export const ON_TYPE_NEXT_DATE_MORE = 'nextDateMOre'

export type TCalendarType =
  | typeof CALENDAR_TYPE_YEARS
  | typeof CALENDAR_TYPE_YEAR
  | typeof CALENDAR_TYPE_MONTH
  | typeof CALENDAR_TYPE_DAYS

export type TChangeTimeType =
  | typeof ON_TYPE_PREV_DATE_MORE
  | typeof ON_TYPE_PREV_DATE
  | typeof ON_TYPE_TODAY
  | typeof ON_TYPE_NEXT_DATE
  | typeof ON_TYPE_NEXT_DATE_MORE
