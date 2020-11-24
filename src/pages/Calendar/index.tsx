import React, { FC } from 'react'

import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'
import Calendar from '@/containers/Calendar'

const CalendarPage: FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <Calendar />
      </Container>
    </DefaultLayout>
  )
}

export default CalendarPage
