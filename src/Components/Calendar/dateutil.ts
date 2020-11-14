import { IDate, TWeeks } from './Calendar.types'

const monthTypes = {
  PREVIOUS: 'previous',
  CURRENT: 'current',
  NEXT: 'next',
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const pad = (number: number, padCharacter = '0') =>
  number < 10 ? padCharacter + number : number

const iso8601 = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const getLastDate = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const getFirstDayIndex = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    .toDateString()
    .substring(0, 3)
  return dayNames.indexOf(firstDay)
}

const getDatesWithMetadata = (date: Date): Promise<IDate[]> => {
  return new Promise((resolve) => {
    const previousDates = getPreviousDates(date).map(
      ({ date, iso, dayName }) => ({
        date,
        dayName,
        iso,
        type: monthTypes.PREVIOUS,
      })
    )

    const currentDates = getCurrentDates(date).map(
      ({ date, iso, dayName }) => ({
        date,
        dayName,
        iso,
        type: monthTypes.CURRENT,
      })
    )

    const totalGetNext = previousDates.length + currentDates.length

    const nextDates = getNextDates(date, totalGetNext).map(
      ({ date, iso, dayName }) => ({
        date,
        dayName,
        iso,
        type: monthTypes.NEXT,
      })
    )

    resolve([...previousDates, ...currentDates, ...nextDates])
  })
}

const dateMapper = (dateCount: number) => (
  mapper: (value: unknown, index: number) => IDate
): IDate[] => Array(dateCount).fill(undefined).map(mapper)

const getCurrentDates = (currentDate: Date): IDate[] => {
  const lastDate = getLastDate(currentDate)
  return dateMapper(lastDate)((_, i) => {
    const date = i + 1
    currentDate.setDate(date)
    return {
      date,
      iso: iso8601(currentDate),
      dayName: dayNames[new Date(currentDate).getDay()],
    }
  })
}

const getPreviousDates = (currentDate: Date): IDate[] => {
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()
  const prevMonth = Math.min(month - 1, 11)
  const prevDate = new Date(year, prevMonth)

  const prevMonthLastDate = getLastDate(prevDate)
  const firstDayIndex = getFirstDayIndex(currentDate)
  const start = prevMonthLastDate - firstDayIndex + 1
  const length = prevMonthLastDate - start + 1

  return dateMapper(length)((_, i) => {
    const date = start + i
    prevDate.setDate(date)
    return {
      date,
      iso: iso8601(prevDate),
      dayName: dayNames[new Date(prevDate).getDay()],
    }
  })
}

const getNextDates = (currentDate: Date, daysSoFar: number): IDate[] => {
  // 7 days * 6 rows (in a calendar)
  const totalDays = 42 // not the answer to all questions.
  const length = totalDays - daysSoFar

  const nextMonth =
    currentDate.getMonth() + 1 === 12 ? 0 : currentDate.getMonth() + 1
  const nextYear =
    nextMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()
  const nextDate = new Date(nextYear, nextMonth)

  return dateMapper(length)((_, i) => {
    const date = i + 1
    nextDate.setDate(date)
    return {
      date,
      iso: iso8601(nextDate),
      dayName: dayNames[new Date(nextDate).getDay()],
    }
  })
}

const getDates = (date: Date): Promise<IDate[]> => {
  return new Promise((resolve) =>
    resolve(
      getDatesWithMetadata(date).then((dates) =>
        dates.map((metadata) => metadata)
      )
    )
  )
}

const getMatrix = (date: Date): Promise<TWeeks> => {
  const daysInAWeek = 7 // 7 days in a week.

  return new Promise((resolve) => {
    resolve(
      getDatesWithMetadata(date).then((dates) => {
        let isBreak = false

        return dates.reduce((rows: TWeeks, key, index) => {
          if (key.dayName === dayNames[0] && key.type === monthTypes.NEXT)
            isBreak = true

          if (isBreak) return rows

          if (index % daysInAWeek === 0) rows.push([key])
          else rows[rows.length - 1].push(key)

          return rows
        }, [])
      })
    )
  })
}

export {
  monthTypes,
  dayNames,
  iso8601,
  getLastDate,
  getFirstDayIndex,
  getDatesWithMetadata,
  getCurrentDates,
  getPreviousDates,
  getNextDates,
  getDates,
  getMatrix,
}
