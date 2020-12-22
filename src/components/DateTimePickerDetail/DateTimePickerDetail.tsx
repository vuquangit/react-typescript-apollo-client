import React, { FC } from 'react'
import {
  DateTimePickerDetailWrapper,
  DateItem,
} from './DateTimePickerDetail.styled'
import { BaseDateTimePickerDetailProps } from './DateTimePickerDetail.types'

const DateTimePickerDetail: FC<BaseDateTimePickerDetailProps> = ({
  date,
  dayName,
  iso = '',
  handleSelectDateCalendar,
}) => {
  // const itemDisable: boolean = dayName === 'Sun' || dayName === 'Sat'
  const today = new Date()
  const dateOfItem = new Date(iso)
  const dateIsToday: boolean =
    dateOfItem.getFullYear() === today.getFullYear() &&
    dateOfItem.getMonth() === today.getMonth() &&
    dateOfItem.getDate() === today.getDate()

  const onDateClick = () => {
    const val = new Date(iso)
    handleSelectDateCalendar(val)
  }
  return (
    <DateTimePickerDetailWrapper>
      <DateItem isToday={dateIsToday} onClick={onDateClick}>
        {date}
      </DateItem>
    </DateTimePickerDetailWrapper>
  )
}

export default DateTimePickerDetail
