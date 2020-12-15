import styled, { css } from 'styled-components'
import { TCalendarHeader } from './CalendarWrapper.types'
import { prop, ifProp } from 'styled-tools'

export const CalendarWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #dadada;
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

export const CalendarHeader = styled('div')<TCalendarHeader>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px;

  ${ifProp(
    'isShortCalendar',
    css`
      flex-direction: column;
      border-bottom: 1px solid #dadada;
    `
  )}
`

export const CalendarHeaderDate = styled('div')<TCalendarHeader>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const CalendarHeaderButtons = styled('div')<TCalendarHeader>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${ifProp(
    'isShortCalendar',
    css`
      margin-top: 8px;
    `
  )}
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
