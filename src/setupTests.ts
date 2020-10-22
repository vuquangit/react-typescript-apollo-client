import { createSerializer } from 'enzyme-to-json'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { toMatchDiffSnapshot } from 'snapshot-diff'

import 'jest-styled-components'
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

expect.extend({ toMatchDiffSnapshot })

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
expect.addSnapshotSerializer(createSerializer())
