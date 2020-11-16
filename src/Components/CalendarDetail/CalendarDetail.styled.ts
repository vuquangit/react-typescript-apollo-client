import styled from 'styled-components'
import { prop, ifProp } from 'styled-tools'
import { BaseCalendarDetailProps } from './CalendarDetail.types'
import { AppButton } from 'components/Button/Button.styled'

export const CalendarDetailWrapper = styled('div')<BaseCalendarDetailProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;

  height: 7rem;
  border-bottom: 0.05rem solid #e3e3e7;
  border-right: 0.05rem solid #e3e3e7;

  cursor: ${ifProp({ disable: true }, 'default', 'pointer')};
  pointer-events: ${ifProp({ disable: true }, 'none', 'auto')};
  max-width: ${prop('maxWidth', '100')}%;

  &:after {
    background: rgba(46, 62, 72, 0.9);
    border-radius: 0.15rem;
    bottom: 100%;
    color: #fff;
    content: attr(data-tooltip);
    display: block;
    font-size: 0.8rem;
    left: 50%;
    max-width: 320px;
    opacity: 0;
    overflow: hidden;
    padding: 0.2rem 0.4rem;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transform: translate(-50%, 0.4rem);
    transition: all 0.2s ease;
    white-space: pre;
    z-index: 300;
  }

  &:focus:after,
  &:hover:after {
    opacity: 1;
    transform: translate(-50%, -0.2rem);
  }
`

export const DateItem = styled(AppButton)`
  align-self: flex-end;
  height: 1.4rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;

  transition: all 0.2s ease;
  appearance: none;
  background: transparent;
  border: 0.05rem solid transparent;
  border-radius: 50%;
  color: #6c777e;
  cursor: pointer;
  font-size: 0.8rem;

  line-height: 1rem;
  outline: none;
  padding: 0.15rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 1.4rem;
`

export const CalendarEvents = styled('div')`
  flex-grow: 1;
  line-height: 1;
  overflow-y: auto;
  padding: 0.2rem;
`

export const CalendarEvent = styled('span')`
  border-radius: 0.15rem;
  font-size: 0.7rem;
  display: block;
  margin: 0.15rem auto;
  overflow: hidden;
  padding: 3px 4px;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #10b742;
  background: #d3f1dc;
`
