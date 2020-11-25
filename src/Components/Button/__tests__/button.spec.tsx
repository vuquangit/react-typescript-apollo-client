import React from 'react'
import { render } from '@testing-library/react'
import Wrapper from '@/test/supports/Wrapper'

import Button from '..'

describe('App Button', () => {
  it('Test Button with light mode', async () => {
    const { container, getByTestId } = render(
      <Wrapper themeMode="light">
        <Button size="large">Primary</Button>
      </Wrapper>
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
    const { container, getByTestId } = render(
      <Wrapper themeMode="dark">
        <Button size="large">Primary</Button>
      </Wrapper>
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
    const { container, getByTestId } = render(
      <Wrapper themeMode="light">
        <Button disabled>Primary</Button>
      </Wrapper>
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
