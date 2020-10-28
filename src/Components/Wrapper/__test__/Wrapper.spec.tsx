/**
 *
 * Tests for Wrapper
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import Wrapper from '..'

describe('App Wrapper', () => {
  it('Test get default Wrapper no params ', () => {
    // test snapshot
    const wrapper = render(<Wrapper />)
    expect(wrapper).toMatchSnapshot()
  })
})
