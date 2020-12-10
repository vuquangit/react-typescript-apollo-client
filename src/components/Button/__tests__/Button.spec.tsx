import React from 'react'
import { render } from '@testing-library/react'
import AppWrapper from '@/test/supports/AppWrapper'

import Button from '..'
import { applyTheme } from '@/graphql/config/apollo-local-cache'

describe('App Button', () => {
  it('Test Button with light mode', async () => {
    applyTheme('light')

    const { container, getByTestId } = render(
      <AppWrapper themeMode="light">
        <Button size="large">Primary</Button>
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()

    const expectStyle: { [key: string]: string } = {
      'background-color': '#000',
      color: '#fff',
    }

    for (const style in expectStyle) {
      if (expectStyle[style]) {
        expect(getByTestId('app-button')).toHaveStyleRule(
          style,
          expectStyle[style]
        )
      }
    }
  })

  it('Test Button with dark mode', async () => {
    applyTheme('dark')

    const { container, getByTestId } = render(
      <AppWrapper themeMode="dark">
        <Button size="large">Primary</Button>
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()

    const expectStyle: { [key: string]: string } = {
      'background-color': '#fff',
      color: '#000',
    }

    for (const style in expectStyle) {
      if (expectStyle[style]) {
        expect(getByTestId('app-button')).toHaveStyleRule(
          style,
          expectStyle[style]
        )
      }
    }
  })

  it('Test Button disabled', async () => {
    applyTheme('light')

    const { container, getByTestId } = render(
      <AppWrapper themeMode="light">
        <Button disabled>Primary</Button>
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()

    const expectStyle: { [key: string]: string } = {
      'pointer-events': 'none',
    }

    for (const style in expectStyle) {
      if (expectStyle[style]) {
        expect(getByTestId('app-button')).toHaveStyleRule(
          style,
          expectStyle[style]
        )
      }
    }
  })
})
