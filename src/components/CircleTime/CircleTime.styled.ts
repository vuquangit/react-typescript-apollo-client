import styled from 'styled-components'
import { space } from 'styled-system'

export const CircleTimeWrapper = styled('div')`
  ${space}

  position: relative;
  height: 100%;
  // width: 60px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export const TimeItem = styled('div')`
  position: relative;
  text-align: center;
  min-height: 300px;
  max-height: 700px;
  height: 80%;
  border: 1px solid #000;
`

export const TimeContent = styled('div')`
  padding: 10px;
`
