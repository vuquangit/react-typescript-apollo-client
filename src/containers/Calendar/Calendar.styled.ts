import styled from 'styled-components'
// import { prop } from 'styled-tools'

// import { ILoaderProps } from './Loader.types'

export const CalendarWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const CalendarContentWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

export const CalendarDayNames = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

export const CalendarHeader = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px;
`

export const CalendarBody = styled('div')`
  border-top: 0.05rem solid #e3e3e7;
  border-left: 0.05rem solid #e3e3e7;
  width: 100%;
`

export const CalendarMonthList = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-top: 0.05rem solid #e3e3e7;
  border-left: 0.05rem solid #e3e3e7;
`

export const CalendarMonthListItem = styled('div')`
  border-bottom: 0.05rem solid #e3e3e7;
  border-right: 0.05rem solid #e3e3e7;
  width: calc(100% * 4 / 12);
  padding: 1rem;
  height: 7rem;
  cursor: pointer;

  &:hover {
    background-color: #5f5f5f;
  }
`
