import React, { FC, MutableRefObject, useRef, useState } from 'react'
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

const DateTimePicker: FC<BaseDateTimePickerProps> = ({ type = 'date' }) => {
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

  const onDatetimeFieldKeydown = (e: any, field: IDatetimeField) => {
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
  const isNumber = (val: any): boolean => val.match('/[0-9]/')

  const onDatetimeFieldChange = (e: any, field: IDatetimeField) => {
    console.log(field, e.target.value)

    const val = e.target.value
    if (val !== null && !isNumber(val)) return

    const valInt = parseInt(val)

    if (field === 'day') {
      if (0 <= valInt && valInt < 9) {
        setDatetime((prev) => ({ ...prev, day: addLeadingZeros(val, field) }))
      } else {
        setDatetime((prev) => ({
          ...prev,
          day: prev.day + addLeadingZeros(val, field),
        }))
      }
    }

    // onDatetimeFieldClick(dayInput)
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
