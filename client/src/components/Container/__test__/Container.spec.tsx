/**
 *
 * Tests for Container
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import Container from '..'

describe('App Container', () => {
  it('Test get default Container no params', () => {
    // test snapshot
    const wrapper = render(<Container />)
    expect(wrapper).toMatchSnapshot()
  })
})
