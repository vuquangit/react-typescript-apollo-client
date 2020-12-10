/**
 *
 * Tests for Calendar
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Calendar from '..'

import Wrapper from '@/test/supports/AppWrapper'

let container: any = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container)
  container = null
})

describe('App Calendar', () => {
  it('Test get default Calendar', async () => {
    // Test first render and componentDidMount
    await act(async () => {
      ReactDOM.render(
        <Wrapper themeMode="light">
          <Calendar />
        </Wrapper>,
        container
      )
    })

    expect(container).toMatchSnapshot()
  })
})
