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
}) => {
  const itemDisable: boolean = dayName === 'Sun' || dayName === 'Sat'
  const today = new Date()
  const dateOfItem = new Date(iso)
  const dateIsToday: boolean =
    dateOfItem.getFullYear() === today.getFullYear() &&
    dateOfItem.getMonth() === today.getMonth() &&
    dateOfItem.getDate() === today.getDate()

  return (
    <DateTimePickerDetailWrapper isToday={dateIsToday}>
      <DateItem>{date}</DateItem>
    </DateTimePickerDetailWrapper>
  )
}

export default DateTimePickerDetail
