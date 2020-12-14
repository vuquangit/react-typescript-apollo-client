import React, { FC, MutableRefObject, useRef, useState } from 'react'
import Button from '../Button'

import {
  DateTimePickerWrapper,
  DTPCalendarIndicatorIcon,
  DTPClockIndicatorIcon,
  DTPDatetimeField,
  DTPDatetimeSlash,
  DTPFormControl,
  DTPInput,
  DTPLabel,
} from './DateTimePicker.styled'
import {
  BaseDateTimePickerProps,
  FIELD_DAY,
  FIELD_HOUR,
  FIELD_MINUTE,
  FIELD_MONTH,
  FIELD_YEAR,
  TDatetimeField,
} from './DateTimePicker.types'

const DateTimePicker: FC<BaseDateTimePickerProps> = ({ typePicker }) => {
  const dayInput = useRef(document.createElement('input'))
  const monthInput = useRef(document.createElement('input'))
  const yearInput = useRef(document.createElement('input'))
  const hourInput = useRef(document.createElement('input'))
  const minuteInput = useRef(document.createElement('input'))

  const [dayInputCount, setDayInputCount] = useState(0)
  const [monthInputCount, setMonthInputCount] = useState(0)
  const [yearInputCount, setYearInputCount] = useState(0)
  const [hourInputCount, setHourInputCount] = useState(0)
  const [minuteInputCount, setMinuteInputCount] = useState(0)

  const addLeadingZeros = (
    val: number,
    field: TDatetimeField,
    isMonthInit = false
  ): string => {
    let minLength = 0
    if (field === FIELD_DAY) minLength = 2
    else if (field === FIELD_MONTH) minLength = 2
    else if (field === FIELD_YEAR) minLength = 4
    else if (field === FIELD_HOUR) minLength = 2
    else if (field === FIELD_MINUTE) minLength = 2

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
      hour: addLeadingZeros(today.getHours(), FIELD_HOUR),
      minute: addLeadingZeros(today.getMinutes(), FIELD_MINUTE),
    }
  })

  const onDatetimeFieldClick = (
    fieldRef: MutableRefObject<HTMLInputElement>
  ) => {
    if (fieldRef && fieldRef.current) fieldRef.current.select()
    resetInputCount()
  }

  const changeValueCircle = (
    val: number,
    maxVal: number,
    field: TDatetimeField
  ) => {
    console.log('valCircle: ', val)
    const valChecked = isNaN(val)
      ? field === FIELD_YEAR
        ? new Date().getFullYear()
        : 1
      : val

    const newVal =
      ((valChecked === 0 ? valChecked - 1 : valChecked) + maxVal + 1) %
      (maxVal + 1)

    const valChanged =
      newVal === 0 &&
      (field === FIELD_YEAR || field === FIELD_MONTH || field === FIELD_DAY)
        ? newVal + 1
        : newVal

    return valChanged
  }

  const changeDatetime = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: TDatetimeField,
    val: string
  ): string => {
    let str2Num = parseInt(val)
    let clearField = ''

    console.log('keyCode: ', e.keyCode)

    if (e.keyCode === 38) {
      if (field === FIELD_DAY)
        str2Num = changeValueCircle(str2Num + 1, 31, field)
      else if (field === FIELD_MONTH)
        str2Num = changeValueCircle(str2Num + 1, 12, field)
      else if (field === FIELD_YEAR)
        str2Num = isNaN(str2Num) ? new Date().getFullYear() : str2Num + 1
      else if (field === FIELD_HOUR)
        str2Num = changeValueCircle(str2Num + 1, 23, field)
      else if (field === FIELD_MINUTE)
        str2Num = changeValueCircle(str2Num + 1, 59, field)
    } else if (e.keyCode === 40) {
      if (field === FIELD_DAY)
        str2Num = changeValueCircle(str2Num - 1, 31, field)
      else if (field === FIELD_MONTH)
        str2Num = changeValueCircle(str2Num - 1, 12, field)
      else if (field === FIELD_YEAR && (str2Num > 1 || isNaN(str2Num)))
        str2Num = isNaN(str2Num) ? new Date().getFullYear() : str2Num - 1
      else if (field === FIELD_HOUR)
        str2Num = changeValueCircle(str2Num - 1, 23, field)
      else if (field === FIELD_MINUTE)
        str2Num = changeValueCircle(str2Num - 1, 59, field)
    } else if (e.keyCode === 8) {
      if (field === FIELD_DAY) clearField = 'dd'
      else if (field === FIELD_MONTH) clearField = 'mm'
      else if (field === FIELD_YEAR) clearField = 'yyyy'
      else if (field === FIELD_HOUR || field === FIELD_MINUTE) clearField = '--'

      return clearField
    }

    return addLeadingZeros(str2Num, field)
  }

  const onDatetimeFieldKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: TDatetimeField
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
    } else if (field === FIELD_HOUR && hourInput) {
      setDatetime((prev) => ({
        ...prev,
        hour: changeDatetime(e, field, hourInput.current.value),
      }))
    } else if (field === FIELD_MINUTE && minuteInput) {
      setDatetime((prev) => ({
        ...prev,
        minute: changeDatetime(e, field, minuteInput.current.value),
      }))
    }
  }

  // input change
  const isNumber = (val: any): boolean => val.match(/[0-9]/)

  const onDatetimeFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: TDatetimeField
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
      if (yearInputCount === 6 && typePicker === 'datetime-local')
        hourInput.current.focus()
    } else if (field === FIELD_HOUR) {
      if (hourInputCount === 0 && valInt <= 5) {
        setDatetime((prev) => ({
          ...prev,
          hour: addLeadingZeros(valInt, field),
        }))
        setHourInputCount(1)
      } else {
        setDatetime((prev) => ({
          ...prev,
          hour:
            hourInputCount === 1
              ? prev.hour.slice(-1) + valInt
              : addLeadingZeros(valInt, field),
        }))

        setHourInputCount(0)
        minuteInput.current.focus()
      }
    } else if (field === FIELD_MINUTE) {
      if (minuteInputCount === 0 && valInt <= 5) {
        setDatetime((prev) => ({
          ...prev,
          minute: addLeadingZeros(valInt, field),
        }))
        setMinuteInputCount(1)
      } else {
        setDatetime((prev) => ({
          ...prev,
          minute:
            minuteInputCount > 0
              ? prev.minute.slice(-1) + valInt
              : addLeadingZeros(valInt, field),
        }))
      }
    }
  }

  const resetInputCount = () => {
    setDayInputCount(0)
    setMonthInputCount(0)
    setYearInputCount(0)
    setHourInputCount(0)
    setMinuteInputCount(0)
  }

  // calendar
  const onCalendarIconClick = () => {
    console.log('open calendar')
  }

  return (
    <DateTimePickerWrapper>
      <DTPLabel htmlFor="date">Datetime picker:</DTPLabel>
      <DTPFormControl>
        <DTPInput>
          {(typePicker === 'date' || typePicker === 'datetime-local') && (
            <>
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
                value={datetime.month}
                ref={monthInput}
                onClick={() => onDatetimeFieldClick(monthInput)}
                onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_MONTH)}
                onChange={(e) => onDatetimeFieldChange(e, FIELD_MONTH)}
              />
              <DTPDatetimeSlash>/</DTPDatetimeSlash>
              <DTPDatetimeField
                type="text"
                ref={yearInput}
                value={datetime.year}
                onClick={() => onDatetimeFieldClick(yearInput)}
                onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_YEAR)}
                onChange={(e) => onDatetimeFieldChange(e, FIELD_YEAR)}
              />
            </>
          )}

          {(typePicker === 'datetime-local' || typePicker === 'time') && (
            <>
              {typePicker === 'datetime-local' && (
                <DTPDatetimeSlash>{`, `}</DTPDatetimeSlash>
              )}

              <DTPDatetimeField
                type="text"
                ref={hourInput}
                value={datetime.hour}
                onClick={() => onDatetimeFieldClick(hourInput)}
                onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_HOUR)}
                onChange={(e) => onDatetimeFieldChange(e, FIELD_HOUR)}
              />
              <DTPDatetimeSlash>:</DTPDatetimeSlash>
              <DTPDatetimeField
                type="text"
                ref={minuteInput}
                value={datetime.minute}
                onClick={() => onDatetimeFieldClick(minuteInput)}
                onKeyDown={(e) => onDatetimeFieldKeydown(e, FIELD_MINUTE)}
                onChange={(e) => onDatetimeFieldChange(e, FIELD_MINUTE)}
              />
            </>
          )}
        </DTPInput>

        {typePicker === 'date' || typePicker === 'datetime-local' ? (
          <DTPCalendarIndicatorIcon onClick={onCalendarIconClick} />
        ) : (
          <DTPClockIndicatorIcon onClick={onCalendarIconClick} />
        )}
        {/* <Button>Calendar icon</Button> */}
      </DTPFormControl>
    </DateTimePickerWrapper>
  )
}

export default DateTimePicker
