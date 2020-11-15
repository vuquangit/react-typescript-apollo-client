import React, { FC, useState, useEffect } from 'react'
import { getMatrix, dayNames } from './dateutil'
import { TWeeks } from './Calendar.types'
import CalendarDetail from '../CalendarDetail/CalendarDetail'
import {
  CalendarWrapper,
  CalendarContentWrapper,
  CalendarTitle,
  CalendarHeader,
} from './Calendar.styled'

const Calendar: FC = () => {
  // Note: month start from 0 to 11
  const [time, setTime] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<TWeeks>()

  const getWeeks = async (date: Date) => {
    const matrix = await getMatrix(date)
    setWeeks(matrix)
  }

  const onChangeTime = (type: 'prev' | 'today' | 'next') => {
    const val = new Date()
    if (type === 'prev') {
      val.setFullYear(time.getFullYear(), time.getMonth() - 1, time.getDate())
    } else if (type === 'next') {
      val.setFullYear(time.getFullYear(), time.getMonth() + 1, time.getDate())
    }

    setTime(val)
  }

  useEffect(() => {
    getWeeks(time)
  }, [time])

  const renderCalendarContent = () => {
    return weeks?.map((week, index) => {
      return (
        <CalendarContentWrapper key={index}>
          {week.map((date) => (
            <CalendarDetail key={date.iso} {...date} />
          ))}
        </CalendarContentWrapper>
      )
    })
  }

  const renderCalendarTitle = () =>
    dayNames.map((item) => <div key={item}>{item}</div>)

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <div>
          {time.getMonth() + 1}/{time.getFullYear()}
        </div>
        <div>
          <button onClick={() => onChangeTime('prev')}>{`<`}</button>
          <button onClick={() => onChangeTime('today')}>Today</button>
          <button onClick={() => onChangeTime('next')}>{`>`}</button>
        </div>
      </CalendarHeader>
      <CalendarTitle>{renderCalendarTitle()}</CalendarTitle>
      {renderCalendarContent()}
    </CalendarWrapper>
  )
}

export default Calendar
