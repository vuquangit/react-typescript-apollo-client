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
    const data = await getMatrix(date)
    console.log(data)

    setWeeks(data)
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

  const onChangeTime = (type: 'prev' | 'today' | 'next') => {
    if (type === 'prev') {
      setTime((prev) => {
        const val = prev
        val.setFullYear(prev.getFullYear(), prev.getMonth() - 1, prev.getDate())
        return val
      })
    } else if (type === 'today') setTime(new Date())
    else if (type === 'next') {
      setTime((prev) => {
        const val = prev
        val.setFullYear(prev.getFullYear(), prev.getMonth() + 1, prev.getDate())
        return val
      })
    }

    getWeeks(time)
  }

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <div>
          {time.getMonth() + 1} - {time.getFullYear()}
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
