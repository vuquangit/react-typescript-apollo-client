/**
 *
 * Tests for DateTimePicker
 *
 */

import React, { useReducer } from 'react'
import { render /* fireEvent */ } from '@testing-library/react'

import DateTimePicker from '..'
import AppWrapper from '@/test/supports/AppWrapper'

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with default', async () => {
    const { container, getByTestId } = render(
      <AppWrapper>
        <DateTimePicker />
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
  })
})
