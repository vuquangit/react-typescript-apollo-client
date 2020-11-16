import React, { FC } from 'react'
import {
  CalendarDetailWrapper,
  DateItem,
  CalendarEvents,
  CalendarEvent,
} from './CalendarDetail.styled'

type Props = {
  date: number
  dayName: string
  maxWidth: number
}

const CalendarDetail: FC<Props> = ({ date, dayName, maxWidth }) => {
  const itemDisable: boolean = dayName === 'Sun' || dayName === 'Sat'

  return (
    <>
      {!itemDisable ? (
        <CalendarDetailWrapper
          maxWidth={maxWidth}
          data-tooltip="In: 08:00 - Out: 17:37"
        >
          <DateItem>{date}</DateItem>
          <CalendarEvents>
            <CalendarEvent>Attend OK</CalendarEvent>
            <CalendarEvent>Leave OK</CalendarEvent>
          </CalendarEvents>
        </CalendarDetailWrapper>
      ) : (
        <CalendarDetailWrapper disable={true} maxWidth={maxWidth}>
          <DateItem data-tooltip>{date}</DateItem>
        </CalendarDetailWrapper>
      )}
    </>
  )
}

export default CalendarDetail
