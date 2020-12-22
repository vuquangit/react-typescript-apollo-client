/**
 *
 * Tests for MyComponent
 *
 */

import React from 'react'
import { render /* fireEvent */ } from '@testing-library/react'

import Component from '..'
import AppWrapper from '@/test/supports/AppWrapper'

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with default', async () => {
    const { container, getByTestId } = render(
      <AppWrapper themeMode="light">
        <Component />
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
  })
})
