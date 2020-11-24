/**
 *
 * Tests for Switch Theme
 *
 */

import React, { FC, ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import SwitchTheme from '..'
import { initializeStore } from '@/stores/store'
import GlobalStyle from '@/themes/globalStyles'
import { lightTheme } from '@/themes/theme'

type Props = {
  children: ReactNode
  themeMode: 'light' | 'dark'
}

const Wrapper: FC<Props> = ({ children, themeMode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initState: any = { theme: { themeMode: themeMode } }
  const store = initializeStore(initState)

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </Provider>
  )
}

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
