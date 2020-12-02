/**
 *
 * Tests for CalendarDetail
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import CalendarDetail from '..'
import { dateData } from '../mock/date'

describe('App CalendarDetail', () => {
  it('Test get default CalendarDetail no params', () => {
    // test snapshot
    const wrapper = render(<CalendarDetail {...dateData} />)
    expect(wrapper).toMatchSnapshot()
  })
})
