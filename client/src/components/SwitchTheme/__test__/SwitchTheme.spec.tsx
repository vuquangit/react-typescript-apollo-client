/**
 *
 * Tests for Switch Theme
 *
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SwitchTheme from '..'
import Wrapper from '@/test/supports/Wrapper'

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with light mode', () => {
    const { container, getByTestId } = render(
      <Wrapper themeMode="light">
        <SwitchTheme />
      </Wrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '27px')

    fireEvent.click(getByTestId('switch-theme'))
    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '1px')
  })

  it('Test SwitchTheme with dark mode', () => {
    const { container, getByTestId } = render(
      <Wrapper themeMode="dark">
        <SwitchTheme />
      </Wrapper>
    )

    expect(container).toMatchSnapshot()
    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '1px')

    fireEvent.click(getByTestId('switch-theme'))
    expect(getByTestId('track-light-mode')).toHaveStyleRule('opacity', '1')
    expect(getByTestId('track-dark-mode')).toHaveStyleRule('opacity', '0')
    expect(getByTestId('switch-toggle-thumb')).toHaveStyleRule('left', '27px')
  })
})
