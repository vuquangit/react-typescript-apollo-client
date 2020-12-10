/**
 *
 * Tests for Flex
 *
 */

import React from 'react'
import { render } from '@testing-library/react'

import Flex from '..'
import AppWrapper from '@/test/supports/AppWrapper'

describe('App SwitchTheme', () => {
  it('Test SwitchTheme with default', async () => {
    const { container } = render(
      <AppWrapper themeMode="light">
        <Flex>
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
          <div>Content 4</div>
          <div>Content 5</div>
        </Flex>
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
  })

  it('Test SwitchTheme with props', async () => {
    const { container } = render(
      <AppWrapper themeMode="light">
        <Flex
          flexDirection="column-reverse"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div>Content 1</div>
          <div>Content 2</div>
          <div>Content 3</div>
          <div>Content 4</div>
          <div>Content 5</div>
        </Flex>
      </AppWrapper>
    )

    expect(container).toMatchSnapshot()
  })
})
