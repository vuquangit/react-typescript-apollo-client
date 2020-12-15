/**
 *
 * Tests for AttendanceDetail
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import AttendanceDetail from '..'
import { dateData } from '../mock/date'

describe('App AttendanceDetail', () => {
  it('Test get default AttendanceDetail no params', () => {
    // test snapshot
    const wrapper = render(<AttendanceDetail {...dateData} />)
    expect(wrapper).toMatchSnapshot()
  })
})
