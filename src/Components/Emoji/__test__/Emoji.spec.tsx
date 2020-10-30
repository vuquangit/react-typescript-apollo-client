/**
 *
 * Tests for Emoji
 *
 */

import React from 'react'

import { render } from '@testing-library/react'
import Emoji from '..'

describe('App Emoji', () => {
  it('Test get default Emoji no label', () => {
    // test snapshot
    const wrapper = render(<Emoji symbol="❤" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Test get default Emoji with label', () => {
    // test snapshot
    const wrapper = render(<Emoji symbol="❤" label="heart" />)
    expect(wrapper).toMatchSnapshot()
  })
})
