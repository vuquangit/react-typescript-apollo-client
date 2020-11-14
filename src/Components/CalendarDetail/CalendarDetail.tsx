import React, { FC } from 'react'

type Props = {
  date: number
}

const CalendarDetail: FC<Props> = ({ date }) => {
  return <div>{date}</div>
}

export default CalendarDetail
