import React, { FC } from 'react'
import CalendarWrappers from '@/components/CalendarWrapper'
import CalendarDetail from '@/components/AttendanceDetail'

const Attendances: FC = () => {
  return (
    <CalendarWrappers>
      <CalendarDetail />
    </CalendarWrappers>
  )
}

export default Attendances
