/**
 *
 * Tests for Brand
 *
 */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Brand from '..'
import { shallow } from 'enzyme'

describe('App Brand', () => {
  it('Test default Brand', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Brand />
      </BrowserRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
