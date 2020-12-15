import React, { FC } from 'react'
import {
  CalendarDetailWrapper,
  DateItem,
  CalendarEvents,
  CalendarEvent,
} from './AttendanceDetail.styled'
import { BaseAttendanceDetailProps } from './AttendanceDetail.types'

const AttendanceDetail: FC<BaseAttendanceDetailProps> = ({
  date,
  dayName,
  iso = '',
  maxWidth,
}) => {
  const itemDisable: boolean = dayName === 'Sun' || dayName === 'Sat'
  const today = new Date()
  const dateOfItem = new Date(iso)
  const dateIsToday: boolean =
    dateOfItem.getFullYear() === today.getFullYear() &&
    dateOfItem.getMonth() === today.getMonth() &&
    dateOfItem.getDate() === today.getDate()

  return (
    <>
      {!itemDisable ? (
        <CalendarDetailWrapper
          maxWidth={maxWidth}
          data-tooltip="In: 08:00 - Out: 17:37"
        >
          <DateItem isToday={dateIsToday}>{date}</DateItem>
          <CalendarEvents>
            <CalendarEvent>Attend OK</CalendarEvent>
            <CalendarEvent>Leave OK</CalendarEvent>
          </CalendarEvents>
        </CalendarDetailWrapper>
      ) : (
        <CalendarDetailWrapper disable={true} maxWidth={maxWidth} data-tooltip>
          <DateItem>{date}</DateItem>
        </CalendarDetailWrapper>
      )}
    </>
  )
}

export default AttendanceDetail
