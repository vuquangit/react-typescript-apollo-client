import React, { FC, useState, useEffect, useCallback } from 'react'
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

const Calendar: FC = () => {
  // Note: month start from 0 to 11
  const [time, setTime] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<TWeeks>()
  const [calendarType, setCalendarType] = useState<
    'years' | 'year' | 'month' | 'days'
  >('days')
  const [yearStart, setYearStart] = useState<number>(0)

  const getWeeks = async (date: Date) => {
    const matrix = await getMatrix(date)
    setWeeks(matrix)
  }

  const onChangeTime = useCallback(
    (type: 'prevYear' | 'prevMonth' | 'today' | 'nextMonth' | 'nextYear') => {
      const val = new Date()

      let numberChange = 1
      if (
        (calendarType === 'month' &&
          (type === 'prevYear' || type === 'nextYear')) ||
        ((calendarType === 'year' || calendarType === 'years') &&
          (type === 'prevMonth' || type === 'nextMonth'))
      )
        numberChange = 10
      else if (
        (calendarType === 'year' || calendarType === 'years') &&
        (type === 'prevYear' || type === 'nextYear')
      )
        numberChange = 100

      if (
        type === 'prevYear' ||
        (type === 'prevMonth' && calendarType !== 'days')
      ) {
        val.setFullYear(
          time.getFullYear() - numberChange,
          time.getMonth(),
          time.getDate()
        )
      } else if (type === 'prevMonth' && calendarType === 'days') {
        val.setFullYear(time.getFullYear(), time.getMonth() - 1, time.getDate())
      } else if (type === 'nextMonth' && calendarType === 'days') {
        val.setFullYear(time.getFullYear(), time.getMonth() + 1, time.getDate())
      } else if (
        type === 'nextYear' ||
        (type === 'nextMonth' && calendarType !== 'days')
      ) {
        val.setFullYear(
          time.getFullYear() + numberChange,
          time.getMonth(),
          time.getDate()
        )
      }

      setTime(val)

      if (type === 'today') setCalendarType('days')
    },
    [calendarType, time]
  )

  const onSelectMonth = (month: number) => {
    const val = new Date(time)
    val.setFullYear(time.getFullYear(), month, time.getDate())
    setTime(val)
    setCalendarType('days')
  }

  const onSelectYear = (year: number) => {
    const val = new Date(time)
    val.setFullYear(year, time.getMonth(), time.getDate())
    setTime(val)
    setCalendarType('month')
  }

  const onSelectYears = (years: number) => {
    const val = new Date(time)
    val.setFullYear(years, time.getMonth(), time.getDate())
    setTime(val)
    setCalendarType('year')
  }

  const onDateHeaderClick = useCallback(() => {
    if (calendarType === 'days') setCalendarType('month')
    else if (calendarType === 'month') setCalendarType('year')
    else if (calendarType === 'year') setCalendarType('years')
  }, [calendarType])

  const getYearStart = useCallback(() => {
    const yearHasSelected = time.getFullYear() + ''

    if (calendarType === 'year') {
      const year2Fill = parseInt(
        yearHasSelected.split('').slice(0, -1).concat('1').join('')
      )
      const _yearStart = yearHasSelected.endsWith('0')
        ? year2Fill - 10
        : year2Fill

      setYearStart(_yearStart)
    } else if (calendarType === 'years') {
      const year2Fill = parseInt(
        yearHasSelected.split('').slice(0, -2).concat('01').join('')
      )
      const _yearStart = yearHasSelected.endsWith('0')
        ? year2Fill - 100
        : year2Fill

      setYearStart(_yearStart)
    }
  }, [calendarType, time])

  useEffect(() => {
    getYearStart()
    calendarType === 'days' && getWeeks(time)
  }, [calendarType, getYearStart, time])

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
      .fill(0)
      .map((_, index) => (
        <CalendarMonthListItem key={index} onClick={() => onSelectMonth(index)}>
          {index + 1}
        </CalendarMonthListItem>
      ))

  const renderYearList = () =>
    Array(10)
      .fill(yearStart)
      .map((item, index) => {
        const year = item + index

        return (
          <CalendarMonthListItem key={index} onClick={() => onSelectYear(year)}>
            {year}
          </CalendarMonthListItem>
        )
      })

  const renderYearsList = () =>
    Array(10)
      .fill(yearStart)
      .map((item, index) => {
        const years = item + index * 100

        return (
          <CalendarMonthListItem
            key={index}
            onClick={() => onSelectYears(years)}
          >
            {`${years}-${years + 99} `}
          </CalendarMonthListItem>
        )
      })

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <div>
          <Button
            fontSize={[18, 24]}
            border={0}
            cursor="pointer"
            onClick={onDateHeaderClick}
            disabled={calendarType === 'years'}
          >
            {calendarType === 'days' &&
              time.getMonth() + 1 + `/` + time.getFullYear()}
            {calendarType === 'month' && time.getFullYear()}
            {calendarType === 'year' && `${yearStart} - ${yearStart + 9}`}
            {calendarType === 'years' && `${yearStart} - ${yearStart + 99}`}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => onChangeTime('prevYear')}
            padding="8px"
            cursor="pointer"
            disabled={time.getFullYear() <= 200}
          >{`<<`}</Button>
          <Button
            onClick={() => onChangeTime('prevMonth')}
            padding="8px"
            cursor="pointer"
            hidden={calendarType === 'years'}
          >{`<`}</Button>
          <Button
            onClick={() => onChangeTime('today')}
            padding="8px"
            cursor="pointer"
          >
            Today
          </Button>
          <Button
            onClick={() => onChangeTime('nextMonth')}
            padding="8px"
            cursor="pointer"
            hidden={calendarType === 'years'}
          >{`>`}</Button>
          <Button
            onClick={() => onChangeTime('nextYear')}
            padding="8px"
            cursor="pointer"
          >{`>>`}</Button>
        </div>
      </CalendarHeader>

      {calendarType === 'days' && (
        <>
          <CalendarDayNames>{renderDayNames()}</CalendarDayNames>
          <CalendarBody>{renderCalendarContent()}</CalendarBody>
        </>
      )}

      {calendarType === 'month' && (
        <CalendarMonthList>{renderMonthList()}</CalendarMonthList>
      )}

      {calendarType === 'year' && (
        <CalendarMonthList>{renderYearList()}</CalendarMonthList>
      )}
      {calendarType === 'years' && (
        <CalendarMonthList>{renderYearsList()}</CalendarMonthList>
      )}
    </CalendarWrapper>
  )
}

export default Calendar
