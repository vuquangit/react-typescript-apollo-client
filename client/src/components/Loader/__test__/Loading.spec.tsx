/**
 *
 * Tests for Loader
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import Loader from '..'

describe('App Loader', () => {
  it('Test default Loader with no size', () => {
    const wrapper = render(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Test default Loader with size 48px', () => {
    const { container, getByTestId } = render(<Loader size={48} />)
    expect(container).toMatchSnapshot()
    expect(getByTestId('loader-content')).toHaveStyleRule('width', '48px')
    expect(getByTestId('loader-content')).toHaveStyleRule('height', '48px')
  })
})
