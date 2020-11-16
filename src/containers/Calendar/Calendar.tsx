import React, { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { getMatrix, dayNames } from 'utils/date'
import { TWeeks } from './Calendar.types'
import CalendarDetail from 'components/CalendarDetail/CalendarDetail'
import Button from 'components/Button'
import {
  CalendarWrapper,
  CalendarContentWrapper,
  CalendarDayNames,
  CalendarHeader,
  CalendarBody,
  CalendarMonthList,
  CalendarMonthListItem,
} from './Calendar.styled'
import { findLastKey } from 'lodash'

const Calendar: FC = () => {
  // Note: month start from 0 to 11
  const [time, setTime] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<TWeeks>()
  const [isDateHeader, setIsDateHeader] = useState<boolean>(false)

  const getWeeks = async (date: Date) => {
    const matrix = await getMatrix(date)
    setWeeks(matrix)
  }

  const onChangeTime = useCallback(
    (type: 'prevYear' | 'prevMonth' | 'today' | 'nextMonth' | 'nextYear') => {
      const val = new Date()

      if (type === 'prevYear') {
        val.setFullYear(time.getFullYear() - 1, time.getMonth(), time.getDate())
      } else if (type === 'prevMonth') {
        val.setFullYear(time.getFullYear(), time.getMonth() - 1, time.getDate())
      } else if (type === 'nextMonth') {
        val.setFullYear(time.getFullYear(), time.getMonth() + 1, time.getDate())
      } else if (type === 'nextYear') {
        val.setFullYear(time.getFullYear() + 1, time.getMonth(), time.getDate())
      }

      setTime(val)
    },
    [time]
  )

  const onSelectTime = (month: number) => {
    const val = new Date(time)
    val.setFullYear(time.getFullYear(), month, time.getDate())
    setTime(val)
    setIsDateHeader(false)
  }

  const onDateHeaderClick = () => {
    setIsDateHeader(true)
  }

  useEffect(() => {
    getWeeks(time)
  }, [time])

  const renderCalendarContent = useCallback(() => {
    return weeks?.map((week, index) => {
      return (
        <CalendarContentWrapper key={index}>
          {week.map((item) => (
            <CalendarDetail
              key={item.iso}
              {...item}
              maxWidth={100 / week.length}
            />
          ))}
        </CalendarContentWrapper>
      )
    })
  }, [weeks])

  const renderDayNames = useCallback(
    () => dayNames.map((item) => <div key={item}>{item}</div>),
    []
  )

  const renderMonthList = () =>
    Array(12)
      .fill(undefined)
      .map((item, index) => (
        <CalendarMonthListItem key={index} onClick={() => onSelectTime(index)}>
          {index + 1}
        </CalendarMonthListItem>
      ))

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <div>
          <Button fontSize={[18, 24]} border={0} onClick={onDateHeaderClick}>
            {!isDateHeader && time.getMonth() + 1 + `/`}
            {time.getFullYear()}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => onChangeTime('prevYear')}
            padding="8px"
          >{`<<`}</Button>
          <Button
            onClick={() => onChangeTime('prevMonth')}
            padding="8px"
          >{`<`}</Button>
          <Button onClick={() => onChangeTime('today')} padding="8px">
            Today
          </Button>
          <Button
            onClick={() => onChangeTime('nextMonth')}
            padding="8px"
          >{`>`}</Button>
          <Button
            onClick={() => onChangeTime('nextYear')}
            padding="8px"
          >{`>>`}</Button>
        </div>
      </CalendarHeader>
      {isDateHeader ? (
        <CalendarMonthList>{renderMonthList()}</CalendarMonthList>
      ) : (
        <>
          <CalendarDayNames>{renderDayNames()}</CalendarDayNames>
          <CalendarBody>{renderCalendarContent()}</CalendarBody>
        </>
      )}
    </CalendarWrapper>
  )
}

export default Calendar
