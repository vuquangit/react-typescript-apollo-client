import React, { FC, useState, useEffect, useCallback } from 'react'
import { getMatrix, dayNames, TWeeks } from '@/utils/date'
// import CalendarDetail from '@/components/CalendarDetail/CalendarDetail'
import Button from '@/components/Button'
import {
  BaseCalendarWrapperProps,
  CALENDAR_TYPE_DAYS,
  CALENDAR_TYPE_MONTH,
  CALENDAR_TYPE_YEAR,
  CALENDAR_TYPE_YEARS,
  ON_TYPE_NEXT_DATE,
  ON_TYPE_NEXT_DATE_MORE,
  ON_TYPE_PREV_DATE,
  ON_TYPE_PREV_DATE_MORE,
  ON_TYPE_TODAY,
  TCalendarType,
  TChangeTimeType,
} from './CalendarWrapper.types'
import {
  CalendarWrapper,
  CalendarContentWrapper,
  CalendarDayNames,
  CalendarHeader,
  CalendarBody,
  CalendarMonthList,
  CalendarMonthListItem,
  CalendarHeaderDate,
  CalendarHeaderButtons,
} from './CalendarWrapper.styled'

const CalendarWrappers: FC<BaseCalendarWrapperProps> = ({
  children,
  isShortCalendar = false,
}) => {
  const [date, setDate] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<TWeeks>()
  const [calendarType, setCalendarType] = useState<TCalendarType>(
    CALENDAR_TYPE_DAYS
  )
  const [yearStart, setYearStart] = useState<number>(0)

  const getWeeks = async (date: Date) => {
    const matrix = await getMatrix(date)
    setWeeks(matrix)
  }

  const onChangeTime = useCallback(
    (type: TChangeTimeType) => {
      const val = new Date()

      let numberChange = 1
      if (
        (calendarType === CALENDAR_TYPE_MONTH &&
          (type === ON_TYPE_PREV_DATE_MORE ||
            type === ON_TYPE_NEXT_DATE_MORE)) ||
        ((calendarType === CALENDAR_TYPE_YEAR ||
          calendarType === CALENDAR_TYPE_YEARS) &&
          (type === ON_TYPE_PREV_DATE || type === ON_TYPE_NEXT_DATE))
      )
        numberChange = 10
      else if (
        (calendarType === CALENDAR_TYPE_YEAR ||
          calendarType === CALENDAR_TYPE_YEARS) &&
        (type === ON_TYPE_PREV_DATE_MORE || type === ON_TYPE_NEXT_DATE_MORE)
      )
        numberChange = 100

      if (
        type === ON_TYPE_PREV_DATE_MORE ||
        (type === ON_TYPE_PREV_DATE && calendarType !== CALENDAR_TYPE_DAYS)
      ) {
        val.setFullYear(
          date.getFullYear() - numberChange,
          date.getMonth(),
          date.getDate()
        )
      } else if (
        type === ON_TYPE_PREV_DATE &&
        calendarType === CALENDAR_TYPE_DAYS
      ) {
        val.setFullYear(date.getFullYear(), date.getMonth() - 1, date.getDate())
      } else if (
        type === ON_TYPE_NEXT_DATE &&
        calendarType === CALENDAR_TYPE_DAYS
      ) {
        val.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate())
      } else if (
        type === ON_TYPE_NEXT_DATE_MORE ||
        (type === ON_TYPE_NEXT_DATE && calendarType !== CALENDAR_TYPE_DAYS)
      ) {
        val.setFullYear(
          date.getFullYear() + numberChange,
          date.getMonth(),
          date.getDate()
        )
      }

      setDate(val)

      if (type === ON_TYPE_TODAY) setCalendarType(CALENDAR_TYPE_DAYS)
    },
    [calendarType, date]
  )

  const onSelectMonth = (month: number) => {
    const val = new Date(date)
    val.setFullYear(date.getFullYear(), month, date.getDate())
    setDate(val)
    setCalendarType(CALENDAR_TYPE_DAYS)
  }

  const onSelectYear = (year: number) => {
    const val = new Date(date)
    val.setFullYear(year, date.getMonth(), date.getDate())
    setDate(val)
    setCalendarType(CALENDAR_TYPE_MONTH)
  }

  const onSelectYears = (years: number) => {
    const val = new Date(date)
    val.setFullYear(years, date.getMonth(), date.getDate())
    setDate(val)
    setCalendarType(CALENDAR_TYPE_YEAR)
  }

  const onDateHeaderClick = useCallback(() => {
    if (calendarType === CALENDAR_TYPE_DAYS)
      setCalendarType(CALENDAR_TYPE_MONTH)
    else if (calendarType === CALENDAR_TYPE_MONTH)
      setCalendarType(CALENDAR_TYPE_YEAR)
    else if (calendarType === CALENDAR_TYPE_YEAR)
      setCalendarType(CALENDAR_TYPE_YEARS)
  }, [calendarType])

  const getYearStart = useCallback(() => {
    const yearHasSelected = date.getFullYear() + ''

    if (calendarType === CALENDAR_TYPE_YEAR) {
      const year2Fill = parseInt(
        yearHasSelected.split('').slice(0, -1).concat('1').join('')
      )
      const _yearStart = yearHasSelected.endsWith('0')
        ? year2Fill - 10
        : year2Fill

      setYearStart(_yearStart)
    } else if (calendarType === CALENDAR_TYPE_YEARS) {
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
    calendarType === CALENDAR_TYPE_DAYS && getWeeks(date)
  }, [calendarType, getYearStart, date])

  const renderCalendarContent = useCallback(() => {
    return weeks?.map((week, index) => (
      <CalendarContentWrapper key={index}>
        {week.map((item) =>
          React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              index,
              ...item,
              maxWidth: 100 / week.length,
            })
          })
        )}
      </CalendarContentWrapper>
    ))
  }, [children, weeks])

  const renderDayNames = useCallback(
    () =>
      dayNames.map((item) => (
        <div key={item}>{isShortCalendar ? item.slice(0, 1) : item}</div>
      )),
    [isShortCalendar]
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
    <CalendarWrapper isShortCalendar={isShortCalendar}>
      <CalendarHeader isShortCalendar={isShortCalendar}>
        <CalendarHeaderDate isShortCalendar={isShortCalendar}>
          <Button
            fontSize={[18, 24]}
            border={0}
            cursor="pointer"
            onClick={onDateHeaderClick}
            disabled={calendarType === CALENDAR_TYPE_YEARS}
          >
            {calendarType === CALENDAR_TYPE_DAYS &&
              date.getMonth() + 1 + `/` + date.getFullYear()}
            {calendarType === CALENDAR_TYPE_MONTH && date.getFullYear()}
            {calendarType === CALENDAR_TYPE_YEAR &&
              `${yearStart} - ${yearStart + 9}`}
            {calendarType === CALENDAR_TYPE_YEARS &&
              `${yearStart} - ${yearStart + 99}`}
          </Button>
        </CalendarHeaderDate>
        <CalendarHeaderButtons isShortCalendar={isShortCalendar}>
          <Button
            onClick={() => onChangeTime(ON_TYPE_PREV_DATE_MORE)}
            padding="8px"
            cursor="pointer"
            disabled={date.getFullYear() <= 200}
          >{`<<`}</Button>
          <Button
            onClick={() => onChangeTime(ON_TYPE_PREV_DATE)}
            padding="8px"
            cursor="pointer"
            hidden={calendarType === CALENDAR_TYPE_YEARS}
          >{`<`}</Button>
          <Button
            onClick={() => onChangeTime(ON_TYPE_TODAY)}
            padding="8px"
            cursor="pointer"
          >
            Today
          </Button>
          <Button
            onClick={() => onChangeTime(ON_TYPE_NEXT_DATE)}
            padding="8px"
            cursor="pointer"
            hidden={calendarType === CALENDAR_TYPE_YEARS}
          >{`>`}</Button>
          <Button
            onClick={() => onChangeTime(ON_TYPE_NEXT_DATE_MORE)}
            padding="8px"
            cursor="pointer"
          >{`>>`}</Button>
        </CalendarHeaderButtons>
      </CalendarHeader>

      {calendarType === CALENDAR_TYPE_DAYS && (
        <>
          <CalendarDayNames>{renderDayNames()}</CalendarDayNames>
          <CalendarBody>{renderCalendarContent()}</CalendarBody>
        </>
      )}

      {calendarType === CALENDAR_TYPE_MONTH && (
        <CalendarMonthList>{renderMonthList()}</CalendarMonthList>
      )}

      {calendarType === CALENDAR_TYPE_YEAR && (
        <CalendarMonthList>{renderYearList()}</CalendarMonthList>
      )}

      {calendarType === CALENDAR_TYPE_YEARS && (
        <CalendarMonthList>{renderYearsList()}</CalendarMonthList>
      )}
    </CalendarWrapper>
  )
}

export default CalendarWrappers
