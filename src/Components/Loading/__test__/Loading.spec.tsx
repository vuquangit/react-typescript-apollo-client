/**
 *
 * Tests for Loading
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import Loading from '..'

describe('App Loading', () => {
  it('Test default Loading with no size', () => {
    const wrapper = render(<Loading />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Test default Loading with size 48px', () => {
    const { container, getByTestId } = render(<Loading size={48} />)
    expect(container).toMatchSnapshot()
    expect(getByTestId('loading-content')).toHaveStyleRule('width', '48px')
    expect(getByTestId('loading-content')).toHaveStyleRule('height', '48px')
  })
})
