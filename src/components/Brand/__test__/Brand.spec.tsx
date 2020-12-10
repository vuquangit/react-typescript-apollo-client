/**
 *
 * Tests for Brand
 *
 */

import React from 'react'

import AppWrapper from '@/test/supports/AppWrapper'
import Brand from '..'
import { shallow } from 'enzyme'

describe('App Brand', () => {
  it('Test default Brand', () => {
    const wrapper = shallow(
      <AppWrapper>
        <Brand />
      </AppWrapper>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
