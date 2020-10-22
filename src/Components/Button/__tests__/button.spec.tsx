import React from 'react'
import Button from '..'
import { mount } from 'enzyme'

// NOTE:: Using mount from enzyme to test atoms that we can test any css changed in children dom
// Ref: https://blog.halolabs.io/testing-react-components-with-jest-enzyme-5d1dd4ddccc4
describe('Button', () => {
  it('primary large btn', () => {
    const primaryLargeBtn = mount(<Button size="large">Primary</Button>)
    expect(primaryLargeBtn).toMatchSnapshot()

    const expectStyle: { [key: string]: string } = {
      'font-size': '20px',
      'background-color': '#000',
    }

    for (const style in expectStyle) {
      if (expectStyle[style]) {
        expect(primaryLargeBtn).toHaveStyleRule(style, expectStyle[style])
      }
    }
  })

  it('disable btn', () => {
    const outlineLargeBtn = mount(<Button disabled>Disable button</Button>)
    expect(outlineLargeBtn).toMatchSnapshot()

    const expectStyle: { [key: string]: string } = {
      'background-color': '#999',
      'border-color': '#999',
      'pointer-events': 'none',
    }

    for (const style in expectStyle) {
      if (expectStyle[style]) {
        expect(outlineLargeBtn).toHaveStyleRule(style, expectStyle[style])
      }
    }
  })
})
