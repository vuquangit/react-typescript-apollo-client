/**
 *
 * Tests for Checkbox
 *
 */

import React from 'react'
import { render /* fireEvent */ } from '@testing-library/react'

import Checkbox from '..'
import AppWrapper from '@/test/supports/AppWrapper'

describe('App Checkbox', () => {
  it('Test Checkbox with default', async () => {
    const { container, getByTestId } = render(
      <AppWrapper themeMode="light">
        <Checkbox />
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('checkbox-wrapper')).toBeInTheDocument()
  })
})
