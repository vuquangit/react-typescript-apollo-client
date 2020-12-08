import React, { FC, useState, useEffect, useCallback } from 'react'
import { getMatrix, dayNames } from '@/utils/date'
import { TWeeks } from './Calendar.types'
import CalendarDetail from '@/components/CalendarDetail/CalendarDetail'
import Button from '@/components/Button'
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
  const [date, setDate] = useState<Date>(new Date())
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
    (
      type: 'prevDateMore' | 'prevDate' | 'today' | 'nextDate' | 'nextDateMOre'
    ) => {
      const val = new Date()

      let numberChange = 1
      if (
        (calendarType === 'month' &&
          (type === 'prevDateMore' || type === 'nextDateMOre')) ||
        ((calendarType === 'year' || calendarType === 'years') &&
          (type === 'prevDate' || type === 'nextDate'))
      )
        numberChange = 10
      else if (
        (calendarType === 'year' || calendarType === 'years') &&
        (type === 'prevDateMore' || type === 'nextDateMOre')
      )
        numberChange = 100

      if (
        type === 'prevDateMore' ||
        (type === 'prevDate' && calendarType !== 'days')
      ) {
        val.setFullYear(
          date.getFullYear() - numberChange,
          date.getMonth(),
          date.getDate()
        )
      } else if (type === 'prevDate' && calendarType === 'days') {
        val.setFullYear(date.getFullYear(), date.getMonth() - 1, date.getDate())
      } else if (type === 'nextDate' && calendarType === 'days') {
        val.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate())
      } else if (
        type === 'nextDateMOre' ||
        (type === 'nextDate' && calendarType !== 'days')
      ) {
        val.setFullYear(
          date.getFullYear() + numberChange,
          date.getMonth(),
          date.getDate()
        )
      }

      setDate(val)

      if (type === 'today') setCalendarType('days')
    },
    [calendarType, date]
  )

  const onSelectMonth = (month: number) => {
    const val = new Date(date)
    val.setFullYear(date.getFullYear(), month, date.getDate())
    setDate(val)
    setCalendarType('days')
  }

  const onSelectYear = (year: number) => {
    const val = new Date(date)
    val.setFullYear(year, date.getMonth(), date.getDate())
    setDate(val)
    setCalendarType('month')
  }

  const onSelectYears = (years: number) => {
    const val = new Date(date)
    val.setFullYear(years, date.getMonth(), date.getDate())
    setDate(val)
    setCalendarType('year')
  }

  const onDateHeaderClick = useCallback(() => {
    if (calendarType === 'days') setCalendarType('month')
    else if (calendarType === 'month') setCalendarType('year')
    else if (calendarType === 'year') setCalendarType('years')
  }, [calendarType])

  const getYearStart = useCallback(() => {
    const yearHasSelected = date.getFullYear() + ''

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
  }, [calendarType, date])

  useEffect(() => {
    getYearStart()
    calendarType === 'days' && getWeeks(date)
  }, [calendarType, getYearStart, date])

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
              date.getMonth() + 1 + `/` + date.getFullYear()}
            {calendarType === 'month' && date.getFullYear()}
            {calendarType === 'year' && `${yearStart} - ${yearStart + 9}`}
            {calendarType === 'years' && `${yearStart} - ${yearStart + 99}`}
          </Button>
        </div>
        <div>
          <Button
            onClick={() => onChangeTime('prevDateMore')}
            padding="8px"
            cursor="pointer"
            disabled={date.getFullYear() <= 200}
          >{`<<`}</Button>
          <Button
            onClick={() => onChangeTime('prevDate')}
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
            onClick={() => onChangeTime('nextDate')}
            padding="8px"
            cursor="pointer"
            hidden={calendarType === 'years'}
          >{`>`}</Button>
          <Button
            onClick={() => onChangeTime('nextDateMOre')}
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