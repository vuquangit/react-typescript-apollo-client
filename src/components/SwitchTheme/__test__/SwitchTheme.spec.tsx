/**
 *
 * Tests for Switch Theme
 *
 */

import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import SwitchTheme from '..'
import AppWrapper from '@/test/supports/Wrapper'

const waitForResponse = () => new Promise((res) => setTimeout(res, 0))

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with dark mode', async () => {
    const { getByTestId } = render(
      <AppWrapper themeMode="light">
        <SwitchTheme />
      </AppWrapper>
    )

    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '27px')

    await fireEvent.click(getByTestId('switch-theme'))
    expect(getByTestId('switch-theme')).toBeDefined()
    expect(getByTestId('switch-theme-input')).toBeChecked()
  })

  it('Test SwitchTheme with dark mode', async () => {
    const { container, getByTestId } = render(
      <AppWrapper themeMode="dark">
        <SwitchTheme />
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '1px')

    await fireEvent.click(getByTestId('switch-theme'))
    expect(getByTestId('switch-theme')).toBeDefined()
    expect(getByTestId('switch-theme-input')).not.toBeChecked()

    // TODO: Fix test toggle styles
    // expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '1')
    // expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '0')
    // expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '27px')
  })
})
