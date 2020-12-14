import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import Button from '../Button'

import {
  DateTimePickerWrapper,
  DTPDatetimeField,
  DTPDatetimeSlash,
  DTPFormControl,
  DTPInput,
  DTPLabel,
} from './DateTimePicker.styled'
import { BaseDateTimePickerProps } from './DateTimePicker.types'

const FIELD_DAY = 'day'
const FIELD_MONTH = 'month'
const FIELD_YEAR = 'year'
type IDatetimeField = typeof FIELD_DAY | typeof FIELD_MONTH | typeof FIELD_YEAR

const DateTimePicker: FC<BaseDateTimePickerProps> = ({ type }) => {
  const dayInput = useRef(document.createElement('input'))
  const monthInput = useRef(document.createElement('input'))
  const yearInput = useRef(document.createElement('input'))

  const addLeadingZeros = (
    val: number,
    field: IDatetimeField,
    isMonthInit = false
  ): string => {
    let minLength = 0
    if (field === FIELD_DAY) minLength = 2
    else if (field === FIELD_MONTH) minLength = 2
    else minLength = 4

    const val2Str = (isMonthInit ? 1 : 0) + val + ''
    if (val2Str.length < minLength)
      return new Array(minLength - val2Str.length).fill(0).join('') + val2Str

    return val2Str
  }

  const [datetime, setDatetime] = useState(() => {
    const today = new Date()

    return {
      day: addLeadingZeros(today.getDate(), FIELD_DAY),
      month: addLeadingZeros(today.getMonth(), FIELD_MONTH, true),
      year: addLeadingZeros(today.getUTCFullYear(), FIELD_YEAR),
    }
  })

  const onDatetimeFieldClick = (
    fieldRef: MutableRefObject<HTMLInputElement>
  ) => {
    if (fieldRef && fieldRef.current) fieldRef.current.select()
    resetInputCount()
  }

  const changeValueCircle = (val: number, maxVal: number) => {
    const newVal = ((val === 0 ? val - 1 : val) + maxVal + 1) % (maxVal + 1)

    return newVal === 0 ? newVal + 1 : newVal
  }

  const changeDatetime = (
    e: any,
    field: IDatetimeField,
    val: string
  ): string => {
    let str2Num = parseInt(val)

    if (e.keyCode === 38) {
      if (field === FIELD_DAY) str2Num = changeValueCircle(str2Num + 1, 31)
      else if (field === FIELD_MONTH)
        str2Num = changeValueCircle(str2Num + 1, 12)
      else if (field === FIELD_YEAR) str2Num += 1
    } else if (e.keyCode === 40) {
      if (field === FIELD_DAY) str2Num = changeValueCircle(str2Num - 1, 31)
      else if (field === FIELD_MONTH)
        str2Num = changeValueCircle(str2Num - 1, 12)
      else if (field === FIELD_YEAR && str2Num > 1) str2Num -= 1
    }

    return addLeadingZeros(str2Num, field)
  }

  const onDatetimeFieldKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: IDatetimeField
  ) => {
    // https://reactjs.org/docs/legacy-event-pooling.html
    // Prevents React from resetting its properties:
    e.persist()

    if (field === FIELD_DAY && dayInput) {
      setDatetime((prev) => ({
        ...prev,
        day: changeDatetime(e, field, dayInput.current.value),
      }))
    } else if (field === FIELD_MONTH && monthInput) {
      setDatetime((prev) => ({
        ...prev,
        month: changeDatetime(e, field, monthInput.current.value),
      }))
    } else if (field === FIELD_YEAR && yearInput) {
      setDatetime((prev) => ({
        ...prev,
        year: changeDatetime(e, field, yearInput.current.value),
      }))
    }
  }

  // input change
  const isNumber = (val: any): boolean => val.match(/[0-9]/)

  const [dayInputCount, setDayInputCount] = useState(0)
  const [monthInputCount, setMonthInputCount] = useState(0)
  const [yearInputCount, setYearInputCount] = useState(0)

  const onDatetimeFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: IDatetimeField
  ) => {
    const val: string = e.target.value.slice(-1)

    if (val === null || !isNumber(val)) return

    const valInt = parseInt(val)

    if (field === FIELD_DAY) {
      if (dayInputCount === 0 && valInt <= 3) {
        setDatetime((prev) => ({
          ...prev,
          day: addLeadingZeros(valInt, field),
        }))
        setDayInputCount(1)
      } else {
        setDatetime((prev) => ({
          ...prev,
          day:
            dayInputCount === 1
              ? prev.day.slice(-1) + valInt
              : addLeadingZeros(valInt, field),
        }))

        setDayInputCount(0)
        monthInput.current.focus()
      }
    } else if (field === FIELD_MONTH) {
      if (monthInputCount === 0) {
        setDatetime((prev) => ({
          ...prev,
          month: addLeadingZeros(valInt, field),
        }))

        if (valInt > 2) {
          setMonthInputCount(0)
          yearInput.current.focus()
        } else {
          setMonthInputCount(1)
        }
      } else if (monthInputCount > 0 && valInt <= 2) {
        setDatetime((prev) => ({
          ...prev,
          month: prev.month.slice(-1) + valInt,
        }))

        setMonthInputCount(0)
        yearInput.current.focus()
      }
    } else if (field === FIELD_YEAR) {
      const nextYear =
        (yearInputCount < 6
          ? datetime.year.slice(-(yearInputCount + 1))
          : datetime.year.slice(-5)) + valInt

      setDatetime((prev) => ({
        ...prev,
        year: addLeadingZeros(parseInt(nextYear), field),
      }))

      setYearInputCount(yearInputCount + 1)
    }
  }

  const resetInputCount = () => {
    setDayInputCount(0)
    setMonthInputCount(0)
    setYearInputCount(0)
  }

  return (
    <DateTimePickerWrapper>
      <DTPLabel htmlFor="date">Datetime picker:</DTPLabel>
      <DTPFormControl>
        <DTPInput>
          <DTPDatetimeField
            type="text"
            // readOnly
            value={datetime.day}
            ref={dayInput}
            onClick={() => onDatetimeFieldClick(dayInput)}
            onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_DAY)}
            onChange={(e) => onDatetimeFieldChange(e, FIELD_DAY)}
          />
          <DTPDatetimeSlash>/</DTPDatetimeSlash>
          <DTPDatetimeField
            type="text"
            // readOnly
            value={datetime.month}
            ref={monthInput}
            onClick={() => onDatetimeFieldClick(monthInput)}
            onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_MONTH)}
            onChange={(e) => onDatetimeFieldChange(e, FIELD_MONTH)}
          />
          <DTPDatetimeSlash>/</DTPDatetimeSlash>
          <DTPDatetimeField
            type="text"
            // readOnly
            ref={yearInput}
            value={datetime.year}
            onClick={() => onDatetimeFieldClick(yearInput)}
            onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_YEAR)}
            onChange={(e) => onDatetimeFieldChange(e, FIELD_YEAR)}
          />
        </DTPInput>
        <Button>Calendar icon</Button>
      </DTPFormControl>
    </DateTimePickerWrapper>
  )
}

export default DateTimePicker
